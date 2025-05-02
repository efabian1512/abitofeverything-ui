
import './Checkout.css';
import ShoppingCartSummary from '../shopping-cart-summary/ShoppingCartSummary';
import PaypalPayment from '../paypal-payment/PaypalPayment';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import ShippingInfoSection from '../shipping-info-section/ShippingInfoSection';
import {Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { createStripePaymentSession } from './stripeService';
import { getActualCart } from '../../services/ShoppingCartService';
import { useState } from 'react';
import { useEffect } from 'react';
import StripeCheckoutForm from '../stripe-payment/StripeCheckOutForm';
import { PaymentMethods } from '../../enums/payment-methods';

const Checkout = () => {
    const shippingInfo = useSelector((state: RootState) => state.checkOutShippingInfo.shippingInfo);
    const stripePromise = loadStripe('pk_test_51RJMWkFZNjTsbNpBYxWHGKnGxVqCOEk4hdyXJpVZOmVPymGuGmKk1jLUiW91lK9VEoJMPymztWw73NhbYm46fORC00s38jIOYg');
    const [clientSecret, setClientSecret] = useState<string>();
    const cart = useSelector((state: RootState) => state.cartInfo.cart);
    const actualCart = getActualCart(cart);

    const [paymentMethod, setPaymentMethod] = useState<string>('');
  

     useEffect(()=> {
        const amount = actualCart?.totalPrice ? actualCart?.totalPrice * 100 : 0;
        createStripePaymentSession(amount, 'usd').then(resp => setClientSecret(resp?.data));
    // return fetch('/create-checkout-session', {method: 'POST'})
    //   .then((response) => response.json())
    //   .then((json) => json.checkoutSessionClientSecret)
  
     }, []);
  
    const onPaymentMethodChange = (event: React.FormEvent<HTMLInputElement>) => {
        const target = event?.target as HTMLInputElement;

        setPaymentMethod(target?.value);
    }

    return <div className="row pb-5">
         <h2 className="mb-5">Informacion de envio</h2>
        <div className="col-md-6 col-sm-6 col-lg-6">
          <ShippingInfoSection />
        </div>
        <div className="col-md-6 col-sm-6 col-lg-6">

            <ShoppingCartSummary/>
            <div>
                <p className="fw-bold mb-3 mt-3">Metodo de Pago</p>
                <div className="form-check">
                    <input disabled={!shippingInfo ? true : false} onChange={onPaymentMethodChange} className="form-check-input" type="radio" name="paymentMethod" id="paypalMethod" value="paypal"/>
                    <label className="form-check-label" htmlFor="paypalMethod">
                        PayPal
                    </label>
                   { paymentMethod === PaymentMethods.PAYPAL && <PaypalPayment isShippingFormValid={shippingInfo ? true : false} /> }
                </div>
                    <div className="form-check">
                        <input disabled={!shippingInfo ? true : false}  onChange={onPaymentMethodChange}  className="form-check-input" type="radio" name="paymentMethod" id="cardMethod" value="card"/>
                        <label className="form-check-label" htmlFor="cardMethod">
                        Tarjeta de Credito o Debito
                        </label>
                         { paymentMethod === PaymentMethods.CARD && stripePromise && clientSecret && <Elements stripe={stripePromise} options={{clientSecret}}>
                            <StripeCheckoutForm />
                        </Elements>}
                    </div>
            </div>
            
        </div>           
    </div>
}

export default Checkout;