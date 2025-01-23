import { getDateForHeader, getCurrentDay, makeDateNice } from '../../../helpers';
import styles from './Dashboard.module.css'; 
import { useState } from 'react';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import ProgressCircle from '../../common/ProgressCircle/ProgressCircle';
import { IconLibrary } from '../../../IconLibrary';



const Dashboard = () => {

    const [selectedDate, setSelectedDate] = useState(getCurrentDay());

    const [shownSections, setShownSections] = useState(['goals','activity','nutrition']);

    const dispatch = useDispatch();
    const userActivity = useSelector((state)=>state.user.activity[selectedDate]);
    const allActivity = useSelector((state)=>state.user.activity);
    const userGoals = useSelector((state)=>state.user.userData.goals);


    const [isGoalsExpanded, setIsGoalsExpanded] = useState(false);
    const [isActivityExpanded, setIsActivityExpanded] = useState(false);
    const [isNutritionExpanded, setIsNutritionExpanded] = useState(false);

    const [menu, setMenu] = useState(null);

    
    const activity = userActivity?.logs.filter((log)=>log.type==="workout" || log.type==="exercise" || log.type==='activity');




    const getGoalCurrentValue = (arr,goalName) => {
        if(arr && arr.length > 0){
            return arr.reduce((sum, item) => {
                return item.name === goalName ? sum + item.data.value : sum;
            }, 0);
        }else{
            return 0;
        }
        
    };
    const hideSection = (sectionName) =>{
        setShownSections(shownSections=>shownSections.filter(s=>s !== sectionName));
        setMenu(null);
    }

    




    return ( 
        <div className={`${styles.dashboard} page`}>
            
            <div className={styles.header}>
                <div className={styles.date}>{getDateForHeader()}</div>
                <h2>Dashboard</h2>
            </div>
            
            {menu ? (
                <div className={styles.menu}>
                    <h3>{menu?.title}</h3>
                    <button type='button' onClick={()=>hideSection(menu.sectionName)}>Hide Section</button>
                    <button type='button' onClick={()=>setMenu(null)}>Cancel</button>
                </div>  
            ) : null}


            <div className={styles['dashboard-content']}>
                <div className={`${styles.section} ${styles['goals-section']}`} style={{display: shownSections.includes('goals') ? 'flex' : 'none'}}>
                    <div className={styles['summary-card']}>
                        <div className={styles['summary-card-header']}>
                            <h2>Goals</h2>
                            <button className={`clear-button ${styles['options-button']}`} onClick={()=>setMenu({title:'Goals', sectionName: 'goals'})}><img className='small-icon' src={IconLibrary.Dots} alt=''></img></button>
                        </div>
                        <div className={styles["card-content"]}>
                            <div className={styles['card-content-block']}>
                                <p className={styles['block-title']}>Total Goals</p>
                                <p className={styles['block-value']}>{userGoals?.length}</p>
                            </div>
                            <div className={styles['card-content-block']}>
                                <p className={styles['block-title']}>Completed</p>
                                <p className={styles['block-value']}>{userGoals?.filter(goal=> goal.target <= getGoalCurrentValue(userActivity?.logs, goal.name)).length}</p>
                            </div>
                            <div className={styles['card-content-block']}>
                                <p className={styles['block-title']}>Completion</p>
                                <p className={styles['block-value']}>{userGoals?.filter(goal=> goal.target <= getGoalCurrentValue(userActivity?.logs, goal.name)).length / userGoals?.length * 100}%</p>
                            </div>
                        </div>
                        
                    </div>
                    <div className={styles['goals-container']}>
                        {userGoals.length > 0 ? userGoals.map((goal)=>(
                            <div className={styles['goal-body']} key={goal.name}>
                                    <div className={styles['goal-info']}>
                                        <img className={styles['goal-icon']} alt='' src={goal.icon.icon} />
                                        <div className={styles['cell-value']}><p>{getGoalCurrentValue(userActivity?.logs, goal.name)}</p>/{goal.target}</div>
                                    </div>
                                    <div className={styles['goal-streak']}>
                                        <div className={styles['goal-streak-day']}>
                                            <p>M</p>
                                        </div>
                                        <div className={styles['goal-streak-day']}>
                                            <p>T</p>
                                        </div>
                                        <div className={styles['goal-streak-day']}>
                                            <p>W</p>
                                        </div>
                                        <div className={styles['goal-streak-day']}>
                                            <p>T</p>
                                        </div>
                                        <div className={styles['goal-streak-day']}
                                            style={{'--completion': 40 * 3.6, // Convert percentage to degrees
                                        }}>
                                            <p>F</p>
                                        </div>
                                        <div className={styles['goal-streak-day']}>
                                            <p>S</p>
                                        </div>
                                        <div className={styles['goal-streak-day']}>
                                            <p>S</p>
                                        </div>
                                    </div>
                                
                        </div> 
                        )): 'No goals found'}  
                    </div>
                    <div className={`${styles["section-container"]} ${isGoalsExpanded ? styles['expand-history'] : ''} `}>
                            <div className={styles['section-header']} onClick={()=>setIsGoalsExpanded(isGoalsExpanded=>!isGoalsExpanded)}>
                                <h3>History</h3>
                                <img src={IconLibrary.Arrow} className='small-icon' alt='' style={{transform: `rotateZ(${isGoalsExpanded ? '90' : '180'}deg)`}}></img>
                                </div>
                                {userActivity?.logs?.length > 0 ? (userActivity.logs.filter(item=> item.type ==='goal').map((log)=>(
                                    <div className={styles['activity-item']} key={log.timestamp}>
                                        <img src={log.icon} className='small-icon'></img>
                                        <p className={styles['activity-name']}>{log.data.name || log.data.workoutData.name}</p> 
                                        <p className={styles['activity-duration']}>{log.data.value} min</p>
                                        <p className={styles['activity-time']}>{log.data.time || log.data.workoutData.time}</p>
                                    </div>
                                ))) : (<h3>No activity</h3>)}
                            </div>
                    </div>
                <div className={styles.section} style={{display: shownSections.includes('activity') ? 'flex' : 'none'}}>
                    <div className={styles['summary-card']}>
                    <div className={styles['summary-card-header']}>
                            <h2>Activity</h2>
                            <button className={`clear-button ${styles['options-button']}`} onClick={()=>setMenu({title:'Activity', sectionName: 'activity'})}><img className='small-icon' src={IconLibrary.Dots} alt=''></img></button>
                        </div>
                        <div className={styles["card-content"]}>
                            <div className={styles['card-content-block']}>
                                <p className={styles['block-title']}>Active Time</p>
                                <p className={styles['block-value']}>{activity.reduce((sum, obj)=> sum + parseInt(obj.data.duration,10), 0)} min</p>
                            </div>
                            <div className={styles['card-content-block']}>
                                <p className={styles['block-title']}>Exercises</p>
                                <p className={styles['block-value']}>{activity?.filter(item=>item.type === 'exercise').length}</p>
                            </div>
                            <div className={styles['card-content-block']}>
                                <p className={styles['block-title']}>Workouts</p>
                                <p className={styles['block-value']}>{activity?.filter(item=>item.type === 'workout').length}</p>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles["section-container"]} ${isActivityExpanded ? styles['expand-history'] : ''} `}>
                        <div className={styles['section-header']} onClick={()=>setIsActivityExpanded(isActivityExpanded=>!isActivityExpanded)}>
                            <h3>History</h3>
                            <img src={IconLibrary.Arrow} className='small-icon' alt='' style={{transform: `rotateZ(${isActivityExpanded ? '90' : '180'}deg)`}}></img>
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
                <div className={`${styles.section} ${styles.nutrition}`} style={{display: shownSections.includes('nutrition') ? 'flex' : 'none'}}> 
                    <div className={`${styles['summary-card']} ${styles['nutrition-section']}`}>
                    <div className={styles['summary-card-header']}>
                            <h2>Nutrition</h2>
                            <button className={`clear-button ${styles['options-button']}`} onClick={()=>setMenu({title:'Nutrition', sectionName: 'nutrition'})}><img className='small-icon' src={IconLibrary.Dots} alt=''></img></button>
                        </div>
                        <div className={styles["card-content"]}>
                            <div className={styles['card-content-block']}>
                                <p className={styles['macro-name']}>Calories</p>
                                <p className={styles['macro-value']}>350 kcal</p>
                            </div>
                            <div className={styles['card-content-block']}>
                                <p className={styles['macro-name']}>Protein</p>
                                <p className={styles['macro-value']}>30g</p>
                            </div>
                            <div className={styles['card-content-block']}>
                                <p className={styles['macro-name']}>Carbs</p>
                                <p className={styles['macro-value']}>5g</p>
                            </div>
                            <div className={styles['card-content-block']}>
                                <p className={styles['macro-name']}>Sodium</p>
                                <p className={styles['macro-value']}>300mg</p>
                            </div>
                            <div className={styles['card-content-block']}>
                                <p className={styles['macro-name']}>Sugar</p>
                                <p className={styles['macro-value']}>2g</p>
                            </div>
                            <div className={styles['card-content-block']}>
                                <p className={styles['macro-name']}>Fats</p>
                                <p className={styles['macro-value']}>10g</p>
                            </div>
                            
                        </div>
                    </div>
                    <div className={`${styles["section-container"]} ${isNutritionExpanded ? styles['expand-history'] : ''} `}>
                        <div className={styles['section-header']} onClick={()=>setIsNutritionExpanded(isNutritionExpanded=>!isNutritionExpanded)}>
                            <h3>History</h3>
                            <img src={IconLibrary.Arrow} className='small-icon' alt='' style={{transform: `rotateZ(${isNutritionExpanded ? '90' : '180'}deg)`}}></img>
                        </div>
                
                        {userActivity?.logs?.length > 0 ? (userActivity.logs.filter(item=> item.type ==='food').map((log)=>(
                            <div className={`${styles['activity-item']}`} key={log.timestamp}>
                                <img src={log.icon} className='small-icon'></img>
                                <p className={styles['activity-name']}>{log.data.name || log.data.workoutData.name}</p> 
                                <p className={styles['activity-duration']}>{log.data.duration} min</p>
                                <p className={styles['activity-time']}>{log.data.time || log.data.workoutData.time}</p>
                            </div>
                        ))) : (<h3>No activity</h3>)}
                    </div>
                </div>
            </div>
            

        </div>
     );
}
 
export default Dashboard;