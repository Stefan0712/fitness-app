import { Link } from 'react-router-dom';
import { reset, resetProfile } from '../../../store/userSlice.ts';
import { IconLibrary } from "../../../IconLibrary";
import { useDispatch } from 'react-redux';
import styles from './Settings.module.css';


const Settings = ({closeSettings}) => {



    const dispatch = useDispatch();
    


    const handleStoreReset = () =>{
        dispatch(reset());
        closeSettings();
    }
    const handleResetProfile = () =>{
        dispatch(resetProfile());
        closeSettings();
    }
    return ( 
        <div className={styles["settings-page"]}>
            <div className={styles.header}>
                <img onClick={closeSettings} src={IconLibrary.Arrow} alt='close settings'></img>
                <h1>Settings</h1>
            </div>
            <div className={styles.container}>
               
            <Link to={'/edit-profile'}>Edit Profile </Link>
            <h3 className={styles.category}>Custom Items</h3>
            <Link to={'/equipment'}>Equipment </Link>
            <Link to={'/tags'}>Tags </Link>
            </div>
            <button key={'reset-button'} className='orange-button large-button' onClick={handleStoreReset}>Reset Store</button>
            <button key={'reset-button'} className='orange-button large-button' onClick={handleResetProfile}>Reset Profile</button>
        </div>
     );
}
 
export default Settings;