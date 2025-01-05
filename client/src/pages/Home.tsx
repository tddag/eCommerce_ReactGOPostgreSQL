import { useEffect } from "react"
import NavBar from "../components/NavBar"
import ProductListUser from "../components/ProductListUser"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../state/store"
import { getProductListAsync } from "../state/products/productsSlice"
import Filter from "../components/Filter"


const Home = () => {

    const { filteredProductList } = useSelector((state: RootState) => state.products)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getProductListAsync());
    }, [])

    return (
        <div className="flex flex-col">
            <NavBar/>
            <div className="h-full flex w-full">
                <div className="h-full w-1/3 md:w-1/6 flex flex-col p-4 gap-4">
                    <Filter/>
                </div>

                <div className="flex pt-10 pl-5">
                    <ProductListUser productList={filteredProductList}/>
                </div>
            </div>
            
        </div>
    )
}

export default Home