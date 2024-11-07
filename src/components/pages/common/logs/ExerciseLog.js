import { useState } from "react";
import closeIcon from '../../../../assets/close.svg';
import '../stylings/exerciseLog.css'
import { v4 as uuidv4 } from 'uuid';
import { addLog } from "../../../../store/userSlice";
import { useDispatch } from "react-redux";





const ExerciseLog = ({closeLogWindow}) => {
    const [name, setName] = useState('');
    const [time, setTime] = useState('');
    const [targetGroup, setTargetGroup] = useState('');
    const [duration, setDuration] = useState('');
    const [fields, setFields] = useState([]);

    //field states
    const [fieldName, setFieldName] = useState('');
    const [fieldUnit, setFieldUnit] = useState('');
    const [fieldValue, setFieldValue] = useState('')

    const dispatch = useDispatch();


    const addField = () =>{
        const field = {name: fieldName, unit: fieldUnit, value: fieldValue};
        setFields((fields)=>[...fields, field]);
        setFieldName('');
        setFieldUnit('');
        setFieldValue('');
    }

    const logExercise = () =>{
        const data = {
            id: uuidv4(),
            type: 'activity',
            name: "Exercise",
            icon: '/icons/exercise.svg',
            data:{
                name,
                time, targetGroup,
                duration,
                fields
            }
        }
        dispatch(addLog(data))
        closeLogWindow();
    }
    return ( 
        <div className="exercise-log">
            <div className="top-bar">
                <h1>Log Exercise</h1>
                <button onClick={closeLogWindow}><img src={closeIcon} alt=""></img></button>
            </div>
            <input type="text" name="name" id="name" onChange={(e)=>setName(e.target.value)} value={name} placeholder="Exercise Name" required></input>
            <input type="time" name="time" id="time" onChange={(e)=>setTime(e.target.value)} value={time}></input>
            <input type="duration" name="duration" id="duration" onChange={(e)=>setDuration(e.target.value)} value={duration} placeholder="Duration (min)" required></input>
            <select name="targetGroup" id="targetGroup" required={true} onChange={(e) => setTargetGroup(e.target.value)} value={targetGroup}>
                <option value="arms">Arms</option>
                <option value="legs">Legs</option>
                <option value="chest">Chest</option>
                <option value="back">Back</option>
                <option value="shoulders">Shoulders</option>
                <option value="abs">Abs</option>
                <option value="glutes">Glutes</option>
                <option value="full-body">Full Body</option>
                <option value="core">Core</option>
                <option value="calves">Calves</option>
                <option value="biceps">Biceps</option>
                <option value="triceps">Triceps</option>
                <option value="forearms">Forearms</option>
                <option value="hamstrings">Hamstrings</option>
                <option value="quads">Quads</option>
            </select>
            <div className="field-creator">
                <input type="text" name="fieldName" id="fieldName" value={fieldName} onChange={(e)=>setFieldName(e.target.value)} placeholder="Field Name"></input>
                <input type="number" name="fieldValue" id="fieldValue" value={fieldValue} onChange={(e)=>setFieldValue(e.target.value)} placeholder="Value"></input>
                <input type="text" name="fieldUnit" id="fieldUnit" value={fieldUnit} onChange={(e)=>setFieldUnit(e.target.value)} placeholder="Unit"></input>
                <img className="small-icon" src="/icons/plus-circle.svg" alt="add field" onClick={addField}></img>
            </div>
            <div className="fields">
                {fields.length > 0 ? fields.map((field)=>(
                    <div className="field-body">
                        <p>{field.name}</p>
                        <p>{field.value}</p>
                        <p>{field.unit}</p>
                    </div>
                )) : (<p>No fields created</p>)}
            </div>
            
            <button className="orange-button large-button" onClick={logExercise}>Log Exercise</button>
        </div>
     );
}
 
export default ExerciseLog;