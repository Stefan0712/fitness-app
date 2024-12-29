import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { convertGroupFromLowerToUpperCase, getDateForHeader, makeFirstUpperCase } from "../../helpers";
import './stylings/exercise.css';
import { useDispatch } from "react-redux";
import { addExerciseToWorkout, deleteExercise } from "../../store/userSlice";
import { useState } from "react";
import ContextualMenu from './common/ContextualMenu';
import Modal from "./common/Modal";
import { IconLibrary } from "../../IconLibrary";



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
                <div className='info-block tags-block'>
                    <div className='info-block-header'>
                        <img className='small-icon white-icon' src={IconLibrary.Tag} alt=''></img>
                        <p className='info-block-name'>Tags</p>
                    </div>
                    <p className='info-block-value tags'>{exerciseData.tags?.length > 0 ? exerciseData.tags.map(tag=>(
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
                    <p className='info-block-value tags'>{exerciseData.equipment?.length > 0 ? exerciseData.equipment.map(eq=>(
                        <div className="tag-body" key={eq.id}>
                            <div className="tag-color" style={{backgroundColor: eq.color}}></div>
                            <div className="tag-name">{eq.name}</div>
                        </div>
                        )) : 'None'}</p>
                </div>
                <div className='info-block'>
                    <div className='info-block-header'>
                        <img className='small-icon white-icon' src={IconLibrary.Muscle} alt=''></img>
                        <p className='info-block-name'>Group</p>
                    </div>
                    <p className='info-block-value'>{exerciseData.targetGroup?.length > 0 ? exerciseData.targetGroup.map(group => group + ' ') : 'None'}</p>
                </div>
                <div className='info-block'>
                    <div className='info-block-header'>
                        <img className='small-icon white-icon' src={IconLibrary.Folder} alt=''></img>
                        <p className='info-block-name'>Category</p>
                    </div>
                    <p className='info-block-value'>{exerciseData.category ? exerciseData.category.name : 'None'}</p>
                </div>
                <div className='info-block'>
                    <div className='info-block-header'>
                        <img className='small-icon white-icon' src={IconLibrary.Time} alt=''></img>
                        <p className='info-block-name'>Duration</p>
                    </div>
                    <p className='info-block-value'>{exerciseData.duration ? `${exerciseData.duration} minutes` : 'Not Set'}</p>
                </div>
                <div className='info-block'>
                    <div className='info-block-header'>
                        <img className='small-icon white-icon' src={IconLibrary.Time} alt=''></img>
                        <p className='info-block-name'>Difficulty</p>
                    </div>
                    <p className='info-block-value'>{exerciseData.difficulty ? exerciseData.difficulty : 'Not Set'}</p>
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
                <div className="info-block tags-block">
                    <div className='info-block-header'>
                        <p className='info-block-name'>Notes</p>
                    </div>
                    <p className='info-block-value'>{exerciseData.notes ? exerciseData.notes : 'None'}</p>
                </div>
                <div className="full-width exercise-fields">
                <div className='info-block-header'>
                        <p className='info-block-name'>Steps</p>
                    </div>
                    {exerciseData.steps?.length > 0 ? exerciseData.steps.map((step, index) => (<p>{index}. {step}</p>)) : 'None'}
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
                                <p>{makeFirstUpperCase(workout.category.name)}</p>
                            </div>
                        </div>
                        <div className="item-button">
                            <button className="add-item" onClick={()=>addExerciseToAnotherWorkout(workout.id)}>
                                <img className="white-icon" src={IconLibrary.Add} alt="plus icon" />
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