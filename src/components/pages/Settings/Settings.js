import { Link } from 'react-router-dom';
import { reset } from '../../../store/userSlice';
import { IconLibrary } from "../../../IconLibrary";
import { useDispatch } from 'react-redux';
import styles from './Settings.module.css';


const Settings = ({closeSettings}) => {



    const dispatch = useDispatch();
    


    const handleStoreReset = () =>{
        dispatch(reset());
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
            <Link to={'/fields'}>Fields </Link>
            <Link to={'/equipment'}>Equipment </Link>
            <Link to={'/tags'}>Tags </Link>
            </div>
            <button key={'reset-button'} className='orange-button large-button' onClick={handleStoreReset}>Reset Store</button>
        </div>
     );
}
 
export default Settings;