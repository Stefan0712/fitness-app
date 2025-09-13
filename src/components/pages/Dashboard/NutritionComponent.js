import styles from './Dashboard.module.css';
import { useState, useEffect } from 'react';
import { getCurrentDay } from '../../../helpers';
import { getAllItems } from '../../../db.js';

const NutritionComponent = () => {


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
                totals.calories += obj.calories ? parseInt(obj.calories, 10) : 0;
                totals.protein += obj.protein ? parseInt(obj.protein, 10) : 0;
                totals.carbs += obj.carbs ? parseInt(obj.carbs, 10) : 0;
                totals.sodium += obj.sodium ? parseInt(obj.sodium, 10) : 0;
                totals.sugar += obj.sugar ? parseInt(obj.sugar, 10) : 0;
                totals.fats += obj.fats ? parseInt(obj.fats, 10) : 0;
            });
            return totals;
        }
    };
    return ( 
        <div className={`${styles.section} ${styles.nutrition}`}> 
            <div className={`${styles['summary-card']} ${styles['nutrition-section']}`}>
            <div className={styles['summary-card-header']}>
                    <h2>Nutrition</h2>
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