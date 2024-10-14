package initializers

import "github.com/JVMoreiraD/SGA/models"

func SyncDatabase() {
	DB.AutoMigrate(&models.Roles{}, &models.User{}, &models.Key{}, &models.LockerGroups{}, &models.Locker{})
}
