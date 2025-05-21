import { getDateForHeader } from "../../../helpers";
import './exercise.css';
import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import {useNavigate} from 'react-router-dom';
import { IconLibrary } from "../../../IconLibrary";
import CreateExerciseField from "../../common/CreateExerciseField/CreateExerciseField";
import styles from "./CreateExercise.module.css";
import { saveItem } from "../../../db.js";
import { Equipment, Field, Tag, TargetGroup, Exercise } from "../../common/interfaces.tsx";
import TagsScreen from "../Workout/CreateWorkout/Screens/TagsScreen.tsx";
import EquipmentScreen from "../Workout/CreateWorkout/Screens/EquipmentScreen.tsx";
import MuscleScreen from "../Workout/CreateWorkout/Screens/MuscleScreen.tsx";
import AppHeader from "../../common/AppHeader/AppHeader.tsx";
import FieldsScreen from "./Screens/FieldsScreen/FieldsScreen.tsx";
import InstructionsScreen from "./Screens/InstructionsScreen/InstructionsScreen.tsx";

const CreateExercise: React.FC = () => {

    


    const navigate = useNavigate();

    const [currentScreen, setCurrentScreen] = useState<string>('fields');

    //form values
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [reference, setReference] = useState<string>('');
    const [targetGroups, setTargetGroups] = useState<TargetGroup[]>([]);
    const [difficulty, setDifficulty] = useState<string>('beginner');
    const [tags, setTags] = useState<Tag[]>([]);
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [sets, setSets] = useState<number>(1);
    const [duration, setDuration] = useState<number>(0);
    const [fields, setFields] = useState<Field[]>([]);
    const [rest, setRest] = useState<number>(30);
    const [notes, setNotes] = useState<string>('');
    const [visibility, setVisibility] = useState<string>('private');
    const [restUnit, setRestUnit] = useState<string>('seconds');
    const [durationUnit, setDurationUnit] = useState<string>('minutes');
    const [instructions, setInstructions] = useState<string[]>([]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        const createdAt = new Date();
        const exerciseData: Exercise = {
            _id: uuidv4(),
            author: localStorage.getItem('userId') || '',
            createdAt, 
            updatedAt: createdAt,
            sourceId: '',
            isCompleted: false, 
            name, 
            description, 
            reference, 
            difficulty, 
            sets, 
            duration, 
            durationUnit: 'min',
            rest,
            restUnit: 'seconds',
            visibility: 'private',
            notes,
            targetGroups, 
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
        <div className={styles.createExercise}>
            <AppHeader title="Create Exercise" button={<button className={styles.submit} onClick={handleSubmit}>Create</button>} />
            <form>
                <div className={styles.exerciseInfo} >
                    <h3>Exercise Info</h3> 
                    <input  type="text" name="name" id="name" required={true} minLength={3} maxLength={20} onChange={(e) => setName(e.target.value)} value={name} placeholder="Name"></input>
                    <input type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)} value={description} minLength={0} maxLength={300} placeholder="Description"></input>
                    <div className={styles.twoInputs}>
                        <input type="url" name="reference" id="reference" onChange={(e) => setReference(e.target.value)} value={reference} placeholder="Reference URL"></input>
                        <select name="visibility" id="visibility" onChange={(e) => setVisibility(e.target.value)} value={visibility}>
                            <option value="private">Private</option>
                            <option value="friends">Friends only</option>
                            <option value="public">Public</option>
                        </select>
                    </div>
                    <div className={styles.twoInputs}>
                            <input type="text" name="notes" id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} placeholder="Notes"></input>
                            <select name="difficulty" id="difficulty" onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                                <option value="expert">Expert</option>
                            </select>
                    </div>

                </div>
                <div className={styles.screenSwitcher}>
                    <button type="button" onClick={()=>setCurrentScreen('fields')} className={currentScreen === 'fields' ? styles.selectedButton : ''}>Fields</button>
                    <button type="button" onClick={()=>setCurrentScreen('tags')} className={currentScreen === 'tags' ? styles.selectedButton : ''}>Tags</button>
                    <button type="button" onClick={()=>setCurrentScreen('equipment')} className={currentScreen === 'equipment' ? styles.selectedButton : ''}>Equipment</button>
                    <button type="button" onClick={()=>setCurrentScreen('groups')} className={currentScreen === 'groups' ? styles.selectedButton : ''}>Groups</button>
                    <button type="button" onClick={()=>setCurrentScreen('instructions')} className={currentScreen === 'instructions' ? styles.selectedButton : ''}>Instructions</button>
                </div>
                <div className={styles.screenContainer}>
                    {currentScreen === 'fields' ? (
                        <FieldsScreen 
                            values={{ fields, sets, duration, durationUnit, rest, restUnit }}
                            setters={{ setFields, setSets, setDuration, setDurationUnit, setRest, setRestUnit }}
                        />
                    ) : currentScreen === 'tags' ? (
                        <TagsScreen tags={tags} setTags={setTags} />
                    ) : currentScreen === 'equipment' ? (
                        <EquipmentScreen equipments={equipments} setEquipments={setEquipments} />
                    ) : currentScreen === 'groups' ? (
                        <MuscleScreen targetGroups={targetGroups} setTargetGroups={setTargetGroups} />
                    ) : currentScreen === 'instructions' ? (
                        <InstructionsScreen instructions={instructions} setInstructions={setInstructions} />
                    ) :null}
                </div>
            </form>
        </div>
     );
}
 
export default CreateExercise;