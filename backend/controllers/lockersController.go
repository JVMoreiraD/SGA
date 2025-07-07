package controllers

import (
	"net/http"

	"github.com/JVMoreiraD/SGA/initializers"
	"github.com/JVMoreiraD/SGA/models"
	"github.com/gin-gonic/gin"
)

func CreateLocker(c *gin.Context) {

	user, _ := c.Get("user")
	if !user.(models.UserResponse).IsAdmin {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Unauthorized",
		})
		return
	}
	var body struct {
		Identification string        `json:"identification" binding:"required"`
		Keys           []KeysRequest `json:"keys" binding:"required"`
		GroupID        *string       `json:"group_id"` // Optional
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	} else {
		var locker models.Locker
		// lockerWithThisKey := initializers.DB.First(&locker, " key_id = ? ", body.KeyID)
		// if lockerWithThisKey.RowsAffected == 1 {
		// 	c.JSON(http.StatusBadRequest, gin.H{
		// 		"error": "There is another locker with this key",
		// 	})
		// 	return
		// }
		lockerAlreadyExists := initializers.DB.First(&locker, "identification = ?", body.Identification)
		if lockerAlreadyExists.RowsAffected == 1 {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Locker Already exists in this Group or there",
			})
			return
		}
		locker = models.Locker{
			Identification: body.Identification,
		}

		result := initializers.DB.Create(&locker)
		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed to create locker Group",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{})
	}

}

func GetLockers(c *gin.Context) {
	user, _ := c.Get("user")
	if !user.(models.UserResponse).IsAdmin {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Unauthorized",
		})
		return
	}
	var locker []models.Locker
	initializers.DB.Find(&locker)

	c.JSON(http.StatusOK, gin.H{
		"locker": locker,
	})
}
