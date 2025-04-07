import registerStyles from './Register.module.css';
import { z } from 'zod';
import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { saveUser } from '../../services/UserService';
import {  useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { useState } from 'react';

const schema = z.object({
    name: z.string().min(1, {message: 'El nombre es requerido.'}),
    lastName: z.string().min(1, {message: 'Este campo es requerido.'}),
    email: z.string().min(1, {message: 'El email requerido.'}),
    password: z.string().min(1, {message: 'La contraseña es requerida.'}),
    confirmPassword: z.string().min(1, {message: 'Por favor confirme la contraseña.'}),
}).refine(data => data.password === data.confirmPassword, {message: 'Las contraseñas no coinciden.', path: ['confirmPassword']});;

type FormData = z.infer<typeof schema>;

const Register = () => {

const { register, handleSubmit, reset, formState: { errors }} = useForm<FormData>({resolver: zodResolver(schema) });

const navigate  = useNavigate();

const [isLoading, setIsloading] = useState<boolean>(false);

 const onSubmit = (data: FieldValues) => {
      const info = {...data, name: data.name + ' ' + data.lastName};
    setIsloading(true);
      saveUser(info).then(() => {
        localStorage.setItem('email', data.email);
        setIsloading(false);
        reset();
        navigate('/confirmation-email');
      }).catch((error) => {
        setIsloading(false);
        error
    });
    }

 return <div className={registerStyles['register-container']}>
    
    <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className='mb-3'>User Registration</h3>
     <div className="form-group mb-3">
    <label htmlFor="exampleFormControlInput1">Nombre(s)</label>
    <input type="text" className="form-control" id="name" placeholder="Ingrese nombre(s)..." {...register('name')}/>
       { errors.name && <div className="alert alert-danger mt-2">
                                                    <div> {errors.name?.message}</div></div> }
  </div>
  <div className="form-group mb-3">
    <label htmlFor="exampleFormControlInput1">Apellido(s)</label>
    <input type="text" className="form-control" id="lastName" placeholder="Ingrese appellido(s)..." {...register('lastName')}/>
     { errors.lastName && <div className="alert alert-danger mt-2">
                                                    <div> {errors.lastName?.message}</div></div> }
  </div>
  <div className="form-group mb-3">
    <label htmlFor="exampleFormControlInput1">Email address</label>
    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Ingrese email" {...register('email')}/>
      { errors.email && <div className="alert alert-danger mt-2">
                                                    <div> {errors.email?.message}</div></div> }
  </div>
   <div className="form-group mb-3">
    <label htmlFor="exampleFormControlInput1">Contraseña</label>
    <input type="password" className="form-control" id="password" placeholder="Ingrese la contraseña..." {...register('password')}/>
     { errors.password && <div className="alert alert-danger mt-2">
                                                    <div> {errors.password?.message}</div></div> }
  </div>
   <div className="form-group mb-3">
    <label htmlFor="exampleFormControlInput1">Contraseña</label>
    <input type="password" className="form-control" id="password" placeholder="Confirme la contraseña..." {...register('confirmPassword')} />
     { errors.confirmPassword && <div className="alert alert-danger mt-2">
                                                    <div> {errors.confirmPassword?.message}</div></div> }
  </div>
  <button className={`btn btn-primary me-3 ` + registerStyles['create-button']} type='submit'>Crear</button>
{isLoading && <Loading/>}
</form>
 </div>
}

export default Register;