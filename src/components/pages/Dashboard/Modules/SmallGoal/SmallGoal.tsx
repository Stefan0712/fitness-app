// Goal component found in the Dashboad page. 

import { useEffect, useState } from 'react';
import styles from './SmallGoal.module.css';
import { getAllItems, saveItem } from '../../../../../db';
import { getCurrentDay, getLastThreeDays } from '../../../../../helpers';
import {Goal} from '../../../../common/interfaces';
import ProgressBar from '../../../../common/SVG/ProgressBar.tsx';
import {IconLibrary} from '../../../../../IconLibrary.js';
import { useNavigate } from 'react-router-dom';
import { iconList } from '../../../../../icons.js';

interface SmallGoalProps {
    goal: Goal;
    editMode?: string;
    toggleGoal: (goal) =>void;
    goalsLength: number;
}
const SmallGoal: React.FC<SmallGoalProps> = ({goal, editMode, toggleGoal, goalsLength}) => {

    const navigate = useNavigate();

    // Function that WILL be used to pinning a goal to the dashboard
    const handleTogglePin = async () =>{
        try{
            const updatedGoal = {...goal, pinToDashboard: !goal.pinToDashboard, order: goalsLength}
            await saveItem('goals', updatedGoal);
            toggleGoal(updatedGoal)
        }catch(error){
            console.error(error)
        }
    }
    const IconComponent = iconList.find(item => item.id === goal.icon)?.icon; // Find the icon based on the saved id
    return ( 
        <div className={styles.smallGoal} onClick={!editMode ? ()=>navigate(`/goals/view/${goal._id}`) : undefined}>
            <div className={styles.goalTop}>
                {IconComponent && <IconComponent fill={goal.color} width="20px" height="20px"/>}
                <h4 style={{color: goal.color}}>{goal.name}</h4>
                {editMode ? <button onClick={handleTogglePin} className={styles.pinButton}><img src={goal.pinToDashboard ? IconLibrary.Close : IconLibrary.Add} alt='' /></button> : null}
            </div>
            {goal.type === 'target' ? <TargetGoal goal={goal} /> : goal.type === 'number' ? <NumberGoal goal={goal} /> : goal.type === 'yes-no' ? <BooleanGoal goal={goal} /> : null}
        </div>
     );
}
 
export default SmallGoal;

const TargetGoal = ({goal}) =>{

    const [progress, setProgress] = useState(0);
    // Get all logs recorded today and sum their values together to get the progress, which is also used for the progress bar
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
    useEffect(()=>{getLogs()},[]); // Calculate progress only on first load

    return (
        <div className={styles.targetGoal}>
            <p style={{color: goal.color}}>{progress} / {goal.target} {goal.unit.shortLabel}</p>
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
            const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0]; // Previous day date
            const response = await getAllItems('logs',{type: 'goal', date: getCurrentDay(), goalId: goal._id}); // Today's logs
            const lastDayReponse = await getAllItems('logs',{type: 'goal', date: yesterday, goalId: goal._id}); // Yesterday's logs
            if(response){
                // Calculate the sum of all values recorded today and yesterday
                setProgress(response.reduce((sum, item)=> sum + parseInt(item.data.value || 0), 0));
                setPrevProgress(lastDayReponse.reduce((sum, item)=> sum + parseInt(item.data.value || 0), 0));
            }
        }catch(error){
            console.error(error)
        }
    }
    useEffect(()=>{getLogs()},[]);
    // Compare today's progress with yesterday's progress and show an arrow poiting up or down if the value changed, or a line if the value is the same
    return <div className={styles.numberGoal}>
        {progress > prevProgress ? <img className={styles.goalIcon} src={IconLibrary.ArrowUp} alt='' /> : progress < prevProgress ? <img className={styles.goalIcon} src={IconLibrary.ArrowDown} alt='' /> : <img className={styles.goalIcon} src={IconLibrary.Minus} alt='' />}
        <p style={{color: goal.color}}>{progress}</p>
    </div>
}


const BooleanGoal = ({ goal }) => {
    const [logs, setLogs] = useState([null, null, null]);


    // Get all logs for this goal from the past three days 
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
    // Shows a Checkmark if the values is yes, an X if the value is no, and a line if there was no value recorded (i.e the user missed to log or just didn't want to)
    if(logs && logs.length > 0){
        return (
        <div className={styles.booleanGoal}>
            {logs.map((log, i) => (
                <div className={styles.day} key={i}>
                    {log && log.data && log.data.value === 'yes' ? (
                        <img className={styles.goalIcon} src={IconLibrary.Completed} alt='' />
                    ) : log && log.data && log.data.value === 'no' ? (
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
