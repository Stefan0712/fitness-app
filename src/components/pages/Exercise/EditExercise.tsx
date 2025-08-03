import React, { useEffect } from "react";
import { useState } from "react";
import {useNavigate, useParams} from 'react-router-dom';
import styles from "./CreateExercise.module.css";
import { getItemById, saveItem } from "../../../db.js";
import { Equipment, Field, Tag, TargetGroup, Exercise } from "../../common/interfaces.tsx";
import AppHeader from "../../common/AppHeader/AppHeader.tsx";
import FieldsScreen from "./Screens/FieldsScreen/FieldsScreen.tsx";
import InstructionsScreen from "./Screens/InstructionsScreen/InstructionsScreen.tsx";
import { useUI } from "../../../context/UIContext.jsx";
import Loading from '../../common/Loading.js';
import EquipmentSelector from "../../common/EquipmentSelector/EquipmentSelector.tsx";
import TagSelector from "../../common/TagSelector/TagSelector.tsx";
import MuscleSelector from "../../common/MuscleSelector/MuscleSelector.tsx";
import { IconLibrary } from "../../../IconLibrary.js";

const EditExercise: React.FC = () => {

    const {id} = useParams();

    const navigate = useNavigate();
    const [currentScreen, setCurrentScreen] = useState<string>('fields');
    const {showMessage} = useUI();
    const [exerciseData, setExerciseData] = useState<Exercise | null>(null);

    const [showTagSelector, setShowTagSelector] = useState(false);
    const [showEquipmentSelector, setShowEquipmentSelector] = useState(false);
    const [showMuscleSelector, setShowMuscleSelector] = useState(false);


    
    //form values
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [reference, setReference] = useState<string>('');
    const [targetMuscles, setTargetMuscles] = useState<TargetGroup[]>([]);
    const [difficulty, setDifficulty] = useState<string>('beginner');
    const [tags, setTags] = useState<Tag[]>([]);
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [sets, setSets] = useState<number>(1);
    const [duration, setDuration] = useState<number>(0);
    const [fields, setFields] = useState<Field[]>([]);
    const [rest, setRest] = useState<number>(30);
    const [notes, setNotes] = useState<string>('');
    const [visibility, setVisibility] = useState<string>('private');
    const [restUnit, setRestUnit] = useState<'hours' | 'minutes' | 'seconds'>('seconds');
    const [durationUnit, setDurationUnit] = useState<'hours' | 'minutes' | 'seconds'>('minutes');
    const [instructions, setInstructions] = useState<string[]>([]);

    const handleSubmit = async (e)=> {
        if(exerciseData){
            e.preventDefault();
            const updatedAt = new Date();
            const newData: Exercise = {
            ...exerciseData,
            updatedAt,
            name, 
            description, 
            reference, 
            difficulty, 
            sets, 
            duration: convertDuration(duration, durationUnit), 
            durationUnit,
            rest: convertDuration(rest, restUnit),
            restUnit: restUnit,
            visibility: 'private',
            notes,
            targetMuscles, 
            fields, 
            tags, 
            equipment: equipments, 
            instructions
        };
        await saveItem('exercises', newData);
        showMessage('Exercise updated', 'success')
        navigate('/library');
        }
    }

    const getExerciseData = async () =>{
        console.log(id)
        const data = await getItemById('exercises', id);
        if(data){
            setExerciseData(data);
            populateData(data);
        }
    }
    useEffect(()=>{getExerciseData()},[]);

    const populateData = (data) => {
        if (!data) return;

        const s = data;
        setName(s.name || '');
        setDescription(s.description || '');
        setReference(s.reference || '');
        setTargetMuscles(s.targetMuscles || []);
        setDifficulty(s.difficulty || 'beginner');
        setTags(s.tags || []);
        setEquipments(s.equipment || []);
        setSets(s.sets || 1);
        setDuration(s.duration ?? 0);
        setFields(s.fields || []);
        setRest(s.rest || 30);
        setNotes(s.notes || '');
        setVisibility(s.visibility || 'private');
        setRestUnit(s.restUnit || 'seconds');
        setDurationUnit(s.durationUnit || 'minutes');
        setInstructions(s.instructions || []);
    }
    const convertDuration = (duration: number, unit: 'hours' | 'minutes' | 'seconds'): number =>{
        if(unit === 'hours') return duration*3600;
        if(unit === "minutes") return duration*60;
        if(unit === "seconds") return duration;

        console.log('Invalid value', duration, unit)
    }
    type DurationUnit = "hours" | "minutes" | "seconds";
    if(!exerciseData){
        return ( <Loading title={'Edit Exercise'} /> )
    }else {
    return ( 
        <div className={styles.createExercise}>
            {showMuscleSelector ? <MuscleSelector close={()=>setShowMuscleSelector(false)} targetMuscles={targetMuscles} setTargetMuscles={setTargetMuscles} /> : null}
            {showEquipmentSelector ? <EquipmentSelector close={()=>setShowEquipmentSelector(false)} equipments={equipments} setEquipments={setEquipments} /> : null}
            {showTagSelector ? <TagSelector close={()=>setShowTagSelector(false)} tags={tags} setTags={setTags} /> : null}
            <AppHeader title="Create Exercise" button={<button className={styles.submit} onClick={handleSubmit}>Create</button>} />
            <form>
                <div className={styles.exerciseInfo} >
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
                    <div style={{width: '100%', height: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', alignItems: 'center'}}>
                        <fieldset className={styles.multipleInputs}>
                            <label htmlFor="duration">Duration</label>
                            <input className={styles.numberInput} type="number" name="duration" id={styles.durationValue} onChange={(e) => setDuration(parseInt(e.target.value))} value={duration} placeholder="Duration"></input>
                            <select name="durationUnit" id={styles.durationUnit} onChange={(e) => setDurationUnit(e.target.value as DurationUnit)} value={durationUnit}>
                                <option value={'seconds'}>Seconds</option>
                                <option value={'minutes'}>Minutes</option>
                                <option value={'hours'}>Hours</option>
                            </select>
                        </fieldset>
                        <fieldset className={styles.multipleInputs}>
                            <label htmlFor="rest">Rest</label>
                            <input className={styles.numberInput} type="number" name="rest" id={styles.restValue} onChange={(e) => setRest(parseInt(e.target.value))} value={rest} placeholder="Rest"></input>
                            <select name="restUnit" id={styles.restUnit} onChange={(e) => setRestUnit(e.target.value as DurationUnit)} value={restUnit}>
                                <option value={'seconds'}>Seconds</option>
                                <option value={'minutes'}>Minutes</option>
                                <option value={'hours'}>Hours</option>
                            </select>
                        </fieldset>
                    </div>
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
                <div className={styles.screenSwitcher}>
                    <button type="button" onClick={()=>setCurrentScreen('fields')} className={currentScreen === 'fields' ? styles.selectedButton : ''}>Fields</button>
                    <button type="button" onClick={()=>setCurrentScreen('instructions')} className={currentScreen === 'instructions' ? styles.selectedButton : ''}>Instructions</button>
                </div>
                <div className={styles.screenContainer}>
                    {currentScreen === 'fields' ? (
                        <FieldsScreen fields={fields} setFields={setFields}/>
                    ) : currentScreen === 'instructions' ? (
                        <InstructionsScreen instructions={instructions} setInstructions={setInstructions} />
                    ) :null}
                </div>
            </form>
        </div>
    );}
}
 
export default EditExercise;