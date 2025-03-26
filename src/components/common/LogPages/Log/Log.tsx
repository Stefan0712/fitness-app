import { useDispatch, useSelector } from "react-redux";
import { addLog } from "../../../../store/userSlice.ts";
import { useState } from "react";
import styles from './Log.module.css';
import MessageModal from "../../MessageModal/MessageModal.tsx";
import React from "react";
import { RootState } from "../../../../store/index.ts";

interface GoalObject {
    timestamp?: string;
    type: string;
    id: string;
    name: string;
    icon: string;
    data: {
        value: number;
        time: string;
        description: string;
        name: string;
        unit: string;
    };
}
interface MessageObject {
    message: string;
    type: string;
}

interface LogProps {
    id: string;
}
const Log: React.FC<LogProps> = ({id}) => {

    const dispatch = useDispatch();

    const [message, setMessage] = useState<MessageObject | null>(null)

    const [inputValue, setInputValue] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [unit, setUnit] = useState<string>('');
    const goalData = useSelector((state: RootState) => state.user.goals.find((item) => item.id === id));
    const getCurrentTime = (input: Date | string = new Date()): string => {
        // Ensure input is a Date object
        const date = typeof input === "string" ? new Date(input) : input;
    
        // Extract hours and minutes
        const hours = String(date.getHours()).padStart(2, '0'); // Ensure 2-digit hours
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Ensure 2-digit minutes
    
        // Return the time in HH:MM format
        return `${hours}:${minutes}`;
    };
    
    const [time, setTime] = useState<string>(getCurrentTime())


    const submitLog = () =>{
        if(!name){
            setMessage({type: 'fail', message: "Name can't be empty"});
        }else if(!inputValue || inputValue === 0){
            setMessage({type: 'fail', message: "Value can't be empty"});
        }else if(goalData){
            const data: GoalObject = {
                type: 'goal', 
                id: goalData.id,
                name: goalData.name, 
                icon: goalData.icon,
                data: {
                    value: inputValue,
                    time,
                    description,
                    name,
                    unit: goalData.unit
                }
            }
            dispatch(addLog(data));
            setInputValue(0);
            setName('');
            setDescription('');
            setTime(getCurrentTime());
            setMessage({message: "Log submited succesffully", type: 'success'});
        }
    }

    return ( 
        <div className={styles.log}>
            {message ? <MessageModal closeModal={()=>setMessage(null)} type={message.type} message={message.message} /> : null}
            <fieldset>
                <label>Name</label>
                <input type="text" name="name" id="name" onChange={((e)=>setName(e.target.value))} value={name} />
            </fieldset>
            <fieldset className={styles['half-input']}>
                <label>Time</label>
                <input type="time" name="time" id="time" onChange={((e)=>setTime(e.target.value))} value={time} />
            </fieldset>
            <fieldset className={styles['half-input']}>
                <label>Value</label>
                <input type="number" onChange={(e)=>setInputValue(parseInt(e.target.value))} value={inputValue}></input>
            </fieldset>
            <fieldset>
                <label>Description</label>
                <textarea name="description" id="description" onChange={((e)=>setDescription(e.target.value))} value={description}></textarea>
            </fieldset>
            <button type="button" className={styles["submit-button"]} onClick={submitLog}>Log</button>
        </div>
     );
}
 
export default Log;