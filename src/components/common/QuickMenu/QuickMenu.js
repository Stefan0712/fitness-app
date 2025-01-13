import styles from './QuickMenu.module.css';
import { useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';


const QuickMenu = ({closeQuickmenu, openGoals, openStopwatch, openExerciseLogs, openFoodLogs}) => {

    const [selectedScreen, setSelectedScreen] = useState('menu')


    return ( 
        <div className={styles["quick-menu"]}>
            <div className={styles.header}>
                <h2>Quick Menu</h2>
                <button className='clear-button' onClick={closeQuickmenu}>
                    <img className='small-icon' src={IconLibrary.Close} alt=''></img>
                </button>
            </div>
            {selectedScreen === 'menu' ? (

                <div className={styles['quick-menu-screen']}>
                    
                    <button className={styles['quick-button']} onClick={openStopwatch}>
                        <img src={IconLibrary.Stopwatch} alt=''></img>
                        <p>Stopwatch</p>
                    </button>
                    <button className={styles['quick-button']} onClick={openFoodLogs} key={"food"}>
                        <img src={IconLibrary.Food} alt=''></img>
                        <p>Food</p>
                    </button>
                    <button className={styles['quick-button']} onClick={openExerciseLogs} key={'exercise'}>
                        <img src={IconLibrary.Exercise} alt=''></img>
                        <p>Exercise</p>
                    </button>
                    <button className={styles['quick-button']} onClick={openGoals} key={'exercise'}>
                        <img src={IconLibrary.Goals} alt=''></img>
                        <p>Goals</p>
                    </button>
                </div>
            ) : ''}
            
           
        
            
           
            
        </div>
    );
}
 
export default QuickMenu;