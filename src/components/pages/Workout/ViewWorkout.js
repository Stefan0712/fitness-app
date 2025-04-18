import './workout.css';
import styles from './ViewWorkout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getDateForHeader, makeFirstUpperCase } from '../../../helpers'
import { useState, useEffect } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import { exercises as databaseExercises } from '../../../database';
import { workouts as databaseWorkouts} from '../../../database';
import {v4 as uuidv4} from 'uuid';
import { addWorkout, deleteWorkout } from '../../../store/userSlice.ts';


const ViewWorkout = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
   


    const [exercises, setExercises] = useState([]);
    const libraryWorkouts = useSelector((state)=>state.user.workouts);

    const libraryWorkoutIndex = libraryWorkouts.findIndex(item=>item.id===id);
    const databaseWorkoutIndex = databaseWorkouts.findIndex(item=>item.id===id);

    const workoutData = libraryWorkoutIndex >=0 ? libraryWorkouts[libraryWorkoutIndex] : databaseWorkoutIndex >=0 ? databaseWorkouts[databaseWorkoutIndex] : null;
    const libraryExercises = useSelector((state)=>state.user.exercises);

    
    
    
    

    const handleDeleteWorkout = () =>{
        dispatch(deleteWorkout(id));
        navigate('/library');
    }   
    //function to search and populate each exercise based on the course
    const fetchExercises = () => {
        const fetchedExercises = workoutData.exercises.map((ex) => {
            
            const libraryExercise = libraryExercises.find(item=>item.id===ex);
            if(libraryExercise) return libraryExercise;
            const databaseExercise = databaseExercises.find(item=>item.id===ex);
            if(databaseExercise) return databaseExercise;
            console.log("Exercise was not found. ID: "+ex);
        }).filter(Boolean); // Remove null values if any source is invalid
        console.log(fetchedExercises)
        setExercises(fetchedExercises);
    };
    

    useEffect(()=>{
        fetchExercises();
    },[])

    const handleSaveWorkout = () =>{
        if(databaseWorkoutIndex >= 0 ){
            dispatch(addWorkout({...workoutData, sourceId: workoutData.id, id: uuidv4()}));
            navigate('/library');
        }
    }
    if(workoutData){

        return ( 
            <div className={styles['view-workout-page']}>
                <div className='header'>
                    <div className='date'>{getDateForHeader()}</div>
                    <h2>{workoutData.name}</h2>
                    {libraryWorkoutIndex >= 0 ? <Link to={`/workout/${workoutData.id}/start`} className={`${styles['start-workout-button']}`}>Start</Link> 
                    : <button className={`${styles['start-workout-button']}`} onClick={handleSaveWorkout}>Save</button> }
                </div>
               <div className={styles['view-workout-content']}>
               <div className={styles['workout-info']}>
                    <div className={`${styles['block']} ${styles['description-container']} ${styles['full-width']}`}>
                        <div className={styles['header']}>
                            <img className='small-icon' src={IconLibrary.InfoCircle} alt=''></img>
                            <p>Description</p>
                        </div>
                        <p className={styles['value']}>{workoutData.description}</p>
                    </div>
                    <div className={`${styles['block']} ${styles.groups}`}>
                        <div className={styles['header']}>
                            <img className='small-icon white-icon' src={IconLibrary.Tag} alt=''></img>
                            <p className={styles['name']}>Tags</p>
                        </div>
                        <div className={`${styles['tags-container']}`}>
                            {workoutData.tags?.length > 0 ? workoutData.tags.map(tag=>
                            (
                                <div className={styles["tag-body"]} key={tag.id}>
                                    <div className={styles["tag-color"]} style={{backgroundColor: tag.color}}></div>
                                    <div className={styles["tag-name"]}>{tag.name}</div>
                                </div>
                            )) : 'None'}
                        </div>
                    </div>
                    <div className={`${styles['block']} ${styles.equipments}`}>
                        <div className={styles['header']}>
                            <img className='small-icon white-icon' src={IconLibrary.Dumbbell} alt=''></img>
                            <p className={styles['name']}>Equipment</p>
                        </div>
                        <div className={`${styles['equipments-container']}`}>
                            {workoutData.equipment && workoutData.equipment?.length > 0 ? workoutData.equipment.map(eq=>(
                            <div className={styles["equipment"]} key={eq.id}>
                                <div className={styles["equipment-name"]}>{eq.name}</div>
                            </div>
                            )) : (
                                <div className={styles["equipment"]} key={'default equipment'}>
                                    <div className={styles["equipment-name"]}>None</div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={`${styles['block']} ${styles.groups}`}>
                        <div className={styles['header']}>
                            <img className='small-icon white-icon' src={IconLibrary.Muscle} alt=''></img>
                            <p className={styles['name']}>Target Muscles</p>
                        </div>
                        <p className={`${styles['groups-container']}`}>{workoutData.targetGroup?.length > 0 ? workoutData.targetGroup.map((group,index) =><p key={'group '+index}>{group.name}</p>  ) : 'None'}</p>
                    </div>
                    <div className={styles['block']}>
                        <div className={styles['header']}>
                            <img className='small-icon white-icon' src={IconLibrary.Dumbbell} alt=''></img>
                            <p className={styles['name']}>Difficulty</p>
                        </div>
                        <p className={styles['value']}>{workoutData.difficulty ? makeFirstUpperCase(workoutData.difficulty) : 'Not set'}</p>
                    </div>
                    <div className={styles['block']}>
                        <div className={styles['header']}>
                            <img className='small-icon white-icon' src={IconLibrary.Link} alt=''></img>
                            <p className={styles['name']}>Reference (url)</p>
                        </div>
                        <p className={styles['value']}>{workoutData.reference ? workoutData.reference : 'Not Set'}</p>
                    </div> 
                </div>
                <h3 className='subtitle full-width'>Exercises</h3>
                <div className={styles['workout-exercises']}>
                  {exercises?.length > 0 ? exercises.map((exercise, index)=>(
                        <div className={styles['exercise-body']} key={index+'ex'}>
                            <p className={styles['exercise-index']}>{index+1}</p>
                            <b className={styles['exercise-name']}>{exercise.name}</b>
                            <p className={styles['exercise-sets']}>{exercise.sets} sets</p>
                        </div>
                  )) : (<p>Loading Exercises</p>)} 
                </div>
                <div className={styles['bottom-buttons']}>
                    <button className={styles['menu-button']} onClick={handleDeleteWorkout}>Delete</button>
                    <Link  className={styles['menu-button']} to={`/workout/${workoutData.id}/edit`}>Edit</Link>
                </div>
               </div>
            </div>
         );
    }else{
        return(
            <div className="page workout-page">
                <div className="header">
                    <div className="date">{getDateForHeader()}</div>
                    <h2>Exercise loading</h2>
                </div>
                <h1>Loading...</h1>
            </div>
        )
    }
}
 
export default ViewWorkout;