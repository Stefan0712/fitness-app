import styles from './GoalsLog.module.css';
import { formatDate } from '../../../helpers';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import { removeLog } from "../../../store/userSlice";


const GoalLogBody = ({log, getCurrentTime, unit}) => {

    const dispatch = useDispatch();
    const [showDelete, setShowDelete] = useState(false);

    const deleteLog = (log) => {
        dispatch(removeLog(log));
    }

    return ( 
        <div className={styles["log-body"]} key={log.timestamp}>
            <p onClick={()=>setShowDelete(showDelete=>!showDelete)}>{log.data.name || 'Food log'} on {formatDate(log.timestamp)} at {getCurrentTime(log.timestamp)}</p>
            <div className={styles.value}><p>{log.data.value}</p> <p>{unit}</p></div>
            {showDelete ? <button onClick={()=>deleteLog(log)} className={`clear-button ${styles['delete-log-button']}`}><img className="small-icon" src={IconLibrary.Close}></img></button> : null}
        </div>
     );
}
 
export default GoalLogBody;