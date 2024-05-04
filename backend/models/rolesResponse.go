package models

import "github.com/google/uuid"

type RolesResponse struct {
	ID       uuid.UUID
	RoleName string
}
