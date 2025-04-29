import { PaypalPaymentRequest } from "../../models/PaypalPaymentRequest";
import { axiosInstance } from "../../services/AxiosInstance"

export const performPaypalPayment = (payload: PaypalPaymentRequest) => {
    
    const formData = new FormData();
    formData.append('amount', payload?.amount?.toString());
    formData.append('description', payload?.description);
    formData.append('cancelUrl', payload?.cancelUrl);
    formData.append('successUrl', payload?.successUrl);
    
    return axiosInstance.post("/paypal/pay", formData);
}

export const executePayment = (paymentId: string | null, payerId: string | null) => {
   return axiosInstance.get(`/paypal/success?paymentId=${paymentId}&payerId=${payerId}`);
}