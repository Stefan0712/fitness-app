import { useEffect, useState } from 'react';
import styles from './SmallGoal.module.css';
import { getAllItems } from '../../../../../db';
import { getCurrentDay } from '../../../../../helpers';
import {Goal, GoalLog} from '../../../../common/interfaces';
import ProgressBar from '../../../../common/SVG/ProgressBar.tsx';

interface SmallGoalProps {
    goal: Goal;
}
const SmallGoal: React.FC<SmallGoalProps> = ({goal}) => {

    const [logs, setLogs] = useState<GoalLog[]>([]);
    const [currentProgress, setCurrentProgress] = useState(0);

    const getLogs = async () =>{
        const response = await getAllItems('logs',{type: 'goal', date: getCurrentDay(), _id: goal._id});
        console.log(response)
        if(response){
            setLogs(response);
            setCurrentProgress(getTotalProgress(response))
        }
    }
    const getTotalProgress = (items) =>{
        return items.reduce((sum, item)=> sum + item.data.value, 0);
    }

    useEffect(()=>{getLogs()},[])
    return ( 
        <div className={styles.smallGoal}>
            <div className={styles.goalTop}>
                <img className='small-icon' src={goal.icon} alt='' />
                <h4>{goal.name}</h4>
            </div>
            <p>{currentProgress} / {goal.target} {goal.unit}</p>
            <div className={styles.progressCircle}>
                <ProgressBar value={currentProgress} target={goal.target} color={goal.color} /> 
            </div>
        </div>
     );
}
 
export default SmallGoal;