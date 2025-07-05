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

type RoleRequest struct {
	RoleName    string `json:"roleName" example:"ADMIN"`                                  // Name of the role
	Description string `json:"description" example:"Administrator role with full access"` // Role description
}

// CreateRole godoc
// @Summary Create a new role
// @Description Create a new role (admin only)
// @Tags roles
// @Security BearerAuth
// @Accept json
// @Produce json
//
//	@Param request body RoleRequest true "Role creation data"
//
// @Success 201
// @Failure 400
// @Failure 403
// @Failure 500
// @Router /roles [post]
func CreateRole(c *gin.Context) {
	user, _ := c.Get("user")
	if !user.(models.UserResponse).IsAdmin {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	var body RoleRequest

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	} else {
		role := models.NewRoles(body.RoleName, body.Description)
		result := initializers.DB.Create(&role)
		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed to create key",
			})
		}
		c.JSON(http.StatusOK, gin.H{})
	}
}

// GetRoles godoc
// @Summary Get all roles
// @Description Retrieve list of all roles (admin only)
// @Tags roles
// @Security BearerAuth
// @Produce json
// @Success 200
// @Success 200
// @Failure 403
// @Failure 500
// @Router /roles [get]
func GetRoles(c *gin.Context) {
	user, _ := c.Get("user")
	if !user.(models.UserResponse).IsAdmin {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Unauthorized",
		})
		return
	}
	var roles []models.Roles
	initializers.DB.Find(&roles)

	c.JSON(http.StatusOK, gin.H{
		"roles": roles,
	})
}

// UpdateRole godoc
// @Summary Update a role
// @Description Update role information (admin only)
// @Tags roles
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param id path string true "Role ID (UUID)"
// @Param request body RoleRequest false "Role update data"
// @Success 200
// @Failure 400
// @Failure 403
// @Failure 404
// @Failure 500
// @Router /roles/{id} [patch]
func UpdateRole(c *gin.Context) {
	user, _ := c.Get("user")
	if !user.(models.UserResponse).IsAdmin {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	var body struct {
		RoleName    string
		Description string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	} else {
		role := models.NewRoles(body.RoleName, body.Description)
		result := initializers.DB.Create(&role)
		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed to create key",
			})
		}
		c.JSON(http.StatusOK, gin.H{})
	}
}

// DeleteRole godoc
// @Summary Delete a role
// @Description Delete a role by ID (admin only)
// @Tags roles
// @Security BearerAuth
// @Produce json
// @Param id path string true "Role ID (UUID)"
// @Success 204 "No content - successful deletion"
// @Failure 400
// @Failure 403
// @Failure 404
// @Failure 500
// @Router /roles/{id} [delete]
func DeleteRole(c *gin.Context) {
	user, _ := c.Get("user")
	if !user.(models.UserResponse).IsAdmin {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	roleID := c.Param("id")
	if _, err := uuid.Parse(roleID); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid role ID format",
		})
		return
	}

	var role models.Roles
	if err := initializers.DB.First(&role, "id = ?", roleID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{
				"error": "Role not found",
			})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error":   "Database error",
				"details": err.Error(),
			})
		}
		return
	}

	// Check if role is assigned to any users
	var count int64
	if err := initializers.DB.Model(&models.User{}).Where("role_id = ?", roleID).Count(&count).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to check role usage",
			"details": err.Error(),
		})
		return
	}

	if count > 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Cannot delete role",
			"message": "Role is assigned to one or more users",
		})
		return
	}

	if err := initializers.DB.Delete(&role).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to delete role",
			"details": err.Error(),
		})
		return
	}

	c.Status(http.StatusNoContent)
}
