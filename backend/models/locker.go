package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Locker struct {
	gorm.Model
	ID             uuid.UUID `gorm:"type:uuid;primary_key"`
	Identification string
	KeyID          uuid.UUID `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Key            Key       `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	GroupID        uuid.UUID
	Group          LockerGroups `gorm:"foreignKey:GroupID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;default:null"`
}

func (u *Locker) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New()

	return
}

func NewLocker(identification string, keyID uuid.UUID, groupID uuid.UUID, key Key, group LockerGroups) *Locker {

	return &Locker{
		ID:             uuid.New(),
		Identification: identification,
		KeyID:          keyID,
		GroupID:        groupID,
		Key:            key,
		Group:          group,
	}
}
