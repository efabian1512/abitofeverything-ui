import { useEffect } from 'react';
import styles from './ConfirmationEmail.module.css';
import { Link } from 'react-router-dom';


const ConfirmationEmail = () => {

    useEffect(() => {
     return () => localStorage.removeItem('email');
    },[]);

    const email = localStorage.getItem('email');
    return <div className={styles['container']}>
            <p>A confimation link has been sent to {email}, please verify to complete registration proccess.</p>
            <p><Link className={styles['login-link'] + ' btn btn-primary'} to="/login">Go to login</Link></p>
        </div>
}

export default ConfirmationEmail;