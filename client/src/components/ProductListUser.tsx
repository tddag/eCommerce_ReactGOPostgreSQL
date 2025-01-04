import { Product } from "../types/Product"
import ProductItemUser from "./ProductItemUser"

interface ProductListUserProps {
    productList: Product[]
}

const ProductListUser = ({
    productList
}: ProductListUserProps) => {
    return (
        <div className="h-screen overflow-auto">
            {productList.length > 0 ? (
                <div className="flex flex-col md:flex-row md:flex-wrap h-full gap-8 py-5">
                    {productList.map((product, id) => (
                        <ProductItemUser key={id} product={product}/>
                    ))}
                </div>
            ): "No products"}
            
        </div>
    )
}

export default ProductListUser