import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import {useNavigate} from 'react-router-dom'
import styles from './CreateWorkout.module.css';
import MuscleSelector from "../../../common/MuscleSelector/MuscleSelector.tsx";
import EquipmentSelector from "../../../common/EquipmentSelector/EquipmentSelector.tsx";
import TagSelector from '../../../common/TagSelector/TagSelector.tsx';

//default values
import { saveItem } from "../../../../db.js";
import { Equipment, Phase, Tag as ITag, TargetGroup, Workout } from "../../../common/interfaces.ts";
import Phases from "./Phases/Phases.tsx";
import AppHeader from "../../../common/AppHeader/AppHeader.tsx";
import { useUI } from "../../../../context/UIContext.jsx";
import { IconLibrary } from "../../../../IconLibrary.js";


const CreateWorkout: React.FC = () => {

    const navigate = useNavigate();
    const userId = localStorage.getItem('userId') || '';
    const {showMessage} = useUI();


    const [showTagSelector, setShowTagSelector] = useState(false);
    const [showEquipmentSelector, setShowEquipmentSelector] = useState(false);
    const [showMuscleSelector, setShowMuscleSelector] = useState(false);


    //form values
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [reference, setReference] = useState<string>('');
    const [difficulty, setDifficulty] = useState<string>('beginner');
    const [duration, setDuration] = useState<string>('');
    const [tags, setTags] = useState<ITag[]>([])
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [targetMuscles, setTargetMuscles] = useState<TargetGroup[]>([])
    const [notes, setNotes] = useState<string>('');
    const [phases, setPhases] = useState<Phase[]>([{_id: 'phase-id-1', name: 'Warm-up', order: 1, exercises:[]},{_id: 'phase-id-2', name: 'Workout', order: 1, exercises:[]}]);
    const [currentScreen, setCurrentScreen] = useState<string>('exercises');

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const createdAt = new Date().toISOString(); //get timestamp
        const workoutData: Workout = {
            _id: uuidv4(), 
            author: userId || 'local-user', 
            createdAt, 
            updatedAt: '',
            name, 
            description,
            isFavorite: false,
            isCompleted: false,
            reference, 
            difficulty,
            visibility: 'private',
            imageUrl: '',
            duration: duration ? parseInt(duration) : 0,
            equipment: equipments, 
            tags, 
            targetMuscles, 
            phases,
            notes
        };
        if(workoutData.name.length < 1){
            console.log("Workout name is required");
        }else if(workoutData.name.length > 100){
            console.log("Workout name is too long");
        }else{
            await saveItem('workouts', workoutData);
            showMessage("Workout created successfully", "success");
            navigate('/library');
        }
    }
    return ( 
        <div className={styles.createWorkoutPage}>
            {showMuscleSelector ? <MuscleSelector close={()=>setShowMuscleSelector(false)} targetMuscles={targetMuscles} setTargetMuscles={setTargetMuscles} /> : null}
            {showEquipmentSelector ? <EquipmentSelector close={()=>setShowEquipmentSelector(false)} equipments={equipments} setEquipments={setEquipments} /> : null}
            {showTagSelector ? <TagSelector close={()=>setShowTagSelector(false)} tags={tags} setTags={setTags} /> : null}
            <AppHeader title="Create Workout" button={<button className="orange-button submit-button" onClick={handleSubmit}>Create</button>} />
            <form onSubmit={(e)=>e.preventDefault()}>
                <div className={styles.workoutMeta}>
                    <input type="text" name="name" id="name" required={true} minLength={3} maxLength={100} onChange={(e) => setName(e.target.value)} value={name} placeholder="Name"></input>
                    <input type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)} value={description} minLength={0} maxLength={100} placeholder="Description"></input>
                    <div className={styles.inputGroup}>
                        <input type="number" name="duration" id="duration" onChange={(e) => setDuration(e.target.value)} value={duration} min={0} max={9999} placeholder="Duration"></input>
                        <select name="difficulty" id="difficulty" onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="expert">Expert</option>
                        </select>
                        <input type="url" name="reference" id="reference" onChange={(e) => setReference(e.target.value)} value={reference} placeholder="Reference URL"></input>
                    </div>
                    <input type="test" name="notes" id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} placeholder="Notes..."></input>
                </div>
                <div className={styles.customItemsRow}>
                    <div className={styles.customItemsButton} onClick={()=>setShowTagSelector(true)}>
                        <img className={styles.categoryIcon} src={IconLibrary.Tags} alt="" />
                        <h4>{tags?.length || 0}</h4>
                    </div>
                    <div className={styles.customItemsButton} onClick={()=>setShowEquipmentSelector(true)}>
                        <img className={styles.categoryIcon} src={IconLibrary.Equipment} alt="" />
                        <h4>{equipments?.length || 0}</h4>
                    </div>
                    <div className={styles.customItemsButton} onClick={()=>setShowMuscleSelector(true)}>
                        <img className={styles.categoryIcon} src={IconLibrary.Muscle} alt="" />
                        <h4>{targetMuscles?.length || 0}</h4>
                    </div>
                </div>
                <Phases phases={phases} setPhases={setPhases} />
            </form>
        </div>
     );
}
export default CreateWorkout;