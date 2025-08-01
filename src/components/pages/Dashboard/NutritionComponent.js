// The Nutrition module will be visible on the Dashboard page.
// It shows the total amount of each macros for all logs recorded in the current day, together with a list of today's food logs

import styles from './Dashboard.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconLibrary } from '../../../IconLibrary';
import { getCurrentDay } from '../../../helpers';
import { updateDashboardLayout } from '../../../store/userSlice.ts';
import { getAllItems } from '../../../db.js';

const NutritionComponent = ({isSmallScreen, showMessage}) => {

    const dispatch = useDispatch();

    const dashboardSections = useSelector((state)=>state.user.dashboardSections); // A copy of the list of enlabled dashboard components used to check if this one is enabled
    const [showMenu, setShowMenu] = useState(false); // The state for the small menu with the Hide button
    const [foodCardData, setFoodCardData] = useState({calories: 0, protein: 0, carbs: 0, sodium: 0, sugar: 0, fats: 0,})
    const [userActivity, setUserActivity] = useState([]); // All food logs recorded today
    
    // This will fetch all food logs from today only on the first load
    const getUserLogs = async () =>{
        const items = await getAllItems('logs',{date: getCurrentDay(), type: 'food'});
        setUserActivity(items);
    };
    useEffect(()=>{
        getUserLogs();
    },[]);

    // When userActivity is updated, trigger the function that will extract relevant data, only if userActivity is not empty
    useEffect(()=>{
        if(userActivity){
            const totals = getFoodCardData();
            if (JSON.stringify(totals) !== JSON.stringify(foodCardData)) {
                setFoodCardData(totals);
            }
        }
    },[userActivity]);

    // If userActivity is not empty, then get the total of each macro, checking if at least one log is of type "food"
    const getFoodCardData = () => {
        if(userActivity && userActivity.length > 0 && userActivity.some(item=>item.type==="food")){
            const totals = {
                calories: 0,
                protein: 0,
                carbs: 0,
                sodium: 0,
                sugar: 0,
                fats: 0,
            };
            userActivity.forEach(obj => {
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
    // Updates the list of enabled dashboard section and shown a confirmation message
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
        </div>
     );
}
 
export default NutritionComponent;