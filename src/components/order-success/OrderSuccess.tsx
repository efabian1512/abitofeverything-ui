import { useState, useEffect } from 'react';
import './OrderSuccess';
import { Link, useSearchParams, } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { Order } from '../../models/Order';
import { placeOrderService } from '../../services/OrderService';
import { clearCartService, getActualCart } from '../../services/ShoppingCartService';
import { getShoppingCartThunk } from '../../state/shopping-cart/shoppingCartSlice';
import { executePayment } from '../paypal-payment/paypalservice';
import Alert from '../alerts/Alert';
import { AxiosError } from 'axios';
import { removeCheckoutShippingInfo } from '../../state/checkout-shipping-info/CheckoutShippingInfoSlice';
import Loading from '../Loading/Loading';
import { AlertTypes } from "../alerts/alert-types";


const OrderSuccess = () => {
    const [orderId, setOrderId] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const user = useSelector((state: RootState) => state.userInfo.loggedUser);
    const shippingInfo = useSelector((state: RootState) => state.checkOutShippingInfo.shippingInfo);
    const cart = useSelector((state: RootState) => state.cartInfo.cart);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const actualCart = getActualCart(cart);
    const dispatch = useDispatch<AppDispatch>();
    const [searchParams] = useSearchParams();
    const paymentId = searchParams.get('paymentId');
    const payerId = searchParams.get('PayerID');
    const paymentIntent = searchParams.get('payment_intent');
 
      const placeOrder = () => {
        
        const paymentIdLocal = paymentId ? paymentId : paymentIntent;

         const order = new Order(user, shippingInfo, actualCart, paymentIdLocal);

        placeOrderService(order)
            .then(resp => {
                console.log('order');
                setOrderId(resp?.data?.data?.id);

                clearCartService().then(() => {
                    dispatch(getShoppingCartThunk());
                    dispatch(removeCheckoutShippingInfo());
                      setIsLoading(false);
                });
            })
            .catch((error: AxiosError<any, any>) => {
                setIsLoading(false);
                setErrorMessage(error.response?.data?.message);
                
            });
      }
      
   
      const placePaypalOrder = () => {

       executePayment(paymentId, payerId).then((resp) => {
            if(resp) {
                placeOrder();
            }
        }).catch(error => {
            setErrorMessage(error.response?.data?.message);
            setIsLoading(false);
        });;
      
    }
    
    useEffect(() => {
        setIsLoading(true);
     if(paymentId && payerId) {
         placePaypalOrder();
     } else {
         if(paymentIntent) {
            placeOrder();
         }
     }
    },[payerId, paymentId]);

 return (
     <>
         { !errorMessage && orderId && <div className="d-flex align-items-center justify-content-center h-100">
             <div style={{height: '60%', maxWidth: '800px'}} className="alert alert-light border border-success border-5 d-flex align-items-center" role="alert">
                 <div className="d-flex gap-2">
                     <i className="bi bi-check-circle-fill text-success"></i>
                     <div>¡Esta orden se completo satisfactoriamente! El ID de la orden es <Link className="text-decoration-none text-success" to={"/order/details/"+orderId}>{orderId}</Link> , puede dar click en el ID para ver los detalles de la orden o <Link className="align-self-center text-decoration-none text-success" to="/">click aqui para ver mas productos.</Link></div></div> 
                     </div>
                     </div>}
         {errorMessage && <div className="d-flex flex-column justify-content-center h-100">
             <Alert textCenter={true} type={AlertTypes.ERROR} message={errorMessage} />
             <Link className="align-self-center text-decoration-none" to="/">Ver mas productos.</Link>
         </div>}
         {isLoading && <Loading/>}
     </>
 )
}

export default OrderSuccess