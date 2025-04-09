import { PropsWithChildren } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import RoleTypes from '../register/roles-enum';

type ProtectedRouteProps = PropsWithChildren;

const AdminProtectedRoute = ({ children }: ProtectedRouteProps) => {
 
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null;
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if(userInfo === null) {
            navigate('/login', { replace: true, state: {from: location }});
        } else {
            if(!userInfo?.user?.roles?.includes(RoleTypes.ROLE_ADMIN)) {
            navigate('/', { replace: true, state: {from: location }});
        }
        }
    }, [navigate, userInfo]);

    return userInfo?.user?.roles?.includes(RoleTypes.ROLE_ADMIN) ? <>{children}</> : <></>;
}

export default AdminProtectedRoute;