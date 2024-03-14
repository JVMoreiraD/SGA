package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Key struct {
	gorm.Model
	ID         string `gorm:"unique"`
	Identifier string `gorm:"unique"`
	Quantity   int
}

func (u *Key) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.NewString()

	return
}
