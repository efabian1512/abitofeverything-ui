import RoleTypes from "../components/register/roles-enum";

export interface User {
    accountVerified: boolean;
    email: string;
    id: string;
    name: string;
    roles: RoleTypes | ''
}