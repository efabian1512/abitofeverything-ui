import RoleTypes from "../components/register/roles-enum";
import { axiosInstance } from "./AxiosInstance";

export const saveUser = (user: any) => {
    const userData = { ...user, roles: RoleTypes.ROLE_USER};
    return axiosInstance.post('api/users/register', userData);
}


export const login = (user: any) => {
    return axiosInstance.post('api/shop/authenticate', user);
}