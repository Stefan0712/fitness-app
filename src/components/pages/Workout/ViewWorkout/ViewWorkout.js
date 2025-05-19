import styles from './ViewWorkout.module.css';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { getDateForHeader, makeFirstUpperCase } from '../../../../helpers.js'
import { useState, useEffect } from 'react';
import { IconLibrary } from '../../../../IconLibrary.js';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import { getItemById, saveItem, deleteItem } from '../../../../db.js';
import AppHeader from '../../../common/AppHeader/AppHeader.tsx';


const ViewWorkout = () => {

    const {id} = useParams();
    const userId = localStorage.getItem('userId');
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const type = query.get('type');
    const navigate = useNavigate();
   

    const [workoutData, setWorkoutData] = useState(null);
    
    
    
    

    const handleDeleteWorkout = async () =>{
        await deleteItem('workouts', id)
        navigate('/library');
    }   
    const fetchWorkout = async () =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/workout/${id}`,{ withCredentials: true });
            if(response.data){
                setWorkoutData(response.data);
                
                console.log(response.data)
            }
        }catch(error){
            console.error(error)
        }
    }
    useEffect(()=>{
        if(type && type === 'online'){
            console.log("Online workout")
            fetchWorkout();
        }else if(type === 'cached'){
            getWorkoutFromDb('cachedWorkouts');
            console.log("Cached version of this workout");
        }
        else{
            console.log("Offline workout")
            getWorkoutFromDb('workouts');
        }
    },[]);

    const getWorkoutFromDb = async (source) =>{
        const workout = await getItemById(source, id);
        setWorkoutData(workout)
        console.log(workout, id)
    }
    const handleSaveWorkout = async () =>{
        if(type === 'online'){
            await saveItem('workouts', {...workoutData, sourceId: workoutData._id, id: uuidv4()})
            navigate('/library');
            console.log("Workout saved to library")
        }
        
    }
    if(workoutData){

        return ( 
            <div className={styles['view-workout-page']}>
                <AppHeader title={workoutData.name || 'View Workout'} button={type !== 'online' && type !== 'cached' ?  <Link to={`/workout/${workoutData.id}/start`} className={`${styles['start-workout-button']}`}>Start</Link>  :  <button className={`${styles['start-workout-button']}`} onClick={handleSaveWorkout}>Save</button> } />
               <div className={styles['view-workout-content']}>
               <div className={styles['workout-info']}>
                    <div className={`${styles['block']} ${styles['description-container']} ${styles['full-width']}`}>
                        <div className={styles['header']}>
                            <img className='small-icon' src={IconLibrary.InfoCircle} alt=''></img>
                            <p>Description</p>
                        </div>
                        <p className={styles['value']}>{workoutData.description || "Description not set"}</p>
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
           
                  {type === 'online' && workoutData.phases && workoutData.phases.length > 0 ? workoutData.phases.map((phase,index)=>(
                    <div style={{display: 'flex', flexDirection: 'column', gap:'10px'}} key={'phase-'+index}>
                        <b>{phase.name}</b>
                        {phase.exercises?.length > 0 ? phase.exercises.map((exercise, index)=>(
                            <div className={styles['exercise-body']} key={index+'ex'}>
                                <p className={styles['exercise-index']}>{index+1}</p>
                                <b className={styles['exercise-name']}>{exercise.name}</b>
                                <p className={styles['exercise-sets']}>{exercise.sets} sets</p>
                            </div>
                        )) : (<p>No exercises</p>)} 
                    </div>))
                   : (<p>Loading exercises</p>)} 

                  

                </div>
                {(userId === workoutData.author || type !== 'online') ? <div className={styles['bottom-buttons']}>
                    <button className={styles['menu-button']} onClick={handleDeleteWorkout}>Delete</button>
                    <Link  className={styles['menu-button']} to={`/workout/${workoutData.id}/edit`}>Edit</Link>
                </div> : null}
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