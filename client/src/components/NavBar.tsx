import { useSelector } from "react-redux"
import { RootState } from "../state/store"


const NavBar = () => {

    const cart  = useSelector((state: RootState) => state.cart.products)

    return (
        <div className="flex justify-between p-2 pr-4 items-center">
            <span>TD Ecommerce</span>

            <div>

            </div>

            <button className="relative bg-green-300 p-2 rounded-lg">
                <div className="absolute -bottom-2 -left-3 bg-blue-200 h-5 w-5 rounded-lg flex items-center justify-center">
                    <span className="text-red-500 text-xs text-center font-bold">{cart.length}</span>
                </div>
                Cart
            </button>
        </div>
    )
}

export default NavBar