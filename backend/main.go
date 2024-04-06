package main

import (
	"github.com/JVMoreiraD/SGA/controllers"
	"github.com/JVMoreiraD/SGA/initializers"
	"github.com/JVMoreiraD/SGA/middleware"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDatabase()
	initializers.SyncDatabase()
}
func main() {
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"Message": "pong",
		})
	})
	r.POST("/signup", controllers.SignUp)
	r.POST("/login", controllers.Login)
	r.GET("/users", middleware.RequireAuth, controllers.GetUsers)

	r.GET("/validate", middleware.RequireAuth, controllers.Validate)
	r.POST("/keys", middleware.RequireAuth, controllers.KeysCreate)
	r.Run()
}
