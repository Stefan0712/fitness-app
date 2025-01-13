import { useState } from "react";
import './exerciseLog.css'
import { v4 as uuidv4 } from 'uuid';
import { addLog } from "../../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { IconLibrary } from "../../../IconLibrary";
import {muscles} from '../../../constants/defaultMuscles';
import Field from "./Field";





const ExerciseLog = ({closeLogWindow}) => {


    const [showSavedFields, setShowSavedFields] = useState(false);

    const allFields = useSelector((state)=>state.user.fields);


    
    const [name, setName] = useState('');
    const [time, setTime] = useState('');
    const [targetGroup, setTargetGroup] = useState('');
    const [duration, setDuration] = useState('');
    const [sets, setSets] = useState(1);
    const [savedValues, setSavedValues] = useState([]);


    const dispatch = useDispatch();



    const logExercise = () =>{
        const data = {
            id: uuidv4(),
            type: 'activity',
            name: "Exercise",
            icon: IconLibrary.Exercise,
            data:{
                name,
                time, targetGroup,
                duration,
                sets,
                savedValues
            }
        }
        dispatch(addLog(data))
        closeLogWindow();
    }
    const saveField = (newData) =>{
        setSavedValues((savedValues)=>[...savedValues, newData]);
    }
    return ( 
        <div className="exercise-log">
            <div className="top-bar">
                <h1>Log Exercise</h1>
                <button onClick={closeLogWindow}><img src={IconLibrary.Close} alt=""></img></button>
            </div>
            <div className="exercise-main-info">
                <input type="text" name="name" id="name" onChange={(e)=>setName(e.target.value)} value={name} placeholder="Exercise Name" required></input>
                <div className="same-line-space">
                    <input type="time" name="time" id="time" onChange={(e)=>setTime(e.target.value)} value={time}></input>
                    <input type="duration" name="duration" id="duration" onChange={(e)=>setDuration(e.target.value)} value={duration} placeholder="Duration (min)" required></input>
                    <input type="sets" name="sets" id="sets" onChange={(e)=>setSets(e.target.value)} value={sets} placeholder="Sets" required></input>
                </div>
                <select name="targetGroup" id="targetGroup" required={true} onChange={(e) => setTargetGroup(e.target.value)} value={targetGroup}>
                    {muscles?.map((item)=>(
                        <option value={item.value}>{item.name}</option>
                    ))}
                
                </select>
            </div>
            <h3>Saved Values</h3>
            <div className="saved-values-container">
                {savedValues?.map((item)=>(
                        <div className='saved-field'>
                        <p className="saved-field-name"><b>{item.name}</b></p>
                        <p className="saved-field-target">{item.targetValue || 0}</p>
                        <p className="saved-field-unit">{item.unit}</p>
                        <img className="small-icon" src={IconLibrary.No} onClick={()=>setSavedValues(savedValues=>savedValues.filter(value=>value.id!==item.id))} />
                    </div>
                ))}
            </div>
       
            <Field saveField={saveField}  type={'edit'}/>
            <div className={"collapsed-header"} onClick={()=>setShowSavedFields(showSavedFields=>!showSavedFields)}><h3>Saved Fields</h3><img src={IconLibrary.Arrow} className={`small-icon ${showSavedFields ? 'down' : "left"}`} /></div>
            <div className={`saved-fields-container ${showSavedFields ? 'expand-saved-fields' : ""}`}>
                {allFields?.map((item)=>(<Field saveField={saveField} fieldData={item} type={'view'}/>))}
            </div>
            <button className="orange-button large-button" onClick={logExercise}>Log Exercise</button>
        </div>
     );
}
 
export default ExerciseLog;