import { getDateForHeader } from "../../../../helpers.js";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import {IconLibrary} from '../../../../IconLibrary.js';
import { Equipment, Tag, TargetGroup, Workout, Phase } from "../../../common/interfaces.ts";
import { getItemById, saveItem } from "../../../../db.js";
import MuscleScreen from "../CreateWorkout/Screens/MuscleScreen.tsx";
import EquipmentScreen from "../CreateWorkout/Screens/EquipmentScreen.tsx";
import TagsScreen from "../CreateWorkout/Screens/TagsScreen.tsx";
import Phases from "../CreateWorkout/Phases/Phases.tsx";
import AppHeader from "../../../common/AppHeader/AppHeader.tsx";
import styles from '../CreateWorkout/CreateWorkout.module.css';



const EditWorkout: React.FC = () => {
    
    const {id} = useParams();
    const navigate = useNavigate();

    const [workoutData, setWorkoutData] = useState<Workout | null>(null);
   

    const [name, setName] = useState<string>(workoutData?.name ?? '');
    const [description, setDescription] = useState<string>(workoutData?.description ?? '');
    const [reference, setReference] = useState<string>(workoutData?.reference ?? '');
    const [difficulty, setDifficulty] = useState<string>(workoutData?.difficulty ?? 'beginner');
    const [duration, setDuration] = useState<string>(typeof workoutData?.duration === 'string' ? workoutData?.duration : workoutData?.duration.toString() ?? '');
    const [notes, setNotes] = useState<string>(workoutData?.notes ?? '');
    const [tags, setTags] = useState<Tag[]>(workoutData?.tags ?? [])
    const [equipments, setEquipments] = useState<Equipment[]>(workoutData?.equipment ?? []);
    const [targetGroups, setTargetGroups] = useState<TargetGroup[]>(workoutData?.targetGroups ?? [])
    const [phases, setPhases] = useState<Phase[]>([]);


    const [currentScreen, setCurrentScreen] = useState<string>('exercises');

    const getWorkoutData = async () =>{
        const data = await getItemById('workouts', id);
        setWorkoutData(data);
    }
    useEffect(()=>{getWorkoutData()}, [id]);

    const handleSubmit = (e)=>{
            e.preventDefault();
            const newWorkoutData: Workout = {
                ...workoutData,
                name, 
                description,
                reference, 
                difficulty,
                imageUrl: '',
                duration: 0,
                equipment: equipments, 
                tags, 
                targetGroups, 
                phases, 
                notes
            };

            console.log(newWorkoutData);
            saveItem('workouts', newWorkoutData)
            //navigate(`/workout/${workoutData.id}/view`);
        }
        
    




    if(!workoutData){
        return(
            <div className="create-workout-page page">
                <div className='header'>
                    <div className='date'>{getDateForHeader()}</div>
                    <h2>Edit Workout</h2>
                    <button className="orange-button submit-button" onClick={handleSubmit}>Edit</button>
                </div>
                <div className="loading">
                    <img className="loading-icon" src={IconLibrary.Loading} alt="loading"></img>
                </div>
            </div>
        )
    }else{
        return ( 
            <div className={styles.createWorkoutPage}>
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
                    <div className={styles.screenSwitcher}>
                        <button type="button" onClick={()=>setCurrentScreen('exercises')} className={currentScreen === 'exercises' ? styles.selectedButton : ''}>Exercises</button>
                        <button type="button" onClick={()=>setCurrentScreen('tags')} className={currentScreen === 'tags' ? styles.selectedButton : ''}>Tags</button>
                        <button type="button" onClick={()=>setCurrentScreen('equipment')} className={currentScreen === 'equipment' ? styles.selectedButton : ''}>Equipment</button>
                        <button type="button" onClick={()=>setCurrentScreen('groups')} className={currentScreen === 'groups' ? styles.selectedButton : ''}>Groups</button>
                    </div>
                    <div className={styles.screenContainer}>
                        {currentScreen === 'exercises' ? (
                            <Phases phases={phases} setPhases={setPhases} />
                        ) : currentScreen === 'tags' ? (
                            <TagsScreen tags={tags} setTags={setTags} />
                        ) : currentScreen === 'equipment' ? (
                            <EquipmentScreen equipments={equipments} setEquipments={setEquipments} />
                        ) : currentScreen === 'groups' ? (
                            <MuscleScreen targetGroups={targetGroups} setTargetGroups={setTargetGroups} />
                        ) : null}
                    </div>
                    
                    
                </form>
            </div>
        );

    }    
}


export default EditWorkout;
