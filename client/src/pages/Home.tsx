import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import ProductListUser from "../components/ProductListUser"
import { Product } from "../types/Product"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../state/store"
import { getProductListAsync } from "../state/products/productsSlice"


const Home = () => {

    // const [productList, setProductList] = useState<Product[]>([
    //     {
    //         "ID": 13,
    //         "Name": "New Product",
    //         "Price": 90,
    //         "Category": "Shirt",
    //         "Color": "Black",
    //         "Size": "M",
    //         "Images": [
    //             "https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-6169d.appspot.com/o/24a1ec8b-8976-4c81-9905-08bae13d63b9?alt=media",
    //             "https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-6169d.appspot.com/o/d585ca18-1284-4c53-ad6f-49a6c3e056ea?alt=media"
    //         ]
    //     },
    //     {
    //         "ID": 14,
    //         "Name": "Men's Reverse Weave Pullover Hoodie",
    //         "Price": 79.99,
    //         "Category": "Hoodie",
    //         "Color": "Black",
    //         "Size": "M",
    //         "Images": [
    //             "https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-6169d.appspot.com/o/07e3be70-91d5-406f-8f22-b1ecad8ccbe2?alt=media",
    //             "https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-6169d.appspot.com/o/1ce9cae6-7e2d-4b78-b715-78345cb98d33?alt=media"
    //         ]
    //     }
    // ])

    const { productList } = useSelector((state: RootState) => state.products)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getProductListAsync());
    }, [])

    return (
        <div className="flex flex-col">
            <NavBar/>
            <div>
                <div>

                </div>

                <div>
                    <ProductListUser productList={productList}/>
                </div>
            </div>
            
        </div>
    )
}

export default Home