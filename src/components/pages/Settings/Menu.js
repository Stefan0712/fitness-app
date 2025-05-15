import { Link } from 'react-router-dom';
import { IconLibrary } from "../../../IconLibrary.js";
import styles from './Menu.module.css';
import { logoutUser } from '../../../auth.js';


const Settings = ({closeSettings}) => {



    


    
    return ( 
        <div className={styles["menu-page"]}>
            <div className={styles.header}>
                <img onClick={closeSettings} src={IconLibrary.Arrow} style={{transform: 'rotateX(180deg)'}} alt='close settings'></img>
                <h1>Menu</h1>
            </div>
            <div className={styles.container}>
                <h3 className={styles.category}>Personal</h3>
                <Link onClick={closeSettings} to={'/profile'}>Profile </Link>
                <Link onClick={closeSettings} to={'/edit-profile'}>Edit Profile </Link>
                {/* <Link to={'/'}>Bookmarks</Link> */}
                {/* <Link to={'/'}>My Posts</Link> */}
                {/* <Link to={'/'}>Logout</Link> */}
                <h3 className={styles.category}>Custom Items</h3>
                <Link onClick={closeSettings} to={'/'}>Equipment </Link>
                <Link onClick={closeSettings} to={'/'}>Tags </Link>
                <Link onClick={closeSettings} to={'/default-fields'}>Default Fields</Link>
                <h3 className={styles.category}>Explore</h3>
                <Link onClick={closeSettings} to={'/explore'}>Workouts</Link>
                <Link onClick={closeSettings} to={'/explore'}>Exercises</Link>
                {/* <Link to={'/'}>Guides</Link> */}
                <h3 className={styles.category}>More</h3>
                <Link onClick={closeSettings} to={'/settings'}>App Settings</Link>
                <Link onClick={closeSettings} to={'/about'}>About</Link>
                <button className={styles.setting} onClick={logoutUser}>Logout</button>
            </div>
            
        </div>
     );
}
 
export default Settings;