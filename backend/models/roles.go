package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Roles struct {
	gorm.Model
	ID          uuid.UUID `gorm:"type:uuid;primary_key"`
	RoleName    string
	Description string
}

func (u *Roles) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New()

	return
}

func NewRoles(roleName string, description string) *Roles {
	return &Roles{
		ID:          uuid.New(),
		RoleName:    roleName,
		Description: description,
	}
}
