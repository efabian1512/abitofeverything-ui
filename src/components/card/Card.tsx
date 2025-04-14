import styles from './Card.module.css';

interface CardProps {
    title: string;
    width?: string;
    linkUri?: string;
    price: number | undefined;
    linkProperties?: LinkProperties;
    productImage?: any;
}

interface CardInfo {
    cardInfo: CardProps;
    showActions: boolean;
}

interface LinkProperties {
    desttination: string;
    tag: string;
}

const ProductCard = ({ cardInfo, showActions = false }: CardInfo) => {
    const showCard = () => {
        return Object.values(cardInfo).some((value) => typeof(value) === 'object' ? Boolean(value?.lenght) : Boolean(value));
    }

    return showCard() ? <div className="card">
  {cardInfo.productImage && <img style={{objectFit: cardInfo.width ? 'none' : 'cover'}}  src={cardInfo?.productImage } className="card-img-top" alt={cardInfo?.title}/>}
  <div className="card-body">
    <h5 className="card-title">{cardInfo?.title}</h5>
    <p className="card-text">{ cardInfo.price ? 'RD$ ' + cardInfo?.price + '.00' : ''}</p>
  </div>
  <div className={`card-footer ${styles['padding-0']}`}>
      { showActions &&  <>
        {cardInfo?.linkProperties && <button className="btn btn-primary w-100">{cardInfo?.linkProperties?.tag}</button>}
    </> }
  </div>
</div> : <></>
}
export default ProductCard;