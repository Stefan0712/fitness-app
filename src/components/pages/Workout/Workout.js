import { formatTime, getDateForHeader, getFullHour } from "../../../helpers";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import './workout.css';
import { v4 as uuidv4 } from 'uuid';
import { addLog } from "../../../store/userSlice";
import { IconLibrary } from "../../../IconLibrary";
import {exercises as databaseExercises} from '../../../database';
 


//TODO: Make it work. Try a new design that is more clean. Maybe hide the exercise list and let the user press a button to see it or make it colapsed by default.






const Workout = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const workoutData = useSelector((state) => state.user.workouts.find((item) => item.id === id));
    const libraryExercises = useSelector((state) => state.user.exercises);
    const [exercises, setExercises] = useState([]);
    const [currentExercise, setCurrentExercise] = useState(null); 
    const [duration, setDuration] = useState("00:00:00");
    const [seconds, setSeconds] = useState(0);
    const [currentSet, setCurrentSet] = useState(1);

    useEffect(() => {
        console.log(workoutData, exercises);
        setExercises(getExercises());
        const timer = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);
    
        return () => clearInterval(timer);
    }, []);
    useEffect(()=>{
        if(!currentExercise && exercises && exercises.length > 0){
            setCurrentExercise(exercises[0].id);
            
        }
        console.log(exercises)
    },[exercises])

    const getExercises = () => {
        // Make deep copies of all exercises
        return workoutData.exercises
          .map(({ source, id }) => {
            let exercise = null;
      
            // Check the source and make a deep copy of the object
            if (source === "database") {
              exercise = JSON.parse(
                JSON.stringify(databaseExercises.find((item) => item.id === id))
              );
            } else if (source === "library") {
              exercise = JSON.parse(
                JSON.stringify(libraryExercises.find((item) => item.id === id))
              );
            }
      
            // Add a completedSet property to the exercise object to keep track of how many sets were completed
            if (exercise) {
              if (!exercise.completedSets) {
                exercise.completedSets = 0;
              }
      
              // Transform sets property from number to an array
              if (typeof exercise.sets === "number") {
                const setsArray = [];
                for (let i = 0; i < exercise.sets; i++) {
                  setsArray.push({
                    order: i + 1,
                    value: 0,
                    targetValue: exercise.targetValue || 10, // Default target value
                    isCompleted: false,
                    isSkipped: false,
                  });
                }
                exercise.sets = setsArray; // Replace the sets number with the array
              }
            } else {
              console.error(`Exercise with id "${id}" not found in "${source}"`);
            }
      
            return exercise || null; // Return null if not found
          })
          .filter(Boolean); // Remove null values
      };
      


    // Functions to move through exercises
    const prevExercise = () => {
        const selectedExerciseIndex = exercises.findIndex((obj) => obj.id === currentExercise);
        if (selectedExerciseIndex > 0) {
            setCurrentExercise(exercises[selectedExerciseIndex - 1].id);
        }
    };

    const nextExercise = () => {
        const selectedExerciseIndex = exercises.findIndex((obj) => obj.id === currentExercise);
        if (selectedExerciseIndex < exercises.length - 1) {
            setCurrentExercise(exercises[selectedExerciseIndex + 1].id);
        }
    };
    //finish the workout by saving it as a log and redirrecting the user to he activity page
    const finishWorkout = () =>{
        const log = {
            id: uuidv4(),
            icon: '/icons/workout.svg',
            type: 'workout',
            data: {
                duration: formatTime(seconds),
                finishedAt: getFullHour(),
                workoutData: {...workoutData, exercises: exercises}
            }
        }
        dispatch(addLog(log));
        navigate('/logs');

    }
    const handleUpdateDuration = (time) => {
        setDuration(time);
    };



    const handleIncreaseField = (exerciseId, fieldId) =>{

    }

    const handleDecreaseField = (exerciseId, fieldId) =>{

    }

    const handleCompleteField = (exerciseId, fieldId) =>{
        const item = exercises.find((ex)=>ex.id===exerciseId);
        const field = item.fields.find((a)=>a.id===fieldId);
        console.log(`Completed field ${field.name} from exercise ${item.name}`);
    }


    const handleSkipSet = (exerciseId) =>{

    }

    const handleAddSet = (exerciseId) =>{

    }

    const handleCompleteSet = (exerciseId) =>{

    }

    const handleSkipExercise = (exerciseId) =>{

    }
    
    const handleCompleteExercise = (exerciseId) =>{

    }


    return (
        <div className="workout-page page">
            <div className="header">
                <div className="date">{getDateForHeader()}</div>
                <h2>{workoutData.name}</h2>
                
            </div>
            <div className="workout-top">
                <div className="timer">{formatTime(seconds)}</div>
                <div className="workout-progress">
                    {/* TODO: Implement something to show current progress */}
                    <p>3/10</p>
                    <p>30%</p>
                </div>
                <button onClick={()=>finishWorkout()} className="finish-workout-button medium-button orange-button">Finish</button>
            </div>
            

            <div className="workout-content">

                <div className="workout-exercises section">
                    <div className="exercises-header subtitle full-width"><h3>Exercises</h3><p>{exercises.findIndex(ex=>ex.id===currentExercise) +1}/{exercises.length}</p></div>
                    <div className="workout-exercises-container">
                        {exercises?.map((exercise, index) => (
                            <div
                                className={`exercise-body ${currentExercise === exercise.id ? 'selected-exercise' : ''}`}
                                key={index + 'exercise'}
                                onClick={() => setCurrentExercise(exercise.id)}
                            >
                                <b>{index + 1}</b>
                                <p>{exercise.name}</p>
                                <div className="sets">{exercise.sets} sets</div>
                                <input type="checkbox"></input>
                            </div>
                        ))}
                    </div>
                    <div className="current-exercise-top">
                        <img
                            className="small-icon left-arrow"
                            src={IconLibrary.Arrow}
                            onClick={prevExercise}
                            alt="Previous Exercise"
                        />
                        <button>Skip</button>
                        <button>Complete</button>
                        <img
                            className="small-icon"
                            src={IconLibrary.Arrow}
                            onClick={nextExercise}
                            alt="Next Exercise"
                        />
                    </div>
                </div>
                <div className="current-exercise section">
                    <div className="current-exercise-header">
                        <h3>{exercises?.find((ex) => ex.id === currentExercise)?.name}</h3>
                        <p>Set {currentSet}/{exercises?.find((ex) => ex.id === currentExercise)?.sets}</p>
                    </div>
                    <div className="current-exercise-fields">
                        {exercises?.find((ex) => ex.id === currentExercise)?.fields?.map((field)=>(
                            <div className="field" key={field.id}>
                                <p className="field-name">{field.name}</p>
                                <div className="field-input">
                                    <button><img src={IconLibrary.Minus} className="small-icon" alt=""></img></button>
                                    <p>{field.value || 0}/{field.targetValue || 0}</p>
                                    <button><img src={IconLibrary.Plus} className="small-icon" alt=""></img></button>
                                </div>
                                <input type="checkbox" checked={field.isCompleted} className="field-checkbox" onChange={()=>handleCompleteField(field.id)}></input>
                            </div>
                        ))}
                    </div>
                    <div className="current-exercise-buttons">
                        <button>Skip Set</button>
                        <button>Add Set</button>
                        <button>Finish Set</button>
                    </div>
                    
                </div>
            </div> 
        </div>
    );
};

export default Workout;
