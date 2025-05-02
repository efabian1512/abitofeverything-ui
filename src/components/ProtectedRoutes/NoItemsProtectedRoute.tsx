import { PropsWithChildren } from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from "../../state/store";
import { getActualCart } from "../../services/ShoppingCartService";

type ProtectedRouteProps = PropsWithChildren;

const NoItemsProtectedRoute = ({ children }: ProtectedRouteProps) => {
 
    const cart = useSelector((state: RootState) => state.cartInfo.cart);
    const actualCart = getActualCart(cart);

    const navigate = useNavigate();

    useEffect(() => {
        if(actualCart?.items.length === 0) {
            navigate('/', { replace: true });
        }
    }, [navigate, actualCart]);

    return actualCart?.items.length ? <>{children}</> : <></>;
}

export default NoItemsProtectedRoute;