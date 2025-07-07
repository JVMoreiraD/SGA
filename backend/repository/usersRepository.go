package repository

import (
	"github.com/JVMoreiraD/SGA/initializers"
	"github.com/JVMoreiraD/SGA/models"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

func NewBaseUser(name, email, phone, password string, isAdmin bool, roleID uuid.UUID) (*models.User, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	if err != nil {
		return nil, err
	}
	var user = models.User{
		ID:       uuid.New(),
		Name:     name,
		Email:    email,
		Phone:    phone,
		Password: string(hash),
		IsAdmin:  isAdmin,
		RoleID:   roleID,
	}
	initializers.DB.Create(&user)

	return &user, nil
}

func DeleteUser(id string) {
	var userToDelete models.User

	initializers.DB.First(&userToDelete, "id = ?", id)

	initializers.DB.Delete(&userToDelete)
}

func GetUserByEmail(email string) *models.User {
	var user models.User
	initializers.DB.Preload("Role").First(&user, "email = ?", email)
	if len(user.ID) == 0 {
		return nil
	}

	return &user
}

func GetAllUsers() []models.User {
	var users []models.User
	initializers.DB.Preload("Roles").Find(&users)
	return users
}

// type UpdateData struct {
// 	Name    *string `json:"name,omitempty"`
// 	Email   *string `json:"email,omitempty"`
// 	Phone   *string `json:"phone,omitempty"`
// 	IsAdmin *bool   `json:"isAdmin,omitempty"`
// 	RoleID  *string `json:"roleID,omitempty"`
// }

// func UpdateUser(id string, updateData UpdateData) (*models.User, error) {
// 	var user models.User

// 	// Parse the ID string to UUID
// 	userID, err := uuid.Parse(id)
// 	if err != nil {
// 		return nil, fmt.Errorf("invalid user ID: %v", err)
// 	}

// 	// Find the user
// 	if err := initializers.DB.Preload("Role").First(&user, "id = ?", userID).Error; err != nil {
// 		return nil, fmt.Errorf("user not found: %v", err)
// 	}

// 	// Update fields if they are provided in updateData
// 	if updateData.Name != nil {
// 		user.Name = *updateData.Name
// 	}
// 	if updateData.Email != nil {
// 		user.Email = *updateData.Email
// 	}
// 	if updateData.Phone != nil {
// 		user.Phone = *updateData.Phone
// 	}
// 	if updateData.IsAdmin != nil {
// 		user.IsAdmin = *updateData.IsAdmin
// 	}
// 	if updateData.RoleID != nil {
// 		roleID, err := uuid.Parse(*updateData.RoleID)
// 		if err != nil {
// 			return nil, fmt.Errorf("invalid role ID: %v", err)
// 		}
// 		user.RoleID = roleID
// 	}

// 	// Save the updated user
// 	if err := initializers.DB.Save(&user).Error; err != nil {
// 		return nil, fmt.Errorf("failed to update user: %v", err)
// 	}

// 	return &user, nil
// }
