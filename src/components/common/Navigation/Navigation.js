import { Link } from 'react-router-dom';
import { useState } from 'react';

import styles from './Navigation.module.css';

import {IconLibrary} from '../../../IconLibrary';

import QuickMenu from '../QuickMenu/QuickMenu';
import ExerciseLog from '../LogPages/ExerciseLog.tsx';
import Stopwatch from '../Stopwatch/Stopwatch';
import FoodLog from '../FoodLog/FoodLog.tsx';
import Goals from '../Goals/Goals';
import NoSleep from 'nosleep.js';
import Menu from '../../pages/Settings/Menu.js';


const Navigation = () => {

    const noSleep = new NoSleep();

    const [showQuickmenu, setShowQuickmenu] = useState(false)

    const [showFoodLog, setShowFoodLog] = useState(false);
    const [showExerciseLog, setShowExerciseLog] = useState(false);
    const [showStopwatch, setShowStopwatch] = useState(false);
    const [showGoals, setShowGoals] = useState(false);

    
    
    const [showSettings, setShowSettings] = useState(false);
   




    const openQuickmenu = () =>{
        setShowQuickmenu(true);
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
    const openStopwatch = () =>{
        setShowStopwatch(true);
        setShowQuickmenu(false);
    }
    const closeGoals = () =>{
        setShowGoals(false)
    }
    const closeFoodLogs = () =>{
        setShowFoodLog(false)
    }
    const closeStopwatch = () =>{
        setShowStopwatch(false)
    }
    const closeExerciseLogs = () =>{
        setShowExerciseLog(false)
    }
    const closeAll = () =>{
        closeExerciseLogs();
        closeFoodLogs();
        closeGoals();
        closeQuickmenu();
    }
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
        <nav>
            {showGoals ? <Goals closeMenu={closeGoals}/> : null}
            {showStopwatch ? <Stopwatch closeMenu={closeStopwatch} /> : null}
            {showExerciseLog ? <ExerciseLog closeMenu={closeExerciseLogs}/> : null}
            {showFoodLog ? <FoodLog closeMenu={closeFoodLogs}/> : null}
            {showSettings ? <Menu closeSettings={()=>setShowSettings(false)} /> : null}



            {showQuickmenu ? (<QuickMenu closeQuickmenu={closeQuickmenu} 
            openGoals={openGoals} openFoodLogs={openFoodLogs} openExerciseLogs={openExerciseLogs} openStopwatch={openStopwatch} toggleFullscreen={toggleFullscreen} noSleep={noSleep}  />) : ''}
            <Link to='/dashboard' onClick={closeAll} className={styles['nav-button']}>
                <img src={IconLibrary.Home} alt=''></img>
                <p>Home</p>
            </Link>
            <Link to='/library' onClick={closeAll}  className={styles['nav-button']}>
                <img src={IconLibrary.List} alt=''></img>
                <p>Library</p>
            </Link>
            <div className={`${styles['nav-button']} ${styles['center-nav-button']}`} onClick={openQuickmenu}>
                <button><img src={IconLibrary.Plus} alt='' /></button>
            </div>
            <Link to='/logs'  onClick={closeAll} className={styles['nav-button']}>
                <img src={IconLibrary.Clipboard} alt=''></img>
                <p>Activity</p>
            </Link>
            <button onClick={()=>setShowSettings(true)} className={styles['nav-button']}>
                <img src={IconLibrary.Menu} alt=''></img>
                <p>Menu</p>
            </button>
            
        </nav>
     );
}
 
export default Navigation;