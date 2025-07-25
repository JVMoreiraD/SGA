package controllers

import (
	"net/http"
	"os"
	"time"

	"github.com/JVMoreiraD/SGA/initializers"
	"github.com/JVMoreiraD/SGA/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

func SignUp(c *gin.Context) {
	var body struct {
		Name     string
		Email    string
		Password string
		IsAdmin  bool
		Phone    string
		RoleID   uuid.UUID
	}

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

	user, err := models.NewBaseUser(body.Name, body.Email, body.Phone, body.Password, body.IsAdmin, body.RoleID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid user data",
		})
	}
	result := initializers.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create user",
		})
	}

	c.JSON(http.StatusOK, gin.H{})

}

func Login(c *gin.Context) {
	var body struct {
		Email    string
		Password string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to read body",
		})
		return
	}
	var user models.User
	initializers.DB.Preload("Role").First(&user, "email = ?", body.Email)
	if len(user.ID) == 0 {
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
	// secret := []byte("muitosecreto")
	// tokenString, err := token.SignedString(secret)

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
	// tokenString, err := token.SignedString([]byte("muitosecreto"))

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
func GetUsers(c *gin.Context) {
	user, _ := c.Get("user")
	if !user.(models.UserResponse).IsAdmin {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Unauthorized",
		})
		return
	}
	var users []models.User
	var usersResponse []models.UserResponse
	initializers.DB.Preload("Roles").Find(&users)
	for _, user := range users {
		var roleTemp = models.RolesResponse{ID: user.Roles.ID, RoleName: user.Roles.RoleName}
		var temp = models.UserResponse{ID: user.ID, Name: user.Name, Phone: user.Phone, Email: user.Email, IsAdmin: user.IsAdmin, Role: roleTemp}
		usersResponse = append(usersResponse, temp)
	}
	c.JSON(http.StatusOK, gin.H{
		"users": usersResponse,
	})
}
func Validate(c *gin.Context) {

	user, _ := c.Get("user")
	c.JSON(http.StatusOK, gin.H{
		"message": user,
	})
}
