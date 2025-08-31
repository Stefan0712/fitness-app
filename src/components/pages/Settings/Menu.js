import { Link } from 'react-router-dom';
import { IconLibrary } from "../../../IconLibrary.js";
import styles from './Menu.module.css';
import { getUser, logoutUser } from '../../../auth.ts';
import NoSleep from 'nosleep.js';
import {useUI} from '../../../context/UIContext.jsx';

const Settings = ({closeSettings}) => {

    const isLoggedIn = localStorage.getItem('userId') ? true : false;
    const loggedUser = getUser();
    const {showMessage} = useUI();
    
    const noSleep = new NoSleep();

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            showMessage('Enabled fullscreen mode', "success")
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                showMessage('Disabled fullscreen mode', "success")
            }
        }
    };
    const handleLogout = () =>{
        const logoutStatus = logoutUser();
        if(logoutStatus.local && logoutStatus.api){
            showMessage("Logged out succesfully", 'success');
        }else if(logoutStatus.local && !logoutStatus.api){
             showMessage("Logged out locally but not from API");
        }else if(logoutStatus.api && !logoutStatus.local){
            showMessage("Logged out from the API but not locally");
        }else {
            showMessage("Logout failed", "error");
        }
    }
    return ( 
        <div className={styles.sideMenu}>
            <div className={styles.top}>
                <img className={styles.profileImage} src={IconLibrary.ProfilePlaceholder} alt='' /> 
                {isLoggedIn ? <div className={styles.userInfo}>
                    <h3>{localStorage.getItem('username')}</h3>
                    <p>{localStorage.getItem('role')}</p>
                </div> : loggedUser ? <div className={styles.userInfo}>
                    <h3>{loggedUser.username}</h3>
                    <p>{loggedUser.role}</p>
                </div> : <div className={styles.userInfo}><h3>Login</h3></div>}
                <Link onClick={closeSettings} to={'/settings'}><img className={styles.menuIcon} src={IconLibrary.Settings} alt='' /></Link>
            </div>
            <div className={styles.container}>
                <Link className={styles.menuButton} onClick={closeSettings} to={'/profile'}><img className={styles.menuIcon} src={IconLibrary.Profile} alt='' /> Profile</Link>
                <Link className={styles.menuButton} onClick={closeSettings} to={'/equipment'}><img className={styles.menuIcon} src={IconLibrary.Equipment} alt='' /> Equipment </Link>
                <Link className={styles.menuButton} onClick={closeSettings} to={'/goals'}><img className={styles.menuIcon} src={IconLibrary.Goals} alt='' /> Goals </Link>
                <Link className={styles.menuButton} onClick={closeSettings} to={'/muscles'}><img className={styles.menuIcon} src={IconLibrary.Muscle} alt='' /> Muscles </Link>
                <Link className={styles.menuButton} onClick={closeSettings} to={'/tags'}><img className={styles.menuIcon} src={IconLibrary.Tags} alt='' /> Tags </Link>
                <Link className={styles.menuButton} onClick={closeSettings} to={'/default-fields'}><img className={styles.menuIcon} src={IconLibrary.Fields} alt='' /> Fields</Link>
                <Link className={styles.menuButton} onClick={closeSettings} to={'/about'}><img className={styles.menuIcon} src={IconLibrary.Help} alt='' /> Help</Link>
                <Link className={styles.menuButton} onClick={closeSettings} to={'/sync'}><img className={styles.menuIcon} src={IconLibrary.Sync} alt='' /> Sync</Link>
                {isLoggedIn ? <button className={styles.menuButton} onClick={handleLogout}><img className={styles.authIcon} src={IconLibrary.Logout} alt='' /> Logout</button> : <Link onClick={closeSettings} to={'/auth'} className={styles.menuButton}> <img className={styles.settingButtonIcon} src={IconLibrary.Login} alt='' />Login</Link>}
            </div>
            <div className={styles.appVersion}>v0.1.4 - 31-08-2025 12:39</div>
           <div className={styles.bottom}>
                <button className={'clear-button'} onClick={toggleFullscreen}>
                    <img src={IconLibrary.EnableFullscreen} style={{width: '30px', height: '30px'}} alt='toggle fullscreen' />
                </button>
                <button className='clear-button' onClick={noSleep.enabled ? ()=>(noSleep.disable(), showMessage("Disabled Keep screen awake", "success")) : ()=>(noSleep.enable(), showMessage("Enabled Keep screen awake", "success"))}>
                    <img src={noSleep.enabled ? IconLibrary.EnabledAwake : IconLibrary.DisabledAwake} style={{width: '30px', height: '30px'}} alt='toggle keep screen awake' />
                </button>
                
                <button className={`clear-button ${styles.closeButton}`} onClick={closeSettings}>
                    <img src={IconLibrary.BackArrow} style={{width: '30px', height: '30px'}} alt='close menu' />
                </button>
           </div>
        </div>
     );
}
 
export default Settings;