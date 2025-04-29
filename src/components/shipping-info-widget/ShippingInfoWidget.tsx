
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { formatPhoneNumber } from '../../Utilities';

const ShippingInfoWidget = () => {
   const shippingInfo = useSelector((state: RootState) => state.checkOutShippingInfo.shippingInfo);

  const onEdit = () => {
    console.log('editing');
  }

   return <div className="d-flex bg-light p-3">
       <div className="w-100">
           <p className="fw-bold h3 mb-3">Enviar a:</p>
            {shippingInfo && <ul className="list-group">
                <li className="list-group-item border-0 py-0 ps-0 bg-light">{shippingInfo?.customerName}</li>
                <li className="list-group-item border-0 py-0 ps-0 bg-light">{`${shippingInfo?.addressLine1},${shippingInfo.addressLine2}`}</li>
                <li className="list-group-item border-0 py-0 ps-0 bg-light">{shippingInfo?.city}</li>
                <li className="list-group-item border-0 py-0 ps-0 bg-light">{`${shippingInfo?.state} ${shippingInfo.zipCode}`}</li>
                <li className="list-group-item border-0 py-0 ps-0 bg-light">{shippingInfo?.country}</li>
                <li className="list-group-item border-0 py-0 ps-0 bg-light">{formatPhoneNumber(shippingInfo.phoneNumber)}</li>
            </ul>
            }
       </div>
        <i onClick={onEdit} style={{cursor: 'pointer'}} title="editar" className="bi bi-pencil-fill align-self-start me-2"></i>
        <i onClick={onEdit} style={{cursor: 'pointer'}} title="eliminar" className="bi bi-trash-fill align-self-start"></i>
    </div>
}

export default ShippingInfoWidget;