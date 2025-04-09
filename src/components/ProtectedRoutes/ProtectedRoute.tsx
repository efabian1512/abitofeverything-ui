import { PropsWithChildren } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

type ProtectedRouteProps = PropsWithChildren;

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
 
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null;
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(userInfo === null) {
            navigate('/login', { replace: true, state: {from: location}});
        }
    }, [navigate, userInfo]);

    return userInfo ? <>{children}</> : <></>;
}

export default ProtectedRoute;