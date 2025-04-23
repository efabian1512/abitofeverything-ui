import { paginationComponentOptions } from '../../../config/defaulttableconfig';
import './AdminOrders.css';
import  DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getActualOrders, getAllOrders } from '../../../services/OrderService';

const AdminOrders = () => {

    const [orders, setOrders] = useState<any>();
    const [filteredOrders, setFilteredOrders] = useState<any>();

      useEffect(() => {
        getAllOrders().then(
            resp => {
                const actualOrders = getActualOrders(resp.data)
                setOrders(actualOrders);
                setFilteredOrders(actualOrders);
            }
            );
    }, []);
    
     const columns = [
        {
            name: 'Cliente',
            selector: (row: any) => row.user.name,
            sortable: true
        },
        {
            name: 'Fecha',
            selector: (row: any) => row.datePlaced,
            sortable: true
        },
        {
            name: '',
            cell: (row: {id: any}) => (
                <Link className="text-decoration-none" to={'/order/details/'+row.id}>View</Link>
            )
        }
    ];

    const handleFilter = (event: React.FormEvent<HTMLInputElement>) => {
        const target = event?.target as HTMLInputElement & { value: string};
        const query = target?.value;
        const result = query ? orders.filter((order: any) => order?.name?.toLowerCase().includes(query?.toLowerCase()) || String(order?.datePlaced)?.toLowerCase().includes(query?.toLowerCase())  ) : orders;
        setFilteredOrders(result);
    }


    return  <div>
                <input placeholder="search..." type="text" className="form-control mb-3" onChange={handleFilter}/>
                <DataTable columns={columns} data={filteredOrders} pagination paginationComponentOptions={paginationComponentOptions}/>
            </div>
}

export default AdminOrders;