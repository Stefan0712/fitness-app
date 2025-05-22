import { makeDateNice } from '../../../helpers';
import FoodLogInfo from './FoodLogInfo';
import styles from './LogItem.module.css';
import { useState } from 'react';



const LogItem = ({data, timestamp}) => {
    

    const [isExpanded, setIsExpanded] = useState(false)
    
    const handleClose = (e) =>{
        e.stopPropagation();
        setIsExpanded(false);
    }
    const handleOpen = () =>{
        setIsExpanded(true);
    }
    return ( 
        <div className={`${styles.log}`} onClick={handleOpen}>
            <div className={styles.header}>
                <h3 className={styles.name}>{data.name}</h3>
                <p className={styles.qty}>{data.qty || ''} {data.unit || ''}</p>
            </div>
            <div className={styles.info}>
                <p className={styles.date}>{data.time} on {makeDateNice(timestamp)}</p>
                <p>{data.notes || 'No notes'}</p>
            </div>
            {isExpanded ? <FoodLogInfo data={data} close={handleClose}/> : null}
        </div>
     );
}
 
export default LogItem;