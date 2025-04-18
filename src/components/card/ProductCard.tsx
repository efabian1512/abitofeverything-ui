import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../models/Product';
import { addToCartService, getActualCart, removeFromCartService } from '../../services/ShoppingCartService';
import { AppDispatch, RootState } from '../../state/store';
import styles from './Card.module.css';
import { getShoppingCartThunk } from '../../state/shopping-cart/shoppingCartSlice';
import ProductQuantity from '../product-quantity/ProductQuantity';
import { ShoppingCartInfo } from '../../models/ShoppingCartInfo';
import { getActualProductInCart } from '../admin/products-form/ProductService';

interface CardProps {
    product: Product
    width?: string;
    linkUri?: string;
}

interface CardInfo {
    cardInfo: CardProps;
    showActions: boolean;
}

// interface LinkProperties {
//     desttination: string;
//     tag: string;
// }

const ProductCard = ({ cardInfo, showActions = false }: CardInfo) => {
 
   const dispatch = useDispatch<AppDispatch>();

   const cart = useSelector((state: RootState) => state.cartInfo.cart);
   const actualCart = cart ? getActualCart(cart) : null;
   const product: Product = getActualProductInCart(actualCart, cardInfo.product);

const addToCart = () => {
  addToCartService({...cardInfo.product, productImage: null}).then(() => {
    dispatch(getShoppingCartThunk());
  }).catch((error) => error);
}

    return cardInfo?.product?.title ? <div className="card">
  {cardInfo.product.productImage && <img style={{objectFit: cardInfo.width ? 'none' : 'cover'}}  src={cardInfo?.product.productImage } className="card-img-top" alt={cardInfo?.product.title}/>}
  <div className="card-body">
    <h5 className="card-title">{cardInfo.product?.title}</h5>
    <p className="card-text">{ cardInfo.product.price ? 'RD$ ' + cardInfo.product?.price + '.00' : ''}</p>
  </div>
  {showActions && <div className={`card-footer ${styles['padding-0']}`}>
      
      { !product.quantity ?  <button onClick={() => addToCart()} className="btn btn-secondary w-100">Agregar al carrito</button> 
      : <ProductQuantity product={product} />
      }

  </div>}
</div> 
 : <></>
}
export default ProductCard;