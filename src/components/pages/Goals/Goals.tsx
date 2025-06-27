import styles from './Goals.module.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { useUI } from '../../../context/UIContext';
import { useNavigate } from 'react-router-dom';
import { getAllItems } from '../../../db';
import AppHeader from '../../common/AppHeader/AppHeader.tsx';
import NewGoal from './NewGoal.tsx';
import { IconLibrary } from '../../../IconLibrary';


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
                {goals && goals.length > 0 ? goals.map((goal, index)=><GoalBody goal={goal} index={index} />) : <p>There are no goals</p>}    
            </div>  
        </div>
     );
}
 
export default Goals;



const GoalBody = ({goal, index}) => {
    const navigate = useNavigate();
    return ( 
        <div className={styles.goal} key={"Goal-"+index} onClick={()=>navigate(`/goals/view/${goal._id}`)}>
            <div className={styles["goal-color"]} style={{backgroundColor: goal.color}} />
            <img src={goal.icon} className={styles['goal-icon']}></img>
            <p className={styles.name}>{goal.name}</p>
        </div>
     );
}