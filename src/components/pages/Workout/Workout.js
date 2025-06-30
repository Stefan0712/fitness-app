import { formatTime, getFullHour } from "../../../helpers";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { IconLibrary } from "../../../IconLibrary";

import styles from './Workout.module.css';
import ExercisePicker from "../../common/ExercisePicker/ExercisePicker.tsx";
import { getItemById, saveItem } from "../../../db.js";
import { useUI } from "../../../context/UIContext.jsx";
 




const Workout = () => {
    const { id, snapshotId } = useParams();
    const navigate = useNavigate();
    const {showMessage} = useUI();

    const [showInstructions, setShowInstructions] = useState(false);
    const [showExercises, setShowExercises] = useState(false);
    const [showExercisePicker, setShowExercisePicker] = useState(false);
    
    const [workoutData, setWorkoutData] = useState(null);
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


    const getWorkoutData = async () =>{
        const response = await getItemById('workouts', id);
        if(response){
            setWorkoutData(response);
            console.log('WorkoutData',response)
        }else{
            showMessage("Failed to get workout data", 'error');
        }
    }
    useEffect(()=>{
        if(!snapshotId){
            getWorkoutData();
        }
    },[])

    useEffect(() => {
        if(snapshotId){
            const snapshots = JSON.parse(localStorage.getItem("snapshots")) || {};
            const snapshot = snapshots.workout;
            if(snapshot){
                const newWorkoutData = {...workoutData, exercises: snapshot.data.exercises};
                setWorkoutData(newWorkoutData);
                setExercises(snapshot.data.exercises)
                setSeconds(snapshot.duration)
                setSeconds(snapshot.duration);
                showMessage("Workout restored successfully", 'success');
            }else{
                showMessage("Snapshot not found","error")
            }
        }
    }, []);
    useEffect(()=>{
        if(!snapshotId && workoutData){
            setExercises(getExercises());
        } 
    },[workoutData]);
    useEffect(()=>{
        if(!currentExercise && exercises && exercises.length > 0){
            setCurrentExercise(exercises[0]._id);
        }
        if(workoutData){
            saveProgress();
        }
    },[exercises]);
    //TODO: Fix completed exercise now showing in exercise list, update the ui of Add Exercise, add rest to exercises,
    const getExercises = () => {
        const exercises = [];
        if(workoutData && workoutData.phases?.length > 0){
            workoutData.phases.map(phase=>{
                phase.exercises && phase.exercises.length > 0 ? phase.exercises.map(exercise=>{
                    const newSets = [];
                    if(exercise.sets === 0){
                        newSets.push({
                           order: exercises.length,
                            fields: [...exercise.fields, {_id: uuidv4(), name:'Rest', unit:'sec',value: 0, target:  exercise?.rest, isCompleted: false}] ?? [],
                            isCompleted: false,
                            isSkipped: false,
                        });
                    }else{
                        for (let i = 0; i < exercise.sets; i++) {
                            newSets.push({
                            order: exercises.length,
                                fields: [...exercise.fields, {_id: uuidv4(), name:'Rest', unit:'sec',value: 0, target:  exercise?.rest, isCompleted: false}] ?? [],
                                isCompleted: false,
                                isSkipped: false,
                            });
                        }
                    }
                    
                    const ex = {
                        ...exercise,
                        initialId: exercise._id,
                        _id: uuidv4(),
                        phaseName: phase.name,
                        sets: newSets
                    };
                    exercises.push(ex);
                }
            ) : console.log("There are no exercises in phase ", phase.name)})
        }
        console.log(exercises)
        return exercises;
    };
      


    // Functions to move through exercises
    const prevExercise = () => {
        const selectedExerciseIndex = exercises.findIndex((obj) => obj._id === currentExercise);
        if (selectedExerciseIndex > 0) {
            setCurrentExercise(exercises[selectedExerciseIndex - 1]._id);
        }
    };

    const nextExercise = () => {
        //checks if the current exercise index is not bigger than the last index of the exercises array
        const selectedExerciseIndex = exercises.findIndex((obj) => obj._id === currentExercise);
        if (selectedExerciseIndex < exercises.length - 1) {
            setCurrentExercise(exercises[selectedExerciseIndex + 1]._id);
        }
    };
    const addExercise = (exercise) =>{
        setExercises(exercises=>[...exercises, exercise]);
        setShowExercisePicker(false);
        showMessage("Exercise added", 'success');
    }
    //finish the workout by saving it as a log and redirrecting the user to he activity page
    const finishWorkout = async () =>{
        //create the log object that will be saved to the redux store
        const log = {
            _id: uuidv4(),
            icon: IconLibrary.Workout,
            type: 'workout',
            title: workoutData.name,
            timestamp: new Date(),
            data: {
                duration: formatTime(seconds),
                finishedAt: getFullHour(),
                workoutId: workoutData._id,
                isCompleted: true,
                targetGroup: workoutData.targetMuscles,
                name: workoutData.name,
                difficulty: workoutData.difficulty,
                description: workoutData.description,
                exercises: exercises,
                tags: workoutData.tags,
                workoutId: workoutData._id
            }
        }
        await saveItem('logs',log);
        showMessage("Workout finished successfully", 'success');
        const snapshots = JSON.parse(localStorage.getItem("snapshots")) || {};
        localStorage.setItem('snapshots', JSON.stringify({exercise: snapshots.exercise, workout: null}));  
        navigate('/logs');

    }
    const getProgress = () =>{
        if(workoutData && exercises){
            const completedExercises = exercises?.filter(item=>item.isCompleted).length;
            const progress = (completedExercises / exercises.length) * 100;
            return parseFloat(progress.toFixed(2));
        }
    }
    const saveProgress = () =>{
        if(workoutData && exercises){
            const timestamp = new Date().toISOString();
            const snapshot = {
                snapshotId: snapshotId || uuidv4(),
                timestamp,
                type: 'workout',
                name: workoutData.name,
                progress: getProgress(),
                duration: seconds,
                data:{
                    workoutId: workoutData._id,
                    exercises: exercises
                }
            }
            let snapshots = JSON.parse(localStorage.getItem('snapshots')) || {};
            localStorage.setItem('snapshots', JSON.stringify({exercise: snapshots.exercise, workout: snapshot}));
        }
    }
    const handleCompleteField = (exerciseId, setNo, fieldId) => {
        // Create a deep copy of exercises
        const updatedExercises = exercises.map((ex) => {
            // Find the exercise by id
            if (ex._id === exerciseId) {
                // Find the set by index (setNo)
                const updatedSets = [...ex.sets]; // Create a shallow copy of the sets
                const updatedSet = { ...updatedSets[setNo] }; // Copy the specific set
    
                // Find the field by id and toggle the isCompleted value
                const updatedFields = updatedSet.fields.map((field) => {
                    if (field._id === fieldId) {
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
            if (ex._id === exerciseId) {
                const updatedSets = [...ex.sets];
                const updatedSet = { ...updatedSets[setNo] };
    
                const updatedFields = updatedSet.fields.map((field) => {
                    if (field._id === fieldId) {
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
            if (ex._id === exerciseId) {
                //creates a new set object and appends it to the current exercise sets array
                return { ...ex, sets: [...ex.sets, {
                    order: ex.sets.length,
                    fields: ex.fields ? [...JSON.parse(JSON.stringify(ex.fields)), {_id: uuidv4(), name:'Rest', unit:'sec',value: 0, target:  ex?.rest, isCompleted: false}] : [], // Deep copy of fields array
                    isCompleted: false,
                    isSkipped: false,
                  }],  };
            }
            return ex; // If not the correct exercise, return as is
        });
    
        setExercises(updatedExercises);
        showMessage("New set added", 'success');
    }
    
    const toggleSetCompletion = (exerciseId, setNo, value) => {
        // completeAllFields(exerciseId, setNo);
        const updatedExercises = exercises.map((exercise) => {
            if (exercise._id === exerciseId) {
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
            if (ex._id === exerciseId) {
                
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
                        <div className={styles.exercises}>
                        <div className={styles['exercises-header']}>
                            <h3>Exercises</h3>
                            <button className={styles['hide-exercises']}>
                                <img src={IconLibrary.Add} onClick={()=>setShowExercisePicker(true)} className="small-icon" alt="add exercise"></img>
                            </button>
                        </div>
                        <div className={styles["exercises-container"]}>
                            {exercises?.map((exercise, index) => (
                                <div
                                    className={`${styles["exercise-body"]} ${currentExercise === exercise._id ? styles['selected-exercise'] : ''}`}
                                    key={index + 'exercise'}
                                    onClick={() => handleChangeCurrentExercise(exercise._id)}
                                >
                                    <p>{exercise.name}</p>
                                    <input type="checkbox" style={{height: '30px', width: '30px'}} onChange={()=>handleCompleteExercise(exercise._id)} checked={exercises?.find((ex) => ex._id === exercise._id)?.isCompleted}></input>
                                </div>
                            ))}
                        </div>  
                    </div>
                    ) : null}
                <div className={styles.exerciseHeader}>
                    <h3>{exercises.find(item=>item._id === currentExercise)?.name || ''}</h3>
                    {currentExercise ? <button type="button" className={styles['new-set-button']} onClick={()=>handleAddSet(currentExercise, currentSet)}>
                        <img className="small-icon" src={IconLibrary.Add} alt="add-set"></img>
                    </button> : null}
                    <button className={styles.showExerciseListButton} onClick={()=>setShowExercises(showExercises=>!showExercises)}>
                        <img src={IconLibrary.List} alt="" className="small-icon" />
                    </button>
                </div>
                <div className={styles['current-exercise']}>
                        <div className={styles["current-exercise-header"]}>
                        </div>
                        <div className={styles['sets-container']}>
                            {exercises?.find((ex) => ex._id === currentExercise)?.sets.map((item, index)=>(
                                <div className={`${styles.set} ${extendedMode ? '' : styles['simplified-set']} ${currentSet === index ? styles['current-set'] : ''} ${item.isCompleted ? styles['completed-set'] : ''}`} onClick={()=>setCurrentSet(index)} key={'set-'+index}>
                                    <div className={styles['set-top']}>
                                        <p className={styles['set-title']}>{`Set ${index+1}`}</p>
                                        <input type="checkbox" className={styles['set-checkbox']} onChange={()=>toggleSetCompletion(currentExercise, index, !item.isCompleted)} checked={item.isCompleted}></input>
                                    </div>
                                    {extendedMode ? <div className={styles['set-fields']}>
                                        {item?.fields?.map((field)=>(
                                            <div className={styles["field"]} key={field._id}>
                                                <p className={styles["field-name"]}>{field.name}</p>
                                                <div className={styles["field-input"]}>
                                                    <button onClick={()=>handleChangeFieldValue(currentExercise, index, field._id, -1)}><img src={IconLibrary.Minus} className="small-icon" alt="" ></img></button>
                                                    <p>{field.value || 0}/{field.target|| field.targetValue || 0}</p>
                                                    <button onClick={()=>handleChangeFieldValue(currentExercise, index, field._id, 1)}><img src={IconLibrary.Plus} className="small-icon" alt="" ></img></button>
                                                </div>
                                                <input type="checkbox" checked={field.isCompleted} className={styles["field-checkbox"]} onChange={()=>handleCompleteField(currentExercise, index, field._id)}></input>
                                            </div>
                                        ))}
                                    </div> : null}
                                </div>
                            ))}
                            
                        </div>
                    </div>
                </div> 
                <div className={`${styles.instructionsSection} ${showInstructions ? styles.expandedInstructions : ''}`}>
                    <div className={styles.instructionsHeader} onClick={()=>setShowInstructions(prev=>!prev)}>
                        <h3>Instructions</h3>
                        <button className={styles.toggleInstructionsButton}>
                            <img src={IconLibrary.Arrow} className="small-icon" alt="toggle instructions"></img>
                        </button>
                    </div>
                    <div className={styles.instructionsContainer}>
                        {exercises?.find(item=>item._id === currentExercise)?.instructions?.length > 0 ? exercises.find(item=>item._id === currentExercise).instructions.map((item, index)=><p key={'instruction-'+index}>{index+1}. {item}</p>):<p>No instructions for this exercise</p>}
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
