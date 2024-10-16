import { useState } from "react";
import closeIcon from '../../../../assets/close.svg';
import '../stylings/exerciseLog.css'
import addIcon from '../../../../assets/plus-circle.svg';






const ExerciseLog = ({data, closeLogWindow}) => {
    const [inputButtons, setInputButtons] = useState(['Duration','Distance','Reps','Sets','Weight','Calories','Speed','Heart Rate','Incline','Resistance','Laps','Elevation'])
    const [selectedInputs, setSelectedInputs] = useState([]);
    const [expandSelect, setExpandSelect] = useState(false)

    const addField = (type)=>{
        const filtered = inputButtons.filter((item)=>item!==type);
        setInputButtons(filtered)
        setSelectedInputs((selectedInputs)=>[...selectedInputs, type]);
    }
    const removeField = (type)=>{
        const filtered = selectedInputs.filter((item)=>item!==type);
        setSelectedInputs(filtered)
        setInputButtons((inputButtons)=>[...inputButtons, type])
    }
    const toggleSelected = () =>{
        setExpandSelect((expandSelect)=>!expandSelect);
    }
    return ( 
        <div className="exercise-log">
            <div className="top-bar">
                <h1>{data.name}</h1>
                <button onClick={closeLogWindow}><img src={closeIcon} alt=""></img></button>
            </div>
            <div className="main-info">
                <input type="text" name="name" id="name" required={true} placeholder="Name"></input>
                <input type="text" name="note" id="note" placeholder="Notes"></input>
                <select name="name" id="name" required={true} placeholder="Name">
                    <option value="cardio">Cardio</option>
                    <option value="strength">Strength Training</option>
                    <option value="stamina">Stamina</option>
                    <option value="flexibility">Flexibility</option>
                    <option value="endurance">Endurance</option>
                    <option value="hiit">HIIT</option>
                    <option value="weightlifting">Weightlifting</option>
                    <option value="recovery">Recovery</option>
                    <option value="yoga">Yoga</option>
                </select>
                
               
            </div>
            <h3>Values</h3>
            <div className="values-container">
                {selectedInputs.length > 0 ? selectedInputs.map((item)=>(
                    <div className="selected-input">
                        <p>{item.charAt(0).toUpperCase() + item.slice(1)}</p>
                        <div className="input-container" key={item+'selected'}>
                            <input className="input-value" type="number" name={item} id={item} placeholder={'Value'}></input>
                            <input className="input-unit" type="string" name='itemUnit' id='itemUnit' placeholder="Unit"></input>
                            <button className="transparent-bg" onClick={()=>removeField(item)}><img className="icon-30" src={closeIcon} alt=""/></button>
                        </div>
                    </div>
                )) : ''}
                
            </div>
            <button className="submit-button orange-button">Log</button>
            <div className={`values-container select-inputs ${expandSelect ? 'expand-select-inputs' : ''}`}>
                <h3 onClick={toggleSelected}>Inputs</h3>
                {inputButtons.map((type)=>(
                    <div className="value-type" key={type}>
                        <p>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
                        <button className="transparent-bg" onClick={()=>addField(type)}><img className="icon-30" src={addIcon} alt=""/></button>
                    </div>
                ))}
                
            </div>
            
        </div>
     );
}
 
export default ExerciseLog;