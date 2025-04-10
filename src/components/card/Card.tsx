import { Link } from 'react-router-dom';

interface CardProps {
    imageUrl: string;
    title: string;
    width?: string;
    linkUri?: string;
    price: number | undefined;
    linkProperties?: LinkProperties;
}

interface CardInfo {
    cardInfo: CardProps;
}

interface LinkProperties {
    desttination: string;
}

const Card = ({ cardInfo }: CardInfo) => {
    const showCard = () => {
        return Object.values(cardInfo).some((value) =>  Boolean(value));
    }

    return showCard() ? <div className="card" style={{width: cardInfo.width ? cardInfo.width : '100%'}}>
  <img style={{objectFit: cardInfo.width ? 'none' : 'cover' }}  src={cardInfo?.imageUrl} className="card-img-top"/>
  <div className="card-body">
    <h5 className="card-title">{cardInfo?.title}</h5>
    <p className="card-text">{ cardInfo.price ? 'RD$ ' + cardInfo?.price + '.00' : ''}</p>
    {cardInfo?.linkProperties && <Link to={cardInfo?.linkProperties?.desttination} className="btn btn-primary"></Link>}
  </div>
</div> : <></>
}
export default Card;