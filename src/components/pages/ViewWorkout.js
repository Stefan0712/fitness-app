import './stylings/workout.css';
import caloriesIcon from '../../assets/calories.svg';
import dumbbellIcon from '../../assets/dumbbell.svg';
import timeIcon from '../../assets/time.svg';
import linkIcon from '../../assets/link.svg';
import muscleIcon from '../../assets/muscle.svg';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getDateForHeader } from '../../helpers'
import { useState } from 'react';
import Modal from "./common/Modal";



const ViewWorkout = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [modal, setModal] = useState(null)



   
   


    const workoutData = useSelector((state)=>state.user.workouts.find((item)=>item.id === id));
    const exercises = useSelector((state) => workoutData ? 
            state.user.exercises.filter((ex) => workoutData.exercises.includes(ex.id))
          : []
    );
    const handleDelete = () =>{
        setModal(<Modal title={'Are you sure?'} message={'This will permanently delete this workout'} positiveOnClick={deleteWorkout} negativeOnClick={()=>(setModal(null))}/>)
    }
    const deleteWorkout = () =>{
        dispatch(deleteWorkout(id))
        setModal(null);
        navigate('/library');
    }   

    return ( 
        <div className="view-workout-page page">
            {modal ? modal : ''}
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>{workoutData.name}</h2>
                <Link to={`/workout/${workoutData.id}/edit`} className="transparent-bg"><img src={'/icons/edit.svg'} className="small-icon" alt="edit"></img></Link>
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
                {exercises.map((exercise, index)=>(
                    <div className='exercise-body' key={index+'ex'}>
                        <p><b>{index+1}.   {exercise.name}</b></p>
                    </div>
                ))}
            </div>
            <Link to={`/workout/${workoutData.id}/start`} className='orange-button large-button'>Start</Link>
            <button className="danger-button" onClick={handleDelete}>Delete Workout</button>
        </div>
     );
}
 
export default ViewWorkout;