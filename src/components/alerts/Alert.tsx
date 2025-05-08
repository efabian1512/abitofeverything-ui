import { AlertTypes } from "./alert-types";

const Alert = ({ message, type, textCenter }: {message: string, type: AlertTypes,  textCenter?: boolean}) => {
    return <div style={{wordBreak: 'break-word'}} className={`mt-2 alert alert-${type} ${textCenter ? 'text-center': ''}`} role="alert">
       {message}
</div>
}

export default Alert;