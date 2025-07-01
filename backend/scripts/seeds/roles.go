package main

import (
	"github.com/JVMoreiraD/SGA/initializers"
	"github.com/JVMoreiraD/SGA/models"
)

func main() {
	// Não esqueça que toda seed precisa conectar com o banco
	initializers.ConnectToDatabase()

	roles := []models.Roles{
		{RoleName: "ESTUDANTE",
			Description: "Grupo de alunos",
		},
		{RoleName: "PROFESSOR",
			Description: "Grupo dos professores"},
		{RoleName: "TERCEIRIZADOS",
			Description: "Grupo dos terceirizados",
		},
	}
	for _, role := range roles {
		initializers.DB.Create(&role)

	}
}
