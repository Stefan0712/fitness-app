import styles from './ActivityComponent.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconLibrary } from '../../../IconLibrary';
import { getCurrentDay, getHourFromTimestamp } from '../../../helpers';
import { updateDashboardLayout } from '../../../store/userSlice.ts';
import { getAllItems } from '../../../db.js';

const ActivityComponent = ({isSmallScreen, showMessage}) => {
    const dispatch = useDispatch();

    const dashboardSections = useSelector((state)=>state.user.dashboardSections);
    const [showMenu, setShowMenu] = useState(false);
    const [isActivityExpanded, setIsActivityExpanded] = useState(false);
    const [userActivity, setUserActivity] = useState([]);

    const getUserLogs = async () =>{
        const items = await getAllItems('logs',{date: getCurrentDay()});
        setUserActivity(items.filter(item=>item.type === 'exercise' || item.type === 'workout' || item.type === 'activity'));
    };
    useEffect(()=>{
        getUserLogs();
    },[])

    const hideModule = () =>{
        dispatch(updateDashboardLayout(dashboardSections.filter(item=>item.identifier != 'activity')));
        showMessage({message: "Activity was hidden", type: 'success'});
    }

    return ( 
        <div className={`${styles.activityModule} ${isActivityExpanded ? styles.expandActivity : ''}`}>
            {showMenu ? (
                <div className={styles.menu}>
                    <button type='button' className='clear-button' onClick={hideModule}>Hide</button>
                    <button type='button' className='clear-button' onClick={()=>setShowMenu(false)}>Cancel</button>
                </div>
            ):null}
            <div className={styles['summary-card']}>
                <div className={styles['summary-card-header']}>
                    <h2>Activity</h2>
                    <button className={`clear-button ${styles['options-button']}`} onClick={()=>setShowMenu(true)}><img className='small-icon' src={IconLibrary.Hide} alt=''></img></button>
                </div>
                <div className={styles["card-content"]}>
                    <div className={styles['card-content-block']}>
                        <p className={styles['block-title']}>Active Time</p>
                        <p className={styles['block-value']}>{userActivity?.reduce((sum, obj)=> sum + parseInt(obj.data.duration,10), 0) || 0} min</p>
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
            <div className={`${styles["section-container"]} ${isActivityExpanded ? styles['expand-history'] : ''} `}>
                <div className={styles['section-header']} onClick={()=>setIsActivityExpanded(isActivityExpanded=>!isActivityExpanded)}>
                    <h3>History</h3>
                    <img src={IconLibrary.Arrow} className={`small-icon ${isSmallScreen ? '' : 'hide'}`} alt='' style={{transform: `rotateZ(${isActivityExpanded ? '90' : '180'}deg)`}}></img>
                </div>
                <div className={styles.tableHeader}>
                    <p></p>
                    <p>Name</p>
                    <p>Duration</p>
                    <p>Time</p>
                </div>
                {userActivity?.length > 0 ? (userActivity.map((log)=>(
                    <div className={styles['activity-item']} key={log.timestamp}>
                        <img src={log.icon} className='small-icon'></img>
                        <p className={styles['activity-name']}>{log.data.name || log.data.workoutData.name}</p> 
                        <p className={styles['activity-duration']}>{log.data.duration}</p>
                        <p className={styles['activity-time']}>{getHourFromTimestamp(log.timestamp)}</p>
                    </div>
                ))) : (<h3>No activity</h3>)}
            </div>
        </div>
     );
}
 
export default ActivityComponent;