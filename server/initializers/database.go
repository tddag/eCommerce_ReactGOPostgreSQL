package initializers

import (
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDB() {
	var err error
	db_url := os.Getenv("DB_URL")
	DB, err = gorm.Open(postgres.Open(db_url), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect to DB")
	}
}
