import React, { useEffect } from "react";
import { useState } from "react";
import {useNavigate, useParams} from 'react-router-dom'
import styles from '../CreateWorkout/CreateWorkout.module.css';
import { IconLibrary } from "../../../../IconLibrary.js";

//default values
import { getItemById, saveItem } from "../../../../db.js";
import { Equipment, Phase, Tag as ITag, TargetGroup, Workout } from "../../../common/interfaces.ts";
import Phases from "../CreateWorkout/Phases/Phases.tsx";
import AppHeader from "../../../common/AppHeader/AppHeader.tsx";
import MuscleSelector from "../../../common/MuscleSelector/MuscleSelector.tsx";
import EquipmentSelector from "../../../common/EquipmentSelector/EquipmentSelector.tsx";
import TagSelector from '../../../common/TagSelector/TagSelector.tsx';


const EditWorkout = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [workoutData, setWorkoutData] = useState<Workout | null>(null);


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
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [targetMuscles, setTargetMuscles] = useState<TargetGroup[]>([])
    const [notes, setNotes] = useState<string>('');
    const [phases, setPhases] = useState<Phase[]>([]);


    

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(workoutData){
            const newDate = new Date().toISOString(); //get timestamp
            const newData: Workout = {
                ...workoutData,
                _id: id || workoutData._id,
                updatedAt: newDate,
                name, 
                description,
                reference, 
                difficulty,
                visibility: 'private',
                imageUrl: '',
                duration: parseInt(duration),
                equipment, 
                tags, 
                targetMuscles, 
                phases,
                notes
            }
            if(newData.name.length < 1){
                console.log("Workout name is required");
            }else if(newData.name.length > 100){
                console.log("Workout name is too long");
            }else{
                console.log(newData)
                await  saveItem('workouts', newData)
                navigate('/library');
            }
        }
       
    }
    const getWorkoutData = async () =>{
        const data: Workout = await getItemById('workouts', id);
        if(data){
            setWorkoutData(data);
            setName(data.name);
            setDescription(data.description);
            setReference(data.reference || '');
            setDifficulty(data.difficulty);
            setDuration(`${getDuration(data.phases)}`);
            if(data.tags && data.tags.length > 0){
                setTags(data.tags);
            }
            setEquipment(data.equipment);
            setTargetMuscles(data.targetMuscles);
            setNotes(data.notes);
            setPhases(data.phases);
        }else{
            console.log('Failed to get data')
        }

    }
    const getDuration = (items) =>{
        let sum = 0;
        items.map(phase=>sum+=phase.exercises.length);
        return sum;
    }
    useEffect(()=>{getWorkoutData()},[])
    return ( 
        <div className={styles.createWorkoutPage}>
            {showMuscleSelector ? <MuscleSelector close={()=>setShowMuscleSelector(false)} targetMuscles={targetMuscles} setTargetMuscles={setTargetMuscles} /> : null}
            {showEquipmentSelector ? <EquipmentSelector close={()=>setShowEquipmentSelector(false)} equipments={equipment} setEquipments={setEquipment} /> : null}
            {showTagSelector ? <TagSelector close={()=>setShowTagSelector(false)} tags={tags} setTags={setTags} /> : null}
            <AppHeader title="Edit Workout" button={<button className="orange-button submit-button" onClick={handleSubmit}>Save</button>} />
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
                        <h4>{equipment?.length || 0}</h4>
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
export default EditWorkout;