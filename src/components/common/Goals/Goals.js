import styles from './Goals.module.css';
import GoalsLog from '../LogPages/GoalsLog.tsx';
import { useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import { useSelector } from 'react-redux';
import GoalBody from './GoalBody';
import NewGoal from './NewGoal.js';



const Goals = ({closeMenu}) => {


    const goals = useSelector((state)=>state.user.goals);
    const [logGoal, setLogGoal] = useState(null);
    const [currentScreen, setCurrentScreen] = useState('all')


    const handleOpenLogForm = (id) =>{
        setLogGoal(id);
        setCurrentScreen('single');
    }
    const handleCloseGoalsLog = () =>{
        setLogGoal(null);
        setCurrentScreen('all');
    }
    return ( 
        <div className={styles.goals}>
            <div className={styles.header}>
                <h2>{currentScreen === 'new' ? 'Goals > New Goal' : currentScreen === 'all' ? 'Goals' : ''}</h2>
                <img src={IconLibrary.No} className='small-icon' alt='edit goals' onClick={closeMenu} />
            </div>
            <div className={styles.content}>
                {currentScreen === 'all' ? (
                    <div className={styles['all-goals-container']}>
                    <button className={styles['new-goal-button']} type='button' onClick={()=>setCurrentScreen('new')}>
                        <img src={IconLibrary.Plus} alt='create goal'></img>
                        <p>New Goal</p>
                    </button>
                    {goals?.map((goal, index)=>(
                        <GoalBody goal={goal} index={index} openLogForm={handleOpenLogForm}/>
                    ))}
                </div>
                ) : currentScreen === 'single' && logGoal ? <GoalsLog closeLogWindow={()=>handleCloseGoalsLog()} id={logGoal} /> : currentScreen === 'new' ? <NewGoal closeNewGoal={()=>setCurrentScreen('all')} /> : null}
            </div>
        </div>
     );
}
 
export default Goals;