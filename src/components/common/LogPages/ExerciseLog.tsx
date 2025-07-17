import { useState } from "react";
import styles from './ExerciseLogs.module.css'
import { v4 as uuidv4 } from 'uuid';
import { IconLibrary } from "../../../IconLibrary";
import React from "react";
import { BaseLog, Equipment, Field as IField, Tag, TargetGroup } from "../interfaces.ts";
import FieldsScreen from '../../pages/Exercise/Screens/FieldsScreen/FieldsScreen.tsx';
import MuscleSelector from '../../common/MuscleSelector/MuscleSelector.tsx';
import {saveItem} from '../../../db.js';
import { useUI } from "../../../context/UIContext.jsx";
import EquipmentSelector from "../EquipmentSelector/EquipmentSelector.tsx";
import TagSelector from '../../common/TagSelector/TagSelector.tsx';


interface ExerciseLogProps {
    closeMenu: ()=> void;
}
const ExerciseLog: React.FC<ExerciseLogProps> = ({closeMenu}) => {
    

    const [showTagSelector, setShowTagSelector] = useState(false);
    const [showEquipmentSelector, setShowEquipmentSelector] = useState(false);
    const [showMuscleSelector, setShowMuscleSelector] = useState(false);
    const [name, setName] = useState<string>('');
    const [tags, setTags] = useState<Tag[]>([])
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [targetMuscles, setTargetMuscles] = useState<TargetGroup[]>([])
    const [duration, setDuration] = useState<string>('');
    const [sets, setSets] = useState<string>('');
    const [fields, setFields] = useState<IField[]>([])


    const {showMessage} = useUI();


    const getCurrentTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0'); // Ensures two-digit format
        const minutes = String(now.getMinutes()).padStart(2, '0'); // Ensures two-digit format
        return `${hours}:${minutes}`;
    };
    const [time, setTime] = useState<string>(getCurrentTime());

    const logExercise = async () =>{
        if(name && name.trim().length > 2 && parseInt(sets) > 0){
            const data: BaseLog = {
                _id: uuidv4(),
                type: 'exercise',
                title: "Exercise",
                icon: IconLibrary.Exercise,
                timestamp: new Date(),
                data:{
                    name,
                    time, 
                    targetMuscles,
                    tags,
                    equipment,
                    duration: parseInt(duration),
                    sets: sets === '' ? 1 : parseInt(sets),
                    fields
                }
            }
            await saveItem('logs', data);
            showMessage("Exercise logged successfully", 'success');
            closeMenu();
        }else{
            if(!name || name.trim().length < 3){
                showMessage('Name is invalid. It should be at least three characters long',"error")
            }
            if(parseInt(sets) < 1){
                showMessage('Sets cannot be less than 1.','error');
            }
        }
    }
    return ( 
        <div className={styles['exercise-log']}>
            <div className={styles['top-bar']}>
                <h1>Log Exercise</h1>
                <button onClick={closeMenu}><img src={IconLibrary.Close} alt=""></img></button>
            </div>

            {showMuscleSelector ? <MuscleSelector close={()=>setShowMuscleSelector(false)} targetMuscles={targetMuscles} setTargetMuscles={setTargetMuscles} /> : null}
            {showEquipmentSelector ? <EquipmentSelector close={()=>setShowEquipmentSelector(false)} equipments={equipment} setEquipments={setEquipment} /> : null}
            {showTagSelector ? <TagSelector close={()=>setShowTagSelector(false)} tags={tags} setTags={setTags} /> : null} 

            <input type="text" name="name" id="name" onChange={(e)=>setName(e.target.value)} value={name} placeholder="Exercise Name*" required></input>
            <div className={styles.threeInputs}>
                <input type="time" name="time" id="time" className={styles.timeInput} onChange={(e)=>setTime(e.target.value)} value={time}></input>
                <input type="number" name="duration" id="duration" onChange={(e)=>setDuration(e.target.value)} value={duration} placeholder="Duration (min)"></input>
                <input type="number" name="sets" id="sets" onChange={(e)=>setSets(e.target.value)} value={sets} placeholder={"Sets*"} required></input>
            </div>
            <div className={styles.customItemsRow}>
                <div className={styles.customItemsButton} onClick={()=>setShowTagSelector(true)}>
                    <img className={styles.categoryIcon} src={IconLibrary.Tags} alt="" />
                    <h4>{tags?.length || 0}</h4>
                </div>
                <div className={styles.customItemsButton} onClick={()=>setShowEquipmentSelector(true)}>
                    <img className={styles.categoryIcon} src={IconLibrary.Equipment} alt="" />
                    <h4>{equipment?.length || 0}</h4>
                </div>
                <div className={styles.customItemsButton} onClick={()=>setShowMuscleSelector(true)}>
                    <img className={styles.categoryIcon} src={IconLibrary.Muscle} alt="" />
                    <h4>{targetMuscles?.length || 0}</h4>
                </div>
            </div>
            <h4>Values</h4>
            <div className={styles.fields}>
                <FieldsScreen type={'log'} fields={fields} setFields={setFields} />
            </div>
            <button className={styles.submit} onClick={logExercise}>Log Exercise</button>
        </div>
     );
}
 
export default ExerciseLog;