
import { useEffect, useState } from 'react'
import { getOrderById } from '../../services/OrderService';
import { useParams } from 'react-router-dom';
import { getSpanishFormattedDateByNumericDate } from '../../Utilities';

const OrderDetails = () => {

    const [order, setOrder] = useState<any>();
    const {id} = useParams();

    useEffect(() => {
        if(id) {
            getOrderById(id).then(resp => setOrder({...resp?.data, datePlaced:getSpanishFormattedDateByNumericDate(resp?.data?.datePlaced)}));
        }
        
    },[id]);

 return <div>
     <h3>Detalles de la orden</h3>
     <dl>
             <dt>Cliente: </dt>
             <dd>{order?.user?.name}</dd>

               <dt>Fecha: </dt>
             <dd>{order?.datePlaced}</dd>
     </dl>
 </div>
}

export default OrderDetails;