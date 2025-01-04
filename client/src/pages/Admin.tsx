import { useEffect, useState } from "react"
import AddProduct from "../components/AddProduct"
import ProductListAdmin from "../components/ProductListAdmin"
import { Product } from "../types/Product"


const Admin = () => {
    const [productList, setProductList] = useState<Product[]>([])

    const getProductList = async () => {
        let url = `${import.meta.env.VITE_SERVER_URL}/api/products`

        try {
            let res = await fetch(url)

            const productsRes = await res.json()
            if (productsRes) {
                setProductList(productsRes.products)
            } else {
                console.log(productsRes)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getProductList()
    }, [])    

    return (
        <div className="flex flex-col">
            <AddProduct getProductList={getProductList}/>
            <ProductListAdmin productList={productList} getProductList={getProductList}/>
        </div>
        
    )
}

export default Admin