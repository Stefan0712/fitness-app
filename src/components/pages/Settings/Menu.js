import { Link } from 'react-router-dom';
import { IconLibrary } from "../../../IconLibrary.js";
import styles from './Menu.module.css';
import { logoutUser } from '../../../auth.js';
import NoSleep from 'nosleep.js';


const Settings = ({closeSettings}) => {

    const isLoggedIn = localStorage.getItem('userId') ? true : false;

    
    const noSleep = new NoSleep();
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            // If not in fullscreen, request fullscreen
            document.documentElement.requestFullscreen();
        } else {
            // If in fullscreen, exit fullscreen
            if (document.exitFullscreen) {
            document.exitFullscreen();
            }
        }
    };
    
    return ( 
        <div className={styles["menu-page"]}>
            <div className={styles.header}>
                <img onClick={closeSettings} src={IconLibrary.Arrow} style={{transform: 'rotateX(180deg)'}} alt='close settings'></img>
                <h1>Menu</h1>
            </div>
            <div className={styles.container}>
                <button className={styles.setting} onClick={toggleFullscreen}>
                    <p>Toggle Fullscreen</p>
                </button>
                <button className={`${styles.setting} ${noSleep.enabled ? styles['enabled-awake-button'] : ''}`} onClick={noSleep.enabled ? ()=>noSleep.disable() : ()=>noSleep.enable()}>
                    <p>{`${noSleep.enabled ? 'Screen Awake' : 'Screen Awake'}`}</p>
                </button>
                <h3 className={styles.category}>Personal</h3>
                <Link onClick={closeSettings} to={'/profile'}>Profile </Link>
                <Link onClick={closeSettings} to={'/edit-profile'}>Edit Profile </Link>
                {/* <Link to={'/'}>Bookmarks</Link> */}
                {/* <Link to={'/'}>My Posts</Link> */}
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
                {isLoggedIn ? <button className={styles.setting} onClick={logoutUser}>Logout</button> : <Link to={'/auth'} className={styles.setting} >Login</Link>}
            </div>
        </div>
     );
}
 
export default Settings;