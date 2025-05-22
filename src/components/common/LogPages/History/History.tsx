import styles from './History.module.css';
import GoalLogBody from "../GoalLogBody";
import { useEffect, useState } from 'react';
import { IconLibrary } from '../../../../IconLibrary';
import React from 'react';
import { BaseLog, Goal } from '../../interfaces.ts';
import { deleteItem, getAllItems } from '../../../../db.js';


interface HistoryProps {
    goalData: Goal;
}
const History: React.FC<HistoryProps> = ({goalData}) => {
    

    const [logs, setLogs] = useState<BaseLog[] | null>(null);
    
    const getLogs = async () =>{
        const data: BaseLog[] = await getAllItems('logs',{date: new Date(), type: 'goal', _id: goalData._id});
        if(data){
            setLogs(data);
        }
    }
    useEffect(()=>{getLogs()},[])


    return ( 
        <div className={styles.history}>
            {logs ?
                <div className={styles.container}>
                    {logs && logs.length > 0 ? logs.map((log, index)=>(
                        <GoalLogBody refreshLogs={getLogs} key={'history-log-'+index} log={log} />
                    )): logs.length === 0 ? <p className={styles["no-items-msg"]}>No goals found.</p> : !logs ? <p className={styles["no-items-msg"]}>Loading goals...</p> : null}
                </div>
            : null}
        </div>
     );
}
 
export default History;