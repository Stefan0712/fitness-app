import { isLoggedIn } from '../../../auth';
import LoginError from '../../common/CommonComponents/LoginError.tsx';
import styles from './Sync.module.css';
import AppHeader from '../../common/AppHeader/AppHeader.tsx';


const Sync = () => {
    



    if(isLoggedIn()){
        return (
            <div className={styles.sync}>
                <AppHeader title="Sync" />
                <h2>Sync</h2>
            </div>
        )
    }else{
        return (
            <div className={styles.sync}>
                <AppHeader title="Sync" />
                <LoginError />
            </div>
        )
    }
}
 
export default Sync;