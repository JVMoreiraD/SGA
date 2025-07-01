package models

import (
	"fmt"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Key struct {
	gorm.Model
	ID             uuid.UUID  `gorm:"type:uuid;primary_key"`
	Identification string     `gorm:"unique;not null"`
	UserID         *uuid.UUID `gorm:"unique"` // Nullable, but unique when assigned
	User           *User      `gorm:"foreignKey:UserID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	LockerID       *uuid.UUID // Nullable foreign key for Locker
	Locker         *Locker    `gorm:"foreignKey:LockerID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Quantity       int        `gorm:"default:1"`
}

func (k *Key) BeforeCreate(tx *gorm.DB) (err error) {
	k.ID = uuid.New()
	return
}
func (k *Key) AssignToUser(userID uuid.UUID) error {
	if k.UserID != nil {
		return fmt.Errorf("key already assigned to user %s", k.UserID.String())
	}
	k.UserID = &userID
	return nil
}

// AssignToLocker allows multiple keys per locker
func (k *Key) AssignToLocker(lockerID uuid.UUID) {
	k.LockerID = &lockerID
}

func NewKey(identification string, quantity int) *Key {
	return &Key{
		ID:             uuid.New(),
		Identification: identification,
		// UserID:         userID,
		Quantity: quantity,
	}
}
