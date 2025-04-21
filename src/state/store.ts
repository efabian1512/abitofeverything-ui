import { configureStore } from "@reduxjs/toolkit";
import shoppingCartReducer from './shopping-cart/shoppingCartSlice';
import userReducer from './user/userSlice';
export const store = configureStore({
    reducer: {
        cartInfo: shoppingCartReducer,
        userInfo: userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;