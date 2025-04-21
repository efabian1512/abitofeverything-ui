import { axiosInstance } from './AxiosInstance';
import { clearCartService } from './ShoppingCartService';

export const placeOrderService = async (order: any) => {
   const resp = await axiosInstance.post('/shop/orders/save', order);
    //clearCartService();
    return resp;
}