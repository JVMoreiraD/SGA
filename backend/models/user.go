package models

import (
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID       uuid.UUID `gorm:"type:uuid;primary_key;"`
	Name     string
	Email    string `gorm:"unique"`
	Password string
	IsAdmin  bool       `gorm:"default:False"`
	RoleID   *uuid.UUID `gorm:"default:Null"`
	Roles    *Roles     `gorm:"foreignKey:RoleID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;default:null"`
	LockerID *uuid.UUID `gorm:"default:null"`
	Locker   *Locker    `gorm:"foreignKey:LockerID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;default:null"`
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New()

	return
}
func NewBaseUser(name string, email string, password string, isAdmin bool) (*User, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	if err != nil {
		return &User{}, err
	}
	return &User{
		ID:       uuid.New(),
		Name:     name,
		Email:    email,
		Password: string(hash),
		IsAdmin:  isAdmin,
	}, nil
}
