import { performPaypalPayment } from "./paypalservice";
import { useSelector } from 'react-redux';
import { RootState } from "../../state/store";
import { getActualCart } from "../../services/ShoppingCartService";
import { PaypalPaymentRequest } from "../../models/PaypalPaymentRequest";
import { useState } from "react";
import Loading from "../Loading/Loading";

const PaypalPayment = ({isShippingFormValid, isShippingEditionModeActive}: {isShippingFormValid: boolean, isShippingEditionModeActive: boolean}) => {

    const cart = useSelector((state: RootState) => state.cartInfo.cart);
    const actualCart = getActualCart(cart);
    const [isLoading, setIsLoading] = useState<boolean>();

    const onPay = async () => {
        try {
            setIsLoading(true);
            const payload: PaypalPaymentRequest = {
                amount: actualCart?.totalPrice ? actualCart?.totalPrice  : 0,
                description: "Compra de algunos productos de Abitofeverything shop.",
                cancelUrl: `${window.location.origin}/check-out`,
                successUrl: `${window.location.origin}/order-success`
            }
             const resp = await performPaypalPayment(payload);
             const url = resp?.data?.replace('Redirect to: ','').trim();
             setIsLoading(false);
             window.location.href = url;
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    return (<>
        <div className="my-3">
        
         <button disabled={!isShippingFormValid || isShippingEditionModeActive} onClick={onPay} className="btn btn-primary w-100">Pagar con PayPal</button>
        
        </div>
           { isLoading &&  <Loading/> }
    </>
        
    )
   
}

export default PaypalPayment;