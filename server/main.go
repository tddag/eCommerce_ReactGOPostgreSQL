package main

import (
	"eCommerce-app/controllers"
	"eCommerce-app/initializers"
	"fmt"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	r := gin.Default()

	r.GET("/api/products", controllers.GetProducts)
	r.GET("/api/products/:id", controllers.GetProduct)
	r.POST("/api/products", controllers.CreateProduct)
	r.PATCH("/api/products/:id", controllers.UpdateProduct)
	r.DELETE("/api/products/:id", controllers.DeleteProduct)

	port := "3000"
	fmt.Printf("Starting server at port %v\n", port)

	r.Run("localhost:" + port)
}
