import { ShoppingCartInfo } from '../../models/ShoppingCartInfo';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCart } from '../../services/ShoppingCartService';


export const getShoppingCartThunk = createAsyncThunk(
    'getCart', async () => {
        const resp = await getCart();
        return resp.data;
    })

export interface ShoppingCartState  {
    cart: ShoppingCartInfo | null,
    isLoading: boolean;
    error: boolean;
}

const initialState: ShoppingCartState = {
   cart: null,
   isLoading: false,
   error: false
}

const shoppingCartSlice = createSlice({
    name: "cartInfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getShoppingCartThunk.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(getShoppingCartThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cart = action.payload;
        });

        builder.addCase(getShoppingCartThunk.rejected, (state, action) => {
            state.error = true;
        });
    }
});

export default shoppingCartSlice.reducer;