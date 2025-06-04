import styles from './Dashboard.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconLibrary } from '../../../IconLibrary';
import { makeFirstUpperCase, getCurrentDay } from '../../../helpers';
import { updateDashboardLayout } from '../../../store/userSlice.ts';
import { getAllItems } from '../../../db.js';

const NutritionComponent = ({isSmallScreen, showMessage}) => {

    const dispatch = useDispatch();

    const dashboardSections = useSelector((state)=>state.user.dashboardSections);
    const [showMenu, setShowMenu] = useState(false);
    const [foodCardData, setFoodCardData] = useState({calories: 0, protein: 0, carbs: 0, sodium: 0, sugar: 0, fats: 0,})
    const [isNutritionExpanded, setIsNutritionExpanded] = useState(false);
    const [selectedDate, setSelectedDate] = useState(getCurrentDay());
    const [userActivity, setUserActivity] = useState([]);
    
    const getUserLogs = async () =>{
        const items = await getAllItems('logs',{date: getCurrentDay(), type: 'activity'});
        setUserActivity(items);
    };
    useEffect(()=>{
        getUserLogs();
    },[])

    const foodHistory = userActivity?.length > 0 ? userActivity.logs.filter(item=> item.type ==='food') : null;

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
    const hideModule = () =>{
        dispatch(updateDashboardLayout(dashboardSections.filter(item=>item.identifier != 'nutrition')));
        showMessage({message: "Nutrition was hidden", type: 'success'});
    }
    return ( 
        <div className={`${styles.section} ${styles.nutrition}`}> 
            {showMenu ? (
                <div className={styles.menu}>
                    <button type='button' className='clear-button' onClick={hideModule}>Hide</button>
                    <button type='button' className='clear-button' onClick={()=>setShowMenu(false)}>Cancel</button>
                </div>
            ):null}
            <div className={`${styles['summary-card']} ${styles['nutrition-section']}`}>
            <div className={styles['summary-card-header']}>
                    <h2>Nutrition</h2>
                    <button className={`clear-button ${styles['options-button']}`} onClick={()=>setShowMenu(true)}><img className='small-icon' src={IconLibrary.Hide} alt=''></img></button>
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
                    <img src={IconLibrary.Arrow} className={`small-icon ${isSmallScreen ? '' : 'hide'}`} alt='' style={{transform: `rotateZ(${isNutritionExpanded ? '90' : '180'}deg)`}}></img>
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
     );
}
 
export default NutritionComponent;