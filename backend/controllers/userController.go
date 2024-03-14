package controllers

import (
	"net/http"
	"os"
	"time"

	"github.com/JVMoreiraD/SGA/initializers"
	"github.com/JVMoreiraD/SGA/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func SignUp(c *gin.Context) {
	var body struct {
		Name     string
		Email    string
		Password string
		IsAdmin  bool
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
	}
	if body.IsAdmin {
		user := models.User{
			Name:     body.Name,
			Email:    body.Email,
			Password: string(hash),
			IsAdmin:  true,
		}
		result := initializers.DB.Create(&user)

		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed to create user",
			})
		}

		c.JSON(http.StatusOK, gin.H{})
	} else {
		user := models.User{
			Name:     body.Name,
			Email:    body.Email,
			Password: string(hash),
		}
		result := initializers.DB.Create(&user)

		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed to create user",
			})
		}

		c.JSON(http.StatusOK, gin.H{})
	}

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
	initializers.DB.First(&user, "email = ?", body.Email)
	if len(user.ID) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password aaaa",
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
		"sub": user.ID,
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
		// "token": tokenString,
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
	initializers.DB.Find(&users)
	for _, v := range users {
		var temp = models.UserResponse{Id: v.ID, Name: v.Name, Email: v.Email, IsAdmin: v.IsAdmin}
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
