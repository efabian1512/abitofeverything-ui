import { useSelector } from 'react-redux';
import { getActualCart } from '../../services/ShoppingCartService';
import { RootState } from '../../state/store';
import ProductQuantity from '../product-quantity/ProductQuantity';
import './ShoppingCart.css';

const ShoppingCart = () => {

const cart = useSelector((state: RootState) => state.cartInfo.cart);
 
 const actualCart = cart ? getActualCart(cart) : null;

 return <div>
     <h1>Carrito de Compras</h1>
     <p>Tienes {actualCart?.totalItemsCount} articulos en el carrito.</p>
     <table className="table">
         <thead>
             <tr>
                 <th>Product</th>
                 <th>Quantity</th>
                 <th>Price</th>
             </tr>
         </thead>
         <tbody>
            { actualCart?.items.map((item) => <tr key={item.id}>
                 <td>{item?.product?.title}</td>
                 <td><ProductQuantity product={item.product} /></td>
                 <td>{'RD$ '+item.totalPrice+'.00'}</td>
                 <td></td>
             </tr>) }
         </tbody>
         <tfoot>
             <tr>
                 <td></td>
                 <td></td>
                 <td className="fw-bold">{'RD$ '+actualCart?.totalPrice+'.00'}</td>
             </tr>
         </tfoot>
     </table>
 </div>
}

export default ShoppingCart;