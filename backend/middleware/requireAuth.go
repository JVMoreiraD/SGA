package middleware

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/JVMoreiraD/SGA/initializers"
	"github.com/JVMoreiraD/SGA/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func RequireAuth(c *gin.Context) {

	var responseUser models.UserResponse
	var responseRoles models.RolesResponse
	tokenString := c.GetHeader("Authorization")
	// if _ != nil {

	// 	c.AbortWithStatus(http.StatusUnauthorized)
	// 	return
	// }
	tokenString = strings.TrimPrefix(tokenString, "Bearer ")
	fmt.Println(tokenString)

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {

			c.AbortWithStatus(http.StatusUnauthorized)

			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("SECRET")), nil
	})
	if err != nil {

		log.Fatal(err)
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok {

		if float64(time.Now().Unix()) > claims["exp"].(float64) {

			c.AbortWithStatus(http.StatusUnauthorized)
		}
		var user models.User

		initializers.DB.Preload("Roles").First(&user, "id = ?", claims["sub"].(string))
		if len(user.ID) == 0 {

			c.AbortWithStatus(http.StatusUnauthorized)

		}
		responseRoles.ID, responseRoles.RoleName = user.RoleID, user.Roles.RoleName
		responseUser.ID, responseUser.Name, responseUser.Email, responseUser.IsAdmin, responseUser.Role = user.ID, user.Name, user.Email, user.IsAdmin, responseRoles
		c.Set("user", responseUser)
		c.Next()
	} else {
		c.AbortWithStatus(http.StatusUnauthorized)
	}

}
