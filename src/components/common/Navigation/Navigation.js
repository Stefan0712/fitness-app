import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

import styles from './Navigation.module.css';

import {IconLibrary} from '../../../IconLibrary';

import QuickMenu from '../QuickMenu/QuickMenu';
import ExerciseLog from '../LogPages/ExerciseLog.tsx';
import FoodLog from '../FoodLog/FoodLog.tsx';
import Goals from '../Goals/Goals';
import Menu from '../../pages/Settings/Menu.js';


const Navigation = () => {

    const location = useLocation();
    const [showQuickmenu, setShowQuickmenu] = useState(false)

    const [showFoodLog, setShowFoodLog] = useState(false);
    const [showExerciseLog, setShowExerciseLog] = useState(false);
    const [showGoals, setShowGoals] = useState(false);

    
    
    const [showSettings, setShowSettings] = useState(false);
   




    const openQuickmenu = () =>{
        setShowQuickmenu(true);
        console.log("Opened quick menu")
    }
    const closeQuickmenu = () =>{
        setShowQuickmenu(false);
    }
    const openGoals = () =>{
        setShowGoals(true);
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
    const closeGoals = () =>{
        setShowGoals(false)
    }
    const closeFoodLogs = () =>{
        setShowFoodLog(false)
    }
    const closeExerciseLogs = () =>{
        setShowExerciseLog(false)
    }
    const closeAll = () =>{
        console.log('Close function ran')
        closeExerciseLogs();
        closeFoodLogs();
        closeGoals();
        closeQuickmenu();
    }

      if(location.pathname !== '/get-started' && location.pathname !== '/auth'){
        return ( 
            <nav>
                {showGoals ? <Goals closeMenu={closeGoals}/> : null}
                {showExerciseLog ? <ExerciseLog closeMenu={closeExerciseLogs}/> : null}
                {showFoodLog ? <FoodLog closeMenu={closeFoodLogs}/> : null}
                {showSettings ? <Menu closeSettings={()=>setShowSettings(false)} /> : null}
                {showQuickmenu ? <QuickMenu closeQuickmenu={closeQuickmenu} openGoals={openGoals} openFoodLogs={openFoodLogs} openExerciseLogs={openExerciseLogs} /> : null}
                <Link to='/dashboard' onClick={closeAll} className={styles['nav-button']}>
                    <img src={IconLibrary.Home} alt=''></img>
                    <p>Home</p>
                </Link>
                <Link to='/library' onClick={closeAll}  className={styles['nav-button']}>
                    <img src={IconLibrary.List} alt=''></img>
                    <p>Library</p>
                </Link>
                <button type='button' className={`${styles['nav-button']} ${styles.center}`} onClick={()=>setShowQuickmenu(!showQuickmenu)}>
                    <img src={showQuickmenu ? IconLibrary.Close : IconLibrary.Add} alt='' />
                </button>
                <Link to='/logs'  onClick={closeAll} className={styles['nav-button']}>
                    <img src={IconLibrary.Clipboard} alt=''></img>
                    <p>Activity</p>
                </Link>
                <button onClick={()=>setShowSettings(prev=>!prev)} className={styles['nav-button']}>
                    <img src={IconLibrary.Menu} alt=''></img>
                    <p>Menu</p>
                </button>
                
            </nav>
         );
      }
}
 
export default Navigation;