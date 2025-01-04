import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getProductListService } from '../../services/products';
import { Product } from "../../types/Product";

interface productsState {
    productList: Product[]
}

const initialState: productsState = {
    productList: []
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getProductListAsync.fulfilled, (state: productsState, action) => {
            state.productList = action.payload
        })
    }
})

export const getProductListAsync = createAsyncThunk(
    "products/getProductListAsync",
    async() => {
        return await getProductListService();
    }
)

export default productsSlice.reducer;