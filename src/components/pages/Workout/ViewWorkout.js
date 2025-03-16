import './workout.css';
import styles from './ViewWorkout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getDateForHeader } from '../../../helpers'
import { useState, useEffect } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import { exercises as databaseExercises } from '../../../database';


//TODO: fix tags not properly showing when there are too many.
const ViewWorkout = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [showConfirmDelete, setShowConfirmDelete] = useState(false)

    const [exercises, setExercises] = useState([]);
    const workoutData = useSelector((state)=>state.user.workouts.find((item)=>item.id === id));
    
    const libraryExercises = useSelector((state)=>state.user.exercises);

    
    
    
    

    const deleteWorkout = () =>{
        dispatch(deleteWorkout(id))
        navigate('/library');
    }   
    //function to search and populate each exercise based on the course
    const fetchExercises = () => {
        const fetchedExercises = workoutData.exercises.map((ex) => {
            
            const tempEx = typeof ex === 'string' ? databaseExercises.find(item => item.id === ex) : ex;
            
            if (tempEx.source === 'library') {
                return libraryExercises.find((el) => el.id === tempEx.id);
            }
            if (tempEx.source === 'database') {
                return databaseExercises.find((el) => el.id === tempEx.id);
            }
            return null; // Handle cases where source is invalid
        }).filter(Boolean); // Remove null values if any source is invalid
        console.log(fetchedExercises)
        setExercises(fetchedExercises);
    };
    

    useEffect(()=>{
        fetchExercises();
    },[])
    return ( 
        <div className={styles['view-workout-page']}>
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>{workoutData.name}</h2>
                
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
                <div className={`${styles['block']} ${styles['tags']} ${styles['full-width']}`}>
                    <div className={styles['header']}>
                        <img className='small-icon white-icon' src={IconLibrary.Tag} alt=''></img>
                        <p className={styles['name']}>Tags</p>
                    </div>
                    <div className={`${styles['block']} ${styles['tags-container']}`}>{workoutData.tags?.length > 0 ? workoutData.tags.map(tag=>
                        (
                            <div className={styles["tag-body"]} key={tag.id}>
                                <div className={styles["tag-color"]} style={{backgroundColor: tag.color}}></div>
                                <div className={styles["tag-name"]}>{tag.name}</div>
                            </div>
                        )) : 'None'}
                    </div>
                </div>
                <div className={`${styles['block']} ${styles['tags']} ${styles['full-width']}` }>
                    <div className={styles['header']}>
                        <img className='small-icon white-icon' src={IconLibrary.Dumbbell} alt=''></img>
                        <p className={styles['name']}>Equipment</p>
                    </div>
                    <div className={`${styles['block']} ${styles['tags-container']}`}>
                        {workoutData.equipment && workoutData.equipment?.length > 0 ? workoutData.equipment.map(eq=>(
                        <div className={styles["tag-body"]} key={eq.id}>
                            <div className={styles["tag-color"]} style={{backgroundColor: eq.color}}></div>
                            <div className={styles["tag-name"]}>{eq.name}</div>
                        </div>
                        )) : (
                            <div className={styles["tag-body"]} key={'default equipment'}>
                                <div className={styles["tag-color"]} style={{backgroundColor: 'white'}}></div>
                                <div className={styles["tag-name"]}>None</div>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles['block']}>
                    <div className={styles['header']}>
                        <img className='small-icon white-icon' src={IconLibrary.Calories} alt=''></img>
                        <p className={styles['name']}>Calories</p>
                    </div>
                    <p className={styles['value']}>{workoutData.calories ? workoutData.calories : 'Not Set'}</p>
                </div>
                <div className={styles['block']}>
                    <div className={styles['header']}>
                        <img className='small-icon white-icon' src={IconLibrary.Muscle} alt=''></img>
                        <p className={styles['name']}>Group</p>
                    </div>
                    <p className={styles['value']}>{workoutData.targetGroup?.length > 0 ? workoutData.targetGroup.map(group => group.name + ' ') : 'None'}</p>
                </div>
                <div className={styles['block']}>
                    <div className={styles['header']}>
                        <img className='small-icon white-icon' src={IconLibrary.Folder} alt=''></img>
                        <p className={styles['name']}>Category</p>
                    </div>
                    <p className={styles['value']}>{workoutData.category ? workoutData.category.name : 'None'}</p>
                </div>
                <div className={styles['block']}>
                    <div className={styles['header']}>
                        <img className='small-icon white-icon' src={IconLibrary.Time} alt=''></img>
                        <p className={styles['name']}>Duration</p>
                    </div>
                    <p className={styles['value']}>{workoutData.duration ? `${workoutData.duration} minutes` : 'Not Set'}</p>
                </div>
                <div className={styles['block']}>
                    <div className={styles['header']}>
                        <img className='small-icon white-icon' src={IconLibrary.Dumbbell} alt=''></img>
                        <p className={styles['name']}>Difficulty</p>
                    </div>
                    <p className={styles['value']}>{workoutData.difficulty ? workoutData.difficulty : 'Not set'}</p>
                </div>
                <div className={styles['block']}>
                    <div className={styles['header']}>
                        <img className='small-icon white-icon' src={IconLibrary.Link} alt=''></img>
                        <p className={styles['name']}>Reference (url)</p>
                    </div>
                    <p className={styles['value']}>{workoutData.reference ? workoutData.reference : 'Not Set'}</p>
                </div>
                <div className={`${styles['block']}  ${styles['notes-container']} ${styles['full-width']}`}>
                    <div className={styles['header']}>
                        <p className={styles['notes']}>Notes</p>
                    </div>
                    <p className={styles['value']}>{workoutData.notes ? workoutData.notes : 'None'}</p>
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
            <div className={styles['buttons']}>
                <div className={styles['menu-buttons']}>
                    {showConfirmDelete ? (
                        <div className={styles['buttons-container']}>
                            <button className={styles['menu-button']} onClick={deleteWorkout}><img className='small-icon' src={IconLibrary.Yes} alt=''/></button>
                            <div className={styles['divider']} />
                            <button className={styles['menu-button']} onClick={()=>setShowConfirmDelete(false)}><img className='small-icon' src={IconLibrary.No} alt=''/></button>
                        </div>
                    ):(
                        <div className={styles['buttons-container']}>
                            <button className={styles['menu-button']} onClick={()=>setShowConfirmDelete(true)}>Delete</button>
                            <div className={styles['divider']} />
                            <Link  className={styles['menu-button']} to={`/workout/${workoutData.id}/edit`}>Edit</Link>
                        </div>
                    )}
                </div>
                <Link to={`/workout/${workoutData.id}/start`} className={`orange-button large-button ${styles['start-workout-button']}`}>Start Workout</Link>
            </div>
           </div>
        </div>
     );
}
 
export default ViewWorkout;