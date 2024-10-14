package models

import "github.com/google/uuid"

type LockerResponse struct {
	ID             uuid.UUID
	Identification string
	KeyID          uuid.UUID
	Key            KeyResponse
}
