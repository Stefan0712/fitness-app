import { useState, useEffect } from "react";
import closeIcon from '../../../../assets/close.svg';
import ProgressCircle from "../ProgressCircle";
import '../stylings/logForm.css'
import { useDispatch, useSelector } from "react-redux";
import { addLog } from "../../../../store/userSlice";
import { getCurrentDay } from "../../../../helpers";






const LogForm = ({type, closeLogWindow}) => {
    console.log(type)
    const [inputValue, setInputValue] = useState(0);
    const logs = useSelector((state)=>state.user.activity[getCurrentDay()].logs);
    const [goalLogs, setGoalLogs] = useState(logs.filter((item)=>item.name === type));
    const [targetValue, setTargetValue] = useState(1500);
    const [currentValue, setCurrentValue] = useState(0);


//    useEffect(()=>{
//         logs.forEach((log)=>setCurrentProgress((currentProgress)=>currentProgress+=log.data.value))
//    },[])


    const dispatch = useDispatch();


    const handleInputChange = (e) =>{
        e.preventDefault();
        setInputValue(e.target.value);
    }
    const submitLog = () =>{
        const goalData = {
            category: 'goal', 
            name: type, 
            data: {
                value: parseFloat(inputValue)
            }
        }
        dispatch(addLog(goalData));
        closeLogWindow();
    }



      
    return ( 
        <div className="log-form-body">
            <div className="top-bar">
                <h1>{type}</h1>
                <button onClick={closeLogWindow}><img src={closeIcon} alt=""></img></button>
            </div>
            <div className="progress-section">
            <ProgressCircle 
                currentAmount={60} 
                targetAmount={100} 
                size={120} 
                strokeWidth={10} 
                color="#3498db" 
                radiusSize={2}
                icon={'/icons/'+type.icon}
            />
            <div className="goal">{currentValue}/{targetValue}</div>
            </div>
            <div className="goal-logs-container">
                {goalLogs.map((log)=>(
                    <div className="log-body" key={log.timestamp}>
                        <p>{log.timestamp.split('T')[1].split('.')[0]}</p>
                        <p>{log.data.value}</p>


                    </div>
                ))}
            </div>
            <div className="inputs">
                <input type="number" placeholder="Qty" onChange={handleInputChange}></input>
            </div>
            <button className="submit-button orange-button" onClick={submitLog}>Log</button>
        </div>
     );
}
 
export default LogForm;