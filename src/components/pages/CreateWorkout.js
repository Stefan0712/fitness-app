import { getDateForHeader } from "../../helpers";
import './stylings/workout.css';
import { useState } from "react";
import deleteIcon from '../../assets/close.svg';
import plusIcon from '../../assets/plus-circle.svg';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { addWorkout } from "../../store/userSlice";
import {useNavigate} from 'react-router-dom'
import {IconLibrary} from '../../IconLibrary.js';
import CustomItemCreator from "./common/CustomItemCreator.js";
import { exercises as databaseExercises } from "../../database.js";

//default values
import { defaultTags } from "../../constants/defaultTags.js";
import { defaultTargetGroups } from "../../constants/defaultTargetGroups.js";
import {defaultEquipment} from "../../constants/defaultEquipment.js";
import DefaultItems from "./common/DefaultItems.js";

//TODO: Show all default and custom fields, add a simple quick field, validation, simplify the ui


const CreateWorkout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const createdExercises = useSelector((state) => state.user.exercises);
    
    const [exercisesSource, setExercisesSource] = useState('library')

    const [exercises, setExercises] = useState([]);



    //form values
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [reference, setReference] = useState('');
    const [difficulty, setDifficulty] = useState('beginner');
    const [duration, setDuration] = useState(0);

    const [workoutTags, setWorkoutTags] = useState([])
    const [equipments, setEquipments] = useState([]);
    const [targetGroups, setTargetGroups] = useState([])

    const [notes, setNotes] = useState('');


    const handleRemoveExercise = (id) =>{
        setExercises((exercises)=>exercises.filter((item)=>item.exercise.id !== id));
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const createdAt = new Date().toISOString(); //get timestamp
        let exercisesIds = []; //empty array to store the ids and sources of exercises

        //extract only the id and source from each exercise
        exercises.forEach((item)=>{
            exercisesIds.push({source: item.source, id: item.exercise.id})
        });
        const workoutData = {id: uuidv4(), source: 'user', author: 'Stefan', name, description, reference, equipment: equipments, tags: workoutTags, targetGroups, difficulty,notes, exercises: exercisesIds, createdAt, duration};
        console.log(workoutData);
        dispatch(addWorkout(workoutData));
        navigate('/library');
        
    }
    const handleAddExercise = (source,exercise,e)=>{
        console.log({source, exercise})
        setExercises((exercises)=>[...exercises, {source, exercise}]);
    }

    const addTag = (newItem) =>{
        setWorkoutTags((workoutTags)=>[...workoutTags, newItem]);
    }
    const addEquipment = (newItem) =>{
        setEquipments((equipments)=>[...equipments, newItem]);
    }
    const addTargetGroups = (newItem) =>{
        setTargetGroups((targetGorups)=>[...targetGorups, newItem]);
    }
   
    return ( 
        <div className="create-workout-page page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Create Workout</h2>
            </div>
                <form>
                    <fieldset className="full-width">
                        <label>Name</label>
                        <input  type="text" name="name" id="name" required={true} minLength={3} maxLength={20} onChange={(e) => setName(e.target.value)} value={name}></input>
                    </fieldset>
                    <fieldset>
                        <label>Description</label>
                        <input type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)} value={description} minLength={0} maxLength={100}></input>
                    </fieldset>
                    <fieldset className="half-width">
                        <label>Duration (minutes)</label>
                        <input type="number" name="duration" id="duration" onChange={(e) => setDuration(e.target.value)} value={duration} min={0} max={9999}></input>
                    </fieldset>
                    <fieldset className="half-width">
                        <label>Difficulty</label>
                        <select name="difficulty" id="difficulty" onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="expert">Expert</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <label>Reference (URL)</label>
                        <input type="url" name="reference" id="reference" onChange={(e) => setReference(e.target.value)} value={reference}></input>
                    </fieldset>
                    <fieldset>
                        <label>Notes</label>
                        <input type="text" name="notes" id="notes" onChange={(e) => setNotes(e.target.value)} value={notes}></input>
                    </fieldset>
                    <fieldset className="tag-selector">
                        <label>Target Group</label>
                        <CustomItemCreator addItem={addTargetGroups} type={'target-group'}/>
                        <DefaultItems allItems={defaultTargetGroups} title={'Saved Target Groups'} savedItems={targetGroups} addItem={addTargetGroups}/>
                        <div className="selected-tags">
                            {targetGroups?.length > 0 ? targetGroups.map((item)=><div key={item.name+item.color} className="tag-body"><div className="tag-color" style={{backgroundColor: item.color}}></div><p>{item.name}</p><img className="small-icon" src={IconLibrary.No} onClick={()=>setTargetGroups((targetGroups)=>[...targetGroups.filter(it=>it.id!==item.id)]) }/></div>) : ''}
                        </div>
                    </fieldset>
                    <fieldset className="tag-selector">
                        <label>Tags</label>
                        <CustomItemCreator addItem={addTag} type={'tag'}/>
                        <DefaultItems allItems={defaultTags} title={'Saved Tags'} savedItems={workoutTags} addItem={addTag}/>
                        <div className="selected-tags">
                            {workoutTags?.length > 0 ? workoutTags.map((item)=><div key={item.name+item.color} className="tag-body"><div className="tag-color" style={{backgroundColor: item.color}}></div><p>{item.name}</p><img className="small-icon" src={IconLibrary.No} onClick={()=>setWorkoutTags((workoutTags)=>[...workoutTags.filter(it=>it.id!==item.id)]) }/></div>) : ''}
                        </div>
                    </fieldset>
                    <fieldset className="tag-selector">
                        <label>Equipment</label>
                        <CustomItemCreator addItem={addEquipment} type={'equipment'}/>
                        <DefaultItems allItems={defaultEquipment} title={'Saved Equipment'} savedItems={equipments} addItem={addEquipment}/>
                        <div className="selected-tags">
                            {equipments?.length > 0 ? equipments.map((item)=><div key={item.name+item.color} className="tag-body"><div className="tag-color" style={{backgroundColor: item.color || 'none'}}></div><p>{item.name}</p><img className="small-icon" src={IconLibrary.No} onClick={()=>setEquipments((equipments)=>[...equipments.filter(it=>it.id!==item.id)]) }/></div>) : ''}
                        </div>
                    </fieldset>
                    
                    
                    <fieldset>
                        <label>Exercises</label>
                        <div className="exercises-container">
                            {exercises?.length > 0 ? exercises.map((item, index)=>(
                                    <div className="exercise-body" id={index} key={index+'exercise'}>
                                        <div className="exercise-info">
                                            <h4>{item.exercise.name}</h4>
                                                {item.exercise.sets ? (<p>{item.exercise.sets} sets</p>) : ''}
                                        </div>
                                        <button type="button" onClick={()=>handleRemoveExercise(item.exercise.id)} className="small-square transparent-bg"><img src={deleteIcon} className="white-icon small-icon" alt=""></img></button>
                                    </div>
                            )): <h3>No exercises added.</h3>}
                        </div>
                        <label>Exercises Library</label>
                        <div className="source-buttons">
                            <button type="button" className={exercisesSource === "library" ? 'selected-button' : ''} onClick={()=>setExercisesSource('library')}>Library</button>
                            <button type="button" className={exercisesSource === "database" ? 'selected-button' : ''} onClick={()=>setExercisesSource('database')}>Database</button>
                        </div>
                        <div className="exercises-container">
                        {exercisesSource === 'library' && (
                            createdExercises?.length > 0 ? (
                                createdExercises.map((exercise, index) => 
                                exercises.some((ex) => ex.id === exercise.id) ? null : (
                                    <div className="exercise-body" id={index} key={index}>
                                    <div className="exercise-info">
                                        <h4>{exercise.name}</h4>
                                        <div className="exercise-tags">
                                            
                                            {exercise.tags?.length > 0 ? exercise.tags.map(tag=><p key={tag.name}>{tag.name}</p>) : ''}
                                        </div>
                                    </div>
                                    <p className="exercise-sets">{exercise.sets} sets</p>
                                    <button
                                        type="button"
                                        onClick={(e) => handleAddExercise('library', exercise, e)}
                                        className="small-square transparent-bg"
                                    >
                                        <img
                                        src={plusIcon}
                                        className="small-icon"
                                        alt=""
                                        />
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
                                    <div className="exercise-body" id={index} key={index}>
                                    <div className="exercise-info">
                                        <h4>{exercise.name}</h4>
                                        <div className="exercise-tags">
                                            {exercise.tags?.length > 0 ? exercise.tags.map(tag=><p>{tag.name}</p>) : ''}
                                        </div>
                                    </div>
                                    <p className="exercise-sets">{exercise.sets} sets</p>
                                    <button
                                        type="button"
                                        onClick={(e) => handleAddExercise('database', exercise, e)}
                                        className="small-square transparent-bg"
                                    >
                                        <img
                                        src={plusIcon}
                                        className="small-icon"
                                        alt=""
                                        />
                                    </button>
                                    </div>
                                )
                                )
                            ) : (
                                <h3>Could not load exercises</h3>
                            )
                            )}

                        </div>
                    </fieldset>

                    <button className="orange-button large-button submit-button" onClick={handleSubmit}>Create Workout</button>
                </form>
        </div>
     );
}
 
export default CreateWorkout;