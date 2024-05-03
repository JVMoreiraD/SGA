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

	r.POST("/signup", controllers.SignUp)
	r.POST("/login", controllers.Login)
	r.GET("/users", middleware.RequireAuth, controllers.GetUsers)
	r.GET("/validate", middleware.RequireAuth, controllers.Validate)
	r.POST("/keys", middleware.RequireAuth, controllers.KeysCreate)
	r.GET("/keys", middleware.RequireAuth, controllers.GetKeys)
	// r.PATCH("/keysToUser", middleware.RequireAuth, controllers.GiveKeyToUser)
	r.POST("/lockerGroup", middleware.RequireAuth, controllers.CreateLockerGroup)
	r.GET("/lockerGroup", middleware.RequireAuth, controllers.GetLockerGroup)
	r.POST("/locker", middleware.RequireAuth, controllers.CreateLocker)
	r.GET("/locker", middleware.RequireAuth, controllers.GetLockers)
	r.POST("/roles", middleware.RequireAuth, controllers.CreateRole)
	r.GET("/roles", middleware.RequireAuth, controllers.GetRoles)

	r.Run()
}
