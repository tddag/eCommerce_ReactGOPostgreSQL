import { useEffect, useState } from "react";
import { Product } from "../types/Product";


const ProductListAdmin = () => {

    const [productList, setProductList] = useState<Product[]>([])

    useEffect(() => {
        getProductList()
    }, [])
    
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

    return (
        <div className="w-11/12 md:w-3/4 m-auto mt-20 p-4">
            {productList.length > 0 ? (
                <div className="flex flex-col gap-6 ">
                    {productList.map((product, id) => (
                        <div key={id} className="flex items-center gap-4"> 
                            {product.Name + " | " + "$" + product.Price + " | " + product.Size}

                            <button className="bg-blue-200 p-2 rounded-lg">
                                Update
                            </button>

                            <div className="flex gap-4 ml-10 overflow-auto">
                                {product.Images?.map((image, imgIdx) => (
                                    <img key={imgIdx} src={image} className="h-20 inline-block"/>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : "No products"}
        </div>
    )
}

export default ProductListAdmin;