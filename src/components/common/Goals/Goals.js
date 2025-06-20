import styles from './Goals.module.css';
import { useEffect, useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import GoalBody from './GoalBody';
import { getAllItems } from '../../../db.js';
import QuickGoalLog from '../QuickGoalLog/QuickGoalLog.tsx'



const Goals = ({closeMenu}) => {


    const [goals, setGoals] = useState(null);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const getGoals = async () =>{
        const items = await getAllItems('goals');
        if(items){
            setGoals(items);
        }
    }
    useEffect(()=>{getGoals()},[]);
    return ( 
        <div className={styles.goals}>
            <div className={styles.goalsSection}>
                <div className={styles.header}>
                    <h3>Goals</h3>
                    <img src={IconLibrary.No} className='small-icon' alt='edit goals' onClick={closeMenu} />
                </div>
                {selectedGoal ? <QuickGoalLog close={()=>setSelectedGoal(null)} closeMenu={closeMenu} goalData={selectedGoal} /> : null}
                <div className={styles.content}>
                    {goals && goals.length > 0 ?  goals?.map((goal, index)=>(
                        <GoalBody key={'Goal-body-'+index} goal={goal} index={index} setSelectedGoal={()=>setSelectedGoal(goal)}/>
                    )) : <p>No goals</p>}
                </div>
            </div>
        </div>
     );
}
 
export default Goals;