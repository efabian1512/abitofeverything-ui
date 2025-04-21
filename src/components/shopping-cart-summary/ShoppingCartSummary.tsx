import { RootState } from "../../state/store";

import { useSelector } from 'react-redux';
import { getActualCart } from "../../services/ShoppingCartService";

const ShoppingCartSummary = () => {
    const cart = useSelector((state: RootState) => state.cartInfo.cart);

    const actualCart = cart ? getActualCart(cart) : null;

    return <div className="card">
  <div className="card-body">
    <h5 className="card-title">Resumen de la Orden</h5>
    <p className="card-text">Tienes {actualCart?.totalItemsCount} {`articulo${ actualCart?.totalItemsCount === 1 ?'' : 's'} en el carrito.`}</p>
    <ul className="list-group list-group-flush">
       {actualCart?.items.map((item) => <li key={item.id} className="list-group-item">
           {item.quantity } x {item.title}
           <div className="float-end">
               {'RD$'+item.totalPrice+'.00'}
           </div>
       </li>)}
       <li className="list-group-item fw-bold">
           Total
           <div className="float-end">{'RD$'+actualCart?.totalPrice+'.00'}</div>
       </li>
    </ul>
  </div>
</div>
 }

 export default ShoppingCartSummary;