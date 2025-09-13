import styles from './ActivityComponent.module.css';
import { useEffect, useState } from 'react';
import { getCurrentDay, getHourFromTimestamp } from '../../../helpers';
import { getAllItems } from '../../../db.js';

const ActivityComponent = () => {

    const [isActivityExpanded, setIsActivityExpanded] = useState(false);
    const [userActivity, setUserActivity] = useState([]); // All logs recorded today

    const getUserLogs = async () =>{
        const items = await getAllItems('logs',{date: getCurrentDay()});
        setUserActivity(items.filter(item=>item.type === 'exercise' || item.type === 'workout' || item.type === 'activity')); // Filter only exercises, workout, and activity logs
    };
    useEffect(()=>{
        getUserLogs();
    },[]); // Fetch logs only on the first load
    
    return ( 
        <div className={`${styles.activityModule} ${isActivityExpanded ? styles.expandActivity : ''}`}>
            <div className={styles['summary-card']}>
                <div className={styles['summary-card-header']}>
                    <h2>Activity</h2>
                </div>
                <div className={styles["card-content"]}>
                    <div className={styles['card-content-block']}>
                        <p className={styles['block-title']}>Active Time</p>
                        <p className={styles['block-value']}>{userActivity?.reduce((sum, obj)=> sum + parseInt(obj.duration,10), 0) || 0} min</p>
                    </div>
                    <div className={styles['card-content-block']}>
                        <p className={styles['block-title']}>Exercises</p>
                        <p className={styles['block-value']}>{userActivity?.filter(item=>item.type === 'exercise').length || 0}</p>
                    </div>
                    <div className={styles['card-content-block']}>
                        <p className={styles['block-title']}>Workouts</p>
                        <p className={styles['block-value']}>{userActivity?.filter(item=>item.type === 'workout').length || 0}</p>
                    </div>
                </div>
            </div>
            <div className={styles.lastLog}>
                {userActivity && userActivity.length > 0 ? <p>{userActivity[userActivity.length - 1].title} at {getHourFromTimestamp(userActivity[userActivity.length - 1].timestamp)} for {userActivity[userActivity.length - 1].duration} minutes</p> : <p>No logs today</p>}
            </div>
        </div>
     );
}
 
export default ActivityComponent;