import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './Navigation.module.css';
import {IconLibrary} from '../../../IconLibrary';
import QuickMenu from '../QuickMenu/QuickMenu';
import ExerciseLog from '../LogPages/ActivityLog.tsx';
import FoodLog from '../FoodLog/FoodLog.tsx';
import UserMenu from './UserMenu/UserMenu.tsx';


const Navigation = () => {
    const [showQuickmenu, setShowQuickmenu] = useState(false)
    const [showFoodLog, setShowFoodLog] = useState(false);
    const [showExerciseLog, setShowExerciseLog] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
   
    const openFoodLogs = () =>{
        setShowFoodLog(true);
        setShowQuickmenu(false);
    }
    const openExerciseLogs = () =>{
        setShowExerciseLog(true);
        setShowQuickmenu(false);
    }
    const toggleUserMenu = () =>{
        setShowQuickmenu(false);
        setShowUserMenu(prev=>!prev);
    }
    const toggleQuickMenu = () =>{
        setShowUserMenu(false);
        setShowQuickmenu(prev=>!prev);
    }

    // Used to close everything when the user clicks on a link
    const closeAll = () =>{
        setShowExerciseLog(false)
        setShowFoodLog(false)
        setShowQuickmenu(false);
        setShowUserMenu(false);
    }
    return ( 
        <nav>
            {showExerciseLog ? <ExerciseLog closeMenu={()=>setShowExerciseLog(false)}/> : null}
            {showFoodLog ? <FoodLog closeMenu={()=>setShowFoodLog(false)}/> : null}
            {showQuickmenu ? <QuickMenu closeQuickMenu={()=>setShowQuickmenu(false)} openFoodLogs={openFoodLogs} openExerciseLogs={openExerciseLogs} /> : null}
            {showUserMenu ? <UserMenu close={()=>setShowUserMenu(false)} /> : null}

                
            <Link to='/dashboard' onClick={closeAll} className={styles['nav-button']}>
                <img src={IconLibrary.Home} alt=''></img>
                <p>Home</p>
            </Link>
            <Link to='/library' onClick={closeAll} className={styles['nav-button']}>
                <img src={IconLibrary.Library} alt=''></img>
                <p>Library</p>
            </Link>
            <button type='button' className={`${styles['nav-button']} ${styles.center}`} onClick={toggleQuickMenu}>
                <img src={showQuickmenu ? IconLibrary.Close : IconLibrary.Add} alt='' />
            </button>
            <Link to='/logs'  onClick={closeAll} className={styles['nav-button']}>
                <img src={IconLibrary.Activity} alt=''></img>
                <p>Activity</p>
            </Link>
            <button onClick={toggleUserMenu} className={styles['nav-button']}>
                <img src={IconLibrary.Menu} alt='' /> 
                <p>Menu</p>
            </button>
        </nav>
        );
      
}
 
export default Navigation;