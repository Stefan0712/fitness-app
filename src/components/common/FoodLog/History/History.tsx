import LogItem from "../LogItem";
import styles from './History.module.css';
import React, { useEffect, useState } from "react";
import { getAllItems } from "../../../../db.js";
import { FoodLog } from "../../interfaces.ts";
const History = () => {
    const [logs, setLogs] = useState<FoodLog[] | null>(null);

    useEffect(()=>{getLogs()},[]);

    const getLogs = async () =>{
        const fetchedLogs = await getAllItems('logs',{date: new Date(), type: 'food'});
        setLogs(fetchedLogs)
    }
    return ( 
        <div className={`${styles["logs-history"]}`}>
            <div className={styles.logsContainer}>
                {logs && logs.length > 0 ? logs.map((log, index)=>(
                    <LogItem data={log} timestamp={log.timestamp} key={'history-item-'+index} />
                )) : 'No logs'}
            </div>
        </div>
     );
}
 
export default History;