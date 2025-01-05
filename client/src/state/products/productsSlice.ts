import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getProductListService } from '../../services/products';
import { Product } from "../../types/Product";

interface productsState {
    productList: Product[],
    filteredProductList: Product[],
    filter: {
        Name: string,
        Category: string,
        Size: string,
        Color: string
    }
}

const initialFilter = {
    Name: "",
    Category: "",
    Size: "",
    Color: ""
}

const initialState: productsState = {
    productList: [],
    filteredProductList: [],
    filter: initialFilter
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        updateFilter: (state: productsState, action) => {
            console.log(action.payload.value)
            state.filter = {...state.filter, [action.payload.key]: action.payload.value.toLowerCase()}

            let newList = state.productList;
            if (state.filter.Name) {
                newList = newList.filter((product: Product) => product.Name.toLowerCase().includes(state.filter.Name))
            }

            if (state.filter.Category) {
                newList = newList.filter((product: Product) => product.Category.toLowerCase().includes(state.filter.Category))
            }

            if (state.filter.Size) {
                newList = newList.filter((product: Product) => product.Size.toLowerCase().includes(state.filter.Size))
            }       
            
            if (state.filter.Color) {
                newList = newList.filter((product: Product) => product.Color.toLowerCase().includes(state.filter.Color))
            }
            state.filteredProductList = newList;

            console.log("Filter updated: ", state.filter)
        },
        resetFilter: (state: productsState) => {
            state.filter = initialFilter
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProductListAsync.fulfilled, (state: productsState, action) => {
            state.productList = action.payload
            state.filteredProductList = action.payload
        })
    }
})

export const getProductListAsync = createAsyncThunk(
    "products/getProductListAsync",
    async() => {
        return await getProductListService();
    }
)

export const { updateFilter, resetFilter } = productsSlice.actions; 
export default productsSlice.reducer;