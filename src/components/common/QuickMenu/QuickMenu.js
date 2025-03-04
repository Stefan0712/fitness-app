import styles from './QuickMenu.module.css';
import { useState, useRef, useEffect } from 'react';
import { IconLibrary } from '../../../IconLibrary';


const QuickMenu = ({closeQuickmenu, openGoals, openStopwatch, openExerciseLogs, openFoodLogs}) => {

    const [selectedScreen, setSelectedScreen] = useState('menu')
    const quickMenuRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (event) => {
            // If the click was outside the quick menu, close it
            if (quickMenuRef.current && !quickMenuRef.current.contains(event.target)) {
                closeQuickmenu();
            }
        };

        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return ( 
        <div className={styles["quick-menu"]} ref={quickMenuRef}>             
            <button className={styles['quick-button']} onClick={openStopwatch}>
                <img src={IconLibrary.Stopwatch} alt=''></img>
                <p>Stopwatch</p>
            </button>
            <button className={styles['quick-button']} onClick={openFoodLogs} key={"food"}>
                <img src={IconLibrary.Food} alt=''></img>
                <p>Log Food</p>
            </button>
            <button className={styles['quick-button']} onClick={openExerciseLogs} key={'exercise'}>
                <img src={IconLibrary.Exercise} alt=''></img>
                <p>Log Exercise</p>
            </button>
            <button className={styles['quick-button']} onClick={openGoals} key={'exercise'}>
                <img src={IconLibrary.Goals} alt=''></img>
                <p>Goals</p>
            </button> 
            <button className={`${styles['quick-button']} ${styles['close-button']}`} onClick={closeQuickmenu}>
                <p>Close</p>
            </button> 
        </div>
    );
}
 
export default QuickMenu;