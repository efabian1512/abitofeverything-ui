
import { useContext } from "react";
import { useSelector } from "react-redux";
import { ShippingEditionModeContext } from "../../contexts/context";
import { RootState } from "../../state/store";
import ShippingForm from "../shipping-form/ShippingForm"
import ShippingInfoWidget from "../shipping-info-widget/ShippingInfoWidget"

const ShippingInfoSection = () => {
    const shippingInfo = useSelector((state: RootState) => state.checkOutShippingInfo.shippingInfo);
    const isShippingEditionModeActive = useContext(ShippingEditionModeContext);

    return <div className="d-flex flex-column">
        <div className="d-flex flex-column">
            {(!shippingInfo || isShippingEditionModeActive) && <ShippingForm />}
        </div>
             { (shippingInfo && !isShippingEditionModeActive) && <ShippingInfoWidget /> }
    </div>
}

export default ShippingInfoSection;