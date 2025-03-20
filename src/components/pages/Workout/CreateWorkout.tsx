import { getDateForHeader } from "../../../helpers.js";
import React, { useEffect } from "react";
import './workout.css';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { addExercise, addWorkout } from "../../../store/userSlice.ts";
import {useNavigate} from 'react-router-dom'
import {IconLibrary} from '../../../IconLibrary.js';
import { exercises as databaseExercises } from "../../../database.js";
import {RootState} from '../../../store/index.ts';

//default values
import CreateTag from "../Exercise/CreateTag.tsx";
import TargetGroupPicker from "../../common/TargetGroupPicker/TargetGroupPicker.tsx";
import CreateEquipment from "../Exercise/CreateEquipment.tsx";


interface Exercise {
    id: string;
    sourceId: string;
    createdAt: string; 
    updatedAt: string | null;
    author: string;
    isFavorite: boolean;
    isCompleted: boolean;
    name: string;
    description: string;
    reference: string;
    difficulty: string;
    sets: number;
    duration: number;
    durationUnit: string;
    rest: number;
    restUnit: string;
    visibility: string;
    fields: Field[];
    notes: string;
    equipment: Equipment[];
    muscleGroups: TargetGroup[];
    tags: Tag[];
}
interface TargetGroup {
    id: string;
    name: string;
    author: string;
}
interface Equipment {
    id: string;
    name: string;
    attributes?: EquipmentAttributes[];
}
  
interface EquipmentAttributes {
    name: string;
    value?: number;
    unit: string;
}
  
  
interface Tag {
    id: string;
    name: string;
    color: string;
    author: string;
}
interface Field {
    name: string,
    unit: string,
    value: number,
    target?: number,
    description?: string,
    isCompleted: boolean
}
interface Workout {
    id: string;
    name: string;
    description: string;
    difficulty: string;
    targetGroup: TargetGroup[];
    duration: number; 
    equipment: Equipment[];
    exercises: string[];
    createdAt: string; 
    updatedAt?: string; 
    author: string;
    imageUrl?: string; 
    isFavorite: boolean;
    isCompleted: boolean;
    visibility: string;
    tags?: Tag[];
    reference?: string; 
  }

