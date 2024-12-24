import './stylings/workout.css';
import caloriesIcon from '../../assets/calories.svg';
import dumbbellIcon from '../../assets/dumbbell.svg';
import timeIcon from '../../assets/time.svg';
import linkIcon from '../../assets/link.svg';
import muscleIcon from '../../assets/muscle.svg';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { convertGroupFromLowerToUpperCase, getDateForHeader } from '../../helpers'
import { workouts, exercises } from '../../database';
import { IconLibrary } from '../../IconLibrary';

const ViewBrowseWorkout = () => {

    const {id} = useParams();

    const workoutData = workouts.find((item)=>item.id === id);
    const workoutExercises =  workoutData ? exercises.filter((ex) => workoutData.exercises.includes(ex.id)) : []



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
                <div className='info-block'>
                    <div className='info-block-header'>
                        <img className='small-icon white-icon' src={caloriesIcon} alt=''></img>
                        <p className='info-block-name'>Calories</p>
                    </div>
                    <p className='info-block-value'>{workoutData.calories ? workoutData.calories : 'Not Set'}</p>
                </div>
                <div className='info-block'>
                    <div className='info-block-header'>
                        <img className='small-icon white-icon' src={muscleIcon} alt=''></img>
                        <p className='info-block-name'>Group</p>
                    </div>
                    <p className='info-block-value'>{workoutData.targetGroup ? convertGroupFromLowerToUpperCase(workoutData.targetGroup) : 'Not Set'}</p>
                </div>
                <div className='info-block'>
                    <div className='info-block-header'>
                        <img className='small-icon white-icon' src={timeIcon} alt=''></img>
                        <p className='info-block-name'>Duration</p>
                    </div>
                    <p className='info-block-value'>{workoutData.duration ? `${workoutData.duration} minutes` : 'Not Set'}</p>
                </div>
                <div className='info-block'>
                    <div className='info-block-header'>
                        <img className='small-icon white-icon' src={dumbbellIcon} alt=''></img>
                        <p className='info-block-name'>Exercises</p>
                    </div>
                    <p className='info-block-value'>{workoutData.exercises ? workoutData.exercises.length + ' exercises' : 'No Exercises'}</p>
                </div>
                <div className='info-block'>
                    <div className='info-block-header'>
                        <img className='small-icon white-icon' src={linkIcon} alt=''></img>
                        <p className='info-block-name'>Reference (url)</p>
                    </div>
                    <p className='info-block-value'>{workoutData.reference ? workoutData.reference : 'Not Set'}</p>
                </div>
              
               
            </div>
            <h3 className='subtitle full-width'>Exercises</h3>
            <div className='workout-exercises'>
                {workoutExercises.map((exercise, index)=>(
                    <div className='exercise-body' key={index+'ex'}>
                        <div className='exercise-name'><p className='exercise-index'>{index+1}</p><b>   {exercise.name}</b></div>
                        {exercise.fields[0] ? (<p>{exercise.fields[0]?.target} {exercise.fields[0]?.unit}</p>) : ''}
                        {exercise.fields[1] ? (<p>{exercise.fields[1]?.target} {exercise.fields[1]?.unit}</p>) : ''}
                    </div>
                ))}
            </div>
            <button className="browse-button"><img className="small-icon" src={IconLibrary.DownloadIcon}></img>Save to library</button>
        </div>
     );
}
 
export default ViewBrowseWorkout;