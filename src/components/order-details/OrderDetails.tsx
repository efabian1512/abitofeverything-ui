
import { useEffect, useState } from 'react'
import { getOrderById } from '../../services/OrderService';
import { useParams, Link } from 'react-router-dom';
import StatusPill from '../order-status/StatusPill';
import { isAdmin } from '../../services/UserService';
import { formatPhoneNumber, formatPrice, getSpanishFormattedDateByNumericDate } from '../../Utilities';
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
     <h1 className="mb-3">Detalles de la orden</h1>
     <ul className="list-group list-group-flush">
        <li className="list-group-item border-info pb-5">
            <div className="mb-4">
            <h3 className="mb-3">Estado de la orden</h3> 
          <div className="d-flex align-items-center">
             <StatusPill status={order?.statusInfo?.status} />
        </div>
      </div>
      { isAdmin() && <Link className="btn btn-primary" to="/">Actualizar estado de la orden</Link> }
        </li>
        <li className="list-group-item border-info pb-5">
              <dl className="mb-2">
               <dt>Cliente: </dt>
            <dd>{`${order?.user?.name}.`}</dd>

            <dt>Fecha: </dt>
         <dd>{`${getSpanishFormattedDateByNumericDate(order?.datePlaced)}.`}</dd>
     </dl>
        </li>
        <li className="list-group-item border-info pb-5">
             <h3 className="my-2">Artículos</h3>
     <ul className="list-group">
        {order?.items.map((item: any ) => <li key={item.id} className="w-100 list-group-item d-flex align-items-center gap-1">
            <div className="me-1">
                <Thumbnail inline={true} imageType={item?.product?.imageType} productImage={item?.product?.productImage}/>
            </div>
         <div><p className="mb-0">{item?.product?.title} <span>{`(${item.quantity} artículo${ item.quantity === 1 ? '' : 's'}).`}</span>  </p><p className="mb-0 fw-bold">{ formatPrice(item?.totalPrice)}</p></div> 
            </li>)}

            <li className="list-group-item"><span className="fw-bold">Total:</span> <span className="fw-bold">{ formatPrice(order?.total)}</span></li>
     </ul>
        </li>
        <li className="list-group-item border-info pb-5">
                 <h3 className="mb-5">Información de envío</h3>

   <div className="row">
       <div className="col-sm-6 col-md-6 col-lg-6 mb-3">
            <dt>Beneficiario: </dt>
            <dd>{`${order?.shippingInfo?.customerName}.`}</dd>
       </div>
       <div className="col-sm-6 col-md-6 col-lg-6  mb-3">
             <dt>Dirección: </dt>
             <dd>{`${order?.shippingInfo?.addressLine1}, ${order?.shippingInfo?.addressLine2}.`}</dd>
       </div>
       <div className="col-sm-6 col-md-6 col-lg-6  mb-3">
            <dt>Ciudad: </dt>
             <dd>{`${order?.shippingInfo?.city}.`}</dd>
       </div>
       <div className="col-sm-6 col-md-6 col-lg-6  mb-3">
             <dt>Estado o Provincia: </dt>
             <dd>{`${order?.shippingInfo?.state}.`}</dd>
       </div>
       <div className="col-sm-6 col-md-6 col-lg-6 mb-3">
             <dt>País: </dt>
             <dd>{`${order?.shippingInfo?.country}.`}</dd>
       </div>
       <div className="col-sm-6 col-md-6 col-lg-6  mb-3">
                <dt>Código postal: </dt>
             <dd>{`${order?.shippingInfo?.zipCode}.`}</dd>
       </div>
       <div className="col-sm-6 col-md-6 col-lg-6  mb-3">
             <dt>Número de teléfono: </dt>
             <dd>{`${formatPhoneNumber(order?.shippingInfo?.phoneNumber) }.`}</dd>
       </div>
   </div>
        </li>
     </ul>
 </div>
}

export default OrderDetails;