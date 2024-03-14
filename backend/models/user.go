package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID       string `gorm:"unique"`
	Name     string
	Email    string `gorm:"unique"`
	Password string
	IsAdmin  bool `gorm:"default:False`
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.NewString()

	return
}
