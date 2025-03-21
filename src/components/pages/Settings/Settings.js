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
                <img onClick={closeSettings} src={IconLibrary.Arrow} style={{transform: 'rotateX(180deg)'}} alt='close settings'></img>
                <h1>Menu</h1>
            </div>
            <div className={styles.container}>
                <h3 className={styles.category}>Personal</h3>
                <Link to={'/profile'}>Profile </Link>
                <Link to={'/edit-profile'}>Edit Profile </Link>
                <Link to={'/'}>Bookmarks</Link>
                <Link to={'/'}>My Posts</Link>
                <Link to={'/'}>Logout</Link>
                <h3 className={styles.category}>Custom Items</h3>
                <Link to={'/'}>Equipment </Link>
                <Link to={'/'}>Tags </Link>
                <h3 className={styles.category}>Explore</h3>
                <Link to={'/'}>Workouts</Link>
                <Link to={'/'}>Exercises</Link>
                <Link to={'/'}>Guides</Link>
                <h3 className={styles.category}>More</h3>
                <Link to={'/'}>App Settings</Link>
                <Link to={'/'}>About</Link>
                <Link to={'/'}>Contact</Link>
                <button key={'reset-button1'} className={styles['setting']} onClick={handleStoreReset}>Reset Store</button>
                <button key={'reset-button2'} className={styles['setting']} onClick={handleResetProfile}>Reset Profile</button>
            </div>
            
        </div>
     );
}
 
export default Settings;