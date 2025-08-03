// The Activity Module shows some basic numbers such as the number of exercises done, workouts, and active time, with today's activity logs (which includes workouts, exercises, and activity logs)
// I plan to make add more stats, maybe an average workout/exercise time, average rest time, records broken, etc. (still thinking on this)
import styles from './ActivityComponent.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconLibrary } from '../../../IconLibrary';
import { getCurrentDay, getHourFromTimestamp } from '../../../helpers';
import { updateDashboardLayout } from '../../../store/userSlice.ts';
import { getAllItems } from '../../../db.js';

const ActivityComponent = ({showMessage}) => {
    const dispatch = useDispatch();
    const dashboardSections = useSelector((state)=>state.user.dashboardSections); // Gets the list of enabled dashboard components to check if this one is enabled
    const [showMenu, setShowMenu] = useState(false);
    const [isActivityExpanded, setIsActivityExpanded] = useState(false);
    const [userActivity, setUserActivity] = useState([]); // All logs recorded today

    const getUserLogs = async () =>{
        const items = await getAllItems('logs',{date: getCurrentDay()});
        setUserActivity(items.filter(item=>item.type === 'exercise' || item.type === 'workout' || item.type === 'activity')); // Filter only exercises, workout, and activity logs
    };
    useEffect(()=>{
        getUserLogs();
    },[]); // Fetch logs only on the first load

    // Handles hiding the module
    const hideModule = () =>{
        dispatch(updateDashboardLayout(dashboardSections.filter(item=>item.identifier !== 'activity')));
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
                <div className={styles.lastLog}>
                    {userActivity && userActivity.length > 0 ? <p>{userActivity[userActivity.length - 1].title} at {getHourFromTimestamp(userActivity[userActivity.length - 1].timestamp)} for {userActivity[userActivity.length - 1].duration} minutes</p> : <p>No logs today</p>}
                </div>
            </div>
        </div>
     );
}
 
export default ActivityComponent;