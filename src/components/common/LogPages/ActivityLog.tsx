import { useState } from "react";
import styles from './ActivityLog.module.css';
import { v4 as uuidv4 } from 'uuid';
import { IconLibrary } from "../../../IconLibrary.js";
import React from "react";
import { ActivityLog, Equipment, Field as IField, Tag, TargetGroup } from "../interfaces.ts";
import FieldsScreen from '../../pages/Exercise/Screens/FieldsScreen/FieldsScreen.tsx';
import MuscleSelector from '../MuscleSelector/MuscleSelector.tsx';
import {saveItem} from '../../../db.js';
import { useUI } from "../../../context/UIContext.jsx";
import EquipmentSelector from "../EquipmentSelector/EquipmentSelector.tsx";
import TagSelector from '../TagSelector/TagSelector.tsx';
import { useSelector } from "react-redux";
import { RootState } from "../../../store/index.ts";


interface ExerciseLogProps {
    closeMenu: ()=> void;
}


const ExerciseLog: React.FC<ExerciseLogProps> = ({closeMenu}) => {
    
    const {showMessage} = useUI();
    const defaultFields = useSelector((state: RootState)=>state.user.customFields);
    const [showTagSelector, setShowTagSelector] = useState(false);
    const [showEquipmentSelector, setShowEquipmentSelector] = useState(false);
    const [showMuscleSelector, setShowMuscleSelector] = useState(false);
    const [name, setName] = useState<string>('');
    const [tags, setTags] = useState<Tag[]>([])
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [targetMuscles, setTargetMuscles] = useState<TargetGroup[]>([])
    const [duration, setDuration] = useState<string>('');
    const [fields, setFields] = useState<IField[]>([])




    const getCurrentTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0'); // Ensures two-digit format
        const minutes = String(now.getMinutes()).padStart(2, '0'); // Ensures two-digit format
        return `${hours}:${minutes}`;
    };
    const [time, setTime] = useState<string>(getCurrentTime());

    const logExercise = async () =>{
        if(name && name.trim().length > 2){
            const data: ActivityLog = {
                _id: uuidv4(),
                type: 'activity',
                title: "Activity",
                icon: IconLibrary.Exercise,
                timestamp: new Date(),
                name,
                time, 
                targetMuscles,
                tags,
                equipment,
                duration: parseInt(duration),
                fields
            }
            await saveItem('logs', data);
            showMessage("Exercise logged successfully", 'success');
            closeMenu();
        }else{
            if(!name || name.trim().length < 3){
                showMessage('Name is invalid. It should be at least three characters long',"error")
            }

        }
    }
    return ( 
        <div className={styles['new-exercise-log']}>
            <div className={styles.content}>
                <div className={styles['top-bar']}>
                    <h1>Log Activity</h1>
                    <button onClick={closeMenu}><img src={IconLibrary.Close} alt=""></img></button>
                </div>

                {showMuscleSelector ? <MuscleSelector close={()=>setShowMuscleSelector(false)} targetMuscles={targetMuscles} setTargetMuscles={setTargetMuscles} /> : null}
                {showEquipmentSelector ? <EquipmentSelector close={()=>setShowEquipmentSelector(false)} equipments={equipment} setEquipments={setEquipment} /> : null}
                {showTagSelector ? <TagSelector close={()=>setShowTagSelector(false)} tags={tags} setTags={setTags} /> : null} 

                <div className={styles.threeInputs}>
                    <input type="text" name="name" id="name" onChange={(e)=>setName(e.target.value)} value={name} placeholder="Activity Name*" required></input>
                    <input type="number" name="duration" id="duration" onChange={(e)=>setDuration(e.target.value)} value={duration} placeholder="Duration (min)"></input>
                    <input type="time" name="time" id="time" className={styles.timeInput} onChange={(e)=>setTime(e.target.value)} value={time}></input>
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
                <div className={styles.fieldsContainer}>
                    <FieldsScreen type={'log'} fields={fields} setFields={setFields} defaultFields={defaultFields}/>
                </div>
                <button className={styles.submit} onClick={logExercise}>Log Exercise</button>
            </div>
        </div>
     );
}
 
export default ExerciseLog;