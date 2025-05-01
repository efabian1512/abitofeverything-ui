import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../models/Product';
import { addToCartService, getActualCart } from '../../services/ShoppingCartService';
import { AppDispatch, RootState } from '../../state/store';
import styles from './ProductCard.module.css';
import { getShoppingCartThunk } from '../../state/shopping-cart/shoppingCartSlice';
import ProductQuantity from '../product-quantity/ProductQuantity';
import { ShoppingCartItem } from '../../models/ShoppingCartItem';
import { formatPrice } from '../../Utilities';
import { useEffect, useState } from 'react';
import useScreenSize from '../../CustomHooks/useScreenSize';

interface CardProps {
    product: Product
    width?: string;
    linkUri?: string;
}

interface CardInfo {
    cardInfo: CardProps;
    showActions: boolean;
}

const ProductCard = ({ cardInfo, showActions = false }: CardInfo) => {
 
   const dispatch = useDispatch<AppDispatch>();

   const cart = useSelector((state: RootState) => state.cartInfo.cart);
   const actualCart = cart ? getActualCart(cart) : null;

  const item: ShoppingCartItem | undefined = actualCart?.items.find(item => item.productId === cardInfo.product.id);
  
  const { screenWidth } = useScreenSize();
   
const addToCart = () => {
  addToCartService({...cardInfo.product, productImage: null}).then(() => {
    dispatch(getShoppingCartThunk());
  }).catch((error) => error);
}

    return cardInfo?.product?.title ? <div className={`card p-3 bg-light mb-5 ${styles['product-card']}`}>
  {cardInfo.product.productImage && screenWidth < 768 && <img style={{objectFit: cardInfo.width ? 'none' : 'cover'}}  src={cardInfo?.product.productImage } className={`card-img-top ${styles['product-image']}`} alt={cardInfo?.product.title}/>}
  {cardInfo.product.productImage && screenWidth >= 768 && <div className={styles['product-image-div']} style={{backgroundImage: 'url('+cardInfo?.product?.productImage+')'}} ></div>}
  
  
  <div className="card-body">
    <h5 className="card-title">{cardInfo?.product?.title}</h5>
    <p className="card-text">{ formatPrice(cardInfo?.product?.price)}</p>
  </div>
  {showActions && <div className={`card-footer border-0 ${styles['padding-0']}`}>
      
      { !item?.quantity ?  <button onClick={() => addToCart()} className="btn btn-secondary w-100">Agregar al carrito</button> 
      : <ProductQuantity item={item} product={cardInfo.product} />
      }

  </div>}
</div> 
 : <></>
}
export default ProductCard;