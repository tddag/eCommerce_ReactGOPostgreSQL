# Setup
- Set up GO
    - Download and Install [GO](https://go.dev/doc/install)
    - navigate to server `cd server`
    - initialize project `go mod init eCommerce-app`
    - install dependencies:
        - GIN: web framework
            - `go get -u github.com/gin-gonic/gin`
        - GORM: ORM library
            - `go get -u gorm.io/gorm`
        - GoDotEnv: loads env variables from .env file
            - `go get github.com/joho/godotenv`
        - GORM PostgreSQL Driver
            - `go get gorm.io/driver/postgres`
        - GIN Cors: middleware to enable CORS support
            - `go get github.com/gin-contrib/cors`
    - run the server `go run main.go`
- Setup PostgreSQL
    - Download [PostgreSQL](https://www.postgresql.org/download/)
    - Open pgAdmin4 application
    - Create a new database
        - Right click Databases, select Create, select Database
        - Enter Name `e_commerce_react_golang_postgresql_db`
        - Click Save
    - Open Query Tool
        - Right click newly created DB
        - Select Query Tool
    - Create Product table
    ```
        CREATE TABLE Products (
            Id SERIAL PRIMARY KEY,
            Name VARCHAR(100) NOT NULL,
            Price NUMERIC(6, 2) NOT NULL,
            Category VARCHAR(100) NOT NULL,
            Color VARCHAR(100),
            Size VARCHAR(100),
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP,
            deleted_at TIMESTAMP
        );
    ```
    - Create Image table
    ```
        CREATE TABLE Images (
            Id SERIAL PRIMARY KEY,
            Product_id INTEGER REFERENCES Products(Id),
            Image_url VARCHAR(500),
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP,
            deleted_at TIMESTAMP            
        );
    ```
    - Insert a Product
        - url: POST `localhost:3000/api/products`
        ```
            {
                "Name":     "Brixton Oath Olive Surplus Trucker Hat",
                "Price":    34.95,
                "Category": "Hats",
                "Color":    "Dark Green",
                "Size":     "One Size",
                "Images":  ["google.com", "youtube.com"]
            }
        ```
- Setup Server environment variables (./server/.env)
  - <table>
        <tr>
            <th>Variable</th>
            <th>Value</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>DB_URL</td>
            <td>"host=localhost user=postgres password=.... dbname=e_commerce_react_golang_postgresql_db port=5432 sslmode=disable"</td>
            <td>PostgreSQL URL</td>
        </tr>                 
    </table>
- Setup Client environment variables (./client/.env)
  - <table>
        <tr>
            <th>Variable</th>
            <th>Value</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>VITE_SERVER_URL</td>
            <td>localhost:3000</td>
            <td>Server URL</td>
        </tr>                 
    </table>    

# Functionalities
- Fetch and display products
- Fetch and display product details
- Add a new product
- Update existing product
- Add product to cart, persisted state
- Check out product (Stripe integration)
- Search and filter product
- File Storage



# Todo
- setup Go server [x]
- create productsController [x]
- create Product model [x]
- setup PostgreSQL DB [X]
- setup .env file [x]
- connect PostgreSQL DB [x]
- Products api
    - Create a new product [x]
    - Get all products [x]
    - Get product details [x]
    - Update a product [x]
    - Checkout a product
    - Delete a product [x]
- setup React app [x]
- setup Tailwindcss [x]
- Create Admin Page [x]
- Create AddProduct component [x]
- Form to create a new product [x]
- setup Client env variables [x]
- take input in form [x]
- connect api to create a new product
- enable server CORS
- Setup Filebase Storage to store images
- fetch all product and display
- update product modal
- connect api to update product
- setup React Router
- Create Home page
- fetch and display all product
- Create Product details page
- fetch and display product details
- create checkout page
- create cart redux state 
- cart functionalities, add to cart, remove from cart
- stripe payment integration
- search functionality
- filter functionality