import { useDispatch } from "react-redux";
import { addToCartService, removeFromCartService } from "../../services/ShoppingCartService";
import { getShoppingCartThunk } from "../../state/shopping-cart/shoppingCartSlice";
import { AppDispatch } from "../../state/store";
import { ShoppingCartItem } from '../../models/ShoppingCartItem';
import { Product } from "../../models/Product";
import './ProductQuantity.css';

const ProductQuantity = ({ item, product }: {item: ShoppingCartItem, product: Product }) => {
 const dispatch = useDispatch<AppDispatch>();

const addToCart = () => {
  addToCartService({...product, productImage: null}).then(() => {
    dispatch(getShoppingCartThunk());
  }).catch((error) => error);
}

const removeFromCart = () => {
  removeFromCartService({...product, productImage: null}).then(() => {
    dispatch(getShoppingCartThunk());
  }).catch((error) => error);
}

 return <div className="product-quantity">
        <div>
            <button onClick={removeFromCart} className="btn btn-secondary w-100 ">-</button>
        </div>
        <div className="text-center align-self-center">
            { item.quantity } en el carrito 
        </div>
        <div>
            <button onClick={addToCart} className="btn btn-secondary w-100 ">+</button>
        </div>
        </div>
}

export default ProductQuantity;