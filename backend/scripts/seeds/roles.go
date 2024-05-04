package main

import (
	"github.com/JVMoreiraD/SGA/initializers"
	"github.com/JVMoreiraD/SGA/models"
	"github.com/google/uuid"
)

func main() {
	roles := []models.Roles{
		{ID: uuid.New(), RoleName: "ESTUDANTE"},
		{ID: uuid.New(), RoleName: "PROFESSOR"},
		{ID: uuid.New(), RoleName: "TERCEIRIZADO"},
	}
	for _, role := range roles {
		initializers.DB.Create(&role)

	}
}
