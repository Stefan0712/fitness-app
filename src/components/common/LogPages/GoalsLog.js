import { useState, useEffect } from "react";
import ProgressCircle from "../ProgressCircle/ProgressCircle";
import styles from './GoalsLog.module.css';
import { useDispatch, useSelector } from "react-redux";
import { addLog, removeLog } from "../../../store/userSlice";
import { getCurrentDay } from "../../../helpers";
import { IconLibrary } from "../../../IconLibrary";






const LogForm = ({id, closeLogWindow}) => {


    const [inputValue, setInputValue] = useState(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [name, setName] = useState();
    const [description, setDescription] = useState('');

    const getCurrentTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0'); // 2 digits
        const minutes = String(now.getMinutes()).padStart(2, '0'); //2 digits
        return `${hours}:${minutes}`;
    };
    const [time, setTime] = useState(getCurrentTime())


    const allLogs = useSelector((state)=>state.user.activity[getCurrentDay()]?.logs);
    const goalLogs = allLogs?.length > 0 ? allLogs.filter((item)=>item.id === id) : [];
    const goalData = useSelector((state)=>state.user.userData.goals.find((element)=>element.id === id));



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
        const data = {
            type: 'goal', 
            id: goalData.id,
            name: goalData.name, 
            icon: goalData.icon,
            data: {
                value: parseFloat(inputValue),
                time,
                description,
                name
            }
        }
        dispatch(addLog(data));
        setInputValue(0);
    }

    const deleteLog = (log) => {
        dispatch(removeLog(log));
    }

      
    return ( 
        <div className={styles['log-form']}>
            <div className={styles["top-bar"]}>
                <h1>{goalData?.name}</h1>
                <button onClick={closeLogWindow}><img src={IconLibrary.Close} alt=""></img></button>
            </div>
            <div className="progress-section">
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
                    <div className={styles["log-body"]} key={log.timestamp}>
                        <p>{log.timestamp.split('T')[1].split('.')[0]}</p>
                        <p>{log.data.value}</p>
                        <button onClick={()=>deleteLog(log)} className="transparent-bg"><img className="small-icon" src={IconLibrary.Close}></img></button>
                    </div>
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