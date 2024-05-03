package controllers

import (
	"net/http"

	"github.com/JVMoreiraD/SGA/initializers"
	"github.com/JVMoreiraD/SGA/models"
	"github.com/gin-gonic/gin"
)

func KeysCreate(c *gin.Context) {

	user, _ := c.Get("user")
	if !user.(models.UserResponse).IsAdmin {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Unauthorized",
		})
		return
	}
	var body struct {
		Identification string
		Quantity       int
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	} else {
		key := models.NewKey(body.Identification, body.Quantity)

		result := initializers.DB.Create(&key)

		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed to create key",
			})
		}

		c.JSON(http.StatusOK, gin.H{})
	}

}

func GetKeys(c *gin.Context) {
	user, _ := c.Get("user")
	if !user.(models.UserResponse).IsAdmin {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Unauthorized",
		})
		return
	}
	var keys []models.Key
	initializers.DB.Preload("users").Find(&keys)

	c.JSON(http.StatusOK, gin.H{
		"keys": keys,
	})
}

// func GiveKeyToUser(c *gin.Context) {
// 	user, _ := c.Get("user")
// 	if !user.(models.UserResponse).IsAdmin {
// 		c.JSON(http.StatusForbidden, gin.H{
// 			"error": "Unauthorized",
// 		})
// 		return
// 	}
// 	var body struct {
// 		UserID uuid.UUID
// 		KeyID  uuid.UUID
// 	}
// 	if c.Bind(&body) != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{
// 			"error": "Failed to read body",
// 		})
// 		return
// 	}
// 	var key models.Key
// 	initializers.DB.First(&key, "ID = ?", body.KeyID)

// 	key.UserID = body.UserID

// 	initializers.DB.Save(&key)
// }
