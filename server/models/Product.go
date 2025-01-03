package models

import (
	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	Name     string
	Price    float64
	Category string
	Color    string
	Size     string
}

type ProductClient struct {
	ID       uint
	Name     string
	Price    float64
	Category string
	Color    string
	Size     string
	Images   []string
}
