import RoleTypes from "../components/register/roles-enum";
import { axiosInstance } from "./AxiosInstance";

export const saveUser = (user: any) => {
    const userData = { ...user, roles: RoleTypes.ROLE_USER};
    return axiosInstance.post('/users/register', userData);
}


export const login = (user: any) => {
    return axiosInstance.post('/shop/authenticate', user);
}

export const userLogout = (token: string) => {
    const formData = new FormData();

    formData.append('accessToken', token);
    return axiosInstance.post('/shop/logout', formData);
}

export const getLoggedUser = () => {

   const userInfoString = localStorage.getItem('userInfo');

   const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

   return userInfo ? userInfo.user : null;
}


export const isAdmin = (): boolean => {
    const user = getLoggedUser();
    
    return user ? user.roles === RoleTypes.ROLE_ADMIN ? true : false : false;
}