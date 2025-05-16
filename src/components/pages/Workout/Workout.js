import { formatTime, getFullHour } from "../../../helpers";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { addLog } from "../../../store/userSlice.ts";
import { IconLibrary } from "../../../IconLibrary";
import {exercises as databaseExercises} from '../../../database';

import styles from './Workout.module.css';
import ExercisePicker from "../../common/ExercisePicker/ExercisePicker.tsx";
 




const Workout = () => {
    const { id, snapshotId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showExercises, setShowExercises] = useState(false);
    const [showExercisePicker, setShowExercisePicker] = useState(false);
    
    const workouts = useSelector((state) => state.user.workouts)
    const [workoutData, setWorkoutData] = useState(workouts.find((item) => item.id === id));
    const libraryExercises = useSelector((state) => state.user.exercises);
    const [exercises, setExercises] = useState([]);
    const [currentExercise, setCurrentExercise] = useState(null); 
    const [seconds, setSeconds] = useState(0);
    const [currentSet, setCurrentSet] = useState(0);

    const [extendedMode, setExtendedMode] = useState(true);





    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);
    
        return () => clearInterval(timer);
    }, []);





    useEffect(() => {
        if(!snapshotId){
            setExercises(getExercises());
        }else if(snapshotId){
            const snapshots = JSON.parse(localStorage.getItem("snapshots")) || {};
            const snapshot = snapshots?.workouts?.find(item=>item.snapshotId===snapshotId);
            if(snapshot){
                const workout = workouts.find(item=>item.id === snapshot.data.workoutId);
                const newWorkoutData = {...workout, exercises: snapshot.data.exercises};
                setWorkoutData(newWorkoutData);
                setExercises(snapshot.data.exercises)
                setSeconds(snapshot.duration)
                setSeconds(snapshot.duration);
            }else{
                console.log("Snapshot not found")
            }
        }
    }, []);
    useEffect(()=>{
        if(!currentExercise && exercises && exercises.length > 0){
            setCurrentExercise(exercises[0].id);
        }
        if(workoutData){
            saveProgress();
        }
    },[exercises]);







    const getExercises = () => {
        // Make deep copies of all exercises
        return workoutData.exercises
          .map(id => {
            let exercise = null;
            // Check the source and make a deep copy of the object
            const exIndex = libraryExercises.findIndex(item=>item.id === id);
            exercise = JSON.parse(
            JSON.stringify(libraryExercises[exIndex])
            );
            
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
              console.error(`Exercise with id "${id}" not found`);
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
    const addExercise = (exercise) =>{
        setExercises(exercises=>[...exercises, exercise]);
        setShowExercisePicker(false);
    }
    //finish the workout by saving it as a log and redirrecting the user to he activity page
    const finishWorkout = () =>{
        //create the log object that will be saved to the redux store
        const log = {
            id: uuidv4(),
            icon: '/icons/workout.svg',
            type: 'workout',
            name: workoutData.name,
            data: {
                duration: formatTime(seconds),
                finishedAt: getFullHour(),
                workoutId: workoutData.id,
                isCompleted: true,
                targetGroup: workoutData.targetGroups,
                name: workoutData.name,
                difficulty: workoutData.difficulty,
                description: workoutData.description,
                exercises: exercises
            }
        }
        dispatch(addLog(log));
        const snapshots = JSON.parse(localStorage.getItem("snapshots")) || {};
        snapshots.workouts = snapshots.workouts.filter(item => item.snapshotId !== snapshotId);
        localStorage.setItem('snapshots', JSON.stringify(snapshots));  
        navigate('/logs');

    }
    const getProgress = () =>{
        const completedExercises = exercises.filter(item=>item.isCompleted).length;
        const progress = (completedExercises / exercises.length) * 100;
        return parseFloat(progress.toFixed(2));
    }
    const saveProgress = () =>{
        const timestamp = new Date().toISOString();
        const snapshot = {
            snapshotId: snapshotId || uuidv4(),
            timestamp,
            type: 'workout',
            name: workoutData.name,
            progress: getProgress(),
            duration: seconds,
            data:{
                workoutId: workoutData.id,
                exercises: exercises
            },
        }
        let snapshots = JSON.parse(localStorage.getItem('snapshots')) || { exercises: [], workouts: [] };
    
        const existingIndex = snapshots.workouts.findIndex(snap => snap.data.workoutId === workoutData.id);

        // If an existing snapshot for the exercise is found, replace it
        if (existingIndex !== -1) {
            snapshots.workouts[existingIndex] = snapshot;
        } else {
            // If no snapshot exists, just add the new snapshot
            snapshots.workouts.push(snapshot);
        }

        // Limit to 3 exercise snapshots
        if (snapshots.workouts.length > 3) {
            snapshots.workouts.shift(); // Remove the oldest snapshot
        }

        // Save the updated snapshots back to localStorage
        localStorage.setItem('snapshots', JSON.stringify(snapshots));

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
                            value: !field.isCompleted && (!field.value || field.value === 0) ? parseInt(field.target, 10) : 0
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
                const isSetCompleted = updatedSet.fields.every(item=>item.isCompleted === true);
                console.log(updatedSet.fields, isSetCompleted)
                updatedSets[setNo] = {...updatedSet, isCompleted: isSetCompleted};
        
                return { ...ex, sets: updatedSets };
            }
            return ex; // If not the correct exercise, return as is
        });
    
        setExercises(updatedExercises);
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
        // completeAllFields(exerciseId, setNo);
        const updatedExercises = exercises.map((exercise) => {
            if (exercise.id === exerciseId) {
                // Find the set by index (setNo)
                const sets = [...exercise.sets]; // Create a shallow copy of the sets
                const updatedSets = sets.map((set, index) => {
                    if (index === setNo) {
                        const updatedFields = set.fields.map(item=> ({...item, isCompleted: !set.isCompleted ? true : false, value:  !set.isCompleted ? item.target : 0}))
                        return { ...set, isCompleted: value, fields: updatedFields}; // Toggle isCompleted for that specific set and reset the isSkipped value
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
    
// Make it so if the current selected exercise is selected, then move to the next one that is not completed
// Auto finish the workout when all exercises are finished




    if(workoutData){

        return (
            <div className={`${styles["workout-page"]} page`}>
                <div className={styles['page-header']}>
                    <div className={styles.timer}>{formatTime(seconds)}</div>
                    <h2>{workoutData.name}</h2>
                    <button onClick={()=>finishWorkout()} className={styles['finish-button']}>Finish</button>
                </div>
                <div className={styles.content}>
                    {showExercisePicker ? <ExercisePicker closeModal={()=>setShowExercisePicker(false)} currentExercises={exercises} addExercise={addExercise} /> : null}
                    {showExercises ? (
                        <div className={styles.exercises }>
                        <div className={styles['exercises-header']}>
                            <h3>Exercises</h3>
                            <button className={styles['hide-exercises']}>
                                <img src={IconLibrary.Add} onClick={()=>setShowExercisePicker(true)} className="small-icon" alt="add exercise"></img>
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
                                <div className={`${styles.set} ${extendedMode ? '' : styles['simplified-set']} ${currentSet === index ? styles['current-set'] : ''} ${item.isCompleted ? styles['completed-set'] : ''}`} onClick={()=>setCurrentSet(index)} key={'set-'+index}>
                                    <div className={styles['set-top']}>
                                        <p className={styles['set-title']}>{`Set ${index+1}`}</p>
                                        <input type="checkbox" className={styles['set-checkbox']} onChange={()=>toggleSetCompletion(currentExercise, index, !item.isCompleted)} checked={item.isCompleted}></input>
                                    </div>
                                    {extendedMode ? <div className={styles['set-fields']}>
                                        {item?.fields?.map((field)=>(
                                            <div className={styles["field"]} key={field.id}>
                                                <p className={styles["field-name"]}>{field.name}</p>
                                                <div className={styles["field-input"]}>
                                                    <button onClick={()=>handleChangeFieldValue(currentExercise, index, field.id, -1)}><img src={IconLibrary.Minus} className="small-icon" alt="" ></img></button>
                                                    <p>{field.value || 0}/{field.target|| field.targetValue || 0}</p>
                                                    <button onClick={()=>handleChangeFieldValue(currentExercise, index, field.id, 1)}><img src={IconLibrary.Plus} className="small-icon" alt="" ></img></button>
                                                </div>
                                                <input type="checkbox" checked={field.isCompleted} className={styles["field-checkbox"]} onChange={()=>handleCompleteField(currentExercise, index, field.id)}></input>
                                            </div>
                                        ))}
                                    </div> : null}
                                </div>
                            ))}
                            
                        </div>
                    </div>
                </div> 
                <div className={styles['buttons-container']}>
                    <button className={styles['navigation-button']} onClick={prevExercise}><img className="small-icon" src={IconLibrary.BackArrow} alt="previous exercise"></img></button>
                    <button onClick={()=>setExtendedMode(extendedMode=>!extendedMode)}>{extendedMode ? 'Minimize Sets' : 'Extend Sets'}</button>
                    <button onClick={()=>setShowExercises(showExercises=>!showExercises)}>{showExercises ? 'Hide Exercises' : 'Show Exercises'}</button>
                    <button className={styles['navigation-button']} onClick={nextExercise}><img className="small-icon" src={IconLibrary.BackArrow} style={{transform: 'rotateZ(180deg)'}} alt="next exercise"></img></button>
                </div>
            </div>
        );
    }else{
        return(
            <div className="create-workout-page page">
                <div className='header'>
                    <h2>Loading workout</h2>
                </div>
                <div className="loading">
                    <img className="loading-icon" src={IconLibrary.Loading} alt="loading"></img>
                </div>
            </div>
        )
    }
};

export default Workout;
