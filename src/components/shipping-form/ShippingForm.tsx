
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useCountries } from "../../CustomHooks/useCountries";
import { Order } from "../../models/Order";
import { ShippingInfo } from "../../models/ShippingInfo";
import { ShoppingCartInfo } from "../../models/ShoppingCartInfo";
import { placeOrderService } from "../../services/OrderService";
import { clearCartService } from "../../services/ShoppingCartService";
import { getShoppingCartThunk } from "../../state/shopping-cart/shoppingCartSlice";
import { AppDispatch, RootState } from "../../state/store";
import { setCountryFirst, sortCountries } from "../../Utilities";

const ShippingForm = () => {

      const schema = z.object({
        customerName: z.string().min(1, {message: 'El nombre es requerido.'}),
        addressLine1: z.string().min(1, {message: 'Este campo es requerido.'}),            
        addressLine2: z.string().min(1, {message: 'Este campo es requerido.'}), 
        country: z.string().min(1, {message: 'Se requiere un pais.'}),            
        city: z.string().min(1, {message: 'Se requiere una ciudad.'}),
        state: z.string().min(1, {message: 'Se requiere un estado o provincia.'}),
        zipCode: z.string().min(1, {message: 'Se requiere una codigo postal.'}),
        phoneNumber: z.string().min(1, {message: 'Se requiere un numero de telefono.'})
                  
    });

    type FormData = z.infer<typeof schema>;

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({resolver: zodResolver(schema) });
    const dispatch = useDispatch<AppDispatch>();
    
    const { data: countries } = useCountries();

    const cart = useSelector((state: RootState) => state.cartInfo.cart);
    const actualCart = cart ? new ShoppingCartInfo(cart.items, cart.id, cart.dateCreated) : null;


   

    const user = useSelector((state: RootState) => state.userInfo.user) || JSON.parse(localStorage.getItem('userInfo')!).user;
    
    const sortedCountries = setCountryFirst(countries?.sort(sortCountries)!, 'DOM');

    const navigate = useNavigate();

       const placeOrder = (data: FieldValues) => {
       const order = new Order(user, data as ShippingInfo, actualCart);
        
        placeOrderService(order)
            .then(resp => {
                clearCartService().then(() => {
                    dispatch(getShoppingCartThunk())
                    reset();
                    navigate(`/order-success/${resp.data.id}` )
                });
            })
            .catch(error => error);
    }

 return  <form className="h-100" onSubmit={handleSubmit(placeOrder)}>
                <div className="form-gropup mb-2">
                    <label htmlFor="customerName">Nombre Completo</label>
                    <input {...register('customerName')} type="text" id="customerName" className="form-control"/>
                   { errors.customerName && <div className="alert alert-danger mt-2">
                        <div> {errors.customerName?.message}</div>
                    </div> }
                </div>
                <div className="form-gropup mb-2">
                    <label htmlFor="addressLine1">Direccion 1</label>
                    <input {...register('addressLine1')} placeholder="Calle.." type="text" id="addressLine1" className="form-control"/>
                   { errors.addressLine1 && <div className="alert alert-danger mt-2">
                        <div> {errors.addressLine1?.message}</div>
                    </div> }
                </div>
                <div className="form-gropup mb-2">
                    <label htmlFor="addressLine2">Direccion 2</label>
                    <input {...register('addressLine2')} placeholder="No. casa" type="text" id="addressLine2" className="form-control"/>
                   { errors.addressLine2 && <div className="alert alert-danger mt-2">
                        <div> {errors.addressLine2?.message}</div>
                    </div> }
                </div>
                <div className="form-gropup mb-2">
                    <label htmlFor="country">Pais</label>
                    <select {...register('country')}  id="country" className="form-select">
                        <option value=""></option>
                        {sortedCountries?.map(country => <option key={country?.name?.common} value={country?.name?.common}>{country?.name?.common}</option>)}
                    </select>
                   { errors.country && <div className="alert alert-danger mt-2">
                        <div> {errors.country?.message}</div>
                    </div> }
                </div>
                 <div className="form-gropup mb-2">
                    <label htmlFor="city">Ciudad</label>
                    <input {...register('city')} type="text" id="city" className="form-control"/>
                   { errors.city && <div className="alert alert-danger mt-2">
                        <div> {errors.city?.message}</div>
                    </div> }
                </div>
                 <div className="form-gropup mb-2">
                    <label htmlFor="state">Estado o Provincia</label>
                    <input {...register('state')}  type="text" id="state" className="form-control"/>
                   { errors.state && <div className="alert alert-danger mt-2">
                        <div> {errors.state?.message}</div>
                    </div> }
                </div>
                 <div className="form-gropup mb-2">
                    <label htmlFor="zipCode">Codigo Postal</label>
                    <input {...register('zipCode')}  type="text" id="zipCode" className="form-control"/>
                   { errors.zipCode && <div className="alert alert-danger mt-2">
                        <div> {errors.zipCode?.message}</div>
                    </div> }
                </div>
                 <div className="form-gropup mb-2">
                    <label htmlFor="phoneNumber">Numero de Telefono</label>
                    <div className="input-group mb-3">
                    <span className="input-group-text"><i className="bi bi-telephone"></i></span>
                    <input {...register('phoneNumber')} type="text" id="phoneNumber" className="form-control"/>
                    </div>
                   { errors.phoneNumber && <div className="alert alert-danger mt-2">
                        <div> {errors.phoneNumber?.message}</div>
                    </div> }
                </div>
                  <button className="btn btn-primary" type="submit">Guardar</button>
                     </form>
}

export default ShippingForm;