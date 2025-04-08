import RoleTypes from "../components/register/roles-enum";
import { axiosInstance } from "./AxiosInstance";

export const saveUser = (user: any) => {
    const userData = { ...user, roles: RoleTypes.ROLE_USER};
    return axiosInstance.post('api/users/register', userData);
}


export const login = (user: any) => {
    return axiosInstance.post('api/shop/authenticate', user);
}

export const userLogout = (token: string) => {
    const formData = new FormData();

    formData.append('accessToken', token);
    return axiosInstance.post('api/shop/logout', formData);
}