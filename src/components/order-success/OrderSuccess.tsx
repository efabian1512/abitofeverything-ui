import './OrderSuccess';
import { useParams, Link } from 'react-router-dom';

const OrderSuccess = () => {
    const { id } = useParams();
 return <div className="d-flex align-items-center h-100"><div className="alert alert-success" role="alert">¡Esta orden se completo satisfactoriamente! El ID de la orden es <Link className="text-decoration-none" to={"/order/details/"+id}>{id}</Link> , puede dar click en el ID para ver los detalles de la orden. </div></div>
}

export default OrderSuccess;