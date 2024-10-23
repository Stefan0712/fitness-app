import { useState } from "react";
import closeIcon from '../../../../assets/close.svg';
import ProgressCircle from "../ProgressCircle";
import '../stylings/logForm.css'
import '../stylings/logs.css'
import { useDispatch, useSelector } from "react-redux";
import { updateDailyGoals } from "../../../../store/userSlice";
import { getCurrentDay } from "../../../../helpers";






const LogForm = ({goal, closeLogWindow}) => {
    const [inputValue, setInputValue] = useState(0);
    const currentProgress = useSelector((state)=>state.user.activity[getCurrentDay()])
    const [currentValue, setCurrentValue] = useState(currentProgress || 0);


   


    const dispatch = useDispatch();


    {console.log(goal)}
    const handleInputChange = (e) =>{
        e.preventDefault();
        setInputValue(e.target.value);
    }
    const submitLog = () =>{
        handleUpdateGoal({name: goal.name, currentValue: inputValue})
    }

    const handleUpdateGoal = (goalData) => {
        dispatch(updateDailyGoals(goalData));
    };

      
    return ( 
        <div className="log-form-body">
            <div className="top-bar">
                <h1>{goal.name}</h1>
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
                icon={'/icons/'+goal.icon}
            />
            <div className="goal">{currentValue}/{goal.targetValue} {goal.unit}</div>
            </div>
            <div className="inputs">
                <input type="number" placeholder="Qty" onChange={handleInputChange}></input>
            </div>
            <button className="submit-button orange-button" onClick={submitLog}>Log</button>
        </div>
     );
}
 
export default LogForm;