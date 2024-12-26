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
import ContextualMenu from "./common/ContextualMenu";
import { IconLibrary } from "../../IconLibrary";

const Workout = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const workoutData = useSelector((state) => state.user.workouts.find((item) => item.id === id));
    const exercises = useSelector((state) => state.user.exercises.filter((ex) => workoutData.exercises.includes(ex.id)));
    const [currentExercise, setCurrentExercise] = useState(exercises[0]?.id); // Ensure it's set to the first exercise if available
    const [duration, setDuration] = useState("00:00:00");
    const [seconds, setSeconds] = useState(0);
    const [currentSet, setCurrentSet] = useState(1);
    console.log(workoutData);
    console.log(exercises);

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);
    
        return () => clearInterval(timer);
    }, []);


   
    


    
    

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
    return (
        <div className="workout-page page">
            <div className="header">
                <div className="date">{getDateForHeader()}</div>
                <h2>{workoutData.name}</h2>
                
            </div>
            <div className="workout-top">
                <div className="timer">{formatTime(seconds)}</div>
                <div className="workout-progress">
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
                            src={arrowIcon}
                            onClick={prevExercise}
                            alt="Previous Exercise"
                        />
                        <button>Skip</button>
                        <button>Complete</button>
                        <img
                            className="small-icon"
                            src={arrowIcon}
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
                            <div className="field">
                                <p className="field-name">{field.name}</p>
                                <div className="field-input">
                                    <button><img src={IconLibrary.MinusIcon} className="small-icon"></img></button>
                                    <p>0/{field.target}</p>
                                    <button><img src={IconLibrary.AddIcon} className="small-icon"></img></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="current-exercise-buttons">
                        <button>Skip</button>
                        <button>Add Set</button>
                        <button>Complete</button>
                    </div>
                    
                </div>
            </div> 
        </div>
    );
};

export default Workout;
