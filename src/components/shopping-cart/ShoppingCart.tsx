import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCartService, getActualCart } from '../../services/ShoppingCartService';
import { AppDispatch, RootState } from '../../state/store';
import ProductQuantity from '../product-quantity/ProductQuantity';
import './ShoppingCart.css';
import { useState } from 'react';
import { getProducts } from '../admin/products-form/ProductService';
import { getShoppingCartThunk } from '../../state/shopping-cart/shoppingCartSlice';
import { Link } from 'react-router-dom';

const ShoppingCart = () => {

const cart = useSelector((state: RootState) => state.cartInfo.cart);
 
 const actualCart = cart ? getActualCart(cart) : null;
 const [products, setProducts] = useState([]);

 const dispatch = useDispatch<AppDispatch>();

 useEffect(() => {
    getProducts().then(resp => setProducts(resp.data));
 },[]);

 const clearCart = () => {
     try {
          clearCartService().then(() =>  dispatch(getShoppingCartThunk()));
     } catch (error) {
         console.log(error);
     }
   
 }

 return <>
     <h1 className="text-start">Carrito de Compras</h1>
     <div className="row col-lg-10 col-md-10 col-sm-10">
           <p className="ps-0">Tienes {actualCart?.totalItemsCount} {`articulo${ actualCart?.totalItemsCount === 1 ?'' : 's'} en el carrito.`}
           {actualCart?.items.length && <button onClick={clearCart} className="btn btn-light btn-sm">Vaciar carrito</button>}
           </p>
         <table className="table"> 
             <thead>
                 <tr>
                     <th></th>
                     <th>Articulo</th>
                     <th className="text-center" style={{width: "230px"}}>Cantidad</th>
                     <th className="text-end" style={{width: "200px"}}>Precio</th>
                 </tr>
             </thead>
             <tbody>
                { actualCart?.items.map((item) => <tr key={item.id}>
                    <td>
                        <div className="thumbnail" style={{backgroundImage: 'url('+ 'data:' + item.imageType+';base64,' + item.productImage+')'}} ></div>
                        </td>
                     <td className="align-middle">
                             {item?.title}
                         </td>
                     <td className="align-middle"><ProductQuantity item={item} product={products.find((product: any) => product.id === item.productId)!} /></td>
                     <td className="text-end align-middle">{'RD$ '+item.totalPrice+'.00'}</td>
                 </tr>) }
             </tbody>
             <tfoot>
                 <tr>
                     <td className="fw-bold">Total</td>
                     <td></td>
                     <td></td>
                     <td className="fw-bold text-end">{'RD$ '+actualCart?.totalPrice +'.00'}</td>
                 </tr>
             </tfoot>
         </table>
     </div>
     {actualCart?.items.length && <Link to="/check-out" className="btn btn-primary">Check Out</Link>}
      
 </>
}

export default ShoppingCart;