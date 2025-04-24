import { ORDER_STATUS_CONFIG } from "../../constants/constants";
import './StatusPill.css';


const StatusPill = ({status}: {status: string}) => {
    return <>
          <div className={`d-inline-block me-1 status-pill bg-${ORDER_STATUS_CONFIG[status as keyof typeof ORDER_STATUS_CONFIG]?.class}`}></div>
            <span className="ms-1">{ORDER_STATUS_CONFIG[status as keyof typeof ORDER_STATUS_CONFIG]?.displayName}.</span>
    </>
}

export default StatusPill;