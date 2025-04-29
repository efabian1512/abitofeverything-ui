
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import ShippingForm from "../shipping-form/ShippingForm"
import ShippingInfoWidget from "../shipping-info-widget/ShippingInfoWidget"

const ShippingInfoSection = () => {
    const shippingInfo = useSelector((state: RootState) => state.checkOutShippingInfo.shippingInfo);

    return <div className="d-flex flex-column">
        <div className="d-flex flex-column">
            {!shippingInfo && <ShippingForm />}
        </div>
             { shippingInfo && <ShippingInfoWidget /> }
    </div>
}

export default ShippingInfoSection;