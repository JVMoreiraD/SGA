package models

import "github.com/google/uuid"

type UserResponse struct {
	ID      uuid.UUID
	Name    string
	Email   string
	IsAdmin bool
	Role    RolesResponse
}
