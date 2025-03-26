import { useEffect, useState } from "react";
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
    
    const [targetGroup, setTargetGroup] = useState<string>('Arms');
    const [duration, setDuration] = useState<string>('');
    const [sets, setSets] = useState<string>('');
    const [savedValues, setSavedValues] = useState<Field[]>([]);

    const dispatch = useDispatch();

    const [fieldName, setFieldName] = useState<string>('');
    const [fieldUnit, setFieldUnit] = useState<string>('');
    const [fieldTarget, setFieldTarget] = useState<number | string>('')
    const [fieldValue, setFieldValue] = useState<number | string>('');

    const [errors, setErorrs] = useState<string[]>([]);
    const [isFieldValid, setIsFieldValid] = useState<boolean>(true);

    const getCurrentTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0'); // Ensures two-digit format
        const minutes = String(now.getMinutes()).padStart(2, '0'); // Ensures two-digit format
        return `${hours}:${minutes}`;
    };
    const [time, setTime] = useState<string>(getCurrentTime());

    const logExercise = () =>{
        if(!checkForErrors()){
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
    }

    const addField = (data) =>{
        setSavedValues((savedValues)=>[...savedValues, data]);
        setIsFieldValid(true);      
    }
    const handleSaveField = () =>{
        if(fieldName 
            && fieldName.length > 0 
            && fieldName.length < 15 
            && fieldUnit.length > 0 
            && fieldUnit.length < 6
            && fieldValue
            && (typeof fieldValue === 'string' ? parseInt(fieldValue) : fieldValue) > 0 
            && fieldTarget
            && (typeof fieldTarget === 'string' ? parseInt(fieldTarget) : fieldTarget) > 0){
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
        }else{
            setIsFieldValid(false);
            console.log("Not valid field", isFieldValid)
        }
    }
    const checkForErrors = () =>{
        setErorrs([]);
        let errorrArr: string[] = [];
        if(!name || name.length < 1 || name.length > 15){
            errorrArr.push("Name is invalid")
        };
        if((typeof duration === 'string' ? parseInt(duration) : duration) < 1 || !duration){
            errorrArr.push('Duration is invalid');
        }
        if((typeof sets === 'string' ? parseInt(sets) : sets) < 1 || !sets){
            errorrArr.push('Sets is invalid');
        }
        setErorrs(errorrArr);
        setTimeout(()=>setErorrs([]),2000);
        if(errorrArr && errorrArr.length > 0){
            return true;
        }else{
            return false;
        }
        
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
                    <input type="number" name="duration" id="duration" onChange={(e)=>setDuration(e.target.value)} value={duration} placeholder="Duration (min)" required></input>
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
                <input type='text' name='name' id='name' onChange={(e)=>setFieldName(e.target.value)} value={fieldName} placeholder="Name" className={!isFieldValid && (!fieldName || fieldName.length < 1 || fieldName.length > 15) ? 'input-error': ''}></input>
                <input type='text' name='name' id='name' onChange={(e)=>setFieldUnit(e.target.value)} value={fieldUnit} placeholder="Unit" className={!isFieldValid && (!fieldUnit || fieldUnit.length < 1 || fieldUnit.length > 5) ? 'input-error': ''}></input>
                <input type='number' name='value' id='value' onChange={(e)=>setFieldValue(parseInt(e.target.value))} value={fieldValue} placeholder="Value" className={!isFieldValid && (!fieldValue || (typeof fieldValue === 'string' ? parseInt(fieldValue) : fieldValue) < 1) ? 'input-error': ''}></input>
                <input type='number' name='target' id='target' onChange={(e)=>setFieldTarget(parseInt(e.target.value))} value={fieldTarget} placeholder="Target" className={!isFieldValid && (!fieldTarget || (typeof fieldTarget === 'string' ? parseInt(fieldTarget) : fieldTarget) < 1) ? 'input-error': ''}></input>
                <img className='small-icon' src={IconLibrary.Add} onClick={handleSaveField}></img>            
            </div>
            <button className="exercise-log-submit-button" onClick={logExercise}>Log Exercise</button>
            {errors && errors.length > 0 ? <div className="exercise-log-errors" onClick={()=>setErorrs([])}>
                {errors.map((item, index)=><p className="error" key={'error-'+index}>{item}</p>)}
            </div> 
            : null}
        </div>
     );
}
 
export default ExerciseLog;