import { useEffect } from 'react';
import { Product, ShoppingCartInfo } from '../../models/Product';
import { addToCartService, removeFromCartService } from '../../services/ShoppingCartService';
import styles from './Card.module.css';

interface CardProps {
    product: Product
    width?: string;
    linkUri?: string;
}

interface CardInfo {
    cardInfo: CardProps;
    showActions: boolean;
    shoppingCart?: ShoppingCartInfo;
    retrieveCartInfo?: () => void;
}

// interface LinkProperties {
//     desttination: string;
//     tag: string;
// }

const ProductCard = ({ cardInfo, showActions = false, shoppingCart, retrieveCartInfo }: CardInfo) => {
 
const addToCart = () => {
  addToCartService({...cardInfo.product, productImage: null}).then(() => {
    if(retrieveCartInfo) {
      retrieveCartInfo();
    }
  }).catch((error) => error);
}

const removeFromCart = () => {
  removeFromCartService({...cardInfo.product, productImage: null}).then(() => {
    if(retrieveCartInfo) {
      retrieveCartInfo();
    }
  }).catch((error) => error);
}

const getQuantity = () => {
  if (!shoppingCart) return 0;

  const item = shoppingCart.items?.find(item => item.product.id === cardInfo.product.id);
  return item ? item.quantity : 0;
}

    return cardInfo?.product?.title ? <div className="card">
  {cardInfo.product.productImage && <img style={{objectFit: cardInfo.width ? 'none' : 'cover'}}  src={cardInfo?.product.productImage } className="card-img-top" alt={cardInfo?.product.title}/>}
  <div className="card-body">
    <h5 className="card-title">{cardInfo.product?.title}</h5>
    <p className="card-text">{ cardInfo.product.price ? 'RD$ ' + cardInfo.product?.price + '.00' : ''}</p>
  </div>
  {showActions && <div className={`card-footer ${styles['padding-0']}`}>
      
      { getQuantity() === 0 &&  <button onClick={() => addToCart()} className="btn btn-secondary w-100">Agregar al carrito</button> }
      {getQuantity() > 0 && <div className="row g-0">
        <div className="col-2">
            <button onClick={removeFromCart} className="btn btn-secondary w-100 ">-</button>
        </div>
        <div className="col text-center">
            { getQuantity() } en el carrito 
        </div>
        <div className="col-2">
            <button onClick={addToCart} className="btn btn-secondary w-100 ">+</button>
        </div>
        </div>}
  </div>}
</div> 
 : <></>
}
export default ProductCard;