import styles from './History.module.css';
import React, { useEffect, useState } from "react";
import { getAllItems } from "../../../../db.js";
import { FoodLog } from "../../interfaces.ts";
import ViewFoodLog from '../../../pages/Activity/LogsHistory/ViewFoodLog/ViewFoodLog.tsx';



const History = () => {
    const [logs, setLogs] = useState<FoodLog[] | null>(null);
    const [selectedLog, setSelectedLog] = useState(null);

    useEffect(()=>{getLogs()},[]);

    const getLogs = async () =>{
        const fetchedLogs = await getAllItems('logs',{date: new Date(), type: 'food'});
        setLogs(fetchedLogs)
    }
    return ( 
        <div className={`${styles["logs-history"]}`}>
            {selectedLog ? <ViewFoodLog logData={selectedLog} closeLog={()=>setSelectedLog(null)} disableBlur={true} /> : null}
            <div className={styles.logsContainer}>
                {logs && logs.length > 0 ? logs.map((log, index)=>(
                    <div className={styles.logItem} key={index} onClick={()=>setSelectedLog(log)}>
                        <b>{log.name}</b>
                        <p>{log.time}</p>
                    </div>
                )) : 'No logs'}
            </div>
        </div>
     );
}
 
export default History;