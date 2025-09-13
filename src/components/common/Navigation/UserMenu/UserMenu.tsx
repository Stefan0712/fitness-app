import { Link } from 'react-router-dom';
import { getUser, logoutUser } from '../../../../auth';
import { useUI } from '../../../../context/UIContext';
import { IconLibrary } from '../../../../IconLibrary';
import styles from './UserMenu.module.css';
import NoSleep from 'nosleep.js'
import { useState } from 'react';
import Toggle from '../../Toggle/Toggle';


const UserMenu = ({close}) => {
    const isLoggedIn = localStorage.getItem('userId') ? true : false;
    const loggedUser = getUser();
    const {showMessage} = useUI();
    const noSleep = new NoSleep();
    const [keepScreenAwakeOn, setKeepScreenAwakeOn] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleLogout = async () =>{
        const logoutStatus = await logoutUser();
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

    const enableFulscreen = () =>{
        document.documentElement.requestFullscreen();
        showMessage('Enabled fullscreen mode', "success");
        setIsFullscreen(true);
    }
    const disableFulscreen = () =>{
        document.exitFullscreen();
        showMessage('Disabled fullscreen mode', "success");
        setIsFullscreen(false);
    }
    const enableKeepScreenAwake = () =>{
        showMessage("Enabled Keep screen awake", "success");
        setKeepScreenAwakeOn(true);
    }
    const disableKeepScreenAwake = () =>{
        showMessage("Disabled Keep screen awake", "success");
        setKeepScreenAwakeOn(false);
    }
    return (
        <div className={styles.userMenu}>
            <h3>Menu</h3>
           <div className={styles.container}>
                <Link className={styles.menuButton} onClick={close} to={'/profile'}>
                    <img className={styles.menuIcon} src={IconLibrary.Profile} alt='' /> 
                    <p>Profile</p>
                    <img className='small-icon' src={IconLibrary.Arrow} alt='' />
                </Link>
                <Link className={styles.menuButton} onClick={close} to={'/equipment'}>
                    <img className={styles.menuIcon} src={IconLibrary.Equipment} alt='' /> 
                    <p>Equipment</p> 
                    <img className='small-icon' src={IconLibrary.Arrow} alt='' />
                </Link>
                <Link className={styles.menuButton} onClick={close} to={'/goals'}>
                    <img className={styles.menuIcon} src={IconLibrary.Goals} alt='' /> 
                    <p>Goals</p>
                    <img className='small-icon' src={IconLibrary.Arrow} alt='' />
                </Link>
                <Link className={styles.menuButton} onClick={close} to={'/muscles'}>
                    <img className={styles.menuIcon} src={IconLibrary.Muscle} alt='' /> 
                    <p>Muscles</p>
                    <img className='small-icon' src={IconLibrary.Arrow} alt='' />
                </Link>
                <Link className={styles.menuButton} onClick={close} to={'/tags'}>
                    <img className={styles.menuIcon} src={IconLibrary.Tags} alt='' /> 
                    <p>Tags</p>
                    <img className='small-icon' src={IconLibrary.Arrow} alt='' />
                </Link>
                <Link className={styles.menuButton} onClick={close} to={'/default-fields'}>
                    <img className={styles.menuIcon} src={IconLibrary.Fields} alt='' /> 
                    <p>Fields</p>
                    <img className='small-icon' src={IconLibrary.Arrow} alt='' />
                </Link>
            </div>
            <div className={styles.bottom}>
                <div className={styles.menuButton} style={{gridTemplateColumns: '20px 1fr 50px'}}>
                    <img className={styles.menuIcon} src={keepScreenAwakeOn ? IconLibrary.EnabledAwake : IconLibrary.DisabledAwake} alt='' />
                    <p>Keep Screen Awake</p>
                    <Toggle isActive={keepScreenAwakeOn} turnOn={enableKeepScreenAwake} turnOff={disableKeepScreenAwake} />
                </div>
                <div className={styles.menuButton} style={{gridTemplateColumns: '20px 1fr 50px'}}>
                    <img className={styles.menuIcon} src={ isFullscreen ? IconLibrary.EnableFullscreen : IconLibrary.DisableFullscreen} alt='' />
                    <p>Toggle Fullscreen</p>
                    <Toggle isActive={isFullscreen} turnOn={enableFulscreen} turnOff={disableFulscreen} />
                </div>
                <Link className={styles.menuButton} onClick={close} to={'/settings'}>
                    <img className={styles.menuIcon} src={IconLibrary.Settings} alt='' /> 
                    <p>Settings</p>
                    <img className='small-icon' src={IconLibrary.Arrow} alt='' />
                </Link>
           </div>
            <div className={styles.user}>
                <img className={styles.profileImage} src={IconLibrary.ProfilePlaceholder} alt='' /> 
                {
                    isLoggedIn ? 
                        <div className={styles.userInfo}>
                            <h3>{localStorage.getItem('username')}</h3>
                            <p>{localStorage.getItem('role')}</p>
                        </div> : 
                    loggedUser ? 
                        <div className={styles.userInfo}>
                            <h3>{loggedUser.username}</h3>
                            <p>{loggedUser.role}</p>
                        </div> : 
                    <div className={styles.userInfo}>
                        <h3>Login</h3>
                    </div>
                }
                {isLoggedIn ? 
                    <button className={styles.logoutButton} onClick={handleLogout}>
                        <img className={styles.menuIcon} src={IconLibrary.Logout} alt='' />
                        <p>Logout</p>
                    </button> : 
                    <Link onClick={close} to={'/auth'} className={styles.loginButton}>
                        <img className={styles.menuIcon} src={IconLibrary.Arrow} alt='' />
                    </Link>
                }
            </div>
        </div>
    )
}
 
export default UserMenu;