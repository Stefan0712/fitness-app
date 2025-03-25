import styles from './Exercise.module.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IconLibrary } from '../../../IconLibrary';
import { addLog } from '../../../store/userSlice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { formatTime, getDateForHeader, getFullHour } from '../../../helpers';
import { v4 as uuidv4 } from 'uuid';
import { exercises as databaseExercises } from '../../../database.js';
 


const Exercise = () => {

    const {id, snapshotId} = useParams(); //get the id of the exercise from url
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const libraryExercises = useSelector((state)=>state.user.exercises); 

    const libraryExerciseId = libraryExercises.findIndex(item=>item.id===id);
    const databaseExerciseId = databaseExercises.findIndex(item=>item.id===id);
    const originalExercise = libraryExerciseId >= 0 ? libraryExercises[libraryExerciseId] : databaseExerciseId >= 0 ? databaseExercises[databaseExerciseId] : null;


    const [seconds, setSeconds] = useState(0); //the exercise timer
    const [currentSet, setCurrentSet] = useState(0); //tracks the current selected set
    const [exerciseData, setExerciseData] = useState(null); //here will be stored the formated original exercise

    //timer logic
    useEffect(() => {
        
        const timer = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);
    
        return () => clearInterval(timer);
    }, []);

    useEffect(()=>{
        if(!snapshotId){
            setExerciseData(formatExercise()); //makes sure to format the exercise on first render
        }else if(snapshotId){
            const snapshots = JSON.parse(localStorage.getItem("snapshots")) || {};
            console.log(snapshots)
            const snapshot = snapshots?.exercises?.find(item=>item.snapshotId===snapshotId);
            if(snapshot){
                setExerciseData(snapshot.data);
                setSeconds(snapshot.duration);
            }else{
                console.log("Snapshot not found")
            }
        }
    },[])
    useEffect(()=>{
        if(exerciseData){
            saveProgress();
        }
    },[exerciseData])


    //takes the original exercise and format it as needed
    const formatExercise = () => {
            
        let exercise = JSON.parse(JSON.stringify(originalExercise)); //creates a deep copy to make sure everything is copied correctly
    
        
        // Add a completedSet property to the exercise object to keep track of how many sets were completed if not existent already
        if (exercise) {
            if (!exercise.completedSets) {
            exercise.completedSets = 0;
            }
    
            // Transform sets property from number to an array to make it easier to track progress of that exercise
            if (typeof exercise.sets === "number" || typeof exercise.sets === 'string') {
            const setsArray = []; //init an empty array
            //append to that empty array new objects representing sets, populated with the existing fields and new fields to make it easier to track and edit
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
            console.error(`Failed to format exercise`);
        }
        return exercise; //return the modified exercise
    };


    const finishExercise = () =>{
        //create the log object that will be saved to the redux store
        const log = {
            id: uuidv4(),
            icon: IconLibrary.Exercise,
            type: 'exercise',
            name: exerciseData.name,
            data: {
                duration: formatTime(seconds),
                finishedAt: getFullHour(),
                ...exerciseData, 
                
            }
        }
        dispatch(addLog(log));
        const snapshots = JSON.parse(localStorage.getItem("snapshots")) || {};
        snapshots.exercises = snapshots.exercises.filter(snapshot => snapshot.snapshotId !== snapshotId);
        localStorage.setItem('snapshots', JSON.stringify(snapshots));        
        navigate('/logs');
    }
    const saveProgress = () =>{
        const timestamp = new Date().toISOString();
        const snapshot = {
            snapshotId: uuidv4(),
            timestamp,
            type: 'exercise',
            name: exerciseData.name,
            progress: getProgress(),
            duration: seconds,
            data:exerciseData,
        }
        let snapshots = JSON.parse(localStorage.getItem('snapshots')) || { exercises: [], workouts: [] };
    
        const existingIndex = snapshots.exercises.findIndex(snap => snap.data.id === exerciseData.id);

        // If an existing snapshot for the exercise is found, replace it
        if (existingIndex !== -1) {
            snapshots.exercises[existingIndex] = snapshot;
        } else {
            // If no snapshot exists, just add the new snapshot
            snapshots.exercises.push(snapshot);
        }

        // Limit to 3 exercise snapshots
        if (snapshots.exercises.length > 3) {
            snapshots.exercises.shift(); // Remove the oldest snapshot
        }

        // Save the updated snapshots back to localStorage
        localStorage.setItem('snapshots', JSON.stringify(snapshots));

        console.log(`Snapshot for exercise saved:`, snapshot);
    }
    const getProgress = () =>{
        const totalTarget = exerciseData.sets.reduce((sum, set) => sum + set.target, 0);
            
        const totalValues = exerciseData.sets.reduce((sum, set) => sum + set.value, 0);            
        const progress = (totalValues / totalTarget) * 100;
        return parseFloat(progress.toFixed(2));
    }
    const handleCompleteField = (setNo, fieldId) => {
                

        // Find the set by index (setNo)
        const updatedSets = [...exerciseData.sets]; // Create a shallow copy of the sets
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
        
        setExerciseData({ ...exerciseData, sets: updatedSets });
    
        
    
    };

    const handleChangeFieldValue = (setNo, fieldId, changeAmount) => {
    
        // Find the set by index (setNo)
        const updatedSets = [...exerciseData.sets]; // Create a shallow copy of the sets
        const updatedSet = { ...updatedSets[setNo] }; // Copy the specific set

        // Find the field by id and update the value
        const updatedFields = updatedSet.fields.map((field) => {
            if (field.id === fieldId) {
                // If value is null, treat it as 0
                const currentValue = field.value === null ? 0 : field.value;

                // Update the value by adding the changeAmount, ensuring it doesn't go below 0
                const newValue = Math.max(0, currentValue + changeAmount); // Ensure value doesn't go below 0

                // Check if the new value passes the target (either above or below)
                const shouldComplete = newValue >= field.target;
                const shouldDecomplete = newValue < field.target;
                return {
                    ...field,
                    value: newValue,
                    isCompleted: shouldComplete ? true : shouldDecomplete ? false : field.isCompleted,
                }; // Update the value of the field
            }
            return field;
        });
        

        // Update the set's fields
        updatedSet.fields = updatedFields;
        const isSetCompleted = updatedSet.fields.every(item=>item.isCompleted === true);
        updatedSets[setNo] = {...updatedSet, isCompleted: isSetCompleted}; // Update the specific set
        setExerciseData({ ...exerciseData, sets: updatedSets });
        
    };
    

    const handleAddSet = () =>{

        //creates a new set object and appends it to the current exercise sets array
        setExerciseData({ ...exerciseData, sets: [...exerciseData.sets, {
            order: exerciseData.sets.length,
            fields: exerciseData.fields ? JSON.parse(JSON.stringify(exerciseData.fields)) : [], // Deep copy of fields array
            isCompleted: false,
            isSkipped: false,
        }]  });
           
    }
    
    const toggleSetCompletion = (setNo) => {
        const sets = [...exerciseData.sets]; // Copy sets
        const updatedSets = sets.map((set, index) => {
            if (index === setNo) {
                const updatedFields = set.fields.map(item=> ({...item, isCompleted: !set.isCompleted ? true : false, value:  !set.isCompleted ? item.target : 0}))
                return { ...set, isCompleted: !set.isCompleted, fields: updatedFields}; // Toggle isCompleted for that specific set and reset the isSkipped value
            } else {
                return set;
            }
        });

        // Check if all sets are completed and update the exercise's isCompleted
        const allSetsCompleted = updatedSets.every((set) => set.isCompleted);
        
        setExerciseData({ ...exerciseData, sets: updatedSets, isCompleted: allSetsCompleted}); // Set exercise isCompleted to true if all sets are completed
       
    };

   


    //TODO: Make instructions collapsed by default
    if(exerciseData){
        return ( 
            <div className={`page ${styles['exercise-page']}`}>
                <div className="header">
                    <div className="date">{getDateForHeader()}</div>
                    <h2>{exerciseData?.name}</h2>
                    <p className={styles.timer}>{formatTime(seconds)}</p>
                </div>
                <div className={styles.content}>                
            <div className={styles['current-exercise']}>
                    <div className={styles["current-exercise-header"]}>
                        <h3>{exerciseData?.name}</h3>
                        <button type="button" className={styles['new-set-button']} onClick={()=>handleAddSet(currentSet)}>
                            <img className="small-icon" src={IconLibrary.Add} alt="add-set"></img>
                        </button>
                    </div>
                    <div className={styles['sets-container']}>
                        {exerciseData?.sets.map((item, index)=>(
                            <div className={`${styles.set} ${currentSet === index ? styles['current-set'] : ''} ${item.isCompleted ? styles['completed-set'] : ''}`} onClick={()=>setCurrentSet(index)} key={'set-'+index}>
                                <div className={styles['set-top']}>
                                    <p className={styles['set-title']}>{`Set ${index+1}`}</p>
                                    <input type="checkbox" className={styles['set-checkbox']} onChange={()=>toggleSetCompletion(index, !item.isCompleted)} checked={item.isCompleted}></input>
                                </div>
                                <div className={styles['set-fields']}>
                                    {item?.fields?.map((field)=>(
                                        <div className={styles["field"]} key={field.id}>
                                            <p className={styles["field-name"]}>{field.name}</p>
                                            <div className={styles["field-input"]}>
                                                <button onClick={()=>handleChangeFieldValue(index, field.id, -1)}><img src={IconLibrary.Minus} className="small-icon" alt="" ></img></button>
                                                <p>{field.value || 0}/{field.target || 0}</p>
                                                <button onClick={()=>handleChangeFieldValue(index, field.id, 1)}><img src={IconLibrary.Plus} className="small-icon" alt="" ></img></button>
                                            </div>
                                            <input type="checkbox" checked={field.isCompleted} className={styles["field-checkbox"]} onChange={()=>handleCompleteField(index, field.id)}></input>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        
                    </div>
                </div>
            </div> 
            <div className={styles['buttons-container']}>
                <button onClick={finishExercise}>Finish</button>
            </div>
        </div>
         
        )
    }else{
        return(
            <div className={`page ${styles['exercise-page']}`}>
                <div className="header">
                    <div className="date">{getDateForHeader()}</div>
                    <h2>Exercise loading</h2>
                </div>
                <h1>Loading...</h1>
            </div>
        )
    }
}
export default Exercise;