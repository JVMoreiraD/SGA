package main

import (
	"github.com/JVMoreiraD/SGA/controllers"
	"github.com/JVMoreiraD/SGA/docs"

	// "github.com/JVMoreiraD/SGA/docs"

	"github.com/JVMoreiraD/SGA/initializers"
	"github.com/JVMoreiraD/SGA/middleware"
	"github.com/gin-gonic/gin"

	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDatabase()
	initializers.SyncDatabase()
}

// @title 	SGA API
// @version	1.0
// @description Locker management API in Go using Gin framework
// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
// @host      localhost:8080
// @BasePath  /api/v1

func main() {
	docs.SwaggerInfo.BasePath = "/api/v1"

	r := gin.Default()

	// Auth routes
	r.POST("/login", controllers.Login)
	r.GET("/validate", middleware.RequireAuth, controllers.Validate)
	//users route
	r.POST("/signup", controllers.SignUp)
	r.GET("/users", middleware.RequireAuth, controllers.GetUsers)
	r.PATCH("/users", middleware.RequireAuth, controllers.UpdateUser)

	//Keys route
	r.POST("/keys", middleware.RequireAuth, controllers.KeysCreate)
	r.GET("/keys", middleware.RequireAuth, controllers.GetKeys)
	r.PATCH("/keys", middleware.RequireAuth, controllers.UpdateKey)
	// r.POST("/locker", middleware.RequireAuth, controllers.CreateLocker)
	r.GET("/locker", middleware.RequireAuth, controllers.GetLockers)

	// Roles routes
	r.POST("/roles", middleware.RequireAuth, controllers.CreateRole)
	r.GET("/roles", middleware.RequireAuth, controllers.GetRoles)
	// r.POST("/lockerUser", middleware.RequireAuth, controllers.AssignLockerToUser)

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	r.Run(":8080")
}
