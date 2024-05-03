package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type LockerGroups struct {
	gorm.Model
	ID             uuid.UUID `gorm:"type:uuid;primary_key"`
	Identification string    `gorm:"unique"`
	Lockers        []Locker  `gorm:"foreignKey:GroupID; references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	RoleID         uuid.UUID `gorm:"default:Null"`
	Roles          Roles     `gorm:"foreignKey:RoleID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;default:null"`
	Description    string
}

func (u *LockerGroups) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New()

	return
}
