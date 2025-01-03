package models

import "gorm.io/gorm"

type Image struct {
	gorm.Model
	Product_id uint
	Image_url  string
}
