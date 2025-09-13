// Goal component found in the Dashboad page. 

import { useEffect, useState } from 'react';
import styles from './LargeGoal.module.css';
import { getAllItems } from '../../../../../db';
import { getDateFromTimestamp, getLastFiveDays } from '../../../../../helpers';
import {Goal} from '../../../../common/interfaces';
import {IconLibrary} from '../../../../../IconLibrary.js';
import { useNavigate } from 'react-router-dom';
import { iconList } from '../../../../../icons.js';
import ProgressCircle from '../../../../common/SVG/ProgressCircle.tsx';

interface LargeGoalProps {
    goal: Goal;
    editMode?: string;
    goalsLength: number;
}
const LargeGoal: React.FC<LargeGoalProps> = ({goal}) => {
    const IconComponent = iconList.find(item => item.id === goal.icon)?.icon; // Find the icon based on the saved id
    return ( 
        <div className={styles.largeGoal}>
            <div className={styles.goalTop}>
                {IconComponent && <IconComponent fill={goal.color} width="20px" height="20px"/>}
                <h4 style={{color: goal.color}}>{goal.name}</h4>
            </div>
            {goal.type === 'target' ? <TargetGoal goal={goal} /> : goal.type === 'number' ? <NumberGoal goal={goal} /> : goal.type === 'yes-no' ? <BooleanGoal goal={goal} /> : null}
        </div>
     );
}
 
export default LargeGoal;

const TargetGoal = ({goal}) =>{

    const [progress, setProgress] = useState(0);
    const [days, setDays] = useState([])
    const navigate = useNavigate();
    // Get all logs recorded 
    const getLogs = async () => {
        const lastFiveDays = getLastFiveDays();
        try {
            const promises = lastFiveDays.map(date =>
                getAllItems('logs', { type: 'goal', date, goalId: goal._id })
            );
            const results = await Promise.all(promises);
            const formattedLogs = results.map(arr => (Array.isArray(arr) && arr.length ? {date: getDateFromTimestamp(arr[0].timestamp), logs: [...arr]} : null));
            setProgress(results[0].reduce((sum, item) => sum + item.data.value, 0))
            setDays(formattedLogs);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => { getLogs() }, []); // Calculate progress only on first load

    return (
        <div className={styles.targetGoal} onClick={()=>navigate(`/goals/view/${goal._id}`)}>
            <p><b style={{color: goal.color}}>{progress}</b> / {goal.target} {goal.unit.shortLabel}</p>
            <div className={styles.daysContainer}>
                {days && days.length > 0 ? days.map((day, index)=>{
                    if(day){
                        const total = day.logs?.reduce((sum, item) => sum + item.data.value, 0);
                        const progress = ( total|| 0)/goal.target*100;
                        return (
                            <div className={styles.day} key={goal.name+index}>
                                <ProgressCircle width={'40px'} height={'40px'} barColor={goal.color} backgroundColor={'var(--background)'} progress={progress} />
                            </div>
                        )
                    }else{
                        return (<ProgressCircle width={'40px'} height={'40px'} barColor={goal.color} backgroundColor={'var(--background)'} progress={0} />)
                    }
                }) : null}
            </div>
        </div>
    )
}


const NumberGoal = ({goal}) =>{
    const [logs, setLogs] = useState([null, null, null, null, null]);
    const [maxValue, setMaxValue] = useState(0)
    const navigate = useNavigate();


    // Get all logs for this goal from the past three days 
    const getLogs = async () => {
        const lastFiveDays = getLastFiveDays();
        try {
            const promises = lastFiveDays.map(date =>
                getAllItems('logs', { type: 'goal', date, goalId: goal._id })
            );
            const results = await Promise.all(promises);
            const formattedLogs = results.map(arr => (Array.isArray(arr) && arr.length ? arr[0] : null));
            const max = Math.max(...formattedLogs.map(item =>item ? item.data.value : 0));
            setMaxValue(max);
            console.log(formattedLogs)
            setLogs(formattedLogs);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => { getLogs() }, []);


    return (
        <div className={styles.numberGoal} onClick={()=>navigate(`/goals/view/${goal._id}`)}>
            {logs && logs.length > 0 ? logs.map((log, index)=>(
                <div className={styles.day} key={goal.name+index}>
                    <div className={styles.bar} style={{backgroundColor: goal.color, height: `${log && log.data ? (log.data?.value/maxValue*100) : 0}%`}}></div>
                    <div className={styles.value}>{log?.data?.value}</div>
                    <div className={styles.date}>{log && log.timestamp ? new Date(log.timestamp).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : "No data"}</div>
                </div>
        )) : null}
        </div>
    )
}


const BooleanGoal = ({ goal }) => {
    const [logs, setLogs] = useState([null, null, null, null, null]);
    const navigate = useNavigate();


    // Get all logs for this goal from the past three days 
    const getLogs = async () => {
        const lastFiveDays = getLastFiveDays();
        try {
            const promises = lastFiveDays.map(date =>
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
        <div className={styles.booleanGoal} onClick={()=>navigate(`/goals/view/${goal._id}`)}>
            {logs.map((log, i) => (
                <div className={styles.day} key={i}>
                    <div className={styles.iconContainer}>
                        {log && log.data && log.data.value === 'yes' ? (
                            <img className={styles.goalIcon} src={IconLibrary.Completed} alt='' />
                        ) : log && log.data && log.data.value === 'no' ? (
                            <img className={styles.goalIcon} src={IconLibrary.NotCompleted} alt='' />
                        ) : (
                            <img className={styles.goalIcon} src={IconLibrary.Minus} alt='' />
                        )}
                    </div>
                    <div className={styles.timestamp}>{log && log.timestamp ? new Date(log.timestamp).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : "Missed"}</div>
                </div>
            ))}
        </div>
        );
    }else{
        return(<p>Loading...</p>)
    }
    
};
