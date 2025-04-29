import { useState, useEffect } from 'react';
import './OrderSuccess';
import { Link, useParams, useSearchParams, useLocation } from 'react-router-dom';
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

const OrderSuccess = () => {
    const [orderId, setOrderId] = useState<string>('');
    const user = useSelector((state: RootState) => state.userInfo.loggedUser);
    const shippingInfo = useSelector((state: RootState) => state.checkOutShippingInfo.shippingInfo);
    const cart = useSelector((state: RootState) => state.cartInfo.cart);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const actualCart = getActualCart(cart);
    const dispatch = useDispatch<AppDispatch>();
    // const { PayerID } = useParams();

    const [searchParams] = useSearchParams();
 
      const placeOrder = () => {
       const paymentId = searchParams.get('paymentId');
       const payerId = searchParams.get('PayerID');
       const order = new Order(user, shippingInfo, actualCart, paymentId);

       executePayment(paymentId, payerId).then((resp) => {
            if(resp) {
        placeOrderService(order)
            .then(resp => {
                setOrderId(resp?.data?.data?.id);

                clearCartService().then(() => {
                    dispatch(getShoppingCartThunk());
                    dispatch(removeCheckoutShippingInfo());
                });
            })
            .catch((error: AxiosError<any, any>) => setErrorMessage(error.response?.data?.message));
            }
        }).catch(error => setErrorMessage(error.response?.data?.message));;
      
    }
    
    useEffect(() => {
       placeOrder();
    },[]);    

    //const { id } = useParams();
 return (
     <>
         { orderId && <div className="d-flex align-items-center h-100"><div className="alert alert-success" role="alert">¡Esta orden se completo satisfactoriamente! El ID de la orden es <Link className="text-decoration-none" to={"/order/details/"+orderId}>{orderId}</Link> , puede dar click en el ID para ver los detalles de la orden. </div></div>}
         {errorMessage && <div className="d-flex flex-column justify-content-center h-100">
             <Alert textCenter={true} type='error' message={errorMessage} />
             <Link className="align-self-center text-decoration-none" to="/">Ver mas productos.</Link>
         </div>}
     </>
    
 )
}

export default OrderSuccess