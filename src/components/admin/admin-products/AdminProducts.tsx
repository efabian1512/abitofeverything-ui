import './AdminProducts.css';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import { getProducts } from '../products-form/ProductService';


const AdminProducts = () => {

    const [products, setProducts] = useState<any>();
    const [filteredProducts, setFilteredProducts] = useState<any>();

    useEffect(() => {
        getProducts().then(
            products => {
                setProducts(products.data);
                setFilteredProducts(products.data);
            }
            );
    }, []);

    const columns = [
        {
            name: 'Nombre',
            selector: (row: any) => row.title,
            sortable: true
        },
        {
            name: 'Precio',
            selector: (row: any) => row.price,
            sortable: true
        },
        {
            name: '',
            cell: (row: {id: any}) => (
                <Link className="text-decoration-none" to={'/admin/products/'+row.id}>Edit</Link>
            )
        }
    ]

    const paginationComponentOptions = {
	    rowsPerPageText: 'Filas por página',
	    rangeSeparatorText: 'de',
	    selectAllRowsItem: true,
	    selectAllRowsItemText: 'Todos',
    };

    const handleFilter = (event: React.FormEvent<HTMLInputElement>) => {
        const target = event?.target as HTMLInputElement & { value: string};
        const query = target?.value;
        const result = query ? products.filter((product: any) => product?.title?.toLowerCase().includes(query?.toLowerCase()) || String(product?.price)?.toLowerCase().includes(query?.toLowerCase())  ) : products;
        setFilteredProducts(result);
    }

    return <div>
        <div className="mb-3">
               <Link to="/admin/products/new" className="btn btn-primary">New Product</Link>
        </div>
     
        <div>
            <input placeholder="search..." type="text" className="form-control mb-3" onChange={handleFilter}/>
            <DataTable columns={columns} data={filteredProducts} pagination paginationComponentOptions={paginationComponentOptions}/>
        </div>
        
    </div>
}

export default AdminProducts;