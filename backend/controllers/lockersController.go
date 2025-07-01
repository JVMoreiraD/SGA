package controllers

import (
	"net/http"

	"github.com/JVMoreiraD/SGA/initializers"
	"github.com/JVMoreiraD/SGA/models"
	"github.com/gin-gonic/gin"
)

// func CreateLockerGroup(c *gin.Context) {

// 	user, _ := c.Get("user")
// 	if !user.(models.UserResponse).IsAdmin {
// 		c.JSON(http.StatusForbidden, gin.H{
// 			"error": "Unauthorized",
// 		})
// 		return
// 	}
// 	var body struct {
// 		Identification string
// 		Description    string
// 		RoleID         uuid.UUID
// 	}

// 	if c.Bind(&body) != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{
// 			"error": "Failed to read body",
// 		})
// 		return
// 	}
// 	group := models.NewLockerGroup(body.Identification, body.RoleID, body.Description)

// 	result := initializers.DB.Create(&group)

// 	if result.Error != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{
// 			"error": "Failed to create locker Group",
// 		})
// 	}

// 	c.JSON(http.StatusOK, gin.H{})

// }

// func GetLockerGroup(c *gin.Context) {
// 	user, _ := c.Get("user")
// 	if !user.(models.UserResponse).IsAdmin {
// 		c.JSON(http.StatusForbidden, gin.H{
// 			"error": "Unauthorized",
// 		})
// 		return
// 	}
// 	var groups []models.LockerGroups
// 	var groupsResponse []models.LockerGroupResponse
// 	initializers.DB.Preload("Lockers").Preload("Lockers.Key").Preload("Lockers.Group").Preload("Roles").Find(&groups)

// 	for _, group := range groups {
// 		var lockersRes []models.LockerResponse

// 		for _, lockers := range group.Lockers {
// 			var tempKey = models.KeyResponse{ID: lockers.KeyID, Identification: lockers.Key.Identification}
// 			var lockersTemp = models.LockerResponse{ID: lockers.ID, Identification: lockers.Identification, KeyID: lockers.KeyID, Key: tempKey}
// 			lockersRes = append(lockersRes, lockersTemp)
// 		}
// 		var roleTemp = models.RolesResponse{ID: group.RoleID, RoleName: group.Roles.RoleName}
// 		var temp = models.LockerGroupResponse{ID: group.ID, Identification: group.Identification, Lockers: lockersRes, RoleID: roleTemp.ID, Role: roleTemp}
// 		groupsResponse = append(groupsResponse, temp)
// 	}
// 	c.JSON(http.StatusOK, gin.H{
// 		"groups": groupsResponse,
// 	})
// }

// func CreateLocker(c *gin.Context) {

// 	user, _ := c.Get("user")
// 	if !user.(models.UserResponse).IsAdmin {
// 		c.JSON(http.StatusForbidden, gin.H{
// 			"error": "Unauthorized",
// 		})
// 		return
// 	}
// 	var body struct {
// 		Identification string       `json:"identification" binding:"required"`
// 		// Keys           []KeyRequest `json:"keys" binding:"required"`
// 		GroupID        *string      `json:"group_id"` // Optional
// 	}

// 	if c.Bind(&body) != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{
// 			"error": "Failed to read body",
// 		})
// 		return
// 	} else {
// 		var locker models.Locker
// 		lockerWithThisKey := initializers.DB.First(&locker, " key_id = ? ", body.KeyID)
// 		if lockerWithThisKey.RowsAffected == 1 {
// 			c.JSON(http.StatusBadRequest, gin.H{
// 				"error": "There is another locker with this key",
// 			})
// 			return
// 		}
// 		lockerAlreadyExists := initializers.DB.First(&locker, "group_id = ? OR key_id = ? AND identification = ?", body.GroupID, body.KeyID, body.Identification)
// 		if lockerAlreadyExists.RowsAffected == 1 {
// 			c.JSON(http.StatusBadRequest, gin.H{
// 				"error": "Locker Already exists in this Group or there",
// 			})
// 			return
// 		}
// 		locker = models.Locker{
// 			Identification: body.Identification,
// 		}

// 		result := initializers.DB.Create(&locker)
// 		if result.Error != nil {
// 			c.JSON(http.StatusBadRequest, gin.H{
// 				"error": "Failed to create locker Group",
// 			})
// 			return
// 		}

// 		c.JSON(http.StatusOK, gin.H{})
// 	}

// }

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
