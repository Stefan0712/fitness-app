import styles from './Exercise.module.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IconLibrary } from '../../../IconLibrary';
import { addLog } from '../../../store/userSlice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { formatTime, getDateForHeader, getFullHour } from '../../../helpers';
import { v4 as uuidv4 } from 'uuid';
 


const Exercise = () => {

    const {id} = useParams(); //get the id of the exercise from url
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const originalExercise = useSelector((state)=>state.user.exercises.find((ex)=>ex.id===id)); //get the original exercise saved into the library


    const [seconds, setSeconds] = useState(0); //the exercise timer
    const [currentSet, setCurrentSet] = useState(0); //tracks the current selected set
    const [exerciseData, setExerciseData] = useState(null); //here will be stored the formated original exercise

    //timer logic
    useEffect(() => {
        setExerciseData(formatExercise()); //makes sure to format the exercise on first render
        const timer = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);
    
        return () => clearInterval(timer);
    }, []);



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
            data: {
                duration: formatTime(seconds),
                finishedAt: getFullHour(),
                ...exerciseData, 
                
            }
        }
        dispatch(addLog(log));
        navigate('/logs');

    }
    //
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
                    ? parseInt(field.targetValue, 10)
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
    
                        // Check if the new value passes the targetValue (either above or below)
                        const shouldComplete = newValue >= field.targetValue;
                        const shouldDecomplete = newValue < field.targetValue;

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
                updatedSets[setNo] = updatedSet; // Update the specific set
    
                setExerciseData({ ...exerciseData, sets: updatedSets });
            
   
    };
    
    const completeAllFields = (exerciseId, setNo) => {
           
                    const updatedSets = [...exerciseData.sets];
                    const updatedSet = { ...updatedSets[setNo] };
    
                    // Toggle all fields in the set
                    const updatedFields = updatedSet.fields.map((field) => ({
                        ...field,
                        isCompleted: true, // Mark all fields as completed
                        value: !field.isCompleted && (!field.value || field.value === 0) 
                            ? parseInt(field.targetValue, 10)
                            : field.value 
                    }));
    
                    // Update the set's fields and completion status
                    updatedSet.fields = updatedFields;
                    updatedSet.isCompleted = true; // All fields are completed, so the set is completed
    
                    // Update the sets array
                    updatedSets[setNo] = updatedSet;
    
                    // Check if all sets are completed to update the exercise's completion status
                    const allSetsCompleted = updatedSets.every((set) => set.isCompleted);
    
                    setExerciseData({ ...exerciseData, sets: updatedSets, isCompleted: allSetsCompleted });
                
               
        
        
    };
    

    
    
    


    const handleSkipSet = (setNo) =>{
        
        // Find the set by index (setNo)
        const sets = [...exerciseData.sets]; // Create a shallow copy of the sets
        const updatedSets = sets.map((set, index)=>{
            if(index === setNo){
                return { ...set, isSkipped: !set.isSkipped, isCompleted: false } //toggle isSkipped for that specific set and make sure isCompleted is false
            }else{
                return set
            }
        })
        
        setExerciseData({ ...exerciseData, sets: updatedSets });
            
    
    }

    const handleAddSet = () =>{

        //creates a new set object and appends it to the current exercise sets array
        setExerciseData({ ...exerciseData, sets: [...exerciseData.sets, {
            order: exerciseData.sets.length,
            fields: exerciseData.fields ? JSON.parse(JSON.stringify(exerciseData.fields)) : [], // Deep copy of fields array
            isCompleted: false,
            isSkipped: false,
            }]  });
           
    }
    
    const handleCompleteSet = (setNo) => {
        
                const sets = [...exerciseData.sets]; // Create a shallow copy of the sets
                const updatedSets = sets.map((set, index) => {
                    if (index === setNo) {
                        return { ...set, isCompleted: !set.isCompleted, isSkipped: false }; // Toggle isCompleted for that specific set and reset the isSkipped value
                    } else {
                        return set;
                    }
                });

                // Check if all sets are completed and update the exercise's isCompleted
                const allSetsCompleted = updatedSets.every((set) => set.isCompleted);
              
                setExerciseData({ ...exerciseData, sets: updatedSets, isCompleted: allSetsCompleted}); // Set exercise isCompleted to true if all sets are completed
       
    };
    
    const handlePrevSet = () => {
        if (currentSet > 0) {
            setCurrentSet(prevSet => prevSet - 1);
        }
    };
    
    const handleNextSet = () => {
        const setsLength = exerciseData.sets.length;
        if (currentSet < setsLength - 1) {
            setCurrentSet(prevSet => prevSet + 1); 
        }
    };
    //TODO: Make instructions collapsed by default
    if(exerciseData){
        return ( 
            <div className={`page ${styles['exercise-page']}`}>
                <div className="header">
                    <div className="date">{getDateForHeader()}</div>
                    <h2>{exerciseData.name}</h2>
                </div>
                <div className={styles["exercise-top"]}>
                    <div className={styles.timer}>{formatTime(seconds)}</div>
                    <button onClick={()=>finishExercise()} className="medium-button orange-button">Finish</button>
                </div>
                {exerciseData?.instructions && exerciseData?.instructions?.length > 0 ? (
                    <>
                        <h3>Instructions</h3>
                        <div className={styles.instructions}>
                                {exerciseData.instructions?.map((item,index)=>(<p>{index+1}.  {item}</p>))}
                        </div>
                    </>
                ) : null}
                <h3>Exercise Fields</h3>
                <div className={styles.exercise}>
                        <div className={styles["exercise-header"]}>
                            <p>{currentSet + 1}/{exerciseData?.sets.length}</p>
                        </div>
                        <div className={styles["exercise-fields"]}>
                            {exerciseData.sets[currentSet].fields?.map((field)=>(
                                <div className={styles.field} key={field.id}>
                                    <p className={styles["field-name"]}>{field.name}</p>
                                    <div className={styles["field-input"]}>
                                        <button onClick={()=>handleChangeFieldValue(currentSet, field.id, -1)}><img src={IconLibrary.Minus} className="small-icon" alt="" ></img></button>
                                        <p>{field.value || 0}/{field.targetValue || 0}</p>
                                        <button onClick={()=>handleChangeFieldValue(currentSet, field.id, 1)}><img src={IconLibrary.Plus} className="small-icon" alt="" ></img></button>
                                    </div>
                                    <input type="checkbox" checked={field.isCompleted} className={styles["field-checkbox"]} onChange={()=>handleCompleteField(currentSet, field.id)}></input>
                                </div>
                            ))}
                        </div>
                      
                        <div className={styles["sets-controls"]}>
                            <img onClick={handlePrevSet} src={IconLibrary.Arrow} style={{transform: 'rotateY(180deg)'}} className={styles["navigation-button" ]} alt="previous set"></img>
                            <div className={styles["sets-icons"]}>
                                {exerciseData?.sets?.map((field, index)=>(<img className={`${styles["field-icon"]} ${currentSet === index ? styles['selected-set-icon'] : null}`} key={index+'field-icon'} onClick={()=>setCurrentSet(index)} src={field.isCompleted ? IconLibrary.CircleCheckmark : field.isSkipped ? IconLibrary.Skip : IconLibrary.Circle} alt="" />))}
                            </div>
                            <img onClick={handleNextSet} src={IconLibrary.Arrow} className={styles["navigation-button"]} alt="next set"></img>
                        </div>
                </div>
                <div className={styles.buttons}>
                    <button type="button" onClick={()=>handleSkipSet(currentSet)}>Skip Set</button>
                    <button type="button" onClick={()=>handleAddSet( currentSet)}>Add Set</button>
                    <button type="button" onClick={()=>handleCompleteSet(currentSet)}>Finish Set</button>
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