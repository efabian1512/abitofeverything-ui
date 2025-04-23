import { getSpanishFormattedDateByNumericDate } from '../Utilities';
import { axiosInstance } from './AxiosInstance';

export const placeOrderService = async (order: any) => {
   const resp = await axiosInstance.post('/shop/orders/save', order);
    return resp;
}

export const getAllOrders = () => {
    return axiosInstance.get("/shop/orders");
}

export const getOrderById = (id: string) => {
    return axiosInstance.get("/shop/orders/"+id);
}

export const getActualOrders = (orders: any) => {
    return orders?.map((order: any) => ({...order, datePlaced: getSpanishFormattedDateByNumericDate(order.datePlaced)}));
}