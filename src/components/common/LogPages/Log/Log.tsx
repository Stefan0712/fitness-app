import { useEffect, useState } from "react";
import styles from './Log.module.css';
import React from "react";
import { BaseLog, Goal } from "../../interfaces.ts";
import { getAllItems, saveItem } from "../../../../db.js";
import { useUI } from "../../../../context/UIContext.jsx";
import ObjectID from "bson-objectid";
import { getCurrentDay } from "../../../../helpers.js";

interface LogGoalProps {
    goalData: Goal;
    setCurrentScreen: (screen: string) => void;
}

const Log: React.FC<LogGoalProps> = ({goalData, setCurrentScreen}) => {

    const { showMessage, showConfirmationModal } = useUI();

    const todayDate = new Date();

    const [inputValue, setInputValue] = useState<string>(goalData.type === 'number' || goalData.type === 'target' ? '0' : goalData.type === 'yes-no' ? 'yes' : '0');
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
    
    const [time, setTime] = useState<string>(getCurrentTime())

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
    const populateLog = async (prevLog) =>{
        console.log(prevLog)
        setName(prevLog.data.name);
        setDescription(prevLog.data.description);
        setDate(prevLog.data.data);
        setInputValue(prevLog.data.value);
        setPrevId(prevLog._id);
    }
    useEffect(()=>{
        if(goalData.type === 'yes-no' || goalData.type === 'number'){
            checkIfAlreadyLogged();
        }
    },[])


    const submitLog = async () =>{
        if(goalData){
            const data: BaseLog = {
                type: 'goal', 
                goalId: goalData._id,
                _id: prevId || ObjectID().toHexString(),
                title: `${goalData.name} Log`, 
                icon: goalData.icon,
                timestamp: todayDate,
                data: {
                    value: goalData.type === 'number' || goalData.type === 'target' ? parseInt(inputValue) : goalData.type === 'yes-no' ? inputValue : inputValue,
                    time,
                    description,
                    name,
                    unit: goalData.unit,
                    date,
                    type: goalData.type || 'target'
                }
            }
            await saveItem('logs', data);
            showMessage("Goal logged successfully", 'success');
            setInputValue('0');
            setName('');
            setDescription('');
            setTime(getCurrentTime());
            setCurrentScreen('history');
        }
    }

    return ( 
        <div className={styles.log}>
            <input type="text" name="name" id="name" onChange={((e)=>setName(e.target.value))} value={name} placeholder="Name"/>
            <div className={styles.threeItems}>
                <fieldset>
                    <label>Time</label>
                    <input type="time" name="time" id="time" onChange={((e)=>setTime(e.target.value))} value={time} />
                </fieldset>
                <fieldset>
                    <label>{goalData.type === 'yes-no' ? 'Completed?' : 'Value'}</label>
                    {goalData.type && (goalData.type === 'number' || goalData.type === 'target') ? 
                        <input type="number" onChange={(e)=>setInputValue(e.target.value)} value={inputValue}></input>
                        : goalData.type && goalData.type === 'yes-no' ? <select onChange={(e)=>setInputValue(e.target.value)} value={inputValue}>
                            <option value={'yes'}>Yes</option>
                            <option value={'no'}>No</option>
                        </select> : null
                    }
                </fieldset>
                <fieldset>
                    <label>Date</label>
                    <input type="date" onChange={(e)=>setDate(e.target.value)} value={date}></input>
                </fieldset>
            </div>
            <textarea name="description" id="description" onChange={((e)=>setDescription(e.target.value))} value={description} placeholder="Description"></textarea>
            <button type="button" className={styles["submit-button"]} onClick={submitLog}>Log</button>
        </div>
     );
}
 
export default Log;