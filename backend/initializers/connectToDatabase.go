package initializers

import (
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDatabase() {
	var err error

	dsn := os.Getenv("DATABASE")
	DB, err = gorm.Open(postgres.New(postgres.Config{
		DSN:                  dsn,
		PreferSimpleProtocol: true,
	}), &gorm.Config{})

	// db, err := gorm.Open(postgres.New(postgres.Config{
	// 	DSN:                  dsn,
	// 	PreferSimpleProtocol: true,
	// }), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to db")
	}
}