const CreateWorkout: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const createdExercises = useSelector((state: RootState) => state.user.exercises);
    
    const [exercisesSource, setExercisesSource] = useState<string>('library')

    const [exercises, setExercises] = useState<Exercise[]>([]);

    const [showGroups, setShowGroups] = useState(false);
    const [groupName, setGroupName] = useState('');



    const userId = useSelector((state: RootState)=>state.user.userData.id);
    //form values
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [reference, setReference] = useState<string>('');
    const [difficulty, setDifficulty] = useState<string>('beginner');
    const [duration, setDuration] = useState<string>('');

    const [workoutTags, setWorkoutTags] = useState<Tag[]>([])
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [targetGroups, setTargetGroups] = useState<TargetGroup[]>([])

    const [notes, setNotes] = useState<string>('');


    const [currentScreen, setCurrentScreen] = useState<string>('exercises');

    const handleRemoveExercise = (id) =>{
        setExercises((exercises)=>exercises.filter((item)=>item.id !== id));
    }

    useEffect(()=>{
        console.log(exercises, databaseExercises, createdExercises)
    }, [exercises])
    const handleSubmit = (e)=>{
        e.preventDefault();
        const createdAt = new Date().toISOString(); //get timestamp
        let exercisesIds: string[] = []; //empty array to store the ids and sources of exercises

        //extract only the id and source from each exercise
        exercises.forEach((item)=>{
            if(!createdExercises.some(item=>item.id === item.id)){
                dispatch(addExercise(item))
            }
            exercisesIds.push(item.id)
        });
        const workoutData: Workout = {
            id: uuidv4(), 
            author: userId, 
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
            duration: 0,
            equipment: equipments, 
            tags: workoutTags, 
            targetGroup: targetGroups, 
            exercises: exercisesIds, 
        };

        console.log(workoutData);
        dispatch(addWorkout(workoutData));
        navigate('/library');
        
    }
    const handleAddExercise = (source,exercise,e)=>{
        console.log({source, exercise})
        setExercises((exercises)=>[...exercises, exercise]);
    }

    const addTag = (newItem) =>{
        setWorkoutTags((workoutTags)=>[...workoutTags, {...newItem, id: uuidv4()}]);
    }
    const addEquipment = (newItem) =>{
        setEquipments((equipments)=>[...equipments, {...newItem, id: uuidv4()}]);
    }

   const handleAddGroup = () =>{
           if(groupName.length > 0 && groupName.length < 15){
               const groupData: TargetGroup = {
                   id: uuidv4(),
                   author: userId,
                   name: groupName
               }
               setTargetGroups(targetGroups=>[...targetGroups,groupData]);
               setGroupName('');
           }
       }
       
    return ( 
        <div className="create-workout-page page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Create Workout</h2>
                <button className="orange-button submit-button" onClick={handleSubmit}>Create</button>
            </div>
                <form>
                    <input  type="text" name="name" id="name" required={true} minLength={3} maxLength={100} onChange={(e) => setName(e.target.value)} value={name} placeholder="Name"></input>
                    <input type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)} value={description} minLength={0} maxLength={100} placeholder="Description"></input>
                    <div className="two-inputs">
                        <input type="number" name="duration" id="duration" onChange={(e) => setDuration(e.target.value)} value={duration} min={0} max={9999} placeholder="Duration"></input>
                        <select name="difficulty" id="difficulty" onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
                            <option value="" selected disabled>Difficulty</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="expert">Expert</option>
                        </select>
                    </div>
                    <input type="url" name="reference" id="reference" onChange={(e) => setReference(e.target.value)} value={reference} placeholder="Reference URL"></input>
                    <div className='screen-selector'>
                        <button type="button" onClick={()=>setCurrentScreen('exercises')} className={currentScreen === 'exercises' ? 'selected-screen-button' : ''}>Exercises</button>
                        <button type="button" onClick={()=>setCurrentScreen('tags')} className={currentScreen === 'tags' ? 'selected-screen-button' : ''}>Tags</button>
                        <button type="button" onClick={()=>setCurrentScreen('equipment')} className={currentScreen === 'equipment' ? 'selected-screen-button' : ''}>Equipment</button>
                        <button type="button" onClick={()=>setCurrentScreen('groups')} className={currentScreen === 'groups' ? 'selected-screen-button' : ''}>Groups</button>
                    </div>
                    <div className="selected-screen-container">
                        {currentScreen === 'exercises' ? (
                            <fieldset className="exercises-fieldset">
                                <div className="source-buttons">
                                    <button type="button" className={exercisesSource === "library" ? 'selected-button' : ''} onClick={()=>setExercisesSource('library')}>Library</button>
                                    <button type="button" className={exercisesSource === "database" ? 'selected-button' : ''} onClick={()=>setExercisesSource('database')}>Database</button>
                                </div>
                                <div className="exercises-container">
                                {exercisesSource === 'library' && (
                                    createdExercises?.length > 0 ? (
                                        createdExercises.map((exercise, index) => 
                                        exercises.some((ex) => ex.id === exercise.id) ? null : (
                                            <div className="exercise-body" id={exercise.name} key={index}>
                                            <div className="exercise-info">
                                                <h4>{exercise.name}</h4>
                                                <div className="exercise-tags">
                                                    {exercise.tags?.length > 0 ? exercise.tags.map(tag=><p key={tag.name}>{tag.name}</p>) : ''}
                                                </div>
                                            </div>
                                            <p className="exercise-sets">{exercise.sets} sets</p>
                                            <button type="button" onClick={(e) => handleAddExercise('library', exercise, e)} className="small-square transparent-bg" >
                                                <img src={IconLibrary.Add}
                                                className="small-icon" alt="" />
                                            </button>
                                            </div>
                                        )
                                        )
                                    ) : (
                                        <h3>Your library is empty</h3>
                                    )
                                    )}
                                {exercisesSource === 'database' && (
                                    databaseExercises?.length > 0 ? (
                                        databaseExercises.map((exercise, index) => 
                                        exercises.some((ex) => ex.id === exercise.id) ? null : (
                                            <div className="exercise-body" id={exercise.name+exercise.id} key={index}>
                                            <div className="exercise-info">
                                                <h4>{exercise.name}</h4>
                                                <div className="exercise-tags">
                                                    {exercise.tags?.length > 0 ? exercise.tags.slice(0, 3).map(tag=><p>{tag.name}</p>) : ''}
                                                </div>
                                            </div>
                                            <p className="exercise-sets">{exercise.sets} sets</p>
                                            <button  type="button" onClick={(e) => handleAddExercise('database', exercise, e)} className="small-square transparent-bg" >
                                                <img src={IconLibrary.Add} className="small-icon" alt="" />
                                            </button>
                                            </div>
                                        )
                                        )
                                    ) : (<h3>Could not load exercises</h3>)
                                    )}
        
                                </div>
                                <div className="exercises-container">
                                    {exercises?.length > 0 ? exercises.map((item, index)=>(
                                            <div className="exercise-body added-exercise" id={item.name+index} key={index+'exercise'}>
                                                <div className="exercise-info">
                                                    <h4>{item.name}</h4>
                                                        {item.sets ? (<p>{item.sets} sets</p>) : ''}
                                                </div>
                                                <button type="button" onClick={()=>handleRemoveExercise(item.id)} className="small-square transparent-bg"><img src={IconLibrary.No} className="white-icon small-icon" alt=""></img></button>
                                            </div>
                                    )): <h3>No exercises added.</h3>}
                                </div>
                            </fieldset>
                        ) : currentScreen === 'tags' ? (
                            <div className="screen">
                                <CreateTag addTag={addTag} author={userId} allTags={workoutTags} />
                                
                                <div className="tags-container">
                                    {workoutTags?.length > 0 ? workoutTags.map((item)=><div key={item.name+item.color} className="tag-body"><div className="tag-color" style={{backgroundColor: item.color}}></div><p>{item.name}</p><img className="small-icon" src={IconLibrary.No} onClick={()=>setWorkoutTags((workoutTags)=>[...workoutTags.filter(it=>it.id!==item.id)]) }/></div>) : ''}
                                </div>
                            </div>
                        ) : currentScreen === 'equipment' ? (
                            <div className="screen">
                                <CreateEquipment addEquipment={addEquipment} allItems={equipments} />
                                <div className="equipments-container">
                                    {equipments?.length > 0 ? equipments.map((item,index)=><div key={item.name+index} className="equipment-body">
                                        <p>{item.name}</p>
                                        <div>{item.attributes && item.attributes.length > 0 ? item.attributes.map((item, index)=>(<p className="attribute" key={'attribute-'+index}>{item.value} {item.unit}</p>)): null}</div>
                                        <img className="small-icon" src={IconLibrary.No} onClick={()=>setEquipments((equipments)=>[...equipments.filter(it=>it.id!==item.id)]) }/>
                                    </div>) : ''}
                                </div>
                            </div>
                        ) : currentScreen === 'groups' ? (
                            <div className="screen">
                                <div className='new-target-group'>
                                    <button type="button" className="clear-button" onClick={()=>setShowGroups(true)}><img style={{filter: 'invert(1)'}} className="small-icon" src={IconLibrary.Search} alt=""/></button>
                                    <input type='text' name="groupName" onChange={(e)=>setGroupName(e.target.value)} value={groupName} placeholder="Muscle Name" />
                                    <button type="button" className="clear-button" onClick={handleAddGroup}><img className="small-icon" src={IconLibrary.Add} alt="" /></button>
                                </div>  
                                {showGroups ? <TargetGroupPicker closeModal={()=>setShowGroups(false)} currentItems={targetGroups} addItem={(groupData)=>setTargetGroups(targetGroups=>[...targetGroups,groupData])} /> : null}
                                <div className="tags-container">
                                    {targetGroups?.length > 0 ? targetGroups.map((item, index)=><div key={item.name+index} className="tag-body"><div className="tag-color"></div><p>{item.name}</p><img className="small-icon" src={IconLibrary.No} onClick={()=>setTargetGroups((muscleGroups)=>[...muscleGroups.filter(it=>it.id!==item.id)]) }/></div>) : ''}
                                </div>
                            </div> 
                        ) : null}
                    </div>
                    
                    
                </form>
        </div>
     );
}
 
export default CreateWorkout;