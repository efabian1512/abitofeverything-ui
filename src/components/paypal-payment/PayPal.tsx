import { FUNDING, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { getActualCart } from "../../services/ShoppingCartService";
import { RootState } from "../../state/store";


const PayPal = () => {

    const cart = useSelector((state: RootState) => state.cartInfo.cart);
    const actualCart = getActualCart(cart);
    
    const navigate = useNavigate();

    const createOrder = (data: any, actions: any) => {
        return actions?.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: actualCart?.totalPrice
                    }
                }
            ]
        })
    }

    const onApprove = async (data: any, actions: any) => {
        
        const resp = await data;

        console.log(await data);
        navigate(`/order-success?paymentId=${resp?.paymentID}&PayerID=${resp?.payerID}`)
    }

    const onError = async (err: any) => {
        console.log(await err);
    }

    return <PayPalButtons 
            style={{layout: 'vertical', color: 'gold'}} 
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
            fundingSource={FUNDING.PAYPAL}
            />
}

export default PayPal;