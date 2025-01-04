import { InputNumber } from "antd"
import { Product } from "../types/Product"
import { useState } from "react"

interface ProductItemUserProps {
    product: Product
}

const ProductItemUser = ({
    product
}: ProductItemUserProps) => {

    const [qty, setQty] = useState(1);
    return (
        <div className="w-60 h-60 rounded-lg p-4 flex flex-col relative border-box border-b-2">
            <div className="cursor-pointer h-5">
                {product.Name}
            </div>
            {product.Images && (
                <div className="cursor-pointer">
                    <img src={product.Images[0]} className="w-20 h-20"/>
                </div>
            ) }            

            {product.Category && (
                <div className="capitalize">
                    {product.Category}
                </div>
            )}

            <InputNumber prefix="qty: " min={1} defaultValue={1} value={qty} onChange={(val) => setQty(!val ? 1 : val)}/>
            

            <div className="flex p-4 w-full box-border justify-between absolute bottom-0 pb-5 right-0 items-center">
                <div>
                    {product.Price}
                </div>
                <div className="bg-purple-200 p-2 rounded-lg">
                    <button>Add</button>
                </div>
            </div>
        </div>
    )
}

export default ProductItemUser