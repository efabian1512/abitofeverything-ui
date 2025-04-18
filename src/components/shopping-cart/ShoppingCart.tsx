import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getActualCart } from '../../services/ShoppingCartService';
import { RootState } from '../../state/store';
import ProductQuantity from '../product-quantity/ProductQuantity';
import './ShoppingCart.css';
import { useState } from 'react';
import { getProducts } from '../admin/products-form/ProductService';

const ShoppingCart = () => {

const cart = useSelector((state: RootState) => state.cartInfo.cart);
 
 const actualCart = cart ? getActualCart(cart) : null;
 const [products, setProducts] = useState([]);

 useEffect(() => {
    getProducts().then(resp => setProducts(resp.data));
 },[]);

 return <div>
     <h1>Carrito de Compras</h1>
     <p>Tienes {actualCart?.totalItemsCount} articulos en el carrito.</p>
     <table className="table">
         <thead>
             <tr>
                 <th>Articulo</th>
                 <th>Cantidad</th>
                 <th>Precio</th>
             </tr>
         </thead>
         <tbody>
            { actualCart?.items.map((item) => <tr key={item.id}>
                 <td>{item?.title}</td>
                 <td><ProductQuantity item={item} product={products.find((product: any) => product.id === item.productId)!} /></td>
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