import { useEffect, useState } from "react";
import { confirmUserAccount } from "../../services/UserService";
import { useSearchParams, Link } from 'react-router-dom';
import Alert from '../alerts/Alert';
import './UserConfirmation.css';
import { AlertTypes } from "../alerts/alert-types";


const UserConfitmation = () => {

    const [confirmationMessage, setConfirmationMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if(searchParams.get('token')) {
             confirmUserAccount(searchParams.get('token')).then(resp => {
                 setConfirmationMessage(resp.data);
                })
             .catch(error => {
                 console.log(error);
                 if(error.response && error?.response?.data) {
                     if(error?.response?.data?.message.includes('is not valid')) 
                     setErrorMessage("Esta cuenta ya ha sido verificada.")
                 } else {
                    if(error.detail) {
                     setErrorMessage(error.detail)
                 }
                 }
                 
                });
        }
    }, [searchParams]);
    
    return (
        <div className="user-confirmation-container d-flex justify-content-center">
           <div className="mt-3" style={{width: '80vw'}}>
               {confirmationMessage && !errorMessage && 
               <div className="d-flex flex-column gap-2">
                   <Alert message={confirmationMessage} textCenter={true} type={AlertTypes.SUCCESS}/>
                    <Link className="text-decoration-none text-info text-center" to="/login">Click aqui para ir a inicio de sesion</Link>
               </div>
               }
               {errorMessage && <Alert message={errorMessage} textCenter={true} type={AlertTypes.ERROR}/>}
           </div>
        </div>
    )
}

export default UserConfitmation
