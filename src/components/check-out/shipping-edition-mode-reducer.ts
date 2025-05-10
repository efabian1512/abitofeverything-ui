
interface ShippingEditionModeAction {
    type: 'on' | 'off';
}

export const initialShippingEditionState = false;

export const shippingEditionModeReducer = (isShippingEditionModeActive: boolean, action: ShippingEditionModeAction) => {
    switch(action.type) {
        case 'on' : 
            return true;
        
        case 'off': 
            return false;

        default: {
            throw Error('Unknown action: ' + action.type);
    }
        
    }
}