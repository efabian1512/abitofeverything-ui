import './AdminProducts.css';
import { Link } from 'react-router-dom';

const AdminProducts = () => {
    return <div>
        <Link to="/admin/products/new" className="btn btn-primary">New Product</Link>
    </div>
}

export default AdminProducts;