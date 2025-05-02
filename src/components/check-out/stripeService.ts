
import { axiosInstance } from '../../services/AxiosInstance';

export const stripeCheckout = () => {

    const payload = {
    amount: 100,
    quantity: 1,
    currency: "USD",
    name:"wig, esc",
    successUrl: "http://localhost:9090/success",
    cancelUrl:"http://localhost:9090/success"
}
   return axiosInstance.post('/shop/card/checkout', payload );
}

export const createStripePaymentSession = (amount: number | undefined, currency: string) => {

    const actualAmount = amount ? amount : 0;

    const formData = new FormData();
    formData.append('amount', actualAmount.toString());
    formData.append('currency', currency);

    return axiosInstance.post('/shop/create/checkout-session', formData);
}