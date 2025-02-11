import styles from './Dashboard.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { IconLibrary } from '../../../IconLibrary';
import { getCurrentDay } from '../../../helpers';


const ActivityComponent = ({isSmallScreen, setMenu}) => {

    const [isActivityExpanded, setIsActivityExpanded] = useState(false);
    const [selectedDate, setSelectedDate] = useState(getCurrentDay());


    const userActivity = useSelector((state)=>state.user.activity[selectedDate]);
    const activity = userActivity?.logs.filter((log)=>log.type==="workout" || log.type==="exercise" || log.type==='activity');


    return ( 
        <div className={styles.section}>
            <div className={styles['summary-card']}>
            <div className={styles['summary-card-header']}>
                    <h2>Activity</h2>
                    <button className={`clear-button ${styles['options-button']}`} onClick={()=>setMenu({title:'Activity', sectionName: 'activity'})}><img className='small-icon' src={IconLibrary.Dots} alt=''></img></button>
                </div>
                <div className={styles["card-content"]}>
                    <div className={styles['card-content-block']}>
                        <p className={styles['block-title']}>Active Time</p>
                        <p className={styles['block-value']}>{activity?.reduce((sum, obj)=> sum + parseInt(obj.data.duration,10), 0) || 0} min</p>
                    </div>
                    <div className={styles['card-content-block']}>
                        <p className={styles['block-title']}>Exercises</p>
                        <p className={styles['block-value']}>{activity?.filter(item=>item.type === 'exercise').length || 0}</p>
                    </div>
                    <div className={styles['card-content-block']}>
                        <p className={styles['block-title']}>Workouts</p>
                        <p className={styles['block-value']}>{activity?.filter(item=>item.type === 'workout').length || 0}</p>
                    </div>
                </div>
            </div>

            <div className={`${styles["section-container"]} ${isActivityExpanded ? styles['expand-history'] : ''} `}>
                <div className={styles['section-header']} onClick={()=>setIsActivityExpanded(isActivityExpanded=>!isActivityExpanded)}>
                    <h3>History</h3>
                    <img src={IconLibrary.Arrow} className={`small-icon ${isSmallScreen ? '' : 'hide'}`} alt='' style={{transform: `rotateZ(${isActivityExpanded ? '90' : '180'}deg)`}}></img>
                </div>
                
            {activity?.length > 0 ? (activity.map((log)=>(
                <div className={styles['activity-item']} key={log.timestamp}>
                    <img src={log.icon} className='small-icon'></img>
                    <p className={styles['activity-name']}>{log.data.name || log.data.workoutData.name}</p> 
                    <p className={styles['activity-duration']}>{log.data.duration} min</p> at
                    <p className={styles['activity-time']}>{log.data.time || log.data.workoutData.time}</p>
                </div>
                ))) : (<h3>No activity</h3>)}
            </div>
        </div>
     );
}
 
export default ActivityComponent;