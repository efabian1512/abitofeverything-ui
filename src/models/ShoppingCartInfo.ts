import { ShoppingCartItem } from "./ShoppingCartItem";


export interface ShoppingCartInfo {
    id: string;
    items: ShoppingCartItem[];
    dateCreated: number;
}
