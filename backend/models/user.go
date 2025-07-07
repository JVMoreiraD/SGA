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

func UpdateUser(db *gorm.DB, id uuid.UUID, updates map[string]interface{}) error {
	var user User

	// Busca o usuário pelo ID
	if err := db.First(&user, "id = ?", id).Error; err != nil {
		return err // Retorna erro se usuário não existir
	}

	// Atualiza a senha, se estiver presente
	if pwd, ok := updates["password"].(string); ok && pwd != "" {
		hashedPwd, err := bcrypt.GenerateFromPassword([]byte(pwd), 10)
		if err != nil {
			return err
		}
		updates["password"] = string(hashedPwd)
	}

	// Atualiza os campos restantes
	if err := db.Model(&user).Updates(updates).Error; err != nil {
		return err
	}

	return nil
}

func DeleteUser(db *gorm.DB, id uuid.UUID) error {
	var user User

	// Busca para garantir que o usuário exista
	if err := db.First(&user, "id = ?", id).Error; err != nil {
		return err
	}

	// Deleta o usuário
	if err := db.Delete(&user).Error; err != nil {
		return err
	}

	return nil
}
