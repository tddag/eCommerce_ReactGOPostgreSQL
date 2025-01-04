package controllers

import (
	"eCommerce-app/initializers"
	"eCommerce-app/models"
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/stripe/stripe-go/v81"
	"github.com/stripe/stripe-go/v81/checkout/session"
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

func GetProduct(c *gin.Context) {
	id := c.Param("id")

	var product models.Product
	initializers.DB.First(&product, id)

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

	c.JSON(200, gin.H{
		"product": productClient,
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

func CheckoutProducts(c *gin.Context) {
	stripe.Key = os.Getenv("STRIPE_SECRET_KEY")

	var body []models.ProductClient

	c.Bind(&body)

	var lineItems []*stripe.CheckoutSessionLineItemParams
	for _, product := range body {
		item := &stripe.CheckoutSessionLineItemParams{
			PriceData: &stripe.CheckoutSessionLineItemPriceDataParams{
				Currency: stripe.String("cad"),
				ProductData: &stripe.CheckoutSessionLineItemPriceDataProductDataParams{
					Name: stripe.String(product.Name),
					Images: []*string{
						stripe.String(product.Images[0]),
					},
				},
				UnitAmount:  stripe.Int64(int64(product.Price * 100)),
				TaxBehavior: stripe.String("inclusive"),
			},
			Quantity: stripe.Int64(product.Qty),
		}
		lineItems = append(lineItems, item)
	}

	params := &stripe.CheckoutSessionParams{
		SuccessURL:    stripe.String(os.Getenv("CLIENT_URL") + "/?success=true"),
		CancelURL:     stripe.String(os.Getenv("CLIENT_URL") + "/?canceled=true"),
		LineItems:     lineItems,
		Mode:          stripe.String(string(stripe.CheckoutSessionModePayment)),
		CustomerEmail: stripe.String("customer@example.com"),
	}

	fmt.Printf("Get here 1")
	result, err := session.New(params)
	fmt.Printf("Get here 2")
	if err != nil {
		fmt.Printf("Failed to checkout products. Error: %v", err)
	}

	fmt.Printf("Get here 3")

	c.JSON(200, gin.H{
		"url": result.URL,
	})
}
