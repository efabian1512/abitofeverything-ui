
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { getOrderById, getOrderStatusList, updateOrderStatus } from '../../../services/OrderService';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ORDER_STATUS_CONFIG } from '../../../constants/constants';

const OrderStatusUpdate = () => {

const {id} = useParams();
const navigate = useNavigate();

    const schema = z.object({            
        status: z.string().min(1, {message: 'Este campo es requerido.'})             
    });


    type FormData = z.infer<typeof schema>;

    const { register, handleSubmit, formState: { errors, isValid }, watch, setValue} = useForm<FormData>({resolver: zodResolver(schema) });
    const [statusList, setStatusList] = useState<any>([]);
    const [currentStatusValue, setCurrentStatusValue] = useState<string>('');

    useEffect(() => {
        getOrderStatusList().then(resp => {setStatusList(resp.data)}).catch(error => error);
    }, []);

    useEffect(() => {
         if(id) {
            getOrderById(id).then(resp => 
                {
                    setCurrentStatusValue(resp.data.statusInfo.id);
                    setValue('status', resp?.data?.statusInfo.id);
                });
        }
    },[id]);

    const getStatus = () => {
      const status =  statusList?.find((status: any ) => status.id === statusFieldValue);
      return status;
    }

    const onSubmit = () => {
        updateOrderStatus(getStatus(), id!).then(() => navigate(`/order/details/${id}`)).catch((error) => error);
    }

    const statusFieldValue = watch('status');

    return <div className="row">
        <div className="col-sm-4 col-lg-4 col-md-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-gropup mb-3">
                             <label htmlFor="status">Estado de la orden:</label>
                            <select {...register('status')}  className="form-select"  id="status">
                                <option></option>
                                {statusList?.map((status: any) => <option key={status.id} value={status.id} id={status.id}>{ORDER_STATUS_CONFIG[status.status as keyof typeof ORDER_STATUS_CONFIG]?.displayName}</option>
                                )}
                            </select>
                            {errors.status && <div  className="alert alert-danger mt-2">
                                <div>{errors.status?.message}</div>
                            </div>}
                        </div>
                        <div className="d-flex gap-2">
                             <button style={{width: '7rem'}} disabled={(statusFieldValue === currentStatusValue) || !isValid} type="submit" className="btn btn-primary">Actualizar</button>
                       <Link style={{width: '7rem'}} className="btn btn-secondary" to={`/order/details/${id}`}>Cancel</Link>
                        </div>
            </form>
        </div>
       
    </div>

}

export default OrderStatusUpdate;