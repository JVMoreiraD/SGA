package controllers

import (
	"net/http"
	"os"
	"time"

	"github.com/JVMoreiraD/SGA/initializers"
	"github.com/JVMoreiraD/SGA/models"
	"github.com/JVMoreiraD/SGA/repository"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type SignUpRequest struct {
	Name     string    `json:"Name" example:"João Vitor"`
	Email    string    `json:"Email" example:"joao@example.com"`
	Password string    `json:"Password" example:"12234"`
	IsAdmin  bool      `json:"IsAdmin" example:"false"`
	Phone    string    `json:"Phone" example:"861412234"`
	RoleID   uuid.UUID `json:"RoleID"`
}

// SignUp godoc
// @Summary Register a new user
// @Description Create a new user account with the provided information
// @Tags users
// @Accept json
// @Produce json
// @Param request body SignUpRequest  true "User registration data"
// @Success 200
// @Failure 400
// @Failure 400
// @Failure 400
// @Failure 400
// @Failure 400
// @Router /signup [post]
func SignUp(c *gin.Context) {
	var body SignUpRequest

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}
	isRoleValid := initializers.DB.First(&models.Roles{}, "id = ?", body.RoleID)
	if isRoleValid.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid role",
		})
		return
	}
	invalidEmail := initializers.DB.First(&models.User{}, "email = ?", body.Email)
	if invalidEmail.RowsAffected == 1 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid email",
		})
		return
	}

	_, err := repository.NewBaseUser(body.Name, body.Email, body.Phone, body.Password, body.IsAdmin, body.RoleID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid user data",
		})
	}
	// result := initializers.DB.Create(&user)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create user",
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "User created with success",
	})

}

type LoginRequest struct {
	Email    string `json:"Email" example:"joao@example.com"`
	Password string `json:"Password" example:"1234"`
}

// Login godoc
// @Summary User login
// @Description Authenticate user and return JWT token
// @Tags auth
// @Accept json
// @Produce json
// @Param request body LoginRequest  true "Login credentials"
// @Success 200
// @Failure 400
// @Failure 400
// @Failure 400
// @Router /login [post]
func Login(c *gin.Context) {
	var body LoginRequest

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to read body",
		})
		return
	}
	user := repository.GetUserByEmail(body.Email)
	if user == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
		})
		return
	}
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
		})
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID.String(),
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create token",
		})
		return
	}
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "", "", false, true)
	c.JSON(http.StatusOK, gin.H{
		"jwt":   tokenString,
		"id":    user.ID,
		"email": user.Email,
		"name":  user.Name,
	})
}

// Validate godoc
// @Summary Validate JWT token
// @Description Validate the current user's JWT token and return user data
// @Tags auth
// @Security BearerAuth
// @Produce json
// @Success 200
// @Success 200
// @Failure 401
// @Router /validate [get]
func Validate(c *gin.Context) {

	user, _ := c.Get("user")
	c.JSON(http.StatusOK, gin.H{
		"message": user,
	})
}

// GetUsers godoc
// @Summary Get all users
// @Description Retrieve list of all users (admin only)
// @Tags users
// @Security BearerAuth
// @Produce json
// @Success 200
// @Failure 403
// @Router /users [get]
func GetUsers(c *gin.Context) {
	user, _ := c.Get("user")
	if !user.(models.UserResponse).IsAdmin {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Unauthorized",
		})
		return
	}
	users := repository.GetAllUsers()
	var usersResponse []models.UserResponse

	for _, user := range users {
		var roleTemp = models.RolesResponse{ID: user.Roles.ID, RoleName: user.Roles.RoleName}
		var temp = models.UserResponse{ID: user.ID, Name: user.Name, Phone: user.Phone, Email: user.Email, IsAdmin: user.IsAdmin, Role: roleTemp}
		usersResponse = append(usersResponse, temp)
	}
	c.JSON(http.StatusOK, gin.H{
		"users": usersResponse,
	})
}

// UpdateUser godoc
// @Summary Update a user
// @Description Update user information (admin only)
// @Tags users
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param id path string true "User ID (UUID)"
//
//	@Param request body SignUpRequest false "User update data"
//
// @Success 200
// @Failure 400
// @Failure 403
// @Failure 404
// @Router /users/{id} [patch]
func UpdateUser(c *gin.Context) {
	// Verify admin access
	user, _ := c.Get("user")
	if !user.(models.UserResponse).IsAdmin {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	// Get user ID from path
	userID := c.Query("id")
	if _, err := uuid.Parse(userID); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	// Parse request body
	var updateData struct {
		Name    *string `json:"name,omitempty"`
		Email   *string `json:"email,omitempty"`
		Phone   *string `json:"phone,omitempty"`
		IsAdmin *bool   `json:"isAdmin,omitempty"`
		RoleID  *string `json:"roleID,omitempty"`
	}

	if err := c.Bind(&updateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	// Find and update user
	var userUpdate models.User
	if err := initializers.DB.Preload("Role").First(&userUpdate, "id = ?", userUpdate).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	// Apply updates
	if updateData.Name != nil {
		userUpdate.Name = *updateData.Name
	}
	if updateData.Email != nil {
		userUpdate.Email = *updateData.Email
	}
	if updateData.Phone != nil {
		userUpdate.Phone = *updateData.Phone
	}
	if updateData.IsAdmin != nil {
		userUpdate.IsAdmin = *updateData.IsAdmin
	}
	if updateData.RoleID != nil {
		if roleID, err := uuid.Parse(*updateData.RoleID); err == nil {
			userUpdate.RoleID = roleID
		}
	}

	if err := initializers.DB.Save(&userUpdate).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	// Return updated user
	c.JSON(http.StatusOK, gin.H{
		"message": "Updated",
	})
}

// DeleteUser godoc
// @Summary Delete a user
// @Description Delete a user by ID (admin only)
// @Tags users
// @Security BearerAuth
// @Produce json
// @Param id path string true "User ID (UUID)"
// @Success 204 "No content - successful deletion"
// @Failure 400
// @Failure 403
// @Failure 404
// @Failure 500
// @Router /users/{id} [delete]
func DeleteUser(c *gin.Context) {
	// Verify admin access
	user, _ := c.Get("user")
	if !user.(models.UserResponse).IsAdmin {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	// Validate user ID
	userID := c.Query("id")
	if _, err := uuid.Parse(userID); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": userID,
		})
		return
	}

	// Prevent self-deletion
	if user.(models.UserResponse).ID.String() == userID {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	repository.DeleteUser(userID)

	// Return success (no content)
	c.Status(http.StatusNoContent)
}
