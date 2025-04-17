import { createContext } from "react";
import { ShoppingCartInfo } from '../models/ShoppingCartInfo';


export const ShoppingCartContext = createContext<ShoppingCartInfo | undefined>(undefined);