import styles from './History/History.module.css';
import {getHourFromTimestamp, makeDateNice} from '../../../helpers';
import { useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import { deleteItem } from '../../../db';
import { useUI } from '../../../context/UIContext';

const GoalLogBody = ({log, refreshLogs}) => {


    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const {showMessage} = useUI();

    const handleDelete = async () =>{
        await deleteItem('logs', log._id);
        showMessage("Log deleted successfully", 'success');
        refreshLogs();
    }
    return ( 
        <div className={`${styles["log-body"]}`} key={log.timestamp} onClick={()=>setShowDeleteButton(prev=>!prev)}>
            <p className={styles.name}>{log.data.name || 'Food log'}</p>
            <div className={styles.date}>Logged at {getHourFromTimestamp(log.timestamp)} on {makeDateNice(log.timestamp)}</div>
            <div className={styles.value}><p>{log.data.value}</p> <p>{log.data.unit}</p></div>
            {showDeleteButton ? <button type='button' onClick={handleDelete} className={styles.deleteLogBtn}><img src={IconLibrary.Delete} alt='delete log' /></button> : null}
        </div>
     );
}
 
export default GoalLogBody;