import { formatTime, getFullHour } from "../../../helpers.js";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { IconLibrary } from "../../../IconLibrary.js";
import styles from './Workout.module.css';
import { getItemById, saveItem } from "../../../db.js";
import { useUI } from "../../../context/UIContext.jsx";
import { Field, Workout as IWorkout, Set as ISet } from "../../common/interfaces.ts";
import WorkoutSet from "./WorkoutComponents/WorkoutSet.tsx";
import { format } from "date-fns";
import Stopwatch from "../../common/Stopwatch/Stopwatch.tsx";
import WorkoutInfo from "./WorkoutComponents/WorkoutInfo.tsx";
import ExercisesList from "./WorkoutComponents/ExercisesList.tsx";
import { formatExercise } from "./WorkoutHelpers.ts";
import Rest from "./WorkoutComponents/Rest.js";
 

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

    const [showExerciseList, setShowExerciseList] = useState(false);
    const [showWorkoutInfo, setShowWorkoutInfo] = useState<boolean>(false);    
    const [workoutData, setWorkoutData] = useState<IWorkout | null>(null);
    const [exercises, setExercises] = useState<IExercise[]>([]);
    const [currentExercise, setCurrentExercise] = useState<string | null>(null); 
    const [currentSet, setCurrentSet] = useState<string | null>(null);
    // Timer seconds
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    const [showStopwatch, setShowStopwatch] = useState(false);

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
                    _id: uuidv4(),
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
    if(workoutData){
        return (
            <div className={`${styles["workout-page"]} page`}>
                {showStopwatch ? <Stopwatch close={()=>setShowStopwatch(false)} /> : null}
                {showExerciseList ? <ExercisesList close={()=>setShowExerciseList(false)} exercises={exercises} setExercises={setExercises} setCurrentExercise={setCurrentExercise} /> : null}
                <div className={styles['page-header']}>
                    <h2>{workoutData.name}</h2>
                    <button onClick={()=>finishWorkout()} className={styles['finish-button']}>Finish</button>
                </div>
                <div className={styles.workoutSummary}>
                    <div className={styles.workoutProgress}>
                        <div className={styles.progressBarContainer}>
                            <div className={styles.progressBar} style={{width: `${Math.round((exercises.filter(item=>item.isCompleted).length / exercises.length)*100)}%`}}>
                                <p className={styles.percentage}>{Math.round((exercises.filter(item=>item.isCompleted).length / exercises.length)*100)}%</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.top}>
                        <div className={styles.textInfo}>
                            <img src={IconLibrary.Time} className={styles.summaryIcon} alt="" />
                            <p>{formatTime(seconds)}</p>
                        </div>
                        <div className={styles.textInfo}>
                            <img src={IconLibrary.Completed} className={styles.summaryIcon} alt="" />
                            <p>{exercises.filter(item=>item.isCompleted).length}/{exercises.length}</p>
                        </div>
                    </div>
                </div>
                <div className={styles['sets-container']}>
                    {exercises && exercises.length > 0 ? exercises.find((ex) => ex._id === currentExercise)?.sets.map((item, index)=>(
                        <>
                            <WorkoutSet key={item && item._id ? item._id+index : index+'set'} setExercises={setExercises} allSets={exercises.find(ex=>ex._id === item.exerciseId)?.sets ?? []} setCurrentSet={setCurrentSet} currentSet={currentSet} setIndex={index} set={item} />
                            <Rest duration={item.rest}/>
                        </>
                    )) : null}
                    
                </div>
                <WorkoutInfo enabled={showWorkoutInfo} setEnabled={setShowWorkoutInfo} close={()=>setShowWorkoutInfo(false)} data={exercises.find(ex=>ex._id === currentExercise)} exercises={exercises} />
                <div className={styles['buttons-container']}>
                    <button className={styles['navigation-button']} onClick={prevExercise}>
                        <img className="small-icon" src={IconLibrary.BackArrow} alt="previous exercise"></img>
                    </button>
                    <button onClick={()=>setShowStopwatch(prev=>!prev)}>
                        <img className="small-icon" src={IconLibrary.Stopwatch} alt=""></img>
                    </button>
                    <button onClick={()=>setShowWorkoutInfo(prev=>!prev)}>
                        <img className="small-icon" src={IconLibrary.InfoCircle} alt=""></img>
                    </button>
                    <button onClick={()=>currentExercise ? handleAddSet(currentExercise) : showMessage("No exercise selected")}>
                        <img className="small-icon" src={IconLibrary.Add} alt=""></img>
                    </button>
                    <button onClick={()=>setShowExerciseList(prev=>!prev)}>
                        <img className="small-icon" src={IconLibrary.List} alt=""></img>
                    </button>
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
