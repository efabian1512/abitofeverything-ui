import { createContext } from "react";
import { shippingEditionModeReducer } from "../components/check-out/shipping-edition-mode-reducer";


export const ShippingEditionModeContext = createContext<boolean>(false);
export const ShippingEditionModeDispatchContext = createContext<Function>(shippingEditionModeReducer);
