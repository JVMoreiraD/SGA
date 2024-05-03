package initializers

import "github.com/JVMoreiraD/SGA/models"

func SyncDatabase() {
	DB.AutoMigrate(&models.User{}, &models.Roles{}, &models.Key{}, &models.LockerGroups{}, &models.Locker{})
}
