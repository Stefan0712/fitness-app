import './workout.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getDateForHeader } from '../../../helpers'
import { workouts, exercises } from '../../../database';
import { IconLibrary } from '../../../IconLibrary';
import { saveWorkoutToLibrary } from '../../../store/userSlice.ts';

const ViewBrowseWorkout = () => {

    const {id} = useParams();
    const dispatch = useDispatch();

    const workoutData = workouts.find((item)=>item.id === id);
    const workoutExercises =  workoutData ? exercises.filter((ex) => workoutData.exercises.includes(ex.id)) : [];
    const exercisesLibrary = useSelector((state)=>state.user.exercises);
    const workoutsLibrary = useSelector((state)=>state.user.workouts);


//TODO: Merge this page with the original View Workout component 


    return ( 
        <div className="view-workout-page page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>{workoutData.name}</h2>
            </div>
            <div className='workout-info'>
                <div className='workout-description'>
                    <p className='full-width subtle-subtitle'><b>Description</b></p>
                    <p className='full-width'>{workoutData.description}</p>
                </div>
                <div className='info-block tags-block'>
                    <div className='info-block-header'>
                        <img className='small-icon white-icon' src={IconLibrary.Tag} alt=''></img>
                        <p className='info-block-name'>Tags</p>
                    </div>
                    <p className='info-block-value tags'>{workoutData.tags?.length > 0 ? workoutData.tags.map(tag=>(
                        <div className="tag-body" key={tag.id}>
                            <div className="tag-color" style={{backgroundColor: tag.color}}></div>
                            <div className="tag-name">{tag.name}</div>
                        </div>
                        )) : 'None'}</p>
                </div>
                <div className='info-block tags-block'>
                    <div className='info-block-header'>
                        <img className='small-icon white-icon' src={IconLibrary.Dumbbell} alt=''></img>
                        <p className='info-block-name'>Equipment</p>
                    </div>
                    <p className='info-block-value tags'>{workoutData.equipment?.length > 0 ? workoutData.equipment.map(eq=>(
                        <div className="tag-body" key={eq.id}>
                            <div className="tag-color" style={{backgroundColor: eq.color}}></div>
                            <div className="tag-name">{eq.name}</div>
                        </div>
                        )) : 'None'}</p>
                </div>
                <div className='info-block'>
                    <div className='info-block-header'>
                        <img className='small-icon white-icon' src={IconLibrary.Calories} alt=''></img>
                        <p className='info-block-name'>Calories</p>
                    </div>
                    <p className='info-block-value'>{workoutData.calories ? workoutData.calories : 'Not Set'}</p>
                </div>
                <div className='info-block'>
                    <div className='info-block-header'>
                        <img className='small-icon white-icon' src={IconLibrary.Muscle} alt=''></img>
                        <p className='info-block-name'>Group</p>
                    </div>
                    <p className='info-block-value'>{workoutData.targetGroup?.length > 0 ? workoutData.targetGroup.map(group => group.name + ' ') : 'None'}</p>
                </div>
                <div className='info-block'>
                    <div className='info-block-header'>
                        <img className='small-icon white-icon' src={IconLibrary.Folder} alt=''></img>
                        <p className='info-block-name'>Category</p>
                    </div>
                    <p className='info-block-value'>{workoutData.category ? workoutData.category.name : 'None'}</p>
                </div>
                <div className='info-block'>
                    <div className='info-block-header'>
                        <img className='small-icon white-icon' src={IconLibrary.Time} alt=''></img>
                        <p className='info-block-name'>Duration</p>
                    </div>
                    <p className='info-block-value'>{workoutData.duration ? `${workoutData.duration} minutes` : 'Not Set'}</p>
                </div>
                <div className='info-block'>
                    <div className='info-block-header'>
                        <img className='small-icon white-icon' src={IconLibrary.Dumbbell} alt=''></img>
                        <p className='info-block-name'>Difficulty</p>
                    </div>
                    <p className='info-block-value'>{workoutData.difficulty ? workoutData.difficulty : 'Not set'}</p>
                </div>
                <div className='info-block'>
                    <div className='info-block-header'>
                        <img className='small-icon white-icon' src={IconLibrary.Link} alt=''></img>
                        <p className='info-block-name'>Reference (url)</p>
                    </div>
                    <p className='info-block-value'>{workoutData.reference ? workoutData.reference : 'Not Set'}</p>
                </div>
                <div className="info-block tags-block">
                    <div className='info-block-header'>
                        <p className='info-block-name'>Notes</p>
                    </div>
                    <p className='info-block-value'>{workoutData.notes ? workoutData.notes : 'None'}</p>
                </div>
               
            </div>
            <h3 className='subtitle full-width'>Exercises</h3>
            <div className='workout-exercises'>
                {workoutExercises.map((exercise, index)=>(
                    <div className='exercise-body' key={index+'ex'}>
                        <div className='exercise-name'><p className='exercise-index'>{index+1}</p><b>   {exercise.name} x {exercise.sets}</b></div>
                        
                    </div>
                ))}
            </div>
            {!workoutsLibrary.some(userWorkout => userWorkout.sourceId === workoutData.id) ? (
                <button onClick={()=>dispatch(saveWorkoutToLibrary(workoutData))} className="orange-button"><img className="small-icon" src={IconLibrary.Download}></img></button>         
            ) : (<button className="browse-button">Saved</button>)}
            
            
        </div>
     );
}
 
export default ViewBrowseWorkout;