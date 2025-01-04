import { createSlice } from "@reduxjs/toolkit"
import { Product } from "../../types/Product"

interface cartState {
    products: Product[]
}

const initialState = {
    products: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state: cartState, action) => {
            const index = state.products.findIndex((prod: Product) => prod.ID == action.payload.ID)
            if (index !== -1) {
                state.products[index].Qty += action.payload.Qty
            } else {
                state.products.push(action.payload)
            }
        },
        updateCartItem: (state: cartState, action) => {
            state.products = state.products.map((product: Product) => {
                if (product.ID == action.payload.ID) {
                    product.Qty = action.payload.Qty
                }
                return product
            })
        },
        removeProductFromCart: (state, action) => {
            state.products = state.products.filter((prod: Product) => prod.ID !== action.payload)
        }
    }
})

export const { addToCart, removeProductFromCart, updateCartItem} = cartSlice.actions;
export default cartSlice.reducer