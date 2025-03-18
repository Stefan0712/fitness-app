import { useState } from "react";
import './exerciseLog.css'
import { v4 as uuidv4 } from 'uuid';
import { addLog } from "../../../store/userSlice.ts";
import { useDispatch } from "react-redux";
import { IconLibrary } from "../../../IconLibrary";
import {muscles} from '../../../constants/defaultMuscles';
import Field from "./Field.tsx";
import React from "react";



interface ExerciseLogProps {
    closeMenu: ()=> void;
}
interface LogData {
    id: string;
    type: string;
    name: string;
    icon: string;
    data: ExerciseInputs;
}
interface ExerciseInputs {
    name: string;
    time: string;
    targetGroup: string;
    sets: number;
    duration: string;
    fields: Field[];
}
interface Field {
    id: string;
    name: string;
    unit: string;
    value: number;
    target: number;
    isCompleted: boolean;
}
const ExerciseLog: React.FC<ExerciseLogProps> = ({closeMenu}) => {
    
    const [name, setName] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [targetGroup, setTargetGroup] = useState<string>('Arms');
    const [duration, setDuration] = useState<string>('');
    const [sets, setSets] = useState<string>('');
    const [savedValues, setSavedValues] = useState<Field[]>([]);

    const dispatch = useDispatch();

    const [fieldName, setFieldName] = useState<string>('');
    const [fieldUnit, setFieldUnit] = useState<string>('');
    const [fieldTarget, setFieldTarget] = useState<number | string>('')
    const [fieldValue, setFieldValue] = useState<number | string>('');


    const logExercise = () =>{
        const data: LogData = {
            id: uuidv4(),
            type: 'exercise',
            name: "Exercise",
            icon: IconLibrary.Exercise,
            data:{
                name,
                time, 
                targetGroup,
                duration,
                sets: typeof sets === 'string' ? parseInt(sets) : sets || 1,
                fields: savedValues
            }
        }
        dispatch(addLog(data))
        closeMenu();
    }

    const addField = (data) =>{
        setSavedValues((savedValues)=>[...savedValues, data]);
    }
    const handleSaveField = () =>{
        const field: Field = {
            id: uuidv4(),
            name: fieldName,
            value: typeof fieldValue === 'string' ? parseInt(fieldValue) : fieldValue || 0,
            target: typeof fieldTarget === 'string' ? parseInt(fieldTarget) : fieldTarget || 0,
            unit: fieldUnit,
            isCompleted: true
        }
        addField(field);
        setFieldName('');
        setFieldTarget(0);
        setFieldUnit('');
        setFieldValue(0);
    }
    return ( 
        <div className="exercise-log">
            <div className="top-bar">
                <h1>Log Exercise</h1>
                <button onClick={closeMenu}><img src={IconLibrary.Close} alt=""></img></button>
            </div>
            <div className="exercise-main-info">
                <div className="first-line">
                    <input type="text" name="name" id="name" onChange={(e)=>setName(e.target.value)} value={name} placeholder="Exercise Name" required></input>
                    <select name="targetGroup" id="targetGroup" required={true} onChange={(e) => setTargetGroup(e.target.value)} value={targetGroup}>
                        {muscles?.map((item)=>(
                            <option value={item.value}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="same-line-space">
                    <input type="time" name="time" id="time" onChange={(e)=>setTime(e.target.value)} value={time}></input>
                    <input type="duration" name="duration" id="duration" onChange={(e)=>setDuration(e.target.value)} value={duration} placeholder="Duration (min)" required></input>
                    <input type="number" name="sets" id="sets" onChange={(e)=>setSets(e.target.value)} value={sets} placeholder={"Sets"}  required></input>
                </div>
            </div>
            <h4>Fields</h4>
            <div className="fields-container">
                {savedValues?.map((item)=>(
                    <div className='field'>
                        <p className="field-name"><b>{item.name}</b></p>
                        <p className="field-target">{item.target || 0}</p>
                        <p className="field-unit">{item.unit}</p>
                        <img className="small-icon" src={IconLibrary.No} onClick={()=>setSavedValues(savedValues=>savedValues.filter(value=>value.id!==item.id))} />
                    </div>
                ))}
            </div>
            <div className="new-field">
                <input type='text' name='name' id='name' onChange={(e)=>setFieldName(e.target.value)} value={fieldName} placeholder="Name"></input>
                <input type='text' name='name' id='name' onChange={(e)=>setFieldUnit(e.target.value)} value={fieldUnit} placeholder="Unit"></input>
                <input type='number' name='value' id='value' onChange={(e)=>setFieldValue(parseInt(e.target.value))} value={fieldValue} placeholder="Value"></input>
                <input type='number' name='target' id='target' onChange={(e)=>setFieldTarget(parseInt(e.target.value))} value={fieldTarget} placeholder="Target"></input>
                <img className='small-icon' src={IconLibrary.Add} onClick={handleSaveField}></img>            
            </div>
            <button className="exercise-log-submit-button" onClick={logExercise}>Log Exercise</button>
        </div>
     );
}
 
export default ExerciseLog;