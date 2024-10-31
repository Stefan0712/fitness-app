import { useState, useEffect } from "react";
import closeIcon from '../../../../assets/close.svg';
import ProgressCircle from "../ProgressCircle";
import '../stylings/logForm.css'
import { useDispatch, useSelector } from "react-redux";
import { addLog, removeLog } from "../../../../store/userSlice";
import { getCurrentDay, makeFirstUpperCase } from "../../../../helpers";






const LogForm = ({type, closeLogWindow}) => {
    console.log(type)
    const [inputValue, setInputValue] = useState(0);
    const logs = useSelector((state)=>state.user.activity[getCurrentDay()]?.logs);
    const [goalLogs, setGoalLogs] = useState(logs?.length > 0 ? logs.filter((item)=>item.name === type) : []);
    const [currentValue, setCurrentValue] = useState(0);
    const goalData = useSelector((state)=>state.user.userData.goals.find((element)=>element.name === type));



    useEffect(()=>{
        goalLogs.map((log)=>setCurrentValue((currentValue)=> currentValue += log.data.value));
    },[])


    const dispatch = useDispatch();


    const handleInputChange = (e) =>{
        e.preventDefault();
        setInputValue(e.target.value);
    }
    const submitLog = () =>{
        const data = {
            category: 'goal', 
            name: type, 
            icon: goalData.icon,
            data: {
                value: parseFloat(inputValue)
            }
        }
        dispatch(addLog(data));
        closeLogWindow();
    }

    const deleteLog = (log) => {
        dispatch(removeLog(log));
        closeLogWindow();
    }

      
    return ( 
        <div className="log-form-body">
            <div className="top-bar">
                <h1>{makeFirstUpperCase(type)}</h1>
                <button onClick={closeLogWindow}><img src={closeIcon} alt=""></img></button>
            </div>
            <div className="progress-section">
            <ProgressCircle 
                currentAmount={currentValue} 
                targetAmount={goalData.target} 
                size={120} 
                strokeWidth={10} 
                color="#3498db" 
                radiusSize={2}
                icon={goalData.icon}
            />
            <div className="goal">{currentValue}/{goalData.target} {goalData.unit}</div>
            </div>
            <div className="goal-logs-container">
                {goalLogs.map((log)=>(
                    <div className="log-body" key={log.timestamp}>
                        <p>{log.timestamp.split('T')[1].split('.')[0]}</p>
                        <p>{log.data.value}</p>
                        <button onClick={()=>deleteLog({name: log.name, timestamp: log.timestamp})} className="transparent-bg"><img className="small-icon" src="/icons/close.svg"></img></button>
                    </div>
                ))}
            </div>
            <div className="inputs">
                <input type="number" placeholder={goalData.unit} onChange={handleInputChange}></input>
            </div>
            <button className="submit-button orange-button" onClick={submitLog}>Log</button>
        </div>
     );
}
 
export default LogForm;