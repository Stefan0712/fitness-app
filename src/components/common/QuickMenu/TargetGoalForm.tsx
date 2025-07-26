// Log form for Target goals accessed from the quick menu
import { useEffect, useState } from "react";
import styles from './TargetGoalForm.module.css';
import React from "react";
import { GoalLog, Goal } from "../interfaces.ts";
import { getAllItems, saveItem } from "../../../db.js";
import { useUI } from "../../../context/UIContext.jsx";
import ObjectID from "bson-objectid";
import { getCurrentDay } from "../../../helpers.js";
import { useNavigate } from "react-router-dom";
import { iconList } from '../../../icons.js';


interface LogGoalProps {
    goalData: Goal;
    close: () => void;
    closeMenu: () => void;
    closeQuickMenu: () => void;
}
const TargetGoalForm: React.FC<LogGoalProps> = ({goalData, close}) => {
  const { showMessage } = useUI();
    const navigate = useNavigate(); 

    const todayDate = new Date();
    const getCurrentTime = (input: Date | string = new Date()): string => {
        const date = typeof input === "string" ? new Date(input) : input;
        const hours = String(date.getHours()).padStart(2, '0'); // Ensure 2-digit hours
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Ensure 2-digit minutes
        return `${hours}:${minutes}`;
    };


    const [inputValue, setInputValue] = useState<string>('0');
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState(todayDate.toISOString().split('T')[0]);
    const [time, setTime] = useState<string>(getCurrentTime());

    const [progress, setProgress] = useState<number>(0);

    const getTodaysLogs = async () => {
        try{
            const logs = await getAllItems('logs', {goalId: goalData._id, date: getCurrentDay()});
            console.log('logs',logs)
            const tempProgress = logs.reduce((sum, item)=> sum + parseFloat(item?.data?.value), 0);
            setProgress(tempProgress);
        }catch(error){
            showMessage("There has been an error getting today's logs", "error");
            console.error(error)
        }
    }
    useEffect(()=>{getTodaysLogs()},[]);


    const submitLog = async () =>{
        if(goalData){
            const data: GoalLog = {
                type: 'goal', 
                goalId: goalData._id, // Ref of the logged goal
                _id: ObjectID().toHexString(),
                title: `${goalData.name} Log`, 
                icon: goalData.icon,
                timestamp: todayDate,
                data: {
                    value: parseFloat(inputValue),
                    time,
                    description,
                    name,
                    unit: goalData.unit,
                    date,
                    type: 'target'
                }
            }
            await saveItem('logs', data);
            showMessage("Goal logged successfully", 'success');
            // Reset inputs 
            setInputValue('0');
            setName('');
            setDescription('');
            setTime(getCurrentTime());
            // Closes the Quick log screen, the quick menu, the list of logs, and navigate to the logged goal
            close();
            navigate(`/goals/view/${goalData._id}`);
        }
    }
    
    return ( 
        <div className={styles.targetLogForm}>
            <p className={styles.title}>New {goalData.name} Log</p>
            <GoalProgressCircle progress={progress} goal={goalData} />
            <div className={styles.twoItems}>
                <input type="time" name="time" id="time" onChange={((e)=>setTime(e.target.value))} value={time} />
                <input type="date" onChange={(e)=>setDate(e.target.value)} value={date}></input>
            </div>
            <div className={styles.valueInput}>
                <input type="number" step={"0.1"} onChange={(e)=>setInputValue(e.target.value)} value={inputValue} placeholder="Value"></input>
                <div className={styles.defaultValues}>
                    {goalData && goalData.defaultValues && goalData.defaultValues.length > 0 ? goalData.defaultValues.map(value=><button key={value} className={styles.defaultValue} onClick={()=>setInputValue(value)}>{value} {goalData.unit?.shortLabel || ''}</button>) : null}
                </div>
            </div>
            <input type="text" name="name" id="name" onChange={((e)=>setName(e.target.value))} value={name} placeholder="Name"/>
            <textarea name="description" id="description" onChange={((e)=>setDescription(e.target.value))} value={description} placeholder="Description"></textarea>
            <div className={styles.buttons}>
                <button type="button" className={styles["close-button"]} onClick={close}>Close</button>
                <button type="button" className={styles["submit-button"]} onClick={submitLog}>Log</button>
            </div>
        </div>
     );
}
 
export default TargetGoalForm;



const GoalProgressCircle = ({progress, goal}) =>{
    const IconComponent = iconList.find(item => item.id === goal.icon)?.icon; // Find the icon based on the saved id
    return(
        <div className={styles.progressCircleContainer}>
            <div className={styles.progressCircleBackground} style={{background: `conic-gradient(${goal.color} ${(progress / goal.target) * 100}%, #111214 0%)`}}>
                <div className={styles.progressCircleCore}>
                    {IconComponent && <IconComponent fill={goal.color} width="30%" height="30%"/>}
                    <b style={{color: goal.color}}>{(progress / goal.target) * 100} %</b>
                </div>
            </div>
            <p className={styles.progressCircleProgress}><b style={{color: goal.color}}>{progress}</b>/{goal.target} {goal.unit?.shortLabel || ''}</p>
        </div>
    )
}