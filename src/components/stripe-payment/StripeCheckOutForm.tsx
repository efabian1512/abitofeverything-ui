import { useState } from "react";
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './StripeCheckoutForm.css';
import * as React from "react";
import Alert from "../alerts/Alert";
import { AlertTypes } from "../alerts/alert-types";

const StripeCheckoutForm = () => {

    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>('');

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if(!stripe || !elements)
            return
        
            setIsProcessing(true);

            const {error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/order-success`
                },
                // redirect: 'if_required'
            });

            if(error) {
                const errorsToShow  = ['processing_error'];
                const errorCode = error.code ? error.code : '';
                if(errorsToShow.includes(errorCode)) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage('');
                }
            }
               
            // } else if(paymentIntent && paymentIntent.status === "succeeded") {
            //     setMessage("Estado del pago: exitoso!!");
            // } else {
            //     setMessage("Estado inesperado.")
            // }

            setIsProcessing(false);
    }

    return (
        <form className="stripe-shop-form mt-3" onSubmit={handleSubmit} id="stripe-form">
            <PaymentElement/>
            <button className="btn btn-primary my-2" id="stripe-form-submit" disabled={isProcessing} type="submit">
               <span id="stripe-form-button-text">{isProcessing ? 'Procesando... ' : 'Realizar pago'}</span> 
            </button>
          { errorMessage &&  <Alert textCenter={true} type={AlertTypes.ERROR} message={errorMessage} /> }
        </form>
    )
}

export default StripeCheckoutForm;