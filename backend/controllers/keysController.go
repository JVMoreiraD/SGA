package controllers

import (
	"errors"
	"net/http"

	"github.com/JVMoreiraD/SGA/initializers"
	"github.com/JVMoreiraD/SGA/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type KeysRequest struct {
	Identification string `json:"Identification" example:"2680"`
	Quantity       int    `json:"Quantity" example:"10"`
}

// KeysCreate godoc
// @Summary Create new keys
// @Description Create new key entries (admin only)
// @Tags keys
// @Security BearerAuth
// @Accept json
// @Produce json
//
//	@Param request body KeysRequest true "Key creation data"
//
// @Success 200
// @Failure 400
// @Failure 400
// @Failure 400
// @Router /keys [post]
func KeysCreate(c *gin.Context) {

	user, _ := c.Get("user")
	if !user.(models.UserResponse).IsAdmin {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Unauthorized",
		})
		return
	}
	var body KeysRequest

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

// GetKeys godoc
// @Summary Get all keys
// @Description Retrieve list of all keys (admin only)
// @Tags keys
// @Security BearerAuth
// @Produce json
// @Success 200
// @Failure 403
// @Router /keys [get]
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

type updateData struct {
	Identification *string `json:"identification,omitempty"`
	Quantity       *int    `json:"quantity,omitempty"`
}

// UpdateKey godoc
// @Summary Update a key
// @Description Update key information (admin only)
// @Tags keys
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param id path string true "Key ID (UUID)"
//
//	@Param request body  KeysRequest false "Key update data"
//
// @Success 200
// @Failure 400
// @Failure 403
// @Failure 404
// @Router /keys/{id} [patch]
func UpdateKey(c *gin.Context) {
	// Verify admin access
	user, _ := c.Get("user")
	if !user.(models.UserResponse).IsAdmin {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	// Get key ID from path
	keyID := c.Param("id")
	if _, err := uuid.Parse(keyID); err != nil {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	// Parse request body
	var updateData updateData

	if err := c.Bind(&updateData); err != nil {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	// Find and update key
	var key models.Key
	if err := initializers.DB.First(&key, "id = ?", keyID).Error; err != nil {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	// Apply updates
	if updateData.Identification != nil {
		key.Identification = *updateData.Identification
	}
	if updateData.Quantity != nil {
		key.Quantity = *updateData.Quantity
	}

	if err := initializers.DB.Save(&key).Error; err != nil {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	// Return updated key
	c.JSON(http.StatusOK, gin.H{
		"message": "updated",
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

//		initializers.DB.Save(&key)
//	}
//
// DeleteKey godoc
// @Summary Delete a key
// @Description Delete a key by ID (admin only)
// @Tags keys
// @Security BearerAuth
// @Produce json
// @Param id path string true "Key ID (UUID)"
// @Success 204 "No content - successful deletion"
// @Failure 400
// @Failure 403
// @Failure 404
// @Failure 500
// @Router /keys/{id} [delete]
func DeleteKey(c *gin.Context) {
	// Verify admin access
	user, _ := c.Get("user")
	if !user.(models.UserResponse).IsAdmin {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Failed to create token",
		})
		return
	}

	// Validate key ID
	keyID := c.Param("id")
	if _, err := uuid.Parse(keyID); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create token",
		})
		return
	}

	// Check if key exists
	var key models.Key
	if err := initializers.DB.First(&key, "id = ?", keyID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{
				"error": "Failed to create token",
			})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to create token",
			})
		}
		return
	}

	// Delete the key
	if err := initializers.DB.Delete(&key).Error; err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{
				"error": "Failed to create token",
			})
		return
	}

	// Return success (no content)
	c.Status(http.StatusNoContent)
}
