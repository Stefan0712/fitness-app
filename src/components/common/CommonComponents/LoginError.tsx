
import styles from './LoginError.module.css';
import { Link } from 'react-router-dom';

const LoginError = () => {
    return ( 
        <div className={styles.loginError}>
            <h3>You must login to access this page</h3>
            <Link to={'/auth'} className={styles.loginButton}>Login</Link>
        </div>
     );
}
 
export default LoginError;