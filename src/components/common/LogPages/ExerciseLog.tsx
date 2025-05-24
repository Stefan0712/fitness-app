import { useState } from "react";
import styles from './ExerciseLogs.module.css'
import { v4 as uuidv4 } from 'uuid';
import { IconLibrary } from "../../../IconLibrary";
import React from "react";
import { BaseLog, Field as IField, TargetGroup } from "../interfaces.ts";
import FieldsScreen from '../../pages/Exercise/Screens/FieldsScreen/FieldsScreen.tsx';
import MuscleSelector from '../../common/MuscleSelector/MuscleSelector.tsx';
import {saveItem} from '../../../db.js';
import { useUI } from "../../../context/UIContext.jsx";


interface ExerciseLogProps {
    closeMenu: ()=> void;
}
const ExerciseLog: React.FC<ExerciseLogProps> = ({closeMenu}) => {
    

    const [showTargeMuscleSelector, setShowTargetMuscleSelector] = useState(false);

    const [name, setName] = useState<string>('');
    const [targetMuscles, setTargetMuscles] = useState<TargetGroup[]>([]);
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
        if(name.length > 0){

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
                    duration: parseInt(duration),
                    sets: typeof sets === 'string' ? parseInt(sets) : sets || 1,
                    fields
                }
            }
            await saveItem('logs', data);
            showMessage("Exercise logged successfully", 'success');
            closeMenu();
        }
    }
    return ( 
        <div className={styles['exercise-log']}>
            <div className={styles['top-bar']}>
                <h1>Log Exercise</h1>
                <button onClick={closeMenu}><img src={IconLibrary.Close} alt=""></img></button>
            </div>
            {showTargeMuscleSelector ? <MuscleSelector targetMuscles={targetMuscles} setTargetMuscles={setTargetMuscles} close={()=>setShowTargetMuscleSelector(false)}/> : null}
            <div className={styles.twoInputs}>
                <input type="text" name="name" id="name" onChange={(e)=>setName(e.target.value)} value={name} placeholder="Exercise Name" required></input>
                <input type="time" name="time" id="time" onChange={(e)=>setTime(e.target.value)} value={time}></input>
            </div>
            <div className={styles.twoInputs}>
                <input type="number" name="duration" id="duration" onChange={(e)=>setDuration(e.target.value)} value={duration} placeholder="Duration (min)" required></input>
                <input type="number" name="sets" id="sets" onChange={(e)=>setSets(e.target.value)} value={sets} placeholder={"Sets"}  required></input>
            </div>
            <h4>Target Muscles</h4>
            <div className={styles['selected-target-muscles']}>
                <button className={styles['target-muscle']} onClick={()=>setShowTargetMuscleSelector(true)}><img style={{width: '25px', height: '25px'}} src={IconLibrary.Add} alt="add target muscle" /></button>
                {targetMuscles && targetMuscles.length > 0 ? targetMuscles.map((muscle,index)=><div key={'selected-muscle-'+index} className={styles["target-muscle"]}>
                    <p>{muscle.name}</p>
                    <button className='clear-button' onClick={()=>setTargetMuscles(prev=>[...prev.filter(item=>item._id!==muscle._id)])}><img style={{width: '20px', height: '20px'}} src={IconLibrary.Close} alt="remove target muscle" /></button>
                </div>) : <div className={styles["target-muscle"]}>No target muscle</div>}
            </div>
            <h4>Fields</h4>
            <div className={styles.fields}>
                <FieldsScreen values={{fields}} setters={{setFields}} hasRequiredFields={false} />
            </div>
            <button className={styles.submit} onClick={logExercise}>Log Exercise</button>
        </div>
     );
}
 
export default ExerciseLog;