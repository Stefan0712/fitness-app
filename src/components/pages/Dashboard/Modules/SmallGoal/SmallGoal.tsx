import { useEffect, useState } from 'react';
import styles from './SmallGoal.module.css';
import { getAllItems } from '../../../../../db';
import { getCurrentDay } from '../../../../../helpers';
import {GoalLog} from '../../../../common/interfaces';

interface SmallGoalProps {
    goal: GoalLog;
}
const SmallGoal: React.FC<SmallGoalProps> = ({goal}) => {

    const [logs, setLogs] = useState<GoalLog[]>([]);
    const [currentProgress, setCurrentProgress] = useState(0);
    const [target, setTarget] = useState(0);

    const getLogs = async () =>{
        const response = await getAllItems('logs',{type: 'goal', date: getCurrentDay(), _id: goal._id});
        console.log(response)
        if(response){
            setLogs(response);
            setCurrentProgress(getTotalProgress(response))
            setTarget(getTarget(response));
        }
    }
    const getTotalProgress = (items) =>{
        return items.reduce((sum, item)=> sum + item.value, 0);
    }
    const getTarget = (items) =>{
        return items.reduce((sum, item)=> sum + item.target, 0);
    }
    useEffect(()=>{getLogs()},[])
    return ( 
        <div className={styles.smallGoal}>
            <h3>{goal.name}</h3>
            <p>{currentProgress} / {target}</p>
        </div>
     );
}
 
export default SmallGoal;