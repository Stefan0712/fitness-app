import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { convertGroupFromLowerToUpperCase, getDateForHeader, makeFirstUpperCase } from "../../helpers";
import plusIcon from '../../assets/plus.svg';
import muscleIcon from '../../assets/muscle.svg';
import timeIcon from '../../assets/time.svg';
import './stylings/exercise.css';
import { useDispatch } from "react-redux";
import { addExerciseToWorkout, deleteExercise } from "../../store/userSlice";
import { useState } from "react";
import ContextualMenu from './common/ContextualMenu';
import Modal from "./common/Modal";



const ViewExercise = () => {

    const {id} = useParams();
    const exerciseData = useSelector((state)=>state.user.exercises.find(item => item.id === id));
    const workouts = useSelector((state)=>state.user.workouts);
    const [modal, setModal] = useState(null)
    console.log(exerciseData)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    const addExerciseToAnotherWorkout = (workoutId) =>{
        dispatch(addExerciseToWorkout({workoutId, exerciseId: id}));
    }

    const handleDelete = (id) =>{
        setModal(<Modal title={'Are you sure?'} message={'This will permanently delete this exercise'} positiveOnClick={()=>deleteEx(id)} negativeOnClick={()=>(setModal(null))}/>)
    }
    const deleteEx = (id) =>{
        dispatch(deleteExercise(id))
        setModal(null);
        navigate('/library');
        
    }
    return ( 
        <div className="view-exercise page">
            {modal ? modal : ''}
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>{exerciseData.name}</h2>
                <button onClick={()=>setShowMenu(true)}>...</button>
            </div>
            <div className="exercise-info">
                <div className='workout-description'>
                    <p className='full-width subtle-subtitle'><b>Description</b></p>
                    <p className='full-width'>{exerciseData.description}</p>
                </div>

                <div className='info-block'>
                    <div className='info-block-header'>
                        <img className='small-icon white-icon' src={muscleIcon} alt=''></img>
                        <p className='info-block-name'>Group</p>
                    </div>
                    <p className='info-block-value'>{exerciseData.targetGroup ? convertGroupFromLowerToUpperCase(exerciseData.targetGroup) : 'Not Set'}</p>
                </div>
                <div className='info-block'>
                    <div className='info-block-header'>
                        <img className='small-icon white-icon' src={timeIcon} alt=''></img>
                        <p className='info-block-name'>Duration</p>
                    </div>
                    <p className='info-block-value'>{exerciseData.duration ? `${exerciseData.duration} minutes` : 'Not Set'}</p>
                </div>
                <div className="full-width exercise-fields">
                    <div className="field-body fields-header">
                        <p id="field-name">Field Name</p>
                        <p id="field-target">Target</p>
                        <p id="field-unit">Unit</p>
                    </div>
                    {exerciseData.fields.map((fields, index)=>(
                        <div className="field-body" key={'field'+index}>
                            <p id="field-name">{fields.name}</p>
                            <p id="field-target">{fields.target}</p>
                            <p id="field-unit">{fields.unit}</p>
                        </div>
                    ))}
                </div>

            </div>
            <div className="workouts-container section full-width">
            <h3 className="subtitle">Save to</h3>
            {workouts.length > 0 ? (
                    workouts.map((workout, index) => workout.exercises.some((ex)=>ex.id === exerciseData.id) ? '' : (
                    <div key={index} className="item-body">
                        <div className="item-info">
                            <h4>{workout.name}</h4>
                            <div className="item-description">
                                <p>{workout.exercises.length} exercises</p>
                                <p>{makeFirstUpperCase(workout.targetGroup)}</p>
                                <p>{makeFirstUpperCase(workout.difficulty)}</p>
                            </div>
                        </div>
                        <div className="item-button">
                            <button className="add-item" onClick={()=>addExerciseToAnotherWorkout(workout.id)}>
                                <img className="white-icon" src={plusIcon} alt="plus icon" />
                            </button>
                        </div>
                    </div>
                    ))
                ) : (
                    <p>No exercises created yet.</p>
                )}
            </div>

            {showMenu ? (<ContextualMenu closeMenu={()=>setShowMenu(false)} buttons={[<Link to={`/exercise/${exerciseData.id}/edit`}>Edit</Link>, <button onClick={handleDelete}>Delete</button>]} />) : ''}
        </div>
     );
}
 
export default ViewExercise;