import { useState, useEffect } from "react";
import ProgressCircle from "../ProgressCircle/ProgressCircle";
import styles from './GoalsLog.module.css';
import { useDispatch, useSelector } from "react-redux";
import { addLog, } from "../../../store/userSlice";
import { getCurrentDay } from "../../../helpers";
import { IconLibrary } from "../../../IconLibrary";
import GoalLogBody from "./GoalLogBody";


interface LogFormProps {
    id: string;
    closeLogWindow: () => void;
}



const LogForm: React.FC<LogFormProps> = ({id, closeLogWindow}) => {


    const [inputValue, setInputValue] = useState<number>(0);
    const [currentValue, setCurrentValue] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');


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

    interface Icon {
        name: string;
        icon: string;
    }
    interface Data{
        value: number;
        time: string;
        description?: string;
        name: string;
    }
    interface GoalObject {
        timestamp?: string;
        type: string;
        id: string;
        name: string;
        icon: Icon;
        data: Data;
    }
    interface GoalData {
        id: string;
        name: string;
        unit: string;
        target?: number;
        icon: Icon;
    }
    const allLogs = useSelector<GoalObject[]>((state)=>state.user.activity[getCurrentDay()]?.logs);

    const goalLogs: GoalObject[] = allLogs?.filter((item) => item.id === id) ?? [];

    const goalData = useSelector<GoalData | undefined>((state)=>state.user.userData.goals.find((element)=>element.id === id));
    
    console.log(goalData)

    useEffect(() => {
        if (goalLogs && goalLogs.length > 0) {
            const totalValue = goalLogs.reduce((sum, log) => sum + log.data.value, 0);
            setCurrentValue(totalValue);
        } else {
            setCurrentValue(0);
        }
    }, [goalLogs]);


    const dispatch = useDispatch();

    const submitLog = () =>{
        if (!goalData) {
            console.error("Goal data is undefined");
            return; // Or return early from the function
        }
        const data: GoalObject = {
            type: 'goal', 
            id: goalData.id,
            name: goalData.name, 
            icon: goalData.icon,
            data: {
                value: inputValue,
                time,
                description,
                name
            }
        }
        dispatch(addLog(data));
        setInputValue(0);
        setCurrentValue(0);
        setName('');
        setDescription('');
        setTime(getCurrentTime());
    }

    

      
    return ( 
        <div className={styles['log-form']}>
            <div className={styles["top-bar"]}>
                <h1>{goalData?.name}</h1>
                <button onClick={closeLogWindow}><img src={IconLibrary.Close} alt=""></img></button>
            </div>
            <div className={styles["progress-section"]}>
            <ProgressCircle 
                currentAmount={currentValue} 
                targetAmount={goalData.target} 
                size={120} 
                strokeWidth={10} 
                color="#3498db" 
                radiusSize={2}
                icon={goalData.icon.icon}
            />
            <div className={styles.goal}>{currentValue}/{goalData.target} {goalData.unit}</div>
            </div>
            <div className={styles["goals-container"]}>
                {goalLogs && goalLogs.length > 0 ? goalLogs.map((log)=>(
                   <GoalLogBody log={log} getCurrentTime={getCurrentTime} unit={goalData.unit}/>
                )): goalLogs.length === 0 ? <p className={styles["no-items-msg"]}>No goals found.</p> : !goalLogs ? <p className={styles["no-items-msg"]}>Loading goals...</p> : null}
            </div>
            <div className={styles.inputs}>
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
                    <input type="number" onChange={(e)=>setInputValue(e.target.value)} value={inputValue}></input>
                </fieldset>
                <fieldset>
                    <label>Description</label>
                    <textarea name="description" id="description" onChange={((e)=>setDescription(e.target.value))} value={description}></textarea>
                </fieldset>
            </div>
            <button type="button" className={styles["submit-button"]} onClick={submitLog}>Log</button>
            
        </div>
     );
}
 
export default LogForm;