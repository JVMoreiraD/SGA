package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Key struct {
	gorm.Model
	ID             uuid.UUID `gorm:"type:uuid;primary_key;"`
	Identification string    `gorm:"unique"`
	Quantity       int
}

func (u *Key) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New()

	return
}

func NewKey(Identification string, quantity int) *Key {
	return &Key{
		ID:             uuid.New(),
		Identification: Identification,
		Quantity:       quantity,
	}
}
