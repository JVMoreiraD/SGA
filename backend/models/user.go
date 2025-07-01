package models

import (
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID       uuid.UUID `gorm:"type:uuid;primary_key"`
	Name     string
	Email    string `gorm:"unique"`
	Phone    string `gorm:"unique"`
	Password string
	IsAdmin  bool `gorm:"default:false"`
	RoleID   uuid.UUID
	Key      *Key  `gorm:"foreignKey:UserID"` // 1:1 relationship
	Roles    Roles `gorm:"foreignKey:RoleID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New()
	return
}

func NewBaseUser(name, email, phone, password string, isAdmin bool, roleID uuid.UUID) (*User, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	if err != nil {
		return nil, err
	}
	return &User{
		ID:       uuid.New(),
		Name:     name,
		Email:    email,
		Phone:    phone,
		Password: string(hash),
		IsAdmin:  isAdmin,
		RoleID:   roleID,
	}, nil
}
