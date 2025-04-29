import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { login } from '../../services/UserService';
import Loading from '../Loading/Loading';
import { z } from 'zod';
import loginStyles from './Login.module.css';
import Alert from '../alerts/Alert';
import { setUser } from '../../state/user/userSlice';
import { useDispatch } from 'react-redux';

const schema = z.object({
    username: z.string().min(1, {message: 'El email requerido.'}),
    password: z.string().min(1, {message: 'La contraseña es requerida.'}),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
    
const { register, handleSubmit, reset, formState: { errors }} = useForm<FormData>({resolver: zodResolver(schema) });

const dispatch = useDispatch();

const navigate  = useNavigate();
const location = useLocation();

const [isLoading, setIsloading] = useState<boolean>(false);

const [alertMessage, setAlertMessage] = useState<string>('');

 const onSubmit = (data: FieldValues) => {
    
    setIsloading(true);
      login(data).then((resp) => {
            setIsloading(false);
        if(resp.data) {
          if(resp?.data?.data?.user?.accountVerified) {
            dispatch(setUser(resp?.data?.data?.user));
            localStorage.setItem('userInfo', JSON.stringify(resp.data.data));
             reset();
             if(location.state?.from) {
               navigate(location.state.from);
             } else {
               navigate('/');
             }
          } else {
            setAlertMessage("No se puede proceder con el inicio de sesión, esta cuenta está pendiente de verificación.")
          }
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
    <label htmlFor="username">Correo electrónico</label>
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

  <button className={`btn btn-primary me-3 ` + loginStyles['login-button']} type='submit'>Iniciar sesión</button>
  <div className="mt-2">
    <p> <span className="me-2">¿No tienes una cuenta?</span><Link className="text-decoration-none" to="/register">Registrate</Link></p>
  </div>
{isLoading && <Loading/>}
<div className="mt-3">
  {alertMessage && <Alert type="error" message={alertMessage} />}
</div>
</form>
 </div>
}

export default Login;