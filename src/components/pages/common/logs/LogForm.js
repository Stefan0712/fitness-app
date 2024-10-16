import { useState } from "react";
import closeIcon from '../../../../assets/close.svg';
import ProgressCircle from "../ProgressCircle";
import '../stylings/logForm.css'
import '../stylings/logs.css'





const LogForm = ({data, closeLogWindow}) => {
    const [inputValue, setInputValue] = useState(0);
    const [currentValue, setCurrentValue] = useState(500);
    const [targetValue, setTargetValue] = useState(1500);
    const [totalValue, setTotalValue] = useState(0)



    const handleInputChange = (e) =>{
        e.preventDefault();
        setInputValue(e.target.value);
    }
    const addValue = (e) =>{
        e.preventDefault();
        setCurrentValue((prevValue) => prevValue + parseInt(inputValue, 10));
        setInputValue(0)
    }
    const submitLog = () =>{
        setTotalValue(currentValue);
    }


    return ( 
        <div className="log-form-body">
            <div className="top-bar">
                <h1>{data.name}</h1>
                <button onClick={closeLogWindow}><img src={closeIcon} alt=""></img></button>
            </div>
            {totalValue}
            <div className="progress-section">
            <ProgressCircle 
                currentAmount={60} 
                targetAmount={100} 
                size={120} 
                strokeWidth={10} 
                color="#3498db" 
                radiusSize={2}
                icon={data.src}
            />
            <div className="goal">{currentValue}/{targetValue} {data.type}</div>
            </div>
            <div className="inputs">
                <input type="number" placeholder="Qty" onChange={handleInputChange}></input>
                <button className="submit-log" onClick={addValue}>Add</button>
            </div>
            <button className="submit-button orange-button" onClick={submitLog}>Log</button>
        </div>
     );
}
 
export default LogForm;