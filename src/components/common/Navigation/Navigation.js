import { Link } from 'react-router-dom';
import { useState } from 'react';

import styles from './Navigation.module.css';

import {IconLibrary} from '../../../IconLibrary';

import QuickMenu from '../QuickMenu/QuickMenu';
import LogForm from '../LogPages/LogForm';
import ExerciseLog from '../LogPages/ExerciseLog';
import Stopwatch from '../Stopwatch/Stopwatch';
import FoodLog from '../FoodLog/FoodLog';



const Navigation = () => {

    const [showQuickmenu, setShowQuickmenu] = useState(false)
    const [logWindow, setLogWindow] = useState(null)

   


    const toggleQuickmenu = () =>{
        setShowQuickmenu(true)
    }
    const closeQuickmenu = () => {
        setShowQuickmenu(false)
    }
    const showLog = (type) =>{
        closeQuickmenu();
        if(type==='food'){
            setLogWindow(<FoodLog closeLogWindow={hideLog}/>)
        }else if(type==='exercise'){
            setLogWindow(<ExerciseLog closeLogWindow={hideLog}/>)
        }else if(type==='stopwatch'){
            setLogWindow(<Stopwatch closeLogWindow={hideLog} />)
        }else{
            setLogWindow(<LogForm type={type} closeLogWindow={hideLog}/>)
        }
    }
    const hideLog = () =>{
        setLogWindow(null);
    }
    return ( 
        <nav>
            {logWindow}
            {showQuickmenu ? (<QuickMenu closeQuickmenu={closeQuickmenu} showLog={showLog} />) : ''}
            <Link to='/dashboard' className={styles['nav-button']}>
                <img src={IconLibrary.Home} alt=''></img>
                <p>Home</p>
            </Link>
            <Link to='/library'  className={styles['nav-button']}>
                <img src={IconLibrary.List} alt=''></img>
                <p>Library</p>
            </Link>
            <div className={`${styles['nav-button']} ${styles['center-nav-button']}`} onClick={toggleQuickmenu}>
                <button><img src={IconLibrary.Plus} alt=''></img></button>
            </div>
            <Link to='/logs'  className={styles['nav-button']}>
                <img src={IconLibrary.Clipboard} alt=''></img>
                <p>Activity</p>
            </Link>
            <Link to='/profile'  className={styles['nav-button']}>
                <img src={IconLibrary.Profile} alt=''></img>
                <p>Profile</p>
            </Link>
            
        </nav>
     );
}
 
export default Navigation;