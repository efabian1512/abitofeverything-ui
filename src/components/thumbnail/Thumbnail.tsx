import './thumbnail.css';

const Thumbnail = ({imageType, productImage, inline = false}: {imageType: string, productImage: any, inline: boolean}) => {
 
    return  <div className={`thumbnail ${inline ? 'd-inline-block' : ''}`} style={{backgroundImage: 'url('+ 'data:' + imageType+';base64,' + productImage+')'}} ></div>
}

export default Thumbnail;