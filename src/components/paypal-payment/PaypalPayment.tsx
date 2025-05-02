import { performPaypalPayment } from "./paypalservice";
import { useSelector } from 'react-redux';
import { RootState } from "../../state/store";
import { getActualCart } from "../../services/ShoppingCartService";
import { PaypalPaymentRequest } from "../../models/PaypalPaymentRequest";

const PaypalPayment = ({isShippingFormValid}: {isShippingFormValid: boolean}) => {

    const cart = useSelector((state: RootState) => state.cartInfo.cart);
    const actualCart = getActualCart(cart);

    const onPay = async () => {
        try {
            const payload: PaypalPaymentRequest = {
                amount: actualCart?.totalPrice ? actualCart?.totalPrice  : 0,
                description: "Compra de algunos productos de Abitofeverything shop.",
                cancelUrl: `${window.location.origin}/check-out`,
                successUrl: `${window.location.origin}/order-success`
            }
             const resp = await performPaypalPayment(payload);
             const url = resp?.data?.replace('Redirect to: ','').trim();
             window.location.href = url;
        } catch (error) {
            console.log(error);
        }
    }

    return (<div className="my-3">
         <button disabled={!isShippingFormValid} onClick={onPay} className="btn btn-primary w-100">Pagar con PayPal</button>
    </div>
        
    )
   
}

export default PaypalPayment;