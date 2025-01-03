package controllers

import (
	"eCommerce-app/initializers"
	"eCommerce-app/models"
	"fmt"

	"github.com/gin-gonic/gin"
)

func GetProducts(c *gin.Context) {

	var products []models.Product

	initializers.DB.Find(&products)

	var productList []models.ProductClient

	for _, product := range products {
		var productClient = models.ProductClient{
			ID:       product.ID,
			Name:     product.Name,
			Price:    product.Price,
			Category: product.Category,
			Color:    product.Color,
			Size:     product.Size,
		}
		var images []models.Image
		result := initializers.DB.Where(&models.Image{Product_id: product.ID}).Find(&images)
		if result.Error != nil {
			fmt.Printf("Failed to get images %v\n", result.Error)
		}
		for _, image := range images {
			productClient.Images = append(productClient.Images, image.Image_url)
		}

		productList = append(productList, productClient)
	}

	c.JSON(200, gin.H{
		"products": productList,
	})
}

func CreateProduct(c *gin.Context) {
	var body models.ProductClient

	err := c.Bind(&body)
	if err != nil {
		fmt.Printf("%v", err)
		c.Status(400)
		return
	}

	fmt.Printf("Name is %v, images are: %v", body.Name, body.Images)

	// Create a Product
	product := models.Product{
		Name:     body.Name,
		Price:    body.Price,
		Category: body.Category,
		Color:    body.Color,
		Size:     body.Size,
	}
	result := initializers.DB.Create(&product)
	fmt.Printf("Inserted ID is: %v", product.ID)

	if result.Error != nil {
		fmt.Printf("Failed to create a Product %v", result.Error)
		c.Status(400)
		return
	}

	newProduct := models.ProductClient{
		ID:       product.ID,
		Name:     product.Name,
		Price:    product.Price,
		Category: product.Category,
		Color:    product.Color,
		Size:     product.Size,
	}
	// Loop through Images
	for _, image := range body.Images {
		var newImage = models.Image{
			Product_id: product.ID,
			Image_url:  image,
		}
		newProduct.Images = append(newProduct.Images, image)
		// Create a new image record
		result := initializers.DB.Create(&newImage)
		if result.Error != nil {
			fmt.Printf("Failed to create a image record %v", result.Error)
			c.Status(400)
			return
		}
	}

	c.JSON(201, gin.H{
		"product": newProduct,
	})
}

func UpdateProduct(c *gin.Context) {
	id := c.Param("id")

	var body models.ProductClient
	c.Bind(&body)

	// find existing Product
	var existingProduct models.Product
	initializers.DB.First(&existingProduct, id)

	// Update existing Product
	initializers.DB.Model(&existingProduct).Updates(models.Product{
		Name:     body.Name,
		Price:    body.Price,
		Category: body.Category,
		Color:    body.Color,
		Size:     body.Size,
	})

	c.JSON(200, gin.H{
		"product": existingProduct,
	})
}

func DeleteProduct(c *gin.Context) {
	id := c.Param("id")

	initializers.DB.Delete(&models.Product{}, id)

	c.Status(200)
}
