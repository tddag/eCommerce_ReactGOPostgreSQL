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
    - Stripe: Stripe Payment API
      - `go get github.com/stripe/stripe-go/v81`
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
    - url: POST `http://localhost:3000/api/products`
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
- Setup Firebase Storage

  - Login to [Google Console](https://console.firebase.google.com/)
  - Click Create a Project, enter name `eCommerce-ReactGOPostgreSQL`
  - Click Continue, Click Create Project
  - Click Project Settings, scroll down, SDK setup and configuration will be found here
  - Install Firebase Client:
    - `npm install firebase`
  - Initialize Firebase

  ```
      import { initializeApp } from "firebase/app";
      const firebaseConfig = {
          apiKey: "....",
          authDomain: "....firebaseapp.com",
          projectId: "...",
          storageBucket: ".....appspot.com",
          messagingSenderId: "....",
          appId: "1:...:web:...."
      };
      const app = initializeApp(firebaseConfig);
  ```

  - Might need to update Storage Rules to make it public for this project
    - Click Storage
    - Click Rules
    ```
        match /{allPaths=**} {
            allow read, write: if request.time < timestamp.date(2025, 7, 22);
        }
    ```
- Setup Stripe API:
  + Login to [Stripe](https://dashboard.stripe.com/test/dashboard)
  + Create an Account
  + Click Developers, click API keys, copy Sercret Key
  + Test Card: 4242 4242 4242 4242

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
        <tr>
            <td>STRIPE_SECRET_KEY</td>
            <td>sk_test_51PX.....</td>
            <td>Stripe Secret Key</td>
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
            <td>http://localhost:3000</td>
            <td>Server URL</td>
        </tr>     
        <tr>
            <td>VITE_FIREBASE_APIKEY</td>
            <td>......</td>
            <td>Firebase API Key</td>
        </tr>
        <tr>
            <td>VITE_FIREBASE_AUTH_DOMAIN</td>
            <td>mern-ecommerce-6169d.firebaseapp.com</td>
            <td>Firebase Auth Domain</td>
        </tr>        
        <tr>
            <td>VITE_FIREBASE_PROJECT_ID</td>
            <td>mern-ecommerce-6169d</td>
            <td>Firebase Project IDtd>
        </tr>   
        <tr>
            <td>VITE_FIREBASE_STORAGE_BUCKET</td>
            <td>mern-ecommerce-6169d.appspot.com</td>
            <td>Firebase Storage Bucket</td>
        </tr>       
        <tr>
            <td>VITE_FIREBASE_STORAGE_MESSAGING_SENDER_ID</td>
            <td>22870......</td>
            <td>Firebase Storage Messing Sender ID</td>
        </tr>
        <tr>
            <td>VITE_FIREBASE_APP_ID</td>
            <td>1:22870408.......:web:ac07b13c......</td>
            <td>Firebase App ID</td>
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
- connect api to create a new product [x]
- enable server CORS [x]
- Setup Filebase Storage to store images [x]
- fetch all product and display [x]
- update product modal [X]
- connect api to update product [X]
- setup React Router [x]
- Create Home page [x]
- Create ProductListUser component [x]
- Create ProductItemUser component [x]
- Implement Redux to store productList [x]
- fetch and display all product [x]
- Create NavBar component [x]
- create cart redux state [x]
- click Add will update cart item [x]
- create Cart page [x]
- cart functionalities, add to cart, remove from cart [x]
- stripe payment integration [x]
- search functionality
- filter functionality
- Create Filter Component
- Create Product details page
- fetch and display product details