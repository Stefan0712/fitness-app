import { useState } from "react";
import './exerciseLog.css'
import { v4 as uuidv4 } from 'uuid';
import { addLog } from "../../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { IconLibrary } from "../../../IconLibrary";
import {muscles} from '../../../constants/defaultMuscles';
import Field from "./Field.tsx";




interface ExerciseLogProps {
    closeMenu: ()=> void;
}
interface FieldObject {
    id: string;
    name: string;
    description?: string;
    source: string;
    targetValue: string;
    unit: string;
    value?: number;
    isCompleted: boolean;
    type: string;
}
interface SavedValue {
    id: string;
    name: string;
    description?: string;
    value: string;
    unit: string;
    targetValue?: string;
}
interface ExerciseInputs {
    name: string;
    time: string;
    targetGroup: string;
    sets: number;
    savedValues: SavedValue[];
}
interface LogData {
    id: string;
    type: string;
    name: string;
    icon: string;
    data: ExerciseInputs[];
}
interface FieldDataObject {
    id?: string;
    name?: string;
    description?: string;
    unit?: string;
    value?: number;
    targetValue?: number;
}
const ExerciseLog: React.FC<ExerciseLogProps> = ({closeMenu}) => {


    const [showSavedFields, setShowSavedFields] = useState<boolean>(false);

    const allFields = useSelector<FieldObject[]>((state)=>state.user.fields);

    
    const [name, setName] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [targetGroup, setTargetGroup] = useState<string>('Arms');
    const [duration, setDuration] = useState<string>('');
    const [sets, setSets] = useState<string>('');
    const [savedValues, setSavedValues] = useState<SavedValue[]>([]);

    const [currentScreen, setCurrentScreen] = useState<string>('values');
    const dispatch = useDispatch();



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
                sets: sets || 1,
                savedValues
            }
        }
        dispatch(addLog(data))
        closeMenu();
    }
    const saveField = (newData: FieldObject) =>{
        setSavedValues((savedValues)=>[...savedValues, newData]);
        setCurrentScreen('values');
    }
    const addField = (data) =>{
        setSavedValues((savedValues)=>[...savedValues, data]);
    }
    return ( 
        <div className="exercise-log">
            <div className="top-bar">
                <h1>Log Exercise</h1>
                <button onClick={closeMenu}><img src={IconLibrary.Close} alt=""></img></button>
            </div>
            <div className="exercise-main-info">
                <input type="text" name="name" id="name" onChange={(e)=>setName(e.target.value)} value={name} placeholder="Exercise Name" required></input>
                <div className="same-line-space">
                    <input type="time" name="time" id="time" onChange={(e)=>setTime(e.target.value)} value={time}></input>
                    <input type="duration" name="duration" id="duration" onChange={(e)=>setDuration(e.target.value)} value={duration} placeholder="Duration (min)" required></input>
                    <input type="number" name="sets" id="sets" onChange={(e)=>setSets(e.target.value)} value={sets} placeholder={"Sets"}  required></input>
                </div>
                <select name="targetGroup" id="targetGroup" required={true} onChange={(e) => setTargetGroup(e.target.value)} value={targetGroup}>
                    {muscles?.map((item)=>(
                        <option value={item.value}>{item.name}</option>
                    ))}
                
                </select>
            </div>
            <div className={'toggle-buttons-container'}>
                <button className={`toggle-button ${currentScreen === 'values' ? 'selected-button' : ''}`} onClick={()=>setCurrentScreen('values')}>Values</button>
                <button className={`toggle-button ${currentScreen === 'fields' ? 'selected-button' : ''}`} onClick={()=>setCurrentScreen('fields')}>Custom Fields</button>
            </div>
            <Field saveField={saveField}  type={'edit'}/>
            <div className="content">
                    {currentScreen === 'values' ? (
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
                    ) : currentScreen === 'fields' ? (
                        <div className={`saved-fields-container`}>
                            {allFields
                                ?.filter(field => !savedValues.some(item => item.id === field.id)) // Corrected condition
                                .map((item, index) => (
                                    <div className="saved-field" key={'custom-field-' + index}>
                                        <h4 className="saved-field-name">{item.name}</h4>
                                        <p className="saved-field-unit">{item.targetValue} {item.unit}</p>
                                        <img className="small-icon" src={IconLibrary.Add} onClick={() => addField(item)} />
                                    </div>
                            ))}

                        </div>
                    ) : null}
            </div>
            
       
            
            
            <button className="orange-button large-button" onClick={logExercise}>Log Exercise</button>
        </div>
     );
}
 
export default ExerciseLog;