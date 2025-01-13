import FoodLogInfo from './FoodLogInfo';
import styles from './LogItem.module.css';
import { useState } from 'react';



const LogItem = ({data}) => {
    

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
                <p className={styles.name}>{data.name}</p>
                <p className={styles.qty}>{data.qty} {data.unit}</p>
            </div>
            {isExpanded ? <FoodLogInfo data={data} close={handleClose}/> : null}
        </div>
     );
}
 
export default LogItem;