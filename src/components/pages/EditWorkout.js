import { getDateForHeader } from "../../helpers";
import './stylings/workout.css';
import { useState } from "react";
import deleteIcon from '../../assets/close.svg';
import plusIcon from '../../assets/plus-circle.svg';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { updateWorkout, addExercise } from "../../store/userSlice";
import {useNavigate} from 'react-router-dom';
import AddExerciseToLibrary from "./common/AddExerciseToLibrary";
import { useParams } from "react-router-dom";

const EditWorkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const createdExercises = useSelector((state) => state.user.exercises);
    const workoutData = useSelector((state)=>state.user.workouts.find((workout)=>workout.id===id));
    

    const [exercises, setExercises] = useState(workoutData.exercises ? createdExercises.filter(exercise => workoutData.exercises.includes(exercise.id)) : []);
    const [exerciseName, setExerciseName] = useState('');
    const [exerciseReps, setExerciseReps] = useState('');
    const [exerciseSets, setExerciseSets] = useState('');
    const [exerciseDistance, setExerciseDistance] = useState('');
    const [exerciseDuration, setExerciseDuration] = useState('');

    // form values
    const [name, setName] = useState(workoutData.name || '');
    const [description, setDescription] = useState(workoutData.description || '');
    const [reference, setReference] = useState(workoutData.reference || '');
    const [targetGroup, setTargetGroup] = useState(workoutData.targetGroup || 'arms');
    const [difficulty, setDifficulty] = useState(workoutData.difficulty || 'beginner');
    const [duration, setDuration] = useState(workoutData.duration || 0);

    const handleAddExercise = (e) => {
        e.preventDefault();
        setExercises([...exercises, {
            id: uuidv4(),
            type: 'Not set',
            name: exerciseName,
            visibility: 'private',
            author: '',
            description: 'Not set',
            reference: 'Not set',
            targetGroup: 'Not set',
            difficulty: 'Not set',
            sets: exerciseSets,
            fields: [
                { name: 'Reps', unit: 'reps', target: exerciseReps, value: '' },
                { name: 'Distance', unit: 'distance', target: exerciseDistance, value: '' },
                { name: 'Time', unit: 'time', target: exerciseDuration, value: '' }
            ]
        }]);
        setExerciseReps('');
        setExerciseSets('');
        setExerciseDistance('');
        setExerciseDuration('');
        setExerciseName('');
    };

    const handleRemoveExercise = (id, e) => {
        e.preventDefault();
        setExercises((exercises) => exercises.filter((exercise) => exercise.id !== id));
    };

    const handleSubmit = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        let exercisesIds = [];
        exercises.forEach((exercise) => {
            if (!createdExercises.some((ex) => ex.id === exercise.id)) {
                dispatch(addExercise(exercise));
            }
            exercisesIds.push(exercise.id);
        });
        const data = {
            id: workoutData.id,
            type: workoutData.type,
            author: workoutData.author,
            name,
            description,
            reference,
            targetGroup,
            difficulty,
            exercises: exercisesIds,
            createdAt: workoutData.createdAt,
            duration
        };
        dispatch(updateWorkout(data));
        navigate('/workout/'+workoutData.id+'/view/');
    };

    const handleAddExerciseFromLibrary = (exercise, e) => {
        if (e && e.preventDefault) e.preventDefault();
        setExercises((exercises) => [...exercises, exercise]);
    };

    return (
        <div className="create-workout-page page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Edit Workout</h2>
            </div>
            <form>
                <fieldset>
                    <label>Name</label>
                    <input type="text" name="name" id="name" required minLength={3} maxLength={20} onChange={(e) => setName(e.target.value)} value={name}></input>
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
                    <label>Reference (URL)</label>
                    <input type="url" name="reference" id="reference" onChange={(e) => setReference(e.target.value)} value={reference}></input>
                </fieldset>
                <fieldset>
                    <label>Target Group</label>
                    <select name="targetGroup" id="targetGroup" required onChange={(e) => setTargetGroup(e.target.value)} value={targetGroup}>
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
                        {exercises?.length > 0 ? exercises.map((exercise, index) => (
                            <div className="exercise-body" id={index} key={index}>
                                <div className="exercise-info">
                                    <h4>{exercise.name}</h4>
                                    <div className="exercise-meta">
                                        {exercise.sets && (<p>{exercise.sets} sets</p>)}
                                        {exercise.reps && (<p>{exercise.reps} reps</p>)}
                                        {exercise.distance && (<p>{exercise.distance} m</p>)}
                                        {exercise.duration && (<p>{exercise.duration} s</p>)}
                                    </div>
                                    {exercise.fields && exercise.fields.length > 0 && (
                                        <div className="exercise-meta">
                                            <p>{exercise.fields[0].target} {exercise.fields[0].unit}</p>
                                            <p>{exercise.fields[1].target} {exercise.fields[1].unit}</p>
                                        </div>
                                    )}
                                </div>
                                <AddExerciseToLibrary exerciseData={exercise}></AddExerciseToLibrary>
                                <button onClick={(e) => handleRemoveExercise(exercise.id, e)} className="small-square transparent-bg">
                                    <img src={deleteIcon} className="white-icon small-icon" alt="" />
                                </button>
                            </div>
                        )) : <h3>No exercises added.</h3>}
                    </div>
                    <label>Exercises Library</label>
                    <div className="exercises-container">
                        {createdExercises?.length > 0 ? createdExercises.map((exercise, index) =>
                            exercises.some((ex) => ex.id === exercise.id) ? '' : (
                                <div className="exercise-body" id={index} key={index}>
                                    <div className="exercise-info">
                                        <h4>{exercise.name}</h4>
                                        <div className="exercise-meta">
                                            {exercise.sets && (<p>{exercise.sets} sets</p>)}
                                            {exercise.reps && (<p>{exercise.reps} reps</p>)}
                                            {exercise.distance && (<p>{exercise.distance} m</p>)}
                                            {exercise.duration && (<p>{exercise.duration} s</p>)}
                                        </div>
                                        {exercise.fields && exercise.fields.length > 0 && (
                                            <div className="exercise-meta">
                                                <p>{exercise.fields[0].target} {exercise.fields[0].unit}</p>
                                                <p>{exercise.fields[1].target} {exercise.fields[1].unit}</p>
                                            </div>
                                        )}
                                    </div>
                                    <button onClick={(e) => handleAddExerciseFromLibrary(exercise, e)} className="small-square transparent-bg">
                                        <img src={plusIcon} className="white-icon small-icon" alt="" />
                                    </button>
                                </div>
                            )
                        ) : <h3>No exercises added to your library.</h3>}
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
                <button className="orange-button large-button" onClick={handleSubmit} type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditWorkout;
