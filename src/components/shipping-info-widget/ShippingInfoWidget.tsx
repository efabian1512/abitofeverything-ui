
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { removeCheckoutShippingInfo } from '../../state/checkout-shipping-info/CheckoutShippingInfoSlice';
import { AppDispatch, RootState } from '../../state/store';
import { formatPhoneNumber } from '../../Utilities';
import ConfirmationModal from '../confirmation-modal/ConfimationModal';
import { useDispatch } from 'react-redux';
import { ShippingEditionModeDispatchContext } from '../../contexts/context';

const ShippingInfoWidget = () => {
   const shippingInfo = useSelector((state: RootState) => state.checkOutShippingInfo.shippingInfo);
   const [isDeleteInfoModalOpen, setIsDeleteInfoModalOpen] = useState<boolean>(false);

    const shippingEdditionModeDispatch = useContext(ShippingEditionModeDispatchContext);

   const dispatch = useDispatch<AppDispatch>();

  const onEdit = () => {
    shippingEdditionModeDispatch({type: 'on'});
  }

  const onDelete = () => {
      setIsDeleteInfoModalOpen(true);
      shippingEdditionModeDispatch({type: 'off'});
  }

  const onDeleteConfirmation = () => {
    dispatch(removeCheckoutShippingInfo());
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
        <i onClick={onDelete} style={{cursor: 'pointer'}} title="eliminar" className="bi bi-trash-fill align-self-start"></i>
        <ConfirmationModal message={'¿Esta seguro de que quiere eliminar la direccion?'} isModalOpen={isDeleteInfoModalOpen} onCancel={() => setIsDeleteInfoModalOpen(false)} onConfirm={onDeleteConfirmation} />
    </div>
}

export default ShippingInfoWidget;