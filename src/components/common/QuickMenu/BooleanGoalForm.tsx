import { useEffect, useState } from "react";
import styles from './BooleanGoalForm.module.css';
import React from "react";
import { BaseLog, Goal, GoalLog } from "../interfaces.ts";
import { deleteGoalLogs, getAllItems, saveItem } from "../../../db.js";
import { useUI } from "../../../context/UIContext.jsx";
import ObjectID from "bson-objectid";
import { getCurrentDay } from "../../../helpers.js";
import { useNavigate } from "react-router-dom";

interface LogGoalProps {
    goalData: Goal;
    close: () => void;
    closeMenu: () => void;
    closeQuickMenu: () => void;
}

const BooleanGoalForm: React.FC<LogGoalProps> = ({goalData, close}) => {

    const { showMessage, showConfirmationModal } = useUI();
    const navigate = useNavigate();

    const todayDate = new Date();

    const [inputValue, setInputValue] = useState<string>('yes');
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState(todayDate.toISOString().split('T')[0]);
    const [prevId, setPrevId] = useState('')

    const getCurrentTime = (input: Date | string = new Date()): string => {
        const date = typeof input === "string" ? new Date(input) : input;
        const hours = String(date.getHours()).padStart(2, '0'); // Ensure 2-digit hours
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Ensure 2-digit minutes
        return `${hours}:${minutes}`;
    };
    
    const [time, setTime] = useState<string>(getCurrentTime());

    const checkIfAlreadyLogged = async () =>{
        try{
            const existingLog = await getAllItems('logs', {goalId: goalData._id, date: getCurrentDay()});
            if(existingLog && existingLog.length > 0){
                showConfirmationModal({title: "Already Logged", message:"You already added a log for this goal. If you log again it will override the old one. Do you want to continue?", onConfirm: ()=>populateLog(existingLog[0])})
            }
        }catch(error){
            console.error(error);
        }
    }
    // Used if goal type is yes-no or number to let the user "update" the previous log of the current day. Uses the same id as the prev log so that it will replace it keeping it only one log per day for that type of goal
    const populateLog = async (prevLog) =>{
        setName(prevLog.data.name);
        setDescription(prevLog.data.description);
        setDate(prevLog.data.data);
        setInputValue(prevLog.data.value);
        setPrevId(prevLog._id);
    }
    // Checks if it is already logged
    useEffect(()=>{
        if(goalData.type === 'yes-no' || goalData.type === 'number'){
            checkIfAlreadyLogged();
        }
    },[])
    const submitLog = async () =>{
        if(goalData){
            const data: GoalLog = {
                type: 'goal', 
                goalId: goalData._id, // Ref of the logged goal
                _id: prevId || ObjectID().toHexString(),
                title: `${goalData.name} Log`, 
                icon: goalData.icon,
                timestamp: todayDate,
                data: {
                    value: inputValue,
                    time,
                    description,
                    name,
                    unit: goalData.unit,
                    date,
                    type: 'yes-no'
                }
            }
            await deleteGoalLogs(goalData._id, todayDate)
            await saveItem('logs', data);
            showMessage("Goal logged successfully", 'success');
            // Reset inputs 
            setInputValue('yes');
            setName('');
            setDescription('');
            setTime(getCurrentTime());
            // Closes the Quick log screen, the quick menu, the list of logs, and navigate to the logged goal
            navigate(`/goals/view/${goalData._id}`);
            close();
        }
    }

    return ( 
        <div className={styles.log}>
            <h3>{goalData.name}</h3>
            <input type="text" name="name" id="name" onChange={((e)=>setName(e.target.value))} value={name} placeholder="Name"/>
            <div className={styles.threeItems}>
                <fieldset>
                    <label>Time</label>
                    <input type="time" name="time" id="time" onChange={((e)=>setTime(e.target.value))} value={time} />
                </fieldset>
                <fieldset>
                    <label>Completed</label>
                    <select onChange={(e)=>setInputValue(e.target.value)} value={inputValue}>
                        <option value={'yes'}>Yes</option>
                        <option value={'no'}>No</option>
                    </select>
                </fieldset>
                <fieldset>
                    <label>Date</label>
                    <input type="date" onChange={(e)=>setDate(e.target.value)} value={date}></input>
                </fieldset>
            </div>
            <textarea name="description" id="description" onChange={((e)=>setDescription(e.target.value))} value={description} placeholder="Description"></textarea>
            <div className={styles.buttons}>
                <button type="button" className={styles["submit-button"]} onClick={submitLog}>Log</button>
                <button type="button" className={styles["close-button"]} onClick={close}>Close</button>
            </div>
        </div>
     );
}
 
export default BooleanGoalForm;