import { formatTime, getFullHour } from "../../../helpers.js";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { IconLibrary } from "../../../IconLibrary.js";
import styles from './Workout.module.css';
import ExerciseSelector from "../../common/ExerciseSelector/ExerciseSelector.tsx";
import { getItemById, saveItem } from "../../../db.js";
import { useUI } from "../../../context/UIContext.jsx";
import { Field, Workout as IWorkout, Set as ISet } from "../../common/interfaces.ts";
import WorkoutSet from "./WorkoutComponents/WorkoutSet.tsx";
import { format } from "date-fns";
 

interface IExercise {
    _id: string,
    sourceId: string,
    name: string,
    sets: ISet[],
    rest: number,
    fields: Field[],
    instructions: string[],
    isCompleted: boolean,
}


const Workout = () => {
    const { id, snapshotId } = useParams();
    const navigate = useNavigate();
    const {showMessage} = useUI();

    const [showInstructions, setShowInstructions] = useState<boolean>(false);
    const [showExercises, setShowExercises] = useState<boolean>(false);
    const [showExercisePicker, setShowExercisePicker] = useState<boolean>(false);
    
    const [workoutData, setWorkoutData] = useState<IWorkout | null>(null);
    const [exercises, setExercises] = useState<IExercise[]>([]);


    const [currentExercise, setCurrentExercise] = useState<string | null>(null); 
    const [currentSet, setCurrentSet] = useState<string | null>(null);

    // Timer seconds
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    

    const [extendedMode, setExtendedMode] = useState(true);





    useEffect(() => {
        if(isRunning){
            const timer = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isRunning]);

    // Get the workout from the idb using the id provided in the query
    const getWorkoutData = async () =>{
        const response = await getItemById('workouts', id);
        if(response){
            setWorkoutData(response);
        }else{
            showMessage("Failed to get workout data", 'error');
        }
    }

    // Runs the function for getting workout data only on once at the beginning
    useEffect(()=>{
        if(!snapshotId){
            getWorkoutData();
        }
    },[])

    // Restores snapshots if any is found
    useEffect(() => {
        if(snapshotId){
            const snapshots = JSON.parse(localStorage.getItem('snapshots') ?? '{}');
            const snapshot = snapshots.workout;
            if(snapshot){
                const newWorkoutData: IWorkout = {...workoutData, exercises: snapshot.data.exercises};
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

    // If workoutData is populated, format its exercises
    useEffect(()=>{
        if(!snapshotId && workoutData){
            const formattedExercises = getExercises();
            if(formattedExercises && format.length > 0){
                setExercises(formattedExercises);
                selectFirstUnfinishedSet(formattedExercises.find((ex: IExercise)=>!ex.isCompleted));
            }
        } 
    },[workoutData]);

    const selectFirstUnfinishedSet = (unfinishedExercise) =>{
        if(unfinishedExercise){
            const unfinishedSet = unfinishedExercise.sets.filter(item=>!item.isCompleted)[0];
            setCurrentSet(unfinishedSet._id);
        }else{
            console.log("There are no unfinished exercises");
        }
    }
    // Select the first exercise from the list as the current exercise after loading exercises
    useEffect(()=>{
        if(!currentExercise && exercises && exercises.length > 0){
            setCurrentExercise(exercises[0]._id);
        }
        if(workoutData){
            saveProgress();
        }
    },[exercises]);

    // Converts the array of phases into a flat array of exercises while also keeping track of which phase the exercise is from
    const getExercises = () => {
        const exercises: IExercise[] = [];
        if(workoutData && workoutData.phases?.length > 0){
            workoutData.phases.map(phase=>{
                phase.exercises && phase.exercises.length > 0 ? phase.exercises.map(exercise=>{
                    exercises.push({...formatExercise(exercise), phaseName: phase.name});
                }
            ) : console.log("There are no exercises in phase ", phase.name)})
        }
        return exercises;
    };
    
    // Format the original exercises array form workoutData 
    const formatExercise = (exercise) =>{
        // Initialize an empty array of sets
        const newSets: ISet[] = [];
        const newExerciseId = uuidv4(); // Set a new ID so that even if two identical exercises are inside a workout there won't be any issues
        // Defining the template for all sets
        const setTemplate: ISet = {
            exerciseId: newExerciseId,
            isCompleted: false,
            isSkipped: false,
            rest: exercise.rest,
            order: exercise.length,
            fields: exercise.fields.length > 0 ? [...exercise.fields] : [],
            duration: 0,
            startedAt: undefined,
            finishedAt: undefined,
            status:'not-started'
        }
        // Add one set by default if sets is less than one not not defined at all
        if(!exercise.sets || exercise.sets < 1){
            newSets.push({...setTemplate, _id: uuidv4()});
        }else{
            // Or add setTemple for the number of times that sets property specify
            for (let i = 0; i < exercise.sets; i++) {
                newSets.push({...setTemplate, _id: uuidv4()});
            }
        }
        // Create a simple new exercise instance with only needed information
        const ex = {
            ...exercise,
            initialId: exercise._id,
            _id: newExerciseId,
            sets: newSets,
            isCompleted: false,
        };
        return ex;
    }
    

    // Functions to move through exercises
    const prevExercise = () => {
        const selectedExerciseIndex = exercises.findIndex((obj) => obj._id === currentExercise);
        if (selectedExerciseIndex > 0) {
            setCurrentExercise(exercises[selectedExerciseIndex - 1]._id);
            setCurrentSet(exercises[selectedExerciseIndex - 1]?.sets[0]?._id ?? null) // Set the currest set as the _id of the first set from the prev exercise
        }
    };

    const nextExercise = () => {
        //checks if the current exercise index is not bigger than the last index of the exercises array
        const selectedExerciseIndex = exercises.findIndex((obj) => obj._id === currentExercise);
        if (selectedExerciseIndex < exercises.length - 1) {
            setCurrentExercise(exercises[selectedExerciseIndex + 1]._id);
            setCurrentSet(exercises[selectedExerciseIndex + 1].sets[0]._id ?? null) // Set the currest set as the _id of the first set from the next exercise
        }
    };

    const addExercise = (exercise) =>{
        setExercises(exercises=>[...exercises, {...formatExercise(exercise), setName: 'Post-added'}]);
        setShowExercisePicker(false);
        showMessage("Exercise added", 'success');
    }

    //finish the workout by saving it as a log and redirrecting the user to he activity page
    const finishWorkout = async () =>{
        //create the log object that will be saved to the redux store
        if(workoutData){
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
                }
            }
            await saveItem('logs',log);
            showMessage("Workout finished successfully", 'success');
            const snapshots = JSON.parse(localStorage.getItem('snapshots') ?? '{}');
            localStorage.setItem('snapshots', JSON.stringify({exercise: snapshots.exercise, workout: null}));  
            navigate('/logs');
        }

    }

    // Saves a snapshot of this workout progress that can be restored later

    const saveProgress = () =>{
        if(workoutData && exercises){
            const timestamp = new Date().toISOString();
            const snapshot = {
                snapshotId: snapshotId || uuidv4(),
                timestamp,
                type: 'workout',
                name: workoutData.name,
                duration: seconds,
                data:{
                    workoutId: workoutData._id,
                    exercises: exercises
                }
            }
            let snapshots = JSON.parse(localStorage.getItem('snapshots') ?? '{}');
            localStorage.setItem('snapshots', JSON.stringify({exercise: snapshots.exercise, workout: snapshot}));
        }
    }

    // Add a new set to the currect exercise
    const handleAddSet = (exerciseId) =>{
        const updatedExercises: IExercise[] = exercises.map((ex) => {
            if (ex._id === exerciseId) {
                //creates a new set object and appends it to the current exercise sets array
                return { ...ex, sets: [...ex.sets, {
                    exerciseId: ex._id,
                    isCompleted: false,
                    isSkipped: false,
                    rest: ex.rest,
                    order: exercises.length,
                    fields: ex.fields.length > 0 ? [...JSON.parse(JSON.stringify(ex.fields))] : [],
                    duration: 0,
                    startedAt: undefined,
                    finishedAt: undefined,
                    status:'not-started'
                }], isCompleted: false};
            }
            return ex; // If not the correct exercise, return as is
        });
        setExercises(updatedExercises);
        showMessage("New set added", 'success');
    }
    
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
        setCurrentSet(null);
        setCurrentExercise(id)
    }

    // Handles going to the next set
    const goToNextSetOrExercise = () => {
        const currentExIndex = exercises.findIndex(ex => ex._id === currentExercise); // Find the index of the current exercise
        if (currentExIndex === -1) return; // Exit the function if the exercise is not found

        const currentEx = exercises[currentExIndex]; 
        const currentSetIndex = currentEx.sets.findIndex(set => set._id === currentSet); // Find the current set inside the current exercise
        const nextUncompletedSet = currentEx.sets.slice(currentSetIndex + 1).find(set => !set.isCompleted)?._id; // Finds the next set that is not completed
        
        if (nextUncompletedSet) {
            setCurrentSet(nextUncompletedSet);
        } else {
            // Mark current exercise as complete
            if (!currentEx.isCompleted) {
                handleCompleteExercise(currentEx._id);
                console.log(currentEx)
            }

            // Move to next unfinished exercise
            // const nextUnfinishedEx = exercises.slice(currentExIndex + 1).find(ex => !ex.isCompleted);
            // if (nextUnfinishedEx) {
            //     setCurrentExercise(nextUnfinishedEx._id);
            //     const firstUnfinishedSet = nextUnfinishedEx.sets.find(set => !set.isCompleted);
            //     setCurrentSet(firstUnfinishedSet?._id ?? nextUnfinishedEx.sets[nextUnfinishedEx.sets.length - 1]?._id ?? null);
            // }
        }
    };

    if(workoutData){
        return (
            <div className={`${styles["workout-page"]} page`}>
                <div className={styles['page-header']}>
                    <div className={styles.timer}>{formatTime(seconds)}</div>
                    <h2>{workoutData.name}</h2>
                    <button onClick={()=>finishWorkout()} className={styles['finish-button']}>Finish</button>
                </div>
                <div className={styles.content}>
                    {showExercisePicker ? <ExerciseSelector close={()=>setShowExercisePicker(false)} addExercise={addExercise} /> : null}

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
                                <div className={`${styles["exercise-body"]} ${currentExercise === exercise._id ? styles['selected-exercise'] : ''}`} key={index + 'exercise'} onClick={() => handleChangeCurrentExercise(exercise._id)}>
                                    <p>{exercise.name}</p>
                                    <b>x{exercise.sets.length}</b>
                                </div>
                            ))}
                        </div>  
                    </div>
                    ) : null}

                <div className={styles.workoutProgress}>
                    <p>{exercises.filter(item=>item.isCompleted).length}/{exercises.length}</p>
                    <div className={styles.progressBarContainer}>
                        <div className={styles.progressBar} style={{width: `${Math.round((exercises.filter(item=>item.isCompleted).length / exercises.length)*100)}%`}}></div>
                    </div>
                    <p>{Math.round((exercises.filter(item=>item.isCompleted).length / exercises.length)*100)}%</p>
                </div>
                <div className={styles.exerciseHeader}>
                    <h3>{exercises.find(item=>item._id === currentExercise)?.name || ''}</h3>
                    {currentExercise ? <button type="button" className={styles['new-set-button']} onClick={()=>handleAddSet(currentExercise)}>
                        <img className="small-icon" src={IconLibrary.Add} alt="add-set"></img>
                    </button> : null}
                    <button className={styles.showExerciseListButton} onClick={()=>setShowExercises(showExercises=>!showExercises)}>
                        <img src={IconLibrary.List} alt="" className="small-icon" />
                    </button>
                </div>
                <div className={styles['current-exercise']}>
                        <div className={styles['sets-container']}>
                            {exercises && exercises.length > 0 ? exercises.find((ex) => ex._id === currentExercise)?.sets.map((item, index)=>(
                                <WorkoutSet key={item && item._id ? item._id+index : index+'set'} setExercises={setExercises} allSets={exercises.find(ex=>ex._id === item.exerciseId)?.sets ?? []} setCurrentSet={setCurrentSet} currentSet={currentSet} setIndex={index} set={item} goToNextSetOrExercise={goToNextSetOrExercise}/>
                            )) : null}
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
                        {(() => {
                            const exercise = exercises?.find(item => item._id === currentExercise);
                            if (exercise && exercise.instructions?.length > 0) {
                                return exercise.instructions.map((item, index) => (
                                    <p key={`instruction-${index}`}>{index + 1}. {item}</p>
                                ));
                            } else {
                                return <p>No instructions for this exercise</p>;
                            }
                        })()}
                    </div>
                </div>
                <div className={styles['buttons-container']}>
                    <button className={styles['navigation-button']} onClick={prevExercise}>
                        <img className="small-icon" src={IconLibrary.BackArrow} alt="previous exercise"></img>
                    </button>
                    <button onClick={()=>setExtendedMode(extendedMode=>!extendedMode)}>{extendedMode ? 'Minimize Sets' : 'Extend Sets'}</button>
                    <button onClick={()=>(setIsRunning(prev=>!prev), saveProgress())}>{isRunning ? 'Pause' : 'Resume'}</button>
                    <button className={styles['navigation-button']} onClick={nextExercise}>
                        <img className="small-icon" src={IconLibrary.BackArrow} style={{transform: 'rotateZ(180deg)'}} alt="next exercise"></img>
                    </button>
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
