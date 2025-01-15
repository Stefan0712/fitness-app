import { Link } from 'react-router-dom';
import { useState } from 'react';

import styles from './Navigation.module.css';

import {IconLibrary} from '../../../IconLibrary';

import QuickMenu from '../QuickMenu/QuickMenu';
import ExerciseLog from '../LogPages/ExerciseLog';
import Stopwatch from '../Stopwatch/Stopwatch';
import FoodLog from '../FoodLog/FoodLog';
import Goals from '../Goals/Goals';



const Navigation = () => {

    const [showQuickmenu, setShowQuickmenu] = useState(false)

    const [showFoodLog, setShowFoodLog] = useState(false);
    const [showExerciseLog, setShowExerciseLog] = useState(false);
    const [showStopwatch, setShowStopwatch] = useState(false);
    const [showGoals, setShowGoals] = useState(false);

   


    const toggleQuickmenu = () =>{
        setShowQuickmenu(true)
    }
    const closeQuickmenu = () => {
        setShowQuickmenu(false)
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
        closeStopwatch();
        closeFoodLogs();
        closeGoals();
        closeQuickmenu();
    }
    return ( 
        <nav>
            {showGoals ? <Goals closeMenu={closeGoals}/> : null}
            {showStopwatch ? <Stopwatch closeMenu={closeStopwatch} /> : null}
            {showExerciseLog ? <ExerciseLog closeMenu={closeExerciseLogs}/> : null}
            {showFoodLog ? <FoodLog closeMenu={closeFoodLogs}/> : null}




            {showQuickmenu ? (<QuickMenu closeQuickmenu={closeQuickmenu} 
            openGoals={openGoals} openFoodLogs={openFoodLogs} openExerciseLogs={openExerciseLogs} openStopwatch={openStopwatch}  />) : ''}
            <Link to='/dashboard' onClick={closeAll} className={styles['nav-button']}>
                <img src={IconLibrary.Home} alt=''></img>
                <p>Home</p>
            </Link>
            <Link to='/library' onClick={closeAll}  className={styles['nav-button']}>
                <img src={IconLibrary.List} alt=''></img>
                <p>Library</p>
            </Link>
            <div className={`${styles['nav-button']} ${styles['center-nav-button']}`} onClick={toggleQuickmenu}>
                <button><img src={IconLibrary.Plus} alt=''></img></button>
            </div>
            <Link to='/logs'  onClick={closeAll} className={styles['nav-button']}>
                <img src={IconLibrary.Clipboard} alt=''></img>
                <p>Activity</p>
            </Link>
            <Link to='/profile' onClick={closeAll} className={styles['nav-button']}>
                <img src={IconLibrary.Profile} alt=''></img>
                <p>Profile</p>
            </Link>
            
        </nav>
     );
}
 
export default Navigation;