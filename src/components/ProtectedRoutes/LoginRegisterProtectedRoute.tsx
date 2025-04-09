import { PropsWithChildren } from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type ProtectedRouteProps = PropsWithChildren;

const LoginRegisterProtectedRoute = ({ children }: ProtectedRouteProps) => {
 
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null;
    const navigate = useNavigate();

    useEffect(() => {
        if(userInfo !== null) {
            navigate('/', { replace: true });
        }
    }, [navigate, userInfo]);

    return !userInfo ? <>{children}</> : <></>;
}

export default LoginRegisterProtectedRoute;