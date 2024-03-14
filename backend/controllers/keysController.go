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
		Identifier string
		Quantity   int
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	} else {
		key := models.Key{
			Identifier: body.Identifier,
			Quantity:   body.Quantity,
		}

		result := initializers.DB.Create(&key)

		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed to create key",
			})
		}

		c.JSON(http.StatusOK, gin.H{})
	}

}
