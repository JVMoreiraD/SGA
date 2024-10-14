package models

import "github.com/google/uuid"

type LockerGroupResponse struct {
	ID             uuid.UUID
	Identification string
	Lockers        []LockerResponse
	RoleID         uuid.UUID
	Role           RolesResponse
}
