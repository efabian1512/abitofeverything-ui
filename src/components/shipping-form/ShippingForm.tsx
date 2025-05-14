
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { useCountries } from "../../CustomHooks/useCountries";
import { AppDispatch, RootState } from "../../state/store";
import { setCountryFirst, sortCountries } from "../../Utilities";
import { setCheckoutShippingInfo } from '../../state/checkout-shipping-info/CheckoutShippingInfoSlice';
import { ShippingInfo } from "../../models/ShippingInfo";
import Loading from "../Loading/Loading";
import { useContext, useEffect, useState } from "react";
import { ShippingEditionModeContext, ShippingEditionModeDispatchContext } from "../../contexts/context";

const ShippingForm = () => {

      const schema = z.object({
        customerName: z.string().min(1, {message: 'El nombre es requerido.'}),
        addressLine1: z.string().min(1, {message: 'Este campo es requerido.'}),            
        addressLine2: z.string().min(1, {message: 'Este campo es requerido.'}), 
        country: z.string().min(1, {message: 'Se requiere un pais.'}),            
        city: z.string().min(1, {message: 'Se requiere una ciudad.'}),
        state: z.string().min(1, {message: 'Se requiere un estado o provincia.'}),
        zipCode: z.string().min(1, {message: 'Se requiere una codigo postal.'}),
        // phoneNumber: z.string().min(1, {message: 'Se requiere un numero de telefono.'})
                  
    });

    type FormData = z.infer<typeof schema>;

    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<FormData>({resolver: zodResolver(schema) });
    const isShippingEditionModeActive = useContext(ShippingEditionModeContext);
    const shippingInfo = useSelector((state: RootState) => state.checkOutShippingInfo.shippingInfo);
      
    const dispatch = useDispatch<AppDispatch>();
    const shippingEdditionModeDispatch = useContext(ShippingEditionModeDispatchContext);

    const { data: countries, isLoading } = useCountries();

    const [currentFormValue, setCurrentFormValue] = useState<any>();
    
    const sortedCountries = setCountryFirst(countries?.sort(sortCountries)!, 'DOM');

    const [phoneInputValue, setPhoneInputValue] = useState('');
    const [currentPhoneInputValue, setCurrentPhoneInputValue] = useState('');

    const [phoneNumberInputErrorMessage, setPhoneNumberInputErrorMessage] = useState<string | null>(null);

    const formValue = watch();
     const isThereAnyChange = () => {
       let isThereAnyChangeLocal = false;
       const formValueLocal = {...formValue};
       const currentFormValueLocal = {...currentFormValue};

       if(formValue && currentFormValue) {
        isThereAnyChangeLocal = Object.keys(currentFormValueLocal).every(key => {
         return formValueLocal[key as keyof typeof formValueLocal] === currentFormValueLocal[key]
        });
       }
        return isThereAnyChangeLocal && currentPhoneInputValue === reversePhoneNumber(phoneInputValue);
     }

    const setFormValues = () => {
        setValue('addressLine1', shippingInfo?.addressLine1 ? shippingInfo?.addressLine1: '' );
        setValue('addressLine2', shippingInfo?.addressLine2 ? shippingInfo?.addressLine2: '' );
        setValue('city', shippingInfo?.city ? shippingInfo?.city: '' );
        setValue('country', shippingInfo?.country ? shippingInfo?.country: '' );
        setValue('customerName', shippingInfo?.customerName ? shippingInfo?.customerName: '' );
        if(!phoneNumberInputErrorMessage) {
            setPhoneInputValue( formatPhoneNumber(shippingInfo?.phoneNumber ? shippingInfo?.phoneNumber: '' ));
        }
        setValue('state', shippingInfo?.state ? shippingInfo?.state: '' );
        setValue('zipCode', shippingInfo?.zipCode ? shippingInfo?.zipCode : '' );

        const currentFormLocal = {
            customerName: shippingInfo?.customerName ? shippingInfo?.customerName: '',
            addressLine1: shippingInfo?.addressLine1 ? shippingInfo?.addressLine1: '',
            addressLine2: shippingInfo?.addressLine2 ? shippingInfo?.addressLine2: '' ,
            city: shippingInfo?.city ? shippingInfo?.city: '',
            country: shippingInfo?.country ? shippingInfo?.country: '',
            state: shippingInfo?.state ? shippingInfo?.state: '',
            zipCode: shippingInfo?.zipCode ? shippingInfo?.zipCode : ''
        }

        setCurrentFormValue(currentFormLocal);
        setCurrentPhoneInputValue(shippingInfo?.phoneNumber ? shippingInfo?.phoneNumber: '' );

    }

    useEffect(() => {
        if(isShippingEditionModeActive && shippingInfo && countries) {
            setFormValues();
        }
    },[countries])

      const reversePhoneNumber = (formattedNumber: string | undefined): string | undefined => {
        if(!formattedNumber) return formattedNumber;

       return formattedNumber.replace(/\D/g, '');
    }

    const onSave = (data: FieldValues) => {
        if(phoneNumberInputErrorMessage)  return;

        const formValue = {...data, phoneNumber: reversePhoneNumber(phoneInputValue)}
          dispatch(setCheckoutShippingInfo(formValue as ShippingInfo));
          if(isShippingEditionModeActive) {
             turnEditionModeOff();
          }
    }

    const turnEditionModeOff = () => {
         shippingEdditionModeDispatch({type: 'off'});
    }

    const formatPhoneNumber = (inputValue: string) => {
        if(!inputValue) return inputValue;
        const phoneNumber = inputValue.replace(/[^\d]/g,'');
        const phoneNumberLength = phoneNumber.length;
        if(phoneNumberLength < 4) return phoneNumber;
        if(phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3)}`;
        }
        return `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3,6)}-${phoneNumber.slice(6,10)}`
    }

    const handlePhoneNumberInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedPhoneNumber = formatPhoneNumber(event.target.value);
        setPhoneInputValue(formattedPhoneNumber);
        checkPhoneNumberInputErrors(false, event.target.value);
    }

    const validatePhoneNumberInput = (phoneInputValueLocal: string | undefined) => {
        const actualPhoneNumber = reversePhoneNumber(phoneInputValueLocal);
        const message = !actualPhoneNumber? 'Se requiere un numero de telefono.' :
        actualPhoneNumber.length < 10 || actualPhoneNumber.length > 10 ? 'El  numero de telefono debe ser de 10 digitos': '';
        setPhoneNumberInputErrorMessage(message);
    }

    const checkPhoneNumberInputErrors = (comingFromSubmition?: boolean, phoneInputValueLocal?: string ) => {
        const actualPhoneInputValue = comingFromSubmition ? phoneInputValueLocal || reversePhoneNumber(phoneInputValue) : phoneInputValueLocal;
       validatePhoneNumberInput(actualPhoneInputValue);
    }

 return  <form className="h-100" onSubmit={handleSubmit(onSave)}>
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
                    <input value={phoneInputValue} onChange={(event) => handlePhoneNumberInputChange(event)} name="phoneNumber" id="phoneNumber" type="text" className="form-control"/> 
                    {/* <input onChange={(event) => handlePhoneInputChange(event)} type="text" id="phoneNumber" className="form-control"/> */}
                    </div>
                      { phoneNumberInputErrorMessage && <div  className="alert alert-danger mt-2">
                        <div>{phoneNumberInputErrorMessage}</div>
                    </div>}
                   {/* { errors.phoneNumber && <div className="alert alert-danger mt-2">
                        <div> {errors.phoneNumber?.message}</div>
                    </div> } */}
                </div>
                  <div className="d-flex gap-2">
                      <button onClick={() => checkPhoneNumberInputErrors(true)} style={{width: '7rem'}} disabled={isShippingEditionModeActive && isThereAnyChange()} className="btn btn-primary" type="submit">{`${isShippingEditionModeActive ? 'Actualizar' : 'Guardar'}`}</button>
                     { isShippingEditionModeActive && <button type="button" style={{width: '7rem'}}  onClick={turnEditionModeOff} className="btn btn-secondary">Cancelar</button> }
                  </div>
                  {isLoading && <Loading />}
                     </form>
}

export default ShippingForm;