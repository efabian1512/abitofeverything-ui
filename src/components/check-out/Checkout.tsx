
import './Checkout.css';
import ShoppingCartSummary from '../shopping-cart-summary/ShoppingCartSummary';
import ShippingForm from '../shipping-form/ShippingForm';
import PaypalPayment from '../paypal-payment/PaypalPayment';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import ShippingInfoSection from '../shipping-info-section/ShippingInfoSection';

const Checkout = () => {
    const user = useSelector((state: RootState) => state.userInfo.loggedUser);
    const shippingInfo = useSelector((state: RootState) => state.checkOutShippingInfo.shippingInfo);

    console.log(user);

    return <div className="row">
         <h2 className="mb-5">Informacion de envio</h2>
        <div className="col-md-6 col-sm-6 col-lg-6">
          <ShippingInfoSection />
        </div>
        <div className="col-md-6 col-sm-6 col-lg-6">
            <ShoppingCartSummary/>
            <PaypalPayment isShippingFormValid={shippingInfo ? true : false} />
        </div>           
    </div>
}

export default Checkout;