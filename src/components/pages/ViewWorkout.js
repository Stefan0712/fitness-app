import './stylings/workout.css';
import caloriesIcon from '../../assets/calories.svg';
import dumbbellIcon from '../../assets/dumbbell.svg';
import timeIcon from '../../assets/time.svg';
import linkIcon from '../../assets/link.svg';
import muscleIcon from '../../assets/muscle.svg';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getDateForHeader } from '../../helpers'
import { useState } from 'react';


const ViewWorkout = () => {

    const {id} = useParams();
    const workoutData = useSelector((state)=>state.user.workouts.find((item)=>item.id === id));


    return ( 
        <div className="view-workout-page page">
            <div className='header'>
                <div className='date'>{getDateForHeader}</div>
                <h2>{workoutData.name}</h2>
            </div>
            <div className='workout-info'>
                <p className='full-width'>{workoutData.description}</p>
                <div className='info-block'>
                    <img className='small-icon white-icon' src={caloriesIcon} alt=''></img>
                    <p>{workoutData.calories ? workoutData.calories : 'Not Set'}</p>
                </div>
                <div className='info-block'>
                    <img className='small-icon' src={muscleIcon} alt=''></img>
                    <p>{workoutData.targetGroup ? workoutData.targetGroup : 'Not Set'}</p>
                </div>
                <div className='info-block'>
                    <img className='small-icon white-icon' src={timeIcon} alt=''></img>
                    <p>{workoutData.duration ? workoutData.duration : 'Not Set'}</p>
                </div>
                <div className='info-block'>
                    <img className='small-icon white-icon' src={dumbbellIcon} alt=''></img>
                    <p>{workoutData.exercises ? workoutData.exercises.length + ' exercises' : 'No Exercises'}</p>
                </div>
                <div className='info-block'>
                    <img className='small-icon full-width white-icon' src={linkIcon} alt=''></img>
                    <p>{workoutData.reference ? workoutData.reference : 'Not Set'}</p>
                </div>
            </div>
            <h3 className='subtitle full-width'>Exercises</h3>
            <div className='workout-exercises'>
                {workoutData.exercises.map((exercise, index)=>(
                    <div className='exercise-body'>
                        <p><b>{index+1}.   {exercise.name}</b></p>
                    </div>
                ))}
            </div>
            <Link to={`/workout/${workoutData.id}/start`} className='orange-button large-button'>Start</Link>
        </div>
     );
}
 
export default ViewWorkout;