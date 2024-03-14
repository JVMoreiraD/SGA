package initializers

import "github.com/JVMoreiraD/SGA/models"

func SyncDatabase() {
	DB.AutoMigrate(&models.User{}, &models.Key{})
}
