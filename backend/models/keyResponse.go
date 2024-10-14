package models

import "github.com/google/uuid"

type KeyResponse struct {
	ID             uuid.UUID
	Identification string
}
