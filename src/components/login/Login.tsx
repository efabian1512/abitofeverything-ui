import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/UserService';
import Loading from '../Loading/Loading';
import { z } from 'zod';
import loginStyles from './Login.module.css';

const schema = z.object({
    username: z.string().min(1, {message: 'El email requerido.'}),
    password: z.string().min(1, {message: 'La contraseña es requerida.'}),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
    
const { register, handleSubmit, reset, formState: { errors }} = useForm<FormData>({resolver: zodResolver(schema) });

const navigate  = useNavigate();

const [isLoading, setIsloading] = useState<boolean>(false);

 const onSubmit = (data: FieldValues) => {
    
    setIsloading(true);
      login(data).then((resp) => {
            setIsloading(false);
        if(resp.data) {
            localStorage.setItem('userInfo', JSON.stringify(resp.data));
            reset();
            navigate('/');
        }
      }).catch((error) => {
        setIsloading(false);
        error
    });
    }

 return <div className={loginStyles['login-container']}>
    
    <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className='mb-3'>Login</h3>
  <div className="form-group mb-3">
    <label htmlFor="username">Email address</label>
    <input type="email" className="form-control" id="username" placeholder="Ingrese email" {...register('username')}/>
      { errors.username && <div className="alert alert-danger mt-2">
                                                    <div> {errors.username?.message}</div></div> }
  </div>
   <div className="form-group mb-3">
    <label htmlFor="password">Contraseña</label>
    <input type="password" className="form-control" id="password" placeholder="Ingrese la contraseña..." {...register('password')}/>
     { errors.password && <div className="alert alert-danger mt-2">
                                                    <div> {errors.password?.message}</div></div> }
  </div>

  <button className={`btn btn-primary me-3 ` + loginStyles['login-button']} type='submit'>Iniciar sesion</button>
{isLoading && <Loading/>}
</form>
 </div>
}

export default Login;