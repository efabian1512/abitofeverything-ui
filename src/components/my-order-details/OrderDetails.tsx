
import { useEffect, useState } from 'react'
import { getOrderById } from '../../services/OrderService';
import { useParams } from 'react-router-dom';
import { getSpanishFormattedDateByNumericDate, formatPrice, formatPhoneNumber } from '../../Utilities';
import Thumbnail from '../thumbnail/Thumbnail';


const OrderDetails = () => {

    const [order, setOrder] = useState<any>();
    const {id} = useParams();

    useEffect(() => {
        if(id) {
            getOrderById(id).then(resp => setOrder(resp?.data));
        }
        
    },[id]);

 return <div>
     <h3>Detalles de la orden</h3>
     <dl className="mb-2">
             <dt>Cliente: </dt>
             <dd>{`${order?.user?.name}.`}</dd>

               <dt>Fecha: </dt>
             <dd>{`${getSpanishFormattedDateByNumericDate(order?.datePlaced)}.`}</dd>
     </dl>
     <hr className="text-info"/>
     <h3 className="my-2">Items</h3>
     <ul className="list-group">
        {order?.items.map((item: any ) => <li key={item.id} className="w-100 list-group-item d-flex align-items-center gap-1">
            <div className="me-1">
                <Thumbnail inline={true} imageType={item?.product?.imageType} productImage={item?.product?.productImage}/>
            </div>
         <div><p className="mb-0"><span>{item.quantity}</span> {item?.product?.title} </p><p className="mb-0 fw-bold">{ formatPrice(item?.totalPrice)}</p></div> 
            </li>)}

            <li className="list-group-item"><span className="fw-bold">Total:</span> <span className="fw-bold">{ formatPrice(order?.total)}</span></li>
     </ul>
     <hr className="text-info"/>
     <h3>Informacion de envio</h3>

      <dl className="mt-3 pb-2">
             <dt>Beneficiario: </dt>
             <dd>{`${order?.shippingInfo?.customerName}.`}</dd>
             <dt>Direccion: </dt>
             <dd>{`${order?.shippingInfo?.addressLine1}, ${order?.shippingInfo?.addressLine2}.`}</dd>
             <dt>Ciudad: </dt>
             <dd>{`${order?.shippingInfo?.city}.`}</dd>
               <dt>Estado o Provincia: </dt>
             <dd>{`${order?.shippingInfo?.state}.`}</dd>
             <dt>Pais: </dt>
             <dd>{`${order?.shippingInfo?.country}.`}</dd>
             <dt>Codigo postal: </dt>
             <dd>{`${order?.shippingInfo?.zipCode}.`}</dd>
             <dt>Numero de telefono: </dt>
             <dd>{`${formatPhoneNumber(order?.shippingInfo?.phoneNumber) }.`}</dd>
     </dl>
 </div>
}

export default OrderDetails;