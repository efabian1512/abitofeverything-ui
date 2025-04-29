import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShippingInfo } from '../../models/ShippingInfo';


export interface CheckoutShippingInfoState {
   shippingInfo : ShippingInfo | null
}

const initialState: CheckoutShippingInfoState = {
    shippingInfo: null
};


const checkOutShippingInfoSlice = createSlice({
    name:'shippingInfo',
    initialState,
    reducers: {
        setCheckoutShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
            state.shippingInfo = action.payload
        },
        removeCheckoutShippingInfo:(state) => {
            state.shippingInfo = initialState.shippingInfo
        }
    }
});

export const { setCheckoutShippingInfo, removeCheckoutShippingInfo } = checkOutShippingInfoSlice.actions;
export default checkOutShippingInfoSlice.reducer;