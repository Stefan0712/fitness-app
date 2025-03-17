import { formatTime, getFullHour } from "../../../helpers";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { addLog } from "../../../store/userSlice.ts";
import { IconLibrary } from "../../../IconLibrary";
import {exercises as databaseExercises} from '../../../database';

import styles from './Workout.module.css';
 




const Workout = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showExercises, setShowExercises] = useState(false);
    

    const workoutData = useSelector((state) => state.user.workouts.find((item) => item.id === id));
    const libraryExercises = useSelector((state) => state.user.exercises);
    const [exercises, setExercises] = useState([]);
    const [currentExercise, setCurrentExercise] = useState(null); 
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
    },[exercises]);
    // useEffect(() => {
    //     exercises.forEach((exercise) => {
    //         exercise.sets.forEach((set, setNo) => {
    //             if (!set.isCompleted && set.fields.every(f => f.isCompleted)) {
    //                 toggleSetCompletion(exercise.id, setNo);
    //             }
    //         });
    //     });
    // }, [exercises]);
    useEffect(()=>{
        console.log(workoutData)
        console.log(exercises)
    },workoutData, exercises)
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
                        return { 
                            ...field, 
                            isCompleted: !field.isCompleted, 
                            value: !field.isCompleted && (!field.value || field.value === 0) 
                            ? parseInt(field.target, 10)
                            : field.value  
                        }
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

    const handleChangeFieldValue = (exerciseId, setNo, fieldId, changeAmount) => {
        const updatedExercises = exercises.map((ex) => {
            if (ex.id === exerciseId) {
                const updatedSets = [...ex.sets];
                const updatedSet = { ...updatedSets[setNo] };
    
                const updatedFields = updatedSet.fields.map((field) => {
                    if (field.id === fieldId) {
                        const currentValue = field.value === null ? 0 : field.value;
                        const newValue = Math.max(0, currentValue + changeAmount); // Ensure value doesn't go below 0
                        const shouldComplete = newValue >= field.target;
                        const shouldDecomplete = newValue < field.target;
                        
                        return {
                            ...field,
                            value: newValue,
                            isCompleted: shouldComplete ? true : shouldDecomplete ? false : field.isCompleted,
                        };
                    }
                    return field;
                });
    
                updatedSet.fields = updatedFields;
                updatedSets[setNo] = updatedSet;
    
                // Only update isCompleted based on set completion status, not on each field.
                const allFieldsCompleted = updatedFields.every((f) => f.isCompleted);
                updatedSet.isCompleted = allFieldsCompleted;
    
                return { ...ex, sets: updatedSets };
            }
            return ex; // If not the correct exercise, return as is
        });
    
        setExercises(updatedExercises);
    };
    
    
    const completeAllFields = (exerciseId, setIndex) => {
        setExercises((prevExercises) => {
          console.log("Before Update:", prevExercises);
      
          const updatedExercises = prevExercises.map((exercise) =>
            exercise.id === exerciseId
              ? {
                  ...exercise,
                  sets: exercise.sets.map((set, index) => {
                    if (index === setIndex) {
                      return {
                        ...set,
                        fields: set.fields.map((field) => ({
                          ...field,
                          isCompleted: true,
                        })),
                        isCompleted: true,
                      };
                    }
                    return set;
                  }),
                }
              : exercise
          );
      //asd
          console.log("After Update:", updatedExercises);
      
          return updatedExercises;
        });
      };
      
      
      
      
      
    
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
    
    const toggleSetCompletion = (exerciseId, setNo, value) => {
        completeAllFields(exerciseId, setNo);
        const updatedExercises = exercises.map((exercise) => {
            if (exercise.id === exerciseId) {
                // Find the set by index (setNo)
                const sets = [...exercise.sets]; // Create a shallow copy of the sets
                const updatedSets = sets.map((set, index) => {
                    if (index === setNo) {
                        return { ...set, isCompleted: value, isSkipped: false }; // Toggle isCompleted for that specific set and reset the isSkipped value
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
    
    const handleCompleteExercise = (exerciseId) =>{
        const updatedExercises = exercises.map((ex) => {
            if (ex.id === exerciseId) {
                
                return { ...ex, isCompleted: !ex.isCompleted}; //toggle is completed for this exercise
            }
            return ex; // If not the correct exercise, return as is
        });
    
        setExercises(updatedExercises);
    }
    const handleChangeCurrentExercise = (id) =>{
        setCurrentSet(0);
        setCurrentExercise(id)
    }
// Remove the +/- buttons from current exercise and show just a text input and a checkbox for the entire exercise
// Make it so if the current selected exercise is selected, then move to the next one that is not completed
// Auto finish the workout when all exercises are finished


// TODO: Add an option to add an exercise to the currently running exercise. Let the user have the option to
// TODO: use existing ones or create a quick one on the go


    return (
        <div className={`${styles["workout-page"]} page`}>
            <div className={styles['page-header']}>
                <div className={styles.timer}>{formatTime(seconds)}</div>
                <h2>{workoutData.name}</h2>
                <button onClick={()=>finishWorkout()} className={styles['finish-button']}>Finish</button>
            </div>
            <div className={styles.content}>

                {showExercises ? (
                    <div className={styles.exercises }>
                    <div className={styles['exercises-header']}>
                        <h3>Exercises</h3>
                        <button className={styles['hide-exercises']}>
                            <img src={IconLibrary.Add} className="small-icon" alt="add exercise"></img>
                        </button>
                    </div>
                    <div className={styles["exercises-container"]}>
                        {exercises?.map((exercise, index) => (
                            <div
                                className={`${styles["exercise-body"]} ${currentExercise === exercise.id ? styles['selected-exercise'] : ''}`}
                                key={index + 'exercise'}
                                onClick={() => handleChangeCurrentExercise(exercise.id)}
                            >
                                <p>{exercise.name}</p>
                                <input type="checkbox" style={{height: '30px', width: '30px'}} onChange={()=>handleCompleteExercise(exercise.id)} checked={exercises?.find((ex) => ex.id === exercise.id)?.isCompleted}></input>
                            </div>
                        ))}
                    </div>  
                </div>
                ) : null}
            <div className={styles['current-exercise']}>
                    <div className={styles["current-exercise-header"]}>
                        <h3>{exercises?.find((ex) => ex.id === currentExercise)?.name}</h3>
                        <button type="button" className={styles['new-set-button']} onClick={()=>handleAddSet(currentExercise, currentSet)}>
                            <img className="small-icon" src={IconLibrary.Add} alt="add-set"></img>
                        </button>
                    </div>
                    <div className={styles['sets-container']}>
                        {exercises?.find((ex) => ex.id === currentExercise)?.sets.map((item, index)=>(
                            <div className={`${styles.set} ${currentSet === index ? styles['current-set'] : ''} ${item.isCompleted ? styles['completed-set'] : ''}`} onClick={()=>setCurrentSet(index)} key={'set-'+index}>
                                <div className={styles['set-top']}>
                                    <p className={styles['set-title']}>{`Set ${index+1}`}</p>
                                    <input type="checkbox" className={styles['set-checkbox']} onChange={()=>toggleSetCompletion(currentExercise, index, !item.isCompleted)} checked={item.isCompleted}></input>
                                </div>
                                <div className={styles['set-fields']}>
                                    {item?.fields?.map((field)=>(
                                        <div className={styles["field"]} key={field.id}>
                                            <p className={styles["field-name"]}>{field.name}</p>
                                            <div className={styles["field-input"]}>
                                                <button onClick={()=>handleChangeFieldValue(currentExercise, index, field.id, -1)}><img src={IconLibrary.Minus} className="small-icon" alt="" ></img></button>
                                                <p>{field.value || 0}/{field.target || 0}</p>
                                                <button onClick={()=>handleChangeFieldValue(currentExercise, index, field.id, 1)}><img src={IconLibrary.Plus} className="small-icon" alt="" ></img></button>
                                            </div>
                                            <input type="checkbox" checked={field.isCompleted} className={styles["field-checkbox"]} onChange={()=>handleCompleteField(currentExercise, index, field.id)}></input>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        
                    </div>
                </div>
            </div> 
            <div className={styles['buttons-container']}>
                <button className={styles['navigation-button']} onClick={prevExercise}><img className="small-icon" src={IconLibrary.BackArrow} alt="previous exercise"></img></button>
                <button onClick={()=>console.log("Save progress was pressed")}>Save Progress</button>
                <button onClick={()=>setShowExercises(showExercises=>!showExercises)}>{showExercises ? 'Hide Exercises' : 'Show Exercises'}</button>
                <button className={styles['navigation-button']} onClick={nextExercise}><img className="small-icon" src={IconLibrary.Arrow} alt="next exercise"></img></button>
            </div>
        </div>
    );
};

export default Workout;
