import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const PriceFilter = () => {
    
  const schema = z.object({
    from: z.preprocess(
    (value) => (!value? 0 : value),
    z.number().min(0).optional()
  ),     
    to: z.preprocess(
    (value) => (!value ? 0 : value),
    z.number().min(0).optional()
  ),           
});

type FormData = z.infer<typeof schema>;

    const { register, handleSubmit, reset, watch, setValue} = useForm<FormData>({resolver: zodResolver(schema) });
     const [isThereAPriceFilter, setIsThereAPriceFilter] = useState<boolean>(false);
     const [myParams, setMyParams] = useSearchParams();
    const [currentFormValue, setCurrentFormValue] = useState<any>();

     const formValue = watch();
     const formHasSomeValue = () => {
       return Object.values(formValue).some(value =>  value ? true : false);
     }

     const isThereAnyChange = () => {
       let isThereAnyChangeLocal = false;
       const formValueLocal = {...formValue};
       const currentFormValueLocal = {...currentFormValue};

       if(formValue && currentFormValue) {
        isThereAnyChangeLocal = Object.keys(currentFormValueLocal).every(key => {
          if(!formValueLocal[key as keyof typeof formValueLocal]) {
            formValueLocal[key as keyof typeof formValueLocal] = 0;
          }

          if(!currentFormValueLocal[key]) {
            currentFormValueLocal[key] = 0;
          }

         return formValueLocal[key as keyof typeof formValueLocal] === currentFormValueLocal[key]
        });
       }
        return isThereAnyChangeLocal;
     }


     const onSubmit = (data: FieldValues) => {
       let myParamsLocal:any = myParams.get('category') ? {category: myParams.get('category'), ...myParams } : {...myParams};
       if(data.from) {
        myParamsLocal = {...myParamsLocal, desde: data.from};
       }

       if(data.to) {
         myParamsLocal = {...myParamsLocal, hasta: data.to};
       }
       setMyParams({...myParamsLocal});
     }

     const onResetFilter = () => {
       if(myParams.get('desde')) {
         myParams.delete('desde');
       }

       if(myParams.get('hasta')) {
         myParams.delete('hasta');
       }
       setMyParams(myParams);
       reset();
     }

     useEffect(() => {
      setIsThereAPriceFilter(myParams.get('desde') ? true : myParams.get('hasta') ? true : false);
      checkCurrentFilters();
     }, [myParams]);

     const checkCurrentFilters = () => {
       let formValue: any;

        if(myParams.get('desde')) {
        const fromValue = parseFloat(myParams.get('desde')!);
        formValue = {...formValue, from: fromValue}
        setValue('from', fromValue);
      } else {
        formValue = {...formValue, from: NaN};
      }

      if(myParams.get('hasta')) {
        const toValue = parseFloat(myParams.get('hasta')!);
        formValue = {...formValue, to: toValue}
        setValue('to', toValue);
      } else {
         formValue = {...formValue, to: NaN};
      }
      
        setCurrentFormValue(formValue);
     }
     
    return (
           <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
                  <div className="d-flex flex-column">
                    <div className="d-flex gap-2">
                      <div className="form-group">
                        <label htmlFor="from">
                          Desde
                        </label>
                         <div className="input-group">
                        <span className="input-group-text">$</span>
                           <input {...register('from', {valueAsNumber: true})} className="form-control" id="from" type="number"/>
                      </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="to">
                          Hasta
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">$</span>
                             <input {...register('to', {valueAsNumber: true})} className="form-control" id="to" type="number"/>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex gap-1 justify-content-center mt-3">
                             <button disabled={!formHasSomeValue() || isThereAPriceFilter && isThereAnyChange()} style={{width: '10rem'}} type="submit" className="btn btn-primary">Filtrar</button>
                      <button onClick={onResetFilter} disabled={!isThereAPriceFilter} style={{width: '10rem'}}  type="button" className=" btn btn-danger">Deshacer filtro</button>
                  </div>
                   </div>
                    </form>
    )
}

export default PriceFilter;

