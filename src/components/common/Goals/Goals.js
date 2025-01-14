import styles from './Goals.module.css';
import GoalsLog from '../LogPages/GoalsLog';
import { useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import { useSelector } from 'react-redux';
import { makeFirstUpperCase } from '../../../helpers';
import NewGoal from './NewGoal';



const Goals = ({closeMenu}) => {

    const [logForm, setLogForm] = useState(null);
    const goals = useSelector((state)=>state.user.userData.goals);
    {console.log(goals ? goals : 'Loading goals')}
    const [showNewGoal, setShowNewGoal] = useState(false);


    return ( 
        <div className={styles.goals}>
            <div className={styles.header}>
                <h2>Goals</h2>
                <img src={IconLibrary.No} className='small-icon' alt='edit goals' onClick={closeMenu}/>
            </div>
            <div className={styles.content}>
                {goals?.map((goal, index)=>(
                    <div className={styles.goal} key={index} onClick={()=>setLogForm(goal.id)}>
                        <div className={styles["goal-color"]} style={{backgroundColor: goal.color}} />
                        <img src={goal.icon.icon} className={styles['goal-icon']}></img>
                        <p className={styles.name}>{goal.name}</p>
                        <p className={styles.target}>{goal.target} {makeFirstUpperCase(goal.unit)}</p>
                    </div>
                ))}
            </div>
            {logForm ? <GoalsLog id={logForm} closeLogWindow={()=>setLogForm(false)}/> : null}
                <div className={styles['buttons-container']}>
                    <button type='button' onClick={()=>setShowNewGoal(true)}>
                        <img src={IconLibrary.Plus} alt='create goal'></img>
                        <p>New Goal</p>
                    </button>
                    <button>
                        <img src={IconLibrary.Edit} alt='manage goal'></img>
                        <p>Manage Goals</p>
                    </button>
                </div>
                {showNewGoal ? <NewGoal closeNewGoal={()=>setShowNewGoal(false)} /> : null}
        </div>
     );
}
 
export default Goals;