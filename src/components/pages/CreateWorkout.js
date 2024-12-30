import { getDateForHeader } from "../../helpers";
import './stylings/workout.css';
import { useState } from "react";
import deleteIcon from '../../assets/close.svg';
import plusIcon from '../../assets/plus-circle.svg';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { addWorkout, addExercise } from "../../store/userSlice";
import {useNavigate} from 'react-router-dom'
import AddExerciseToLibrary from "./common/AddExerciseToLibrary";
import {IconLibrary} from '../../IconLibrary.js';
import CustomItemCreator from "./common/CustomItemCreator.js";
import { exercises as databaseExercises } from "../../database.js";


const CreateWorkout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const createdExercises = useSelector((state) => state.user.exercises);
    
    const savedCategories = useSelector((state)=>state.user.categories);
    const savedTags = useSelector((state)=>state.user.tags);
    const savedTargetGroups = useSelector((state)=>state.user.targetGroups);

    const [exercisesSource, setExercisesSource] = useState('library')

    const [exercises, setExercises] = useState([]);
    const [exerciseName, setExerciseName] = useState('');
    const [exerciseReps, setExerciseReps] = useState('');
    const [exerciseSets, setExerciseSets] = useState('');
    const [exerciseDistance, setExerciseDistance] = useState('');
    const [exerciseDuration, setExerciseDuration] = useState('');
    const [selectedColor, setSelectedColor] = useState(null)

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

    const handleAddExercise = (e) =>{
        e.preventDefault();
        setExercises([...exercises, { id: uuidv4(), type: 'Not set', name: exerciseName, visibility: 'private', author: '', description: 'Not set', reference: 'Not set', targetGroup: 'Not set', difficulty: 'Not set' ,sets: exerciseSets, fields: [{name: 'Reps', unit: 'reps', target: exerciseReps, value: ''}, {name: 'Distance', unit: 'distance', target: exerciseDistance, value: ''}, {name: 'Time', unit: 'time', target: exerciseDuration, value: ''}] }]);
        setExerciseReps('');
        setExerciseSets('');
        setExerciseDistance('');
        setExerciseDuration('');
        setExerciseName('');
    }

    const handleRemoveExercise = (id) =>{
        setExercises((exercises)=>exercises.filter((exercise)=>exercise.id !== id));
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const createdAt = new Date().toISOString();
        let exercisesIds = [];
        exercises.forEach((exercise)=>{
            if(!createdExercises.some((ex)=>ex.id === exercise.id)){
                dispatch(addExercise(exercise));
            }  
            exercisesIds.push(exercise.id)
        });
        const workoutData = {id: uuidv4(), type: 'created', author: '', name, description, reference, equipment: equipments, tags: workoutTags, targetGroups, difficulty, exercises: exercisesIds, createdAt, duration};
        dispatch(addWorkout(workoutData));
        navigate('/library');
        
    }
    const handleAddExerciseFromLibrary = (exercise,e)=>{
        e.preventDefault();
        setExercises((exercises)=>[...exercises, exercise]);
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
                        <CustomItemCreator addItem={addTargetGroups} />
                        <div className="selected-tags">
                            {targetGroups?.length > 0 ? targetGroups.map((item)=><div key={item.name+item.color} className="tag-body"><div className="tag-color" style={{backgroundColor: item.color}}></div><p>{item.name}</p><img className="small-icon" src={IconLibrary.No} onClick={()=>setTargetGroups((targetGroups)=>[...targetGroups.filter(it=>it.id!==item.id)]) }/></div>) : ''}
                        </div>
                    </fieldset>
                    <fieldset className="tag-selector">
                        <label>Tags</label>
                        <CustomItemCreator addItem={addTag}/>
                        <div className="selected-tags">
                            {workoutTags?.length > 0 ? workoutTags.map((item)=><div key={item.name+item.color} className="tag-body"><div className="tag-color" style={{backgroundColor: item.color}}></div><p>{item.name}</p><img className="small-icon" src={IconLibrary.No} onClick={()=>setWorkoutTags((workoutTags)=>[...workoutTags.filter(it=>it.id!==item.id)]) }/></div>) : ''}
                        </div>
                    </fieldset>
                    <fieldset className="tag-selector">
                        <label>Equipment</label>
                        <CustomItemCreator addItem={addEquipment} />
                        <div className="selected-tags">
                            {equipments?.length > 0 ? equipments.map((item)=><div key={item.name+item.color} className="tag-body"><div className="tag-color" style={{backgroundColor: item.color}}></div><p>{item.name}</p><img className="small-icon" src={IconLibrary.No} onClick={()=>setEquipments((equipments)=>[...equipments.filter(it=>it.id!==item.id)]) }/></div>) : ''}
                        </div>
                    </fieldset>
                    
                    
                    <fieldset>
                        <label>Exercises</label>
                        <div className="exercises-container">
                            {exercises?.length > 0 ? exercises.map((exercise, index)=>(
                                    <div className="exercise-body" id={index} key={index+'exercise'}>
                                        <div className="exercise-info">
                                            <h4>{exercise.name}</h4>
                                            <div className="exercise-meta">
                                                {exercise.sets ? (<p>{exercise.sets} sets</p>) : ''}
                                                {exercise.reps ? (<p>{exercise.reps} reps</p>) : ''}
                                                {exercise.distance ? (<p>{exercise.distance} m</p>) : ''}
                                                {exercise.duration ? (<p>{exercise.duration} s</p>) : ''}
                                            </div>
                                            {exercise && exercise.fields && exercise.fields.length>0 ? (<div className="exercise-meta"><p>{exercise.fields[0].target} {exercise.fields[0].unit}</p><p>{exercise.fields[1].target} {exercise.fields[1].unit}</p></div>) :''}
                                        </div>
                                        <AddExerciseToLibrary exerciseData={exercise}></AddExerciseToLibrary>
                                        <button type="button" onClick={()=>handleRemoveExercise(exercise.id)} className="small-square transparent-bg"><img src={deleteIcon} className="white-icon small-icon" alt=""></img></button>
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
                                        <div className="exercise-meta">
                                        {exercise.sets && <p>{exercise.sets} sets</p>}
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={(e) => handleAddExerciseFromLibrary(exercise, e)}
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
                                        <div className="exercise-meta">
                                        {exercise.sets && <p>{exercise.sets} sets</p>}
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={(e) => handleAddExerciseFromLibrary(exercise, e)}
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