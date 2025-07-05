import styles from './ViewWorkout.module.css';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { formatDate, getDateForHeader, makeFirstUpperCase } from '../../../../helpers.js'
import { useState, useEffect } from 'react';
import { IconLibrary } from '../../../../IconLibrary.js';
import {v4 as uuidv4} from 'uuid';
import axios from '../../../../axios.js';
import { getItemById, saveItem, deleteItem } from '../../../../db.js';
import AppHeader from '../../../common/AppHeader/AppHeader.tsx';
import { useUI } from '../../../../context/UIContext.jsx';


const ViewWorkout = () => {

    const {id} = useParams();
    const userId = localStorage.getItem('userId');
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const type = query.get('type');
    const navigate = useNavigate();
    const {showConfirmationModal, showMessage} = useUI();
   

    const [workoutData, setWorkoutData] = useState(null);
    
    
    
    

    const handleDeleteWorkout = async () =>{
        showMessage("Workout deleted successfully", 'confirm')
        await deleteItem('workouts', id)
        navigate('/library');
    }   
    const fetchWorkout = async () =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/workout/${id}`,{ withCredentials: true });
            if(response.data){
                setWorkoutData(response.data);
            }
        }catch(error){
            console.error(error);
            showMessage("Failed to fetch workout data", "error");
        }
    }
    useEffect(()=>{
        if(type && type === 'online'){
            fetchWorkout();
        }else if(type === 'cached'){
            getWorkoutFromDb('cachedWorkouts');
            showMessage("Restored cached workout data")
        }
        else{
            getWorkoutFromDb('workouts');
        }
    },[]);

    const getWorkoutFromDb = async (source) =>{
        const workout = await getItemById(source, id);
        setWorkoutData(workout);
    }
    const handleSaveWorkout = async () =>{
        if(type === 'online'){
            await saveItem('workouts', {...workoutData, sourceId: workoutData._id, _id: uuidv4()})
            navigate('/library');
            showMessage("Workout saved to library", "success");
        }
    }
    if(workoutData){

        return ( 
            <div className={styles.viewExercise}>
                <AppHeader title={workoutData.name} button={type !== 'online' && type !== 'cached' ? <Link to={`/workout/${workoutData._id}/start`} className={styles.startButton}>Start</Link> : <button onClick={handleSaveWorkout} className={styles.startButton}>Save</button>} />
                <div className={styles.content}>
                    <div className={styles.twoBlocks}>
                        <div className={styles.half}>
                            <b>Created at</b>
                            <p>{workoutData.createdAt ? formatDate(workoutData.createdAt) : 'Not set'}</p>
                        </div>
                        <div className={styles.half}>
                            <b>UpdatedAt</b>
                            <p>{workoutData.updatedAt ? formatDate(workoutData.updatedAt) : 'Not set'}</p>
                        </div>
                    </div>
                    <div className={styles.twoBlocks}>
                        <div className={styles.half}>
                            <b>Duration</b>
                            <p>{workoutData.duration} {workoutData.durationUnit}</p>
                        </div>
                        <div className={styles.half}>
                            <b>Difficulty</b>
                            <p>{makeFirstUpperCase(workoutData.difficulty)}</p>
                        </div>
                    </div>
                    <div className={styles.block}>
                        <div className={styles.half}>
                            <b>Reference (url)</b>
                            <p>{workoutData.reference || 'Not set'}</p>
                        </div>
                    </div>
                    <div className={styles.block}>
                        <b>Description</b>
                        <p>{workoutData.description}</p>
                    </div>
                    <div className={styles.block}>
                        <b>Notes</b>
                        <p>{workoutData.notes || 'Not set'}</p>
                    </div>
                    <div className={styles.block}>
                        <div className={styles.blockHeader}>
                            <img className={styles.blockIcon} src={IconLibrary.Tag} alt=''></img>
                            <p>Tags</p>
                        </div>
                        <div className={styles.tags}>
                            {workoutData.tags?.length > 0 ? workoutData.tags.map(tag=>(
                                <div className={styles.tag} key={tag.name}>
                                    <div className={styles.tagColor} style={{backgroundColor: tag.color}}></div>
                                    <p>{tag.name}</p>
                                </div>
                            )) : <p>No tags</p>}
                        </div>
                    </div>
                    <div className={styles.block}>
                        <div className={styles.blockHeader}>
                            <img className={styles.blockIcon} src={IconLibrary.Dumbbell} alt=''></img>
                            <p>Equipment</p>
                        </div>
                        <div className={styles.equipments}
                        >{workoutData.equipment?.length > 0 ? workoutData.equipment.map((eq)=>(
                            <div className={styles.equipment} key={eq.name}>
                                <p>{eq.name}</p>
                            </div>
                            )) : <p>No equipment needed</p>}</div>
                    </div>
                    <div className={styles.block}>
                        <div className={styles.blockHeader}>
                            <img className={styles.blockIcon} src={IconLibrary.Muscle} alt=''></img>
                            <p>Target Muscles</p>
                        </div>
                        <div className={styles.muscles}>
                            {workoutData.targetMuscles?.length > 0 ? workoutData.targetMuscles.map(group => <div key={group._id} className={styles.muscle}>{group.name}</div>) : <p>No target muscles provided</p>}
                        </div>
                    </div>
                    <div className={styles.block}>
                        <div className={styles.blockHeader}>
                            <img className={styles.blockIcon} src={IconLibrary.List} alt=''></img>
                            <p>Exercises</p>
                        </div>
                        <div className={styles.exercises}>
                            {workoutData.phases.length > 0 ? (
                                workoutData.phases.map((phase, phaseIndex) => (
                                <div className={styles.phase} key={'phase' + phaseIndex}>
                                    <h3>{phase.name}</h3>
                                    {phase.exercises.length > 0 ? (
                                        phase.exercises.map((exercise, index) => (
                                        <div className={styles.exercise} key={'exercise' + index}>
                                        <b>{exercise.name}</b>
                                        <p>x {exercise.sets}</p>
                                        </div>
                                    ))) : (<p>No exercises</p>)}
                                </div>
                                ))
                            ) : (
                                <p>No phases</p>
                            )}
                        </div>
                    </div>
                    {(userId === workoutData.author._id) || type !=='online' ? 
                        <div className={styles.bottomButtons}>
                            <button className={styles.exerciseButton} onClick={()=>showConfirmationModal({title: "Delete workout?", message: "Delete workout from your library? This cannot be undone.", onConfirm: handleDeleteWorkout})}>Delete</button>
                            <Link className={styles.exerciseButton} to={`/workout/${workoutData._id}/edit`}>Edit</Link> 
                        </div> 
                    : null}
                </div>
                 
                
            </div>
         );
    }else{
        return(
            <div className="page workout-page">
                <div className="header">
                    <div className="date">{getDateForHeader()}</div>
                    <h2>Workout loading</h2>
                </div>
                <h1>Loading...</h1>
            </div>
        )
    }
}
 
export default ViewWorkout;