import { useDispatch } from "react-redux";
import { Product } from "../../models/Product";
import { addToCartService, removeFromCartService } from "../../services/ShoppingCartService";
import { getShoppingCartThunk } from "../../state/shopping-cart/shoppingCartSlice";
import { AppDispatch } from "../../state/store";

const ProductQuantity = ({ product }: {product: Product}) => {
   
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

 return <div className="row g-0">
        <div className="col-2">
            <button onClick={removeFromCart} className="btn btn-secondary w-100 ">-</button>
        </div>
        <div className="col text-center align-self-center">
            { product.quantity } en el carrito 
        </div>
        <div className="col-2">
            <button onClick={addToCart} className="btn btn-secondary w-100 ">+</button>
        </div>
        </div>
}

export default ProductQuantity;