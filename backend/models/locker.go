package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Locker struct {
	gorm.Model
	ID             uuid.UUID `gorm:"type:uuid;primary_key"`
	Identification string    `gorm:"not null"`
	Keys           []Key     `gorm:"foreignKey:LockerID"` // 1:N relationship
	RoleID         uuid.UUID

	Roles Roles `gorm:"foreignKey:RoleID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}

func (l *Locker) BeforeCreate(tx *gorm.DB) (err error) {
	l.ID = uuid.New()
	return
}
func (l *Locker) AddKeyToLocker(key *Key) {
	key.LockerID = &l.ID
	l.Keys = append(l.Keys, *key)
}

func NewLocker(identification string, role Roles) *Locker {
	return &Locker{
		ID:             uuid.New(),
		Identification: identification,
		Roles:          role,
	}
}
