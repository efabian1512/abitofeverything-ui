
import './Checkout.css';
import ShoppingCartSummary from '../shopping-cart-summary/ShoppingCartSummary';
import ShippingForm from '../shipping-form/ShippingForm';

const Checkout = () => {
    return <div className="row">
         <h2 className="mb-5">Informacion de envio</h2>
        <div className="col-md-6 col-sm-6 col-lg-6">
           
            <ShippingForm />
        </div>
        <div className="col-md-6 col-sm-6 col-lg-6">
                     <ShoppingCartSummary/>
        </div>           
    </div>
}

export default Checkout;