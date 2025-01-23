import { getDateForHeader, getCurrentDay, makeDateNice, makeFirstUpperCase, formatDate, convertFullDate } from '../../../helpers';
import styles from './Dashboard.module.css'; 
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format, startOfWeek, addDays, getDay } from 'date-fns';
import { IconLibrary } from '../../../IconLibrary';
import Goal from './Goal';



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

    const [currentWeek, setCurrentWeek] = useState([])

    const [foodCardData, setFoodCardData] = useState({calories: 0, protein: 0, carbs: 0, sodium: 0, sugar: 0, fats: 0,})

    const [menu, setMenu] = useState(null);

    
    const activity = userActivity?.logs.filter((log)=>log.type==="workout" || log.type==="exercise" || log.type==='activity');
    const foodHistory = userActivity?.logs.length > 0 ? userActivity.logs.filter(item=> item.type ==='food') : null;
    console.log(foodHistory)



    const getCurrentWeek = () => {
        const today = new Date();
        return Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(today, { weekStartsOn: 1 }), i));
    };
    useEffect(()=>{setCurrentWeek(getCurrentWeek())},[])



    
    const hideSection = (sectionName) =>{
        setShownSections(shownSections=>shownSections.filter(s=>s !== sectionName));
        setMenu(null);
    }

    useEffect(()=>{
        if(foodHistory){
            const totals = getFoodCardData();
            if (JSON.stringify(totals) !== JSON.stringify(foodCardData)) {
                setFoodCardData(totals);
            }
        }
    },[foodHistory]);

    const getFoodCardData = () => {
 
        if(foodHistory && foodHistory.length > 0 && foodHistory.some(item=>item.type==="food")){
            const totals = {
                calories: 0,
                protein: 0,
                carbs: 0,
                sodium: 0,
                sugar: 0,
                fats: 0,
            };
            foodHistory.forEach(obj => {
                totals.calories += obj.data.calories ? parseInt(obj.data.calories, 10) : 0;
                totals.protein += obj.data.protein ? parseInt(obj.data.protein, 10) : 0;
                totals.carbs += obj.data.carbs ? parseInt(obj.data.carbs, 10) : 0;
                totals.sodium += obj.data.sodium ? parseInt(obj.data.sodium, 10) : 0;
                totals.sugar += obj.data.sugar ? parseInt(obj.data.sugar, 10) : 0;
                totals.fats += obj.data.fats ? parseInt(obj.data.fats, 10) : 0;
            });
            return totals;
        }
    
        
    };



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
                
                {userGoals.length > 0 ? userGoals.map((goal, index)=>(<Goal key={'goal-'+index} data={goal} />)): 'No goals found'}  
          
                <div className={styles.section} style={{display: shownSections.includes('activity') ? 'flex' : 'none'}}>
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
                                <p className={styles['macro-value']}>{foodCardData?.calories || 0}kcal</p>
                            </div>
                            <div className={styles['card-content-block']}>
                                <p className={styles['macro-name']}>Protein</p>
                                <p className={styles['macro-value']}>{foodCardData?.protein || 0}g</p>
                            </div>
                            <div className={styles['card-content-block']}>
                                <p className={styles['macro-name']}>Carbs</p>
                                <p className={styles['macro-value']}>{foodCardData?.carbs || 0}g</p>
                            </div>
                            <div className={styles['card-content-block']}>
                                <p className={styles['macro-name']}>Sodium</p>
                                <p className={styles['macro-value']}>{foodCardData?.sodium || 0}mg</p>
                            </div>
                            <div className={styles['card-content-block']}>
                                <p className={styles['macro-name']}>Sugar</p>
                                <p className={styles['macro-value']}>{foodCardData?.sugar || 0}g</p>
                            </div>
                            <div className={styles['card-content-block']}>
                                <p className={styles['macro-name']}>Fats</p>
                                <p className={styles['macro-value']}>{foodCardData?.fats || 0}g</p>
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
                                <p className={styles['activity-name']}>{log.data.name}</p> 
                                <p className={styles['activity-duration']}>{makeFirstUpperCase(log.data.type)}</p> at
                                <p className={styles['activity-time']}>{log.data.time}</p>
                            </div>
                        ))) : (<h3>No activity</h3>)}
                    </div>
                </div>
            </div>
            

        </div>
     );
}
 
export default Dashboard;