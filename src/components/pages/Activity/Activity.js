
import { getDateForHeader } from "../../../helpers";
import styles from './Activity.module.css';
import { useState } from "react";
import LogsStats from "./LogsStats/LogsStats";
import LogsHistory from "./LogsHistory/LogsHistory";


    //TODO: Add some kind of identifier to goals (eg: lowered case goal name) and use that to filter them
    //TODO: Make it so that it also counts food logs into calories or other macros, or make some kind of quick add button
    //TODO: to food log that counts towards the goal, or maybe move exercises to somewhere else


const Activity = () => {
    const [currentScreen, setCurrentScreen] = useState('stats');


    

    return (
        <div className={`${styles["logs"]} page`}>
            <div className={`header ${styles['page-header']}`}>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Activity</h2>
            </div>
            <div className={styles['toggle-buttons-container']}>
                <button className={`${styles['toggle-button']} ${currentScreen === 'stats' ? styles['selected-button'] : ''}`} onClick={()=>setCurrentScreen('stats')}>Stats</button>
                <button className={`${styles['toggle-button']} ${currentScreen === 'logs' ? styles['selected-button'] : ''}`} onClick={()=>setCurrentScreen('logs')}>Logs</button>
            </div>
            <div className={styles.content}>
                {currentScreen === 'stats' ? <LogsStats /> : currentScreen === "logs" ? <LogsHistory /> : null}
            </div>

               

        </div>
    );
};

export default Activity;
