import { formatTime, getCurrentDay, getDateForHeader, getFullHour } from "../../helpers";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Timer from "./common/Timer";
import './stylings/workout.css';
import { v4 as uuidv4 } from 'uuid';
import checkIcon from '../../assets/checkmark.svg';
import arrowIcon from '../../assets/arrow.svg';
import { addLog } from "../../store/userSlice";

const Workout = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const workoutData = useSelector((state) => state.user.workouts.find((item) => item.id === id));
    const exercises = useSelector((state) => state.user.exercises.filter((ex) => workoutData.exercises.includes(ex.id)));
    const [currentExercise, setCurrentExercise] = useState(exercises[0]?.id); // Ensure it's set to the first exercise if available
    const [workoutExercises, setWorkoutExercises] = useState([]);
    const [duration, setDuration] = useState("00:00:00");
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);
    
        return () => clearInterval(timer);
    }, []);


    useEffect(() => {
        if (workoutExercises.length === 0) {
            const tempExercises = exercises.map((exercise) => {
                let fieldSets = {};
                for (let i = 0; i < exercise.sets; i++) {
                    fieldSets[i] = {
                        isCompleted: false,
                        fields: [...exercise.fields],
                    };
                }
                return { ...exercise, fieldSets };
            });
            setWorkoutExercises(tempExercises);
        }
    }, [exercises]); // Depend on exercises directly
    

    const handleInputChange = (e, currentExercise, key, index) => {
        setWorkoutExercises((prevWorkoutExercises) => {
            const updatedWorkoutExercises = prevWorkoutExercises.map((exercise) => {
                if (exercise.id === currentExercise) {
                    // Create a new copy of the fieldSets
                    const updatedFieldSets = { ...exercise.fieldSets };
                    updatedFieldSets[key] = {
                        ...updatedFieldSets[key],
                        fields: updatedFieldSets[key].fields.map((field, idx) => {
                            if (idx === index) {
                                // Create a new field with the updated value
                                return { ...field, value: e?.target.value };
                            }
                            return field;
                        }),
                    };
                    return { ...exercise, fieldSets: updatedFieldSets };
                }
                return exercise;
            });
    
            return updatedWorkoutExercises;
        });
    };
    

    const toggleCompletionOfSet = (exerciseId, setKey) => {
    
        setWorkoutExercises((prevWorkoutExercises) => {
            const updatedWorkoutExercises = prevWorkoutExercises.map((exercise) => {
                if (exercise.id === exerciseId) {
                    // Create a new copy of fieldSets
                    const updatedFieldSets = { ...exercise.fieldSets };
                    // Toggle isCompleted: if it's true, set it to false, and vice versa
                    updatedFieldSets[setKey] = {
                        ...updatedFieldSets[setKey],
                        isCompleted: !updatedFieldSets[setKey].isCompleted, // Toggle the value
                    };
                    return { ...exercise, fieldSets: updatedFieldSets };
                }
                return exercise;
            });
    
            return updatedWorkoutExercises;
        });
    };
    

    // Functions to move through exercises
    const prevExercise = () => {
        const selectedExerciseIndex = workoutExercises.findIndex((obj) => obj.id === currentExercise);
        if (selectedExerciseIndex > 0) {
            setCurrentExercise(workoutExercises[selectedExerciseIndex - 1].id);
        }
    };

    const nextExercise = () => {
        const selectedExerciseIndex = workoutExercises.findIndex((obj) => obj.id === currentExercise);
        if (selectedExerciseIndex < workoutExercises.length - 1) {
            setCurrentExercise(workoutExercises[selectedExerciseIndex + 1].id);
        }
    };
    const finishWorkout = () =>{
        const log = {
            id: uuidv4(),
            icon: '/icons/workout.svg',
            type: 'workout',
            data: {
                duration: formatTime(seconds),
                finishedAt: getFullHour(),
                workoutData: {...workoutData, exercises: workoutExercises}
            }
        }
        dispatch(addLog(log));
        navigate('/logs');

    }
    const handleUpdateDuration = (time) => {
        setDuration(time);
    };
    return (
        <div className="workout-page page">
            <div className="header">
                <div className="date">{getDateForHeader()}</div>
                <h2>{workoutData.name}</h2>
                
            </div>
            <div className="workout-top">
                <div className="timer">{formatTime(seconds)}</div>
                <button onClick={()=>finishWorkout()} className="finish-workout-button medium-button orange-button">Finish</button>
            </div>
            

            <div className="current-exercise section">
                <div className="current-exercise-top">
                    <img
                        className="small-icon left-arrow"
                        src={arrowIcon}
                        onClick={prevExercise}
                        alt="Previous Exercise"
                    />
                    <h3>{workoutExercises?.find((ex) => ex.id === currentExercise)?.name}</h3>
                    <img
                        className="small-icon"
                        src={arrowIcon}
                        onClick={nextExercise}
                        alt="Next Exercise"
                    />
                </div>

                
                {workoutExercises?.find(ex => ex.id === currentExercise)?.fieldSets && 
                    Object.entries(workoutExercises.find(ex => ex.id === currentExercise).fieldSets)?.map(([key, sets]) => (
                        <div className="fields">
                            <div className="set" key={key}>
                                <h4>{parseInt(key)+1}</h4>
                                
                                    {sets?.fields?.map((field, index)=>(
                                        <div className="field" key={field.name}>
                                            <input
                                                type="text"
                                                placeholder={field.name}
                                                value={field.value || ''}
                                                onChange={(e) => handleInputChange(e, currentExercise, key, index )}
                                            />
                                        </div>
                                    ))} 
                                    <img onClick={()=>toggleCompletionOfSet(currentExercise, key)} src={checkIcon} className={`small-icon ${sets.isCompleted ? 'orange-background' : ''}`} />
                            </div>
                        </div>
                ))
}



            </div>
            <div className="workout-exercises section">
                <h3 className="subtitle full-width">Exercises</h3>
                {workoutExercises?.map((exercise, index) => (
                    <div
                        className={`exercise-body ${currentExercise === exercise.id ? 'selected-exercise' : ''}`}
                        key={index + 'exercise'}
                        onClick={() => setCurrentExercise(exercise.id)}
                    >
                        <b>{index + 1}</b>
                        <p>{exercise.name}</p>
                        <div className="sets">x{exercise.sets}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Workout;
