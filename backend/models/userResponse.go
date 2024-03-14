package models

import "github.com/google/uuid"

type UserResponse struct {
	Id      uuid.UUID
	Name    string
	Email   string
	IsAdmin bool
}
