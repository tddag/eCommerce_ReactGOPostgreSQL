import { Product } from "../types/Product";

export const getProductListService = (): Promise<Product[]> => {
    return new Promise(async (resolve, reject) => {
        let url = `${import.meta.env.VITE_SERVER_URL}/api/products`

        try {
            let res = await fetch(url)
            
            if (res.ok) {
                const productList = await res.json();
                console.log("Product List is: ", productList)
                resolve(productList.products)
            } else {
                throw new Error("Failed to fetch products")
            }
    
        } catch (e) {
            console.log("Failed to get products")
            reject([])
        }
    })
}