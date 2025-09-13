// Navigation Bar component
// It is always visible at the bottom of the page so I placed Log screen inside of this to make sure they will be visible across the entire app
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
    const [showLibraryMenu, setShowLibraryMenu] = useState(false);
   
    const closeQuickmenu = () =>{
        setShowQuickmenu(false);
    }
    const openFoodLogs = () =>{
        setShowFoodLog(true);
        setShowQuickmenu(false);
    }
    const openExerciseLogs = () =>{
        setShowExerciseLog(true);
        setShowQuickmenu(false);
    }
    const closeFoodLogs = () =>{
        setShowFoodLog(false)
    }
    const closeExerciseLogs = () =>{
        setShowExerciseLog(false)
    }
    // Used to close everything when the user clicks on a link
    const closeAll = () =>{
        closeExerciseLogs();
        closeFoodLogs();
        closeQuickmenu();
        setShowLibraryMenu(false);
    }

    return ( 
        <nav>
            {showExerciseLog ? <ExerciseLog closeMenu={closeExerciseLogs}/> : null}
            {showFoodLog ? <FoodLog closeMenu={closeFoodLogs}/> : null}
            {showQuickmenu ? <QuickMenu closeQuickMenu={closeQuickmenu} openFoodLogs={openFoodLogs} openExerciseLogs={openExerciseLogs} /> : null}
            {showLibraryMenu ? <LibraryMenu close={()=>setShowLibraryMenu(false)} /> : null}
            {showUserMenu ? <UserMenu close={()=>setShowUserMenu(false)} /> : null}
            <Link to='/dashboard' onClick={closeAll} className={styles['nav-button']}>
                <img src={IconLibrary.Home} alt=''></img>
                <p>Home</p>
            </Link>
            <button onClick={()=>{
                    closeAll();
                    setShowLibraryMenu(prev=>!prev);
                }}  
                className={styles['nav-button']}
            >
                <img src={IconLibrary.Library} alt=''></img>
                <p>Library</p>
            </button>
            <button type='button' className={`${styles['nav-button']} ${styles.center}`} onClick={()=>setShowQuickmenu(!showQuickmenu)}>
                <img src={showQuickmenu ? IconLibrary.Close : IconLibrary.Add} alt='' />
            </button>
            <Link to='/logs'  onClick={closeAll} className={styles['nav-button']}>
                <img src={IconLibrary.Activity} alt=''></img>
                <p>Activity</p>
            </Link>
            <button onClick={()=>setShowUserMenu(prev=>!prev)} className={styles['nav-button']}>
                <img src={IconLibrary.Menu} alt='' /> 
                <p>Menu</p>
            </button>
        </nav>
        );
      
}
 
export default Navigation;


const LibraryMenu = ({close}) => {
    return(
        <div className={styles.libraryMenu}>
            <div className={styles.bg} onClick={close}/>
            <div className={styles.menuContainer}>
                <Link to={'/exercises-library'} className={styles.libraryMenuBtn} onClick={close}>
                    <p>My Exercises</p>
                    <img src={IconLibrary.Exercise} alt='' />
                </Link>
                <Link to={'/workouts-library'} className={styles.libraryMenuBtn} onClick={close}>
                    <p>My Workouts</p>
                    <img src={IconLibrary.Workout} alt='' />
                </Link>
                <Link to={'/explore'} className={styles.libraryMenuBtn} onClick={close}>
                    <p>Explore</p>
                    <img src={IconLibrary.List} alt='' />
                </Link>
                <button className={styles.libraryMenuBtn} onClick={close}>
                    <p>Close</p>
                    <img src={IconLibrary.Close} alt='' />
                </button>
            </div>
        </div>
    )
}
