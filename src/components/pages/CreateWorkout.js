import { getDateForHeader } from "../../helpers";
import './stylings/createWorkout.css';
import { useState } from "react";
import deleteIcon from '../../assets/close.svg';
import plusIcon from '../../assets/plus-circle.svg';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { addWorkout } from "../../store/userSlice";
import {useNavigate} from 'react-router-dom'


const CreateWorkout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const createdExercises = useSelector((state) => state.user.createdExercises);

    const [exercises, setExercises] = useState([]);
    const [exerciseName, setExerciseName] = useState('');
    const [exerciseReps, setExerciseReps] = useState('');
    const [exerciseSets, setExerciseSets] = useState('');
    const [exerciseDistance, setExerciseDistance] = useState('');
    const [exerciseDuration, setExerciseDuration] = useState('')

    //form values
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [reference, setReference] = useState('');
    const [targetGroup, setTargetGroup] = useState('srms');
    const [difficulty, setDifficulty] = useState('beginner');
    const [calories, setCalories] = useState(0);
    const [duration, setDuration] = useState(0);

    const handleAddExercise = (e) =>{
        e.preventDefault();
        setExercises([...exercises, { id: uuidv4(), name: exerciseName, sets: exerciseSets, reps: exerciseReps, distance: exerciseDistance, time: exerciseDuration }]);
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
        const workoutData = {id: uuidv4(), type: 'created', author: '', name, description, reference, targetGroup, difficulty, exercises, createdAt, duration, calories};
        console.log(workoutData)
        dispatch(addWorkout(workoutData));
        navigate('/library');
        
    }
    const handleAddExerciseFromLibrary = (exercise,e)=>{
        e.preventDefault();
        setExercises((exercises)=>[...exercises, exercise]);
    }

    return ( 
        <div className="create-workout-page page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Create Workout</h2>
            </div>
                <form>
                    <fieldset>
                        <label>Name</label>
                        <input  type="text" name="name" id="name" required={true} minLength={3} maxLength={20} onChange={(e) => setName(e.target.value)} value={name}></input>
                    </fieldset>
                    <fieldset>
                        <label>Description</label>
                        <input type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)} value={description} minLength={0} maxLength={100}></input>
                    </fieldset>
                    <fieldset>
                        <label>Duration (minutes)</label>
                        <input type="number" name="duration" id="duration" onChange={(e) => setDuration(e.target.value)} value={duration} min={0} max={9999}></input>
                    </fieldset>
                    <fieldset>
                        <label>Calories Burned</label>
                        <input type="number" name="calories" id="calories" onChange={(e) => setCalories(e.target.value)} value={calories} min={0} max={9999}></input>
                    </fieldset>
                    <fieldset>
                        <label>Reference (URL)</label>
                        <input type="url" name="reference" id="reference" onChange={(e) => setReference(e.target.value)} value={reference}></input>
                    </fieldset>
                    <fieldset>
                        <label>Target Group</label>
                        <select name="targetGroup" id="targetGroup" required={true} onChange={(e) => setTargetGroup(e.target.value)} value={targetGroup}>
                            <option value="full-body">Full Body</option>
                            <option value="upper-body">Upper Body</option>
                            <option value="core">Core</option>
                            <option value="lower-body">Lower Body</option>    
                        </select>
                    </fieldset>
                    <fieldset>
                        <label>Difficulty</label>
                        <select name="difficulty" id="difficulty" onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="expert">Expert</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <label>Exercises</label>
                        <div className="exercises-container">
                            {exercises?.length > 0 ? exercises.map((exercise, index)=>(
                                    <div className="exercise-body" id={index} key={index}>
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
                                        <button onClick={()=>handleRemoveExercise(exercise.id)} className="small-square transparent-bg"><img src={deleteIcon} className="white-icon small-icon" alt=""></img></button>
                                    </div>
                            )): <h3>No exercises added.</h3>}
                        </div>
                        <label>Exercises Library</label>
                        <div className="exercises-container">
                            {createdExercises?.length > 0 ? createdExercises.map((exercise, index)=>(
                                    <div className="exercise-body" id={index} key={index}>
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
                                        <button onClick={(e)=>handleAddExerciseFromLibrary(exercise,e)} className="small-square transparent-bg"><img src={plusIcon} className=" small-icon" alt=""></img></button>
                                    </div>
                            )): <h3>No exercises added.</h3>}
                        </div>
                        <div className="exercise-creator">
                            <h3 className="subtitle full-width">Create a new exercise</h3>
                            <div className="exercise-creator-inputs">
                                <input type="text" name="exerciseName" id="exerciseName" required={true} placeholder="Name" value={exerciseName} onChange={(e) => setExerciseName(e.target.value)}></input>
                                <input type="number" name="exerciseSets" id="exerciseSets" placeholder="Sets" value={exerciseSets} onChange={(e) => setExerciseSets(e.target.value)}></input>
                                <input type="number" name="exerciseReps" id="exerciseReps" placeholder="Reps" value={exerciseReps} onChange={(e) => setExerciseReps(e.target.value)}></input>
                                <input type="number" name="exerciseDistance" id="exerciseDistance" placeholder="Distance (m)" value={exerciseDistance} onChange={(e) => setExerciseDistance(e.target.value)}></input>
                                <input type="number" name="exerciseDuration" id="exerciseDuration" placeholder="Duration (s)" value={exerciseDuration} onChange={(e) => setExerciseDuration(e.target.value)}></input>
                            </div>
                            <button className="orange-button medium-button" onClick={handleAddExercise}>Add</button>
                        </div>
                    </fieldset>

                    <button className="orange-button large-button submit-button" onClick={handleSubmit}>Create Workout</button>
                </form>
        </div>
     );
}
 
export default CreateWorkout;