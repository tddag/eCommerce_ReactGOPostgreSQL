
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products/productsSlice";
import cartReducer from "./cart/cartSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;