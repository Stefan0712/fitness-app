import { getDateForHeader } from "../../../helpers";
import './exercise.css';
import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import {useNavigate} from 'react-router-dom';
import { IconLibrary } from "../../../IconLibrary";
import styles from "./CreateExercise.module.css";
import { saveItem } from "../../../db.js";
import { Equipment, Field, Tag, TargetGroup, Exercise } from "../../common/interfaces.tsx";
import TagsScreen from "../Workout/CreateWorkout/Screens/TagsScreen.tsx";
import EquipmentScreen from "../Workout/CreateWorkout/Screens/EquipmentScreen.tsx";
import MuscleScreen from "../Workout/CreateWorkout/Screens/MuscleScreen.tsx";

const EditExercise: React.FC = () => {

    


    const navigate = useNavigate();

    const [currentScreen, setCurrentScreen] = useState<string>('fields');

    //form values
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [reference, setReference] = useState<string>('');
    const [targetMuscles, settargetMuscles] = useState<TargetGroup[]>([]);
    const [difficulty, setDifficulty] = useState<string>('');
    const [tags, setTags] = useState<Tag[]>([]);
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [sets, setSets] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [fields, setFields] = useState<Field[]>([]);
    const [rest, setRest] = useState<string>('');
    const [notes, setNotes] = useState<string>('');


    const handleSubmit = (e)=>{
        e.preventDefault();
        const createdAt = new Date().toISOString();
        const exerciseData: Exercise = {
            _id: uuidv4(), 
            sourceId: '',
            createdAt, 
            updatedAt: '',
            author: localStorage.getItem('userId') || '',
            isFavorite: false,
            isCompleted: false, 
            name, 
            description, 
            reference, 
            difficulty, 
            sets: sets === 0 ? 1 : sets, 
            duration, 
            durationUnit: 'min',
            rest: parseInt(rest),
            restUnit: 'seconds',
            visibility: 'private',
            notes,
            targetMuscles, 
            fields, 
            tags, 
            equipment: equipments, 
            instructions: []
        };
        console.log(exerciseData)
        //saveItem('exercises', exerciseData)
        //navigate('/library');
        
    }

    return ( 
        <div className={`${styles["create-exercise-page"]} page`}>
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Create Exercise</h2>
                <button className={styles.submit} onClick={handleSubmit}>Create</button>
            </div>
                <form>
                    <div className={styles['exercise-info']} >
                        <h3>Exercise Info</h3> 
                        <input  type="text" name="name" id="name" required={true} minLength={3} maxLength={20} onChange={(e) => setName(e.target.value)} value={name} placeholder="Name"></input>
                        <input type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)} value={description} minLength={0} maxLength={300} placeholder="Description"></input>
                        <input type="url" name="reference" id="reference" onChange={(e) => setReference(e.target.value)} value={reference} placeholder="Reference URL"></input>
                        <fieldset className={styles["small-inputs"]}>
                            <select name="difficulty" id="difficulty" onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
                                <option value="" disabled>Difficulty</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                                <option value="expert">Expert</option>
                            </select>
                            <select name="sets" id="sets" onChange={(e) => setSets(parseInt(e.target.value))} value={sets}>
                                <option value={0} disabled>Sets</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                            </select>
                            <input type="text" name="rest" id="rest" onChange={(e) => setRest(e.target.value)} value={rest} placeholder="Rest (sec)"></input>
                        </fieldset>
                        <div className={styles.screenSwitcher}>
                            <button type="button" onClick={()=>setCurrentScreen('exercises')} className={currentScreen === 'exercises' ? styles.selectedButton : ''}>Exercises</button>
                            <button type="button" onClick={()=>setCurrentScreen('tags')} className={currentScreen === 'tags' ? styles.selectedButton : ''}>Tags</button>
                            <button type="button" onClick={()=>setCurrentScreen('equipment')} className={currentScreen === 'equipment' ? styles.selectedButton : ''}>Equipment</button>
                            <button type="button" onClick={()=>setCurrentScreen('groups')} className={currentScreen === 'groups' ? styles.selectedButton : ''}>Groups</button>
                        </div>
                        <div className={styles.screenContainer}>
                            {currentScreen === 'tags' ? (
                                <TagsScreen tags={tags} setTags={setTags} />
                            ) : currentScreen === 'equipment' ? (
                                <EquipmentScreen equipments={equipments} setEquipments={setEquipments} />
                            ) : currentScreen === 'groups' ? (
                                <MuscleScreen targetMuscles={targetMuscles} settargetMuscles={settargetMuscles} />
                            ) : null}
                        </div>
                    </div>
                </form>
        </div>
     );
}
 
export default EditExercise;