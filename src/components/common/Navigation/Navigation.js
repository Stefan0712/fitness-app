// Navigation Bar component
// It is always visible at the bottom of the page so I placed Log screen inside of this to make sure they will be visible across the entire app
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Navigation.module.css';
import {IconLibrary} from '../../../IconLibrary';
import QuickMenu from '../QuickMenu/QuickMenu';
import ExerciseLog from '../LogPages/ActivityLog.tsx';
import FoodLog from '../FoodLog/FoodLog.tsx';
import Menu from '../../pages/Settings/Menu.js';
import { useUI } from '../../../context/UIContext.jsx';


const Navigation = () => {

    const {showConfirmationModal} = useUI();
    const navigate = useNavigate();

    const [showQuickmenu, setShowQuickmenu] = useState(false)
    const [showFoodLog, setShowFoodLog] = useState(false);
    const [showExerciseLog, setShowExerciseLog] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
   
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
    }

    // Will check if it's the first time when the user uses the app. If it's their first time, they will be prompted to go and complete a basic profile
    // useEffect(()=>{
    //     const userData = localStorage.getItem('user');
    //     if(!userData){
    //         showConfirmationModal({title: "First time?", message: "Do you want to create a local account? It is not required but it will enhance your experience", onConfirm: ()=>navigate('/get-started')})
    //     }
    // },[]);

    return ( 
        <nav>
            {showExerciseLog ? <ExerciseLog closeMenu={closeExerciseLogs}/> : null}
            {showFoodLog ? <FoodLog closeMenu={closeFoodLogs}/> : null}
            {showSettings ? <Menu closeSettings={()=>setShowSettings(false)} /> : null}
            {showQuickmenu ? <QuickMenu closeQuickMenu={closeQuickmenu} openFoodLogs={openFoodLogs} openExerciseLogs={openExerciseLogs} /> : null}
            <Link to='/dashboard' onClick={closeAll} className={styles['nav-button']}>
                <img src={IconLibrary.Home} alt=''></img>
                <p>Home</p>
            </Link>
            <Link to='/library' onClick={closeAll}  className={styles['nav-button']}>
                <img src={IconLibrary.Library} alt=''></img>
                <p>Library</p>
            </Link>
            <button type='button' className={`${styles['nav-button']} ${styles.center}`} onClick={()=>setShowQuickmenu(!showQuickmenu)}>
                <img src={showQuickmenu ? IconLibrary.Close : IconLibrary.Add} alt='' />
            </button>
            <Link to='/logs'  onClick={closeAll} className={styles['nav-button']}>
                <img src={IconLibrary.Activity} alt=''></img>
                <p>Activity</p>
            </Link>
            <button onClick={()=>setShowSettings(prev=>!prev)} className={styles['nav-button']}>
                <img src={IconLibrary.Menu} alt=''></img>
                <p>Menu</p>
            </button>
        </nav>
        );
      
}
 
export default Navigation;