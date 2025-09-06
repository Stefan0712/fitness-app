import { getDateFromTimestamp, getHourFromTimestamp } from '../../../../../helpers.js';
import { IconLibrary } from '../../../../../IconLibrary.js';
import styles from './ViewWorkoutLog.module.css';
import React, { useEffect, useState } from 'react';
import { getItemById } from '../../../../../db.js';
import { Workout } from '../../../../common/interfaces.ts';
import { WorkoutLog } from '../../../../common/interfaces.ts';
import { useUI } from '../../../../../context/UIContext.jsx';

interface ViewWorkoutLogProps {
    logData: WorkoutLog;
    closeLog: ()=>void;
}

// TODO: Add a button to quickly see the original exercise using the View Exercise used in the library page
// TODO: Add more fallback values and checks


const ViewWorkoutLog: React.FC<ViewWorkoutLogProps> = ({logData, closeLog}) => {

    const {showConfirmationModal, showMessage} = useUI();

    const [workout, setWorkout] = useState<Workout | null>(null);
    const [selectedScreen, setSelectedScreen] = useState('overview');

    const getWorkoutData = async () =>{
        try{
            const response = await getItemById('workouts',logData.data.workoutId);
            setWorkout(response);
            console.log(response)
        }catch(error){
            console.error(error)
        }
    };
    useEffect(()=>{getWorkoutData()},[]);


    if(!workout){
        return(<p>Loading...</p>)
    }else{
        return ( 
            <div className={styles['view-workout-log']}>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <img src={logData.icon} className='small-icon' alt=''/>
                        <h3>{logData.data.name}</h3>
                        <button className='clear-button' onClick={closeLog}><img className='small-icon' src={IconLibrary.Close} alt='close log' /></button>
                    </div>
                    <div className={styles.screenContainer}>
                        {
                            selectedScreen === "overview" ?     <Overview workoutData={workout} logData={logData} /> :
                            selectedScreen === "exercises" ?    <ExercisesScreen logData={logData} /> :
                                                                <Overview workoutData={workout} logData={logData} />
                        }
                    </div>
                    <div className={styles.buttons}>
                        <div className={styles.screenSwitch}>
                            <button onClick={()=>setSelectedScreen('overview')} className={selectedScreen === 'overview' ? styles.selectedButton : ''}>Overview</button>
                            <button onClick={()=>setSelectedScreen('exercises')} className={selectedScreen === 'exercises' ? styles.selectedButton : ''}>Exercises</button>
                        </div>
                        <button className={styles.deleteButton} onClick={()=>showConfirmationModal({title: "Delete Log?", message: "Are you sure you want to delete this log? This cannot be undone.", onConfirm: ()=>showMessage('Deleted')})}>
                            <img className='small-icon' src={IconLibrary.Delete} alt='' />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    
}
 
export default ViewWorkoutLog;



const Overview = ({workoutData, logData}) => {

    useEffect(()=>{
        console.log(logData)
    },[])

    return (
        <div className={styles.overviewScreen}>
            <label>Timestamp</label>
            <p>{getDateFromTimestamp(logData.timestamp)} at {getHourFromTimestamp(logData.timestamp)} for {logData.data.duration}</p>
            <label>Description</label>
            <p>{workoutData.description}</p>
            <div className={styles.tags}>
                <div className={styles.sectionIconContainer} key={'muscle-icon'}><img src={IconLibrary.Tags} className={styles.sectionIcon} alt=''/></div>
                {workoutData?.tags?.length > 0 ? workoutData.tags.map((item, index)=>(
                    <div className={styles['tag-body']} key={'tag-log-'+index}>
                        <div className={styles['tag-color']} style={{backgroundColor: item.color}}></div>
                        <p>{item.name}</p>
                    </div>
                )): <div className={styles['tag-body']} key={'tag-log-none'}>
                        <div className={styles['tag-color']}></div>
                        <p>None</p>
                    </div>
                }
            </div>
            <div className={styles.targetMuscles}>
                <div className={styles.sectionIconContainer} key={'muscle-icon'}><img src={IconLibrary.Muscle} className={styles.sectionIcon} alt=''/></div>
                    {workoutData && workoutData.targetMuscles && workoutData.targetMuscles.length > 0 ? workoutData.targetMuscles.map((item, index)=>(
                        <div className={styles.muscle} key={'group-log-'+index}>
                            <p>{item.name}</p>
                        </div>
                )): <div className={styles.muscle} key={'group-log-none'}><p>None</p></div>}
            </div>
            <div className={styles.equipments}>
                <div className={styles.sectionIconContainer} key={'muscle-icon'}><img src={IconLibrary.Equipment} className={styles.sectionIcon} alt=''/></div>
                {workoutData && workoutData.equipment && workoutData.equipment.length > 0 ? workoutData.equipment.map((item, index)=>(
                    <div className={styles.equipmentBody} key={'equipment-log-'+index}>
                        <p>{item.name}</p>
                    </div>
                )): <div className={styles.equipmentBody} key={'group-log-none'}><p>None</p></div>}
            </div>
        </div>
    )
}
const ExercisesScreen = ({logData}) =>{
    return (
        <div className={styles.exercisesScreen}>
            <div className={styles.workoutProgress}>
                <div className={styles.progressBarContainer}>
                    <div className={styles.progressBar} style={{width: `${Math.round((logData.data.exercises.filter(item=>item.isCompleted).length / logData.data.exercises.length)*100)}%`}}>
                        <p className={styles.percentage}>{Math.round((logData.data.exercises.filter(item=>item.isCompleted).length / logData.data.exercises.length)*100)}%</p>
                    </div>
                </div>
            </div>
            <div className={styles.exercises}>
                {logData?.data && logData.data.exercises?.length > 0 ? logData.data.exercises.map(exercise => <ExerciseItem exercise={exercise} />) : <p>No exercises found</p>}
            </div>
        </div>
    )
}
const ExerciseItem = ({exercise}) =>{
    const [expandExercise, setExpandExercise] = useState(false);
    return (
        <div className={`${styles.exercise} ${expandExercise ? styles.expanded : ''}`} key={"Exercise-"+exercise._id}>
            <div className={styles.header} onClick={()=>setExpandExercise(prev=>!prev)}>
                <h4>{exercise.name}</h4>
                <p>x{exercise.sets.length}</p>
                <button className={`${expandExercise ? styles.expanded : ''} ${styles.viewExerciseButton}`} ><img src={IconLibrary.InfoCircle} alt=''/></button>
                <img className={`${expandExercise ? styles.expanded : ''} ${styles.arrowIcon}`} src={IconLibrary.Arrow} alt=''/>
            </div>
            <div className={styles.sets}>
                {exercise.sets?.length > 0 ? exercise.sets.map((set, index)=><div className={styles.set} key={set._id}>
                    <div className={styles.setMetas}>
                        <b>Set {index+1}</b>
                        <div className={styles.setMeta}>
                            <img className={styles.metaIcon} src={IconLibrary.Time} alt=''/>
                            <p>{set.duration}</p>
                            <img className={styles.setCompletionIcon} src={set.isCompleted ? IconLibrary.Checkmark : IconLibrary.Circle} alt=''/>
                        </div>
                    </div>
                    {set.fields?.length > 0 ? set.fields.map(field=><div className={styles.field} key={field._id}>
                        <b>{field.unit.label}</b>
                        <p>{field.value}/{field.target}</p>
                    </div>) : null}
                    
                </div>) : null}
            </div>
        </div>
        )
}