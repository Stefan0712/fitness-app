import styles from './Goals.module.css';
import GoalsLog from '../LogPages/GoalsLog.tsx';
import { useEffect, useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import GoalBody from './GoalBody';
import NewGoal from './NewGoal.tsx';
import { getAllItems } from '../../../db.js';



const Goals = ({closeMenu}) => {


    const [logGoal, setLogGoal] = useState(null);
    const [goals, setGoals] = useState(null);
    const [showNewGoal, setShowNewGoal] = useState(false);
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
                {showNewGoal ? <NewGoal close={()=>(setShowNewGoal(false), getGoals())} /> : null}
                <div className={styles.content}>
                    <button className={styles['new-goal-button']} type='button' onClick={()=>setShowNewGoal(true)}>
                        <img src={IconLibrary.Plus} alt='create goal'></img>
                        <p>New Goal</p>
                    </button>
                    {goals && goals.length > 0 ?  goals?.map((goal, index)=>(
                        <GoalBody key={'Goal-body-'+index} goal={goal} index={index} setSelectedGoal={()=>(setSelectedGoal(goal), console.log(goal))}/>
                    )) : <p>No goals</p>}
                </div>
            </div>
            {selectedGoal ? <GoalsLog key={selectedGoal._id} data={selectedGoal} /> : null}
        </div>
     );
}
 
export default Goals;