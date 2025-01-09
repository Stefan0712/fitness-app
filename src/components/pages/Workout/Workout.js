import { formatTime, getDateForHeader, getFullHour } from "../../../helpers";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { addLog } from "../../../store/userSlice";
import { IconLibrary } from "../../../IconLibrary";
import {exercises as databaseExercises} from '../../../database';

import styles from './Workout.module.css';
 


//TODO: Make it work. Try a new design that is more clean. Maybe hide the exercise list and let the user press a button to see it or make it colapsed by default.






const Workout = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [extendExercises, setExtendExercises] = useState(false);


    const workoutData = useSelector((state) => state.user.workouts.find((item) => item.id === id));
    const libraryExercises = useSelector((state) => state.user.exercises);
    const [exercises, setExercises] = useState([]);
    const [currentExercise, setCurrentExercise] = useState(null); 
    const [duration, setDuration] = useState("00:00:00");
    const [seconds, setSeconds] = useState(0);
    const [currentSet, setCurrentSet] = useState(0);

    useEffect(() => {
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
      
            // Add a completedSet property to the exercise object to keep track of how many sets were completed if not existent already
            if (exercise) {
              if (!exercise.completedSets) {
                exercise.completedSets = 0;
              }
      
              // Transform sets property from number to an array to make it easier to track progress of that exercise
              if (typeof exercise.sets === "number" || typeof exercise.sets === 'string') {
                const setsArray = [];
                for (let i = 0; i < exercise.sets; i++) {
                  setsArray.push({
                    order: i + 1,
                    fields: exercise.fields ? JSON.parse(JSON.stringify(exercise.fields)) : [], // Deep copy of fields array
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
        //checks if the current exercise index is not bigger than the last index of the exercises array
        const selectedExerciseIndex = exercises.findIndex((obj) => obj.id === currentExercise);
        if (selectedExerciseIndex < exercises.length - 1) {
            setCurrentExercise(exercises[selectedExerciseIndex + 1].id);
        }
    };
    //finish the workout by saving it as a log and redirrecting the user to he activity page
    const finishWorkout = () =>{
        //create the log object that will be saved to the redux store
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



    const handleChangeFieldValue = (exerciseId, setNo, fieldId, changeAmount) => {
        // Create a deep copy of exercises
        const updatedExercises = exercises.map((ex) => {
            // Find the exercise by id
            if (ex.id === exerciseId) {
                // Find the set by index (setNo)
                const updatedSets = [...ex.sets]; // Create a shallow copy of the sets
                const updatedSet = { ...updatedSets[setNo] }; // Copy the specific set
    
                // Find the field by id and update the value
                const updatedFields = updatedSet.fields.map((field) => {
                    if (field.id === fieldId) {
                        // If value is null, treat it as 0
                        const currentValue = field.value === null ? 0 : field.value;
    
                        // Update the value by adding the changeAmount, ensuring it doesn't go below 0
                        const newValue = Math.max(0, currentValue + changeAmount); // Ensure value doesn't go below 0
    
                        // Check if the new value passes the targetValue (either above or below)
                        if (newValue >= field.targetValue && !field.isCompleted) {
                            handleCompleteField(exerciseId, setNo, fieldId);
                        } else if (newValue < field.targetValue && field.isCompleted) {
                            handleCompleteField(exerciseId, setNo, fieldId); // Auto-decomplete when going under target
                        }
    
                        return { ...field, value: newValue }; // Update the value of the field
                    }
                    return field;
                });
    
                // Update the set's fields
                updatedSet.fields = updatedFields;
                updatedSets[setNo] = updatedSet; // Update the specific set
    
                return { ...ex, sets: updatedSets };
            }
            return ex; 
        });
        setExercises(updatedExercises);
    };
    
    const completeAllFields = (exerciseId, setNo) => {
        setExercises((prevExercises) => {
            return prevExercises.map((ex) => {
                if (ex.id === exerciseId) {
                    // Copy the sets
                    const updatedSets = [...ex.sets];
                    const updatedSet = { ...updatedSets[setNo] };
    
                    // Toggle all fields in the set
                    const updatedFields = updatedSet.fields.map((field) => ({
                        ...field,
                        isCompleted: true, // Mark all fields as completed
                    }));
    
                    // Update the set's fields and completion status
                    updatedSet.fields = updatedFields;
                    updatedSet.isCompleted = true; // All fields are completed, so the set is completed
    
                    // Update the sets array
                    updatedSets[setNo] = updatedSet;
    
                    // Check if all sets are completed to update the exercise's completion status
                    const allSetsCompleted = updatedSets.every((set) => set.isCompleted);
    
                    return { ...ex, sets: updatedSets, isCompleted: allSetsCompleted };
                }
                return ex;
            });
        });
    };
    

    const handleCompleteField = (exerciseId, setNo, fieldId) => {
        // Create a deep copy of exercises
        const updatedExercises = exercises.map((ex) => {
            // Find the exercise by id
            if (ex.id === exerciseId) {
                // Find the set by index (setNo)
                const updatedSets = [...ex.sets]; // Create a shallow copy of the sets
                const updatedSet = { ...updatedSets[setNo] }; // Copy the specific set
    
                // Find the field by id and toggle the isCompleted value
                const updatedFields = updatedSet.fields.map((field) => {
                    if (field.id === fieldId) {
                        return { ...field, isCompleted: !field.isCompleted }; 
                    }
                    return field;
                });
                
                // Update the set's fields
                const allFieldsCompleted = updatedFields.every((f) => f.isCompleted);

                updatedSet.fields = updatedFields;
                updatedSet.isCompleted = allFieldsCompleted;
                updatedSets[setNo] = updatedSet; // Update the specific set
                
                return { ...ex, sets: updatedSets };
            }
            return ex; // If not the correct exercise, return as is
        });
    
        setExercises(updatedExercises);
    };
    
    


    const handleSkipSet = (exerciseId, setNo) =>{
        const updatedExercises = exercises.map((ex) => {
            if (ex.id === exerciseId) {
                // Find the set by index (setNo)
                const sets = [...ex.sets]; // Create a shallow copy of the sets
                const updatedSets = sets.map((set, index)=>{
                    if(index === setNo){
                        return { ...set, isSkipped: !set.isSkipped, isCompleted: false } //toggle isSkipped for that specific set and make sure isCompleted is false
                    }else{
                        return set
                    }
                })
                

                return { ...ex, sets: updatedSets };
            }
            return ex; // If not the correct exercise, return as is
        });
    
        setExercises(updatedExercises);
    }

    const handleAddSet = (exerciseId) =>{
        const updatedExercises = exercises.map((ex) => {
            if (ex.id === exerciseId) {
                //creates a new set object and appends it to the current exercise sets array
                return { ...ex, sets: [...ex.sets, {
                    order: ex.sets.length,
                    fields: ex.fields ? JSON.parse(JSON.stringify(ex.fields)) : [], // Deep copy of fields array
                    isCompleted: false,
                    isSkipped: false,
                  }],  };
            }
            return ex; // If not the correct exercise, return as is
        });
    
        setExercises(updatedExercises);
    }
    
    const handleCompleteSet = (exerciseId, setNo) => {
        completeAllFields(exerciseId, setNo)
    
        const updatedExercises = exercises.map((exercise) => {
            if (exercise.id === exerciseId) {
                // Find the set by index (setNo)
                const sets = [...exercise.sets]; // Create a shallow copy of the sets
                const updatedSets = sets.map((set, index) => {
                    if (index === setNo) {
                        return { ...set, isCompleted: !set.isCompleted, isSkipped: false }; // Toggle isCompleted for that specific set and reset the isSkipped value
                    } else {
                        return set;
                    }
                });

                // Check if all sets are completed and update the exercise's isCompleted
                const allSetsCompleted = updatedSets.every((set) => set.isCompleted);
              
                return { ...exercise, sets: updatedSets, isCompleted: allSetsCompleted}; // Set exercise isCompleted to true if all sets are completed
            }
            return exercise; // If not the correct exercise, return as is
        });
        
        setExercises(updatedExercises);
        
    };
    

    const handleSkipExercise = (exerciseId) =>{

    }
    
    const handleCompleteExercise = (exerciseId) =>{
        const updatedExercises = exercises.map((ex) => {
            if (ex.id === exerciseId) {
                
                return { ...ex, isCompleted: !ex.isCompleted}; //toggle is completed for this exercise
            }
            return ex; // If not the correct exercise, return as is
        });
    
        setExercises(updatedExercises);
    }


    const handlePrevSet = () => {
        if (currentSet > 0) {
            setCurrentSet(prevSet => prevSet - 1);
        }
    };
    
    const handleNextSet = () => {
        const setsLength = exercises?.find((ex) => ex.id === currentExercise)?.sets.length;
        if (currentSet < setsLength - 1) {
            setCurrentSet(prevSet => prevSet + 1); 
        }
    };
    const handleChangeCurrentExercise = (id) =>{
        setCurrentSet(0);
        setCurrentExercise(id)
    }

    return (
        <div className={`${styles["workout-page"]} page`}>
            <div className="header">
                <div className="date">{getDateForHeader()}</div>
                <h2>{workoutData.name}</h2>
                
            </div>
            <div className={styles["workout-top"]}>
                <div className="timer">{formatTime(seconds)}</div>
               
                <button onClick={()=>finishWorkout()} className="medium-button orange-button">Finish</button>
            </div>
            

            <div className={styles["workout-content"]}>

                <div className={`${styles["workout-exercises"]} section` }>
                <div className={` ${styles['exercises-header']} subtitle full-width`} onClick={()=>setExtendExercises(extendExercises=>!extendExercises)}>
                    <h3>Exercises</h3>
                    <p>{exercises.findIndex(ex=>ex.id===currentExercise) +1}/{exercises.length}</p>
                    <img src={IconLibrary.Arrow} style={{transform: extendExercises ? 'rotateZ(90deg)' : 'rotateZ(180deg)', transition: 'transform 0.1s'}} className={'small-icon'} alt=""></img>
                </div>
                    <div className={`${styles["workout-exercises-container"]} ${extendExercises ? styles['extend-exercises'] : ''}`}>
                        {exercises?.map((exercise, index) => (
                            <div
                                className={`${styles["exercise-body"]} ${currentExercise === exercise.id ? styles['selected-exercise'] : ''}`}
                                key={index + 'exercise'}
                                onClick={() => handleChangeCurrentExercise(exercise.id)}
                            >
                                <b>{index + 1}</b>
                                <p>{exercise.name}</p>
                                <div className={styles["sets"]}>{exercise.sets.length} sets</div>
                                <input type="checkbox" style={{height: '30px', width: '30px'}} onClick={()=>handleCompleteExercise(currentExercise)} checked={exercises?.find((ex) => ex.id === exercise.id)?.isCompleted}></input>
                            </div>
                        ))}
                    </div>
                    <div className={`${styles["current-exercise-controls"]}`}>
                        <img
                            className={`${['left-arrow']} small-icon`}
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
                <div className={`${styles["current-exercise"]} section`}>
                    <div className={styles["current-exercise-header"]}>
                        <h3>{exercises?.find((ex) => ex.id === currentExercise)?.name}</h3>
                        <p>Set {currentSet + 1}/{exercises?.find((ex) => ex.id === currentExercise)?.sets.length}</p>
                    </div>
                    <div className={styles["current-exercise-fields"]}>
                        {exercises?.find((ex) => ex.id === currentExercise)?.sets[currentSet].fields?.map((field)=>(
                            <div className={styles["field"]} key={field.id}>
                                <p className={styles["field-name"]}>{field.name}</p>
                                <div className={styles["field-input"]}>
                                    <button onClick={()=>handleChangeFieldValue(currentExercise, currentSet, field.id, -1)}><img src={IconLibrary.Minus} className="small-icon" alt="" ></img></button>
                                    <p>{field.value || 0}/{field.targetValue || 0}</p>
                                    <button onClick={()=>handleChangeFieldValue(currentExercise, currentSet, field.id, 1)}><img src={IconLibrary.Plus} className="small-icon" alt="" ></img></button>
                                </div>
                                <input type="checkbox" checked={field.isCompleted} className={styles["field-checkbox"]} onChange={()=>handleCompleteField(currentExercise, currentSet, field.id)}></input>
                            </div>
                        ))}
                    </div>
                    <div className={styles["current-exercise-buttons"]}>
                        <button type="button" onClick={()=>handleSkipSet(currentExercise, currentSet)}>Skip Set</button>
                        <button type="button" onClick={()=>handleAddSet(currentExercise, currentSet)}>Add Set</button>
                        <button type="button" onClick={()=>handleCompleteSet(currentExercise, currentSet)}>Finish Set</button>
                    </div>
                    <div className={styles["sets-controls"]}>
                        <img onClick={handlePrevSet} src={IconLibrary.Arrow} style={{transform: 'rotateY(180deg)'}} className={styles["navigation-button" ]} alt="previous set"></img>
                        <div className={styles["sets-icons"]}>
                            {exercises?.find((ex) => ex.id === currentExercise)?.sets?.map((field, index)=>(<img className={`${styles["field-icon"]} ${currentSet === index ? styles['selected-set-icon'] : null}`} key={index+'field-icon'} src={field.isCompleted ? IconLibrary.CircleCheckmark : field.isSkipped ? IconLibrary.Skip : IconLibrary.Circle} alt="" />))}
                        </div>
                        <img onClick={handleNextSet} src={IconLibrary.Arrow} className={styles["navigation-button"]} alt="next set"></img>
                    </div>
                    {/* //TODO Change the Finish Set button to change text based on the set status */}
                </div>
            </div> 
        </div>
    );
};

export default Workout;
