import './MyOrders.css';
import { useEffect, useState } from 'react';
import { getOrdersByUserId } from '../../services/OrderService';
import { getLoggedUser } from '../../services/UserService';
import { getSpanishFormattedDateByNumericDate, formatPrice } from '../../Utilities';
import { sortByDateDesc } from '../../services/UtilsSetrvice';
import { Link } from 'react-router-dom';

const MyOrders = () => {
const [orders, setOrders] = useState([]);

    useEffect(() => {
      const user =  getLoggedUser();
      const userId = user ? user.id : '';
        getOrdersByUserId(userId).then(resp => setOrders(resp?.data?.sort(sortByDateDesc)));
    },[]);

    return <ul className="list-group list-group-flush">
        {orders?.map((order: any) => <li className="list-group-item pb-5 border-info pt-2" key={order.id}>
            <p className="fw-bold mb-5">{ getSpanishFormattedDateByNumericDate(order.datePlaced)}</p>
            <p className="fw-bold">Artículos</p>
            <ul className="list-unstyled" key={order.id}>
           {order?.items.map((item: any) => <li className="d-flex gap-5 mb-3 bg-light p-2 rounded" key={item.id}>
               <div>
                   <div className="my-orders-product-image" style={{backgroundImage: 'url('+ 'data:' + item?.product?.imageType+';base64,' + item?.product?.productImage+')'}} ></div>
               </div>
               <div className="mt-5">
                   <div className="d-flex mb-2">
                      {/* <span className="fw-bold">{item.quantity + ' x '} </span>  */}
                     <span className="me-1 fw-bold">{item?.product?.title}<span/></span> <span>{`(${item.quantity} artículo${ item.quantity === 1 ? '' : 's'}).`}</span>
                   </div>
                   <dl>
                       <dt>Precio por unidad</dt>
                       <dd>{ formatPrice(item.product.price)}</dd>

                        <dt>Precio total</dt>
                       <dd>{ formatPrice(item.totalPrice)}</dd>
                   </dl>
               </div>
               </li>)}
               <div className="bg-light p-2 rounded"> 
                   <span className="fw-bold"> Total del pedido: </span>
                    <span className="fw-bold"> {formatPrice(order.total)}</span>
                </div>
                <Link className="btn btn-primary mt-3" to={"/order/details/"+order?.id}>Ver toda la informacion del pedido</Link>
            </ul>
        </li>)}
    </ul>
}

export default MyOrders;