import { useDispatch, useSelector } from "react-redux"
import NavBar from "../components/NavBar"
import { RootState } from "../state/store"
import { Product } from "../types/Product"
import { removeProductFromCart } from "../state/cart/cartSlice"


const Cart = () => {

    const cart: Product[] = useSelector((state: RootState) => state.cart.products)
    const dispatch = useDispatch();

    const handleDeleteProduct = (product: Product) => {
        dispatch(removeProductFromCart(product.ID))
    }

    const getTotal = () => {
        let sum = 0;
        for (let prod of cart) {
            sum += (prod.Qty ? prod.Qty * prod.Price : 0)
        }
        return sum
    }  
    
    const handleMakePayment = async () => {
        try {
            let url = `${import.meta.env.VITE_SERVER_URL}/api/products/checkout`

            let res = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cart),
            })

            if (res.ok) {
                res = await res.json();
                window.location.href = res.url
            } else {
                throw new Error("Network response is not ok")
            }
        } catch (e) {
            console.log(e);

        }
    }    

    return (
        <div className="flex flex-col">
            <div>
                <NavBar/>
            </div>

            <div className="flex">
                <div className="w-1/2 h-screen border-r-2">
                    {cart.length > 0 && (
                        <div className="p-6 w-full h-full box-border flex flex-col gap-4 overflow-auto">
                            {cart.map((product: Product, id) => (
                                <div key={id} className="p-4 flex flex-col">
                                    <div className="flex">
                                        <div className="flex flex-col">
                                            <div>
                                                {product.Name}
                                            </div>

                                            <div>
                                                {product.Price}
                                            </div>

                                            <div>
                                                Qty: {product.Qty}
                                            </div>

                                            <div>
                                                Total: ${product.Qty ? product.Qty * product.Price: 0} 
                                            </div>
                                        </div>
                                        

                                        <div>
                                            <div>
                                                <img src={product.Images && product.Images[0]} alt="product" className="h-20 w-20 block"/>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button className="p-2 bg-red-200 rounded-lg" onClick={() => handleDeleteProduct(product)}>Delete</button>

                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-1/2 h-screen">
                    <div className="flex flex-col p-4">
                        <button className="p-2 rounded-lg bg-orange-300 w-full md:w-1/2 mb-5" onClick={handleMakePayment}>Make Payment</button>
                        <div>Order Summary</div>
                        <div>Items: ${getTotal()}</div>
                        <div>Tax: ${(getTotal()*0.13).toFixed(2).toLocaleString()}</div>
                        <div className="text-red-600 font-bold">Order Total: ${(getTotal() * 1.13).toFixed(2).toLocaleString()}</div>                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart