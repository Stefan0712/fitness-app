import { useEffect, useState } from 'react';
import styles from './SmallGoal.module.css';
import { getAllItems } from '../../../../../db';
import { getCurrentDay, getLastThreeDays } from '../../../../../helpers';
import {Goal} from '../../../../common/interfaces';
import ProgressBar from '../../../../common/SVG/ProgressBar.tsx';
import {IconLibrary} from '../../../../../IconLibrary.js';

interface SmallGoalProps {
    goal: Goal;
}
const SmallGoal: React.FC<SmallGoalProps> = ({goal}) => {
    return ( 
        <div className={styles.smallGoal}>
            <div className={styles.goalTop}>
                <img className='small-icon' src={goal.icon} alt='' />
                <h4>{goal.name}</h4>
            </div>
            {goal.type === 'target' ? <TargetGoal goal={goal} /> : goal.type === 'number' ? <NumberGoal goal={goal} /> : goal.type === 'yes-no' ? <BooleanGoal goal={goal} /> : null}
        </div>
     );
}
 
export default SmallGoal;

const TargetGoal = ({goal}) =>{

    const [progress, setProgress] = useState(0);
    const getLogs = async () =>{
        try{
             const response = await getAllItems('logs',{type: 'goal', date: getCurrentDay(), goalId: goal._id});
             if(response){
                setProgress(response.reduce((sum, item)=> sum + parseInt(item.data.value || 0), 0))
             }
        }catch(error){
            console.error(error)
        }
    }
    useEffect(()=>{getLogs()},[])
    return (
        <div className={styles.targetGoal}>
            <p>{progress} / {goal.target} {goal.unit}</p>
            <div className={styles.progressCircle}>
                <ProgressBar value={progress} target={goal.target} color={goal.color} /> 
            </div>
        </div>
    )
}


const NumberGoal = ({goal}) =>{
    const [progress, setProgress] = useState(0);
    const [prevProgress, setPrevProgress] = useState(0);



    const getLogs = async () =>{
        try{
            const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];
             const response = await getAllItems('logs',{type: 'goal', date: getCurrentDay(), goalId: goal._id});
             const lastDayReponse = await getAllItems('logs',{type: 'goal', date: yesterday, goalId: goal._id});
             if(response){
                setProgress(response.reduce((sum, item)=> sum + parseInt(item.data.value || 0), 0));
                setPrevProgress(lastDayReponse.reduce((sum, item)=> sum + parseInt(item.data.value || 0), 0));
             }
        }catch(error){
            console.error(error)
        }
    }
    useEffect(()=>{getLogs()},[])
    return <div className={styles.numberGoal}>
        {progress > prevProgress ? <img className={styles.goalIcon} src={IconLibrary.ArrowUp} alt='' /> : progress < prevProgress ? <img className={styles.goalIcon} src={IconLibrary.ArrowDown} alt='' /> : <img className={styles.goalIcon} src={IconLibrary.Minus} alt='' />}
        <p>{progress}</p>
    </div>
}


const BooleanGoal = ({ goal }) => {
    const [logs, setLogs] = useState([null, null, null]);

    const getLogs = async () => {
        const lastThreeDays = getLastThreeDays();
        try {
            const promises = lastThreeDays.map(date =>
                getAllItems('logs', { type: 'goal', date, goalId: goal._id })
            );
            const results = await Promise.all(promises);
            const formattedLogs = results.map(arr => (Array.isArray(arr) && arr.length ? arr[0] : null));
            setLogs(formattedLogs);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { getLogs() }, []);

    if(logs && logs.length > 0){
        return (
        <div className={styles.booleanGoal}>
            {logs.map((log, i) => (
                <div className={styles.day} key={i}>
                    {log && log.data && log.data.value === 'yes' ? (
                        <img className={styles.goalIcon} src={IconLibrary.Completed} alt='' />
                    ) : log &&  log.data && log.data.value === 'no' ? (
                        <img className={styles.goalIcon} src={IconLibrary.NotCompleted} alt='' />
                    ) : (
                        <img className={styles.goalIcon} src={IconLibrary.Minus} alt='' />
                    )}
                </div>
            ))}
        </div>
        );
    }else{
        return(<p>Loading...</p>)
    }
    
};
