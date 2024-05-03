package controllers

import (
	"net/http"

	"github.com/JVMoreiraD/SGA/initializers"
	"github.com/JVMoreiraD/SGA/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func CreateLockerGroup(c *gin.Context) {

	user, _ := c.Get("user")
	if !user.(models.UserResponse).IsAdmin {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Unauthorized",
		})
		return
	}
	var body struct {
		Identification string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	} else {
		group := models.LockerGroups{
			Identification: body.Identification,
		}

		result := initializers.DB.Create(&group)

		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed to create locker Group",
			})
		}

		c.JSON(http.StatusOK, gin.H{})
	}

}

func GetLockerGroup(c *gin.Context) {
	user, _ := c.Get("user")
	if !user.(models.UserResponse).IsAdmin {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Unauthorized",
		})
		return
	}
	var groups []models.LockerGroups
	initializers.DB.Preload("Lockers").Preload("Lockers.Key").Preload("Lockers.Group").Find(&groups)
	c.JSON(http.StatusOK, gin.H{
		"groups": groups,
	})
}

func CreateLocker(c *gin.Context) {

	user, _ := c.Get("user")
	if !user.(models.UserResponse).IsAdmin {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Unauthorized",
		})
		return
	}
	var body struct {
		Identification string
		KeyID          uuid.UUID
		GroupID        uuid.UUID
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	} else {
		var locker models.Locker
		lockerWithThisKey := initializers.DB.First(&locker, " key_id = ? ", body.KeyID)
		if lockerWithThisKey.RowsAffected == 1 {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "There is another locker with this key",
			})
			return
		}
		lockerAlreadyExists := initializers.DB.First(&locker, "group_id = ? OR key_id = ? AND identification = ?", body.GroupID, body.KeyID, body.Identification)
		if lockerAlreadyExists.RowsAffected == 1 {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Locker Already exists in this Group or there",
			})
			return
		}
		locker = models.Locker{
			Identification: body.Identification,
			KeyID:          body.KeyID,
			GroupID:        body.GroupID,
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
