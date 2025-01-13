import { useState, useEffect } from "react";
import ProgressCircle from "../ProgressCircle/ProgressCircle";
import './logForm.css'
import { useDispatch, useSelector } from "react-redux";
import { addLog, removeLog } from "../../../store/userSlice";
import { getCurrentDay, makeFirstUpperCase } from "../../../helpers";
import { IconLibrary } from "../../../IconLibrary";






const LogForm = ({id, closeLogWindow}) => {


    const [inputValue, setInputValue] = useState(0);
    const [currentValue, setCurrentValue] = useState(0);

    const allLogs = useSelector((state)=>state.user.activity[getCurrentDay()]?.logs);
    const goalLogs = allLogs?.length > 0 ? allLogs.filter((item)=>item.id === id) : [];
    const goalData = useSelector((state)=>state.user.userData.goals.find((element)=>element.id === id));



    useEffect(()=>{
       if(goalLogs && goalLogs.length > 0){
           goalLogs.map((log)=>setCurrentValue((currentValue)=> currentValue += log.data.value));
           console.log(goalLogs)
       }
    },[])


    const dispatch = useDispatch();


    const handleInputChange = (e) =>{
        e.preventDefault();
        setInputValue(e.target.value);
    }
    const submitLog = () =>{
        const data = {
            type: 'goal', 
            id: goalData.id,
            name: goalData.name, 
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
                icon={goalData.icon}
            />
            <div className="goal">{currentValue}/{goalData.target} {goalData.unit}</div>
            </div>
            <div className="goal-logs-container">
                {console.log(goalLogs)}
                {goalLogs && goalLogs.length > 0 ? goalLogs.map((log)=>(
                    <div className="log-body" key={log.timestamp}>
                        <p>{log.timestamp.split('T')[1].split('.')[0]}</p>
                        <p>{log.data.value}</p>
                        <button onClick={()=>deleteLog({name: log.name, timestamp: log.timestamp})} className="transparent-bg"><img className="small-icon" src={IconLibrary.Close}></img></button>
                    </div>
                )): <p>Loading goals...</p>}
            </div>
            <div className="inputs">
                <input type="number" placeholder={goalData.unit} onChange={handleInputChange}></input>
            </div>
            <button className="submit-button orange-button" onClick={submitLog}>Log</button>
        </div>
     );
}
 
export default LogForm;