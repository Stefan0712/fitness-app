import { getDateFromTimestamp, getHourFromTimestamp } from '../../../../helpers';
import { IconLibrary } from '../../../../IconLibrary';
import styles from './LogsHistory.module.css';
import React from 'react';

interface Log{
    id: string,
    timestamp: string,
    type: string,
    name: string,
    icon: string,
    data: {
        value: number;
        time: string;
        description: string;
        name: string;
        unit: string;
    }
}
interface ViewGoalLogProps {
    logData: Log;
    closeLog: ()=>void;
}
const ViewGoalLog: React.FC<ViewGoalLogProps> = ({logData, closeLog}) => {
    console.log(logData)
    return ( 
        <div className={styles['view-goal-log']}>
            <div className={styles.top}>
                <h3>View Log</h3>
                <button className='clear-button' onClick={closeLog}><img className='small-icon' src={IconLibrary.Close} alt='close log' /></button>
            </div>
            <div className={styles['log-container']}>
                <div className={styles.meta}>
                    <div className={styles['log-name']}>
                        <img src={logData.icon} className='small-icon' alt=''/>
                        <h3>{logData.data.name}</h3>
                    </div>
                    <p className={styles['log-timestamp']}>{getDateFromTimestamp(logData.timestamp)} at {getHourFromTimestamp(logData.timestamp)}</p>
                </div>
                <div className={styles['goal-log-details']}>
                    <div className={styles.infoBlock}>
                        <label>Logged at</label>
                        <p className={styles.infoBlockValue}>{logData.data.time}</p>
                    </div>
                    <div className={styles.infoBlock}>
                        <label>Value</label>
                        <p className={styles.infoBlockValue}>{logData.data.value || "Unset"}</p>
                    </div>
                    <div className={styles.infoBlock}>
                        <label>Unit</label>
                        <p className={styles.infoBlockValue}>{logData.data.unit || "Unset"}</p>
                    </div>
                </div>
                <div className={styles.description}>
                    <label>Description</label>
                    <p className={styles.infoBlockValue}>{logData.data.description || "No description"}</p>
                </div>
            </div>
        </div>
     );
}
 
export default ViewGoalLog;