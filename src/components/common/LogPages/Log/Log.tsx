import { useState } from "react";
import styles from './Log.module.css';
import React from "react";
import { BaseLog, Goal } from "../../interfaces.ts";
import { saveItem } from "../../../../db.js";

interface LogGoalProps {
    goalData: Goal;
    setCurrentScreen: (screen: string) => void;
}

const Log: React.FC<LogGoalProps> = ({goalData, setCurrentScreen}) => {

    const todayDate = new Date();

    const [inputValue, setInputValue] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState(todayDate.toISOString().split('T')[0])

    const getCurrentTime = (input: Date | string = new Date()): string => {
        const date = typeof input === "string" ? new Date(input) : input;
        const hours = String(date.getHours()).padStart(2, '0'); // Ensure 2-digit hours
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Ensure 2-digit minutes
        return `${hours}:${minutes}`;
    };
    
    const [time, setTime] = useState<string>(getCurrentTime())


    const submitLog = async () =>{
        if(goalData){
            const data: BaseLog = {
                type: 'goal', 
                _id: goalData._id,
                title: `${goalData.name} Log`, 
                icon: goalData.icon,
                timestamp: todayDate,
                data: {
                    value: inputValue,
                    time,
                    description,
                    name,
                    unit: goalData.unit,
                    date
                }
            }
            await saveItem('logs', data)
            setInputValue(0);
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
                    <label>Value</label>
                    <input type="number" onChange={(e)=>setInputValue(parseInt(e.target.value))} value={inputValue}></input>
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