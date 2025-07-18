import styles from './Goals.module.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllItems } from '../../../db';
import AppHeader from '../../common/AppHeader/AppHeader.tsx';
import NewGoal from './NewGoal.tsx';
import { IconLibrary } from '../../../IconLibrary';
import { formatActivityDate, getCurrentDay, makeFirstUpperCase } from '../../../helpers.js';


const Goals = () => {

    const navigate = useNavigate();

    const [goals, setGoals] = useState([])
    const [showNewGoal, setShowNewGoal] = useState(false);


    const getGoals = async () =>{
        try{
            const response = await getAllItems('goals');
            if(response){
                setGoals(response);
            }
        }catch(error){
            console.error(error)
        }
    };
    useEffect(()=>{
        getGoals();
    },[])


    return ( 
        <div className={styles.goalsPage}>
            <AppHeader title={'Goals'} button={<button onClick={()=>setShowNewGoal(true)} className={styles.addGoalButton}><img className='small-icon' src={IconLibrary.Add} alt='' /></button>} />
            {showNewGoal ? <NewGoal close={()=>setShowNewGoal(false)} /> : null}
            <div className={styles.goalsContainer}>
                {goals && goals.length > 0 ? goals.map(goal=><GoalBody key={goal._id} goal={goal} />) : <p>There are no goals</p>}    
            </div>  
        </div>
     );
}
 
export default Goals;



const GoalBody = ({goal}) => {
    const navigate = useNavigate();
    const [goalLogs, setGoalLogs] = useState([]);
    const [progress, setProgress] = useState(0);

    // Get logs registered in the current day for this specific goal
    const getGoalLogs = async () =>{
        try{
            const response = await getAllItems('logs', {goalId: goal._id, date: getCurrentDay()});
            setGoalLogs(response);
            const tempProgress = response.reduce((sum, item)=> sum + parseInt(item.data.value),0);
            setProgress(tempProgress)
        }catch(error){
            console.error(error)
        }
    }
    useEffect(()=>{if(goal){getGoalLogs()}},[])


    return ( 
        <div className={styles.goal} key={goal._id} onClick={()=>navigate(`/goals/view/${goal._id}`)}>
            <div className={styles.goalTop}>
                <div className={styles["goal-color"]} style={{backgroundColor: goal.color}} />
                <img src={goal.icon} className={styles['goal-icon']}></img>
                <p className={styles.name}>{goal.name}</p>
            </div>
            <div className={styles.goalStatus}>
                {goal.type === 'target' ? <TargetStatus goal={goal} progress={progress} /> : goal.type === 'number' ? <NumberStatus log={goalLogs[0]} /> : goal.type === 'yes-no' ? <BooleanStatus log={goalLogs[0]} /> : null}
            </div>
        </div>
     );
}

const TargetStatus = ({goal, progress}) =>{
    return (
        <div className={styles.targetProgress}>
            <p>{progress}/{goal.target}</p>
            <div className={styles.progressBarBackground}>
                <div className={styles.progressBar} style={{backgroundColor: goal.color, width: `${( progress / goal.target) * 100}%`}} />
            </div>
        </div>
    )
};
const BooleanStatus = ({log}) =>{
    if(log){
        return(
            <p>{makeFirstUpperCase(log.data.value)} on {formatActivityDate(log.timestamp)}</p>
        )
    }else{
        return(
            <p>No log recorded today</p>
        )
    }
    
}
const NumberStatus = ({log}) =>{
    if(log){
        return(
            <p>{log.data.value} {log.data.unit.shortLabel} on {formatActivityDate(log.timestamp)}</p>
        )
    }else{
        return(
            <p>No log recorded today</p>
        )
    }
}