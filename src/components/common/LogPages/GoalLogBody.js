import styles from './History/History.module.css';

const GoalLogBody = ({log, getCurrentTime, unit, selectLog, percentage, selectedLog}) => {
    return ( 
        <div className={`${styles["log-body"]} ${selectedLog?.id === log.id ? styles['selected-log'] : ''}`} key={log.timestamp} onClick={()=>selectLog({id: log.id, timestamp: log.timestamp})}>
            <div className={styles.hour}>{getCurrentTime(log.timestamp)}</div>
            <p className={styles.name}>{log.data.name || 'Food log'}</p>
            <p className={styles.percentage}>{percentage.toFixed(1)}%</p>
            <div className={styles.value}><p>{log.data.value}</p> <p>{unit}</p></div>
        </div>
     );
}
 
export default GoalLogBody;