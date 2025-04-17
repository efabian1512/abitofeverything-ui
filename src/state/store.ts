import { configureStore } from "@reduxjs/toolkit";
import shoppingCartReducer from './shopping-cart/shoppingCartSlice';
export const store = configureStore({
    reducer: {
        cartInfo: shoppingCartReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;