import './stylings/workout.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getDateForHeader } from '../../helpers'
import { useState, useEffect } from 'react';
import Modal from "./common/Modal";
import ContextualMenu from './common/ContextualMenu';
import { IconLibrary } from '../../IconLibrary';
import { exercises as databaseExercises, exercises } from '../../database';


//TODO: fix tags not properly showing when there are too many.
const ViewWorkout = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [modal, setModal] = useState(null)
    const [showMenu, setShowMenu] = useState(false);

    const [exercises, setExercises] = useState([]);
    const workoutData = useSelector((state)=>state.user.workouts.find((item)=>item.id === id));
    
    const libraryExercises = useSelector((state)=>state.user.exercises);
    
    
    
    
    const handleDelete = () =>{
        setModal(<Modal title={'Are you sure?'} message={'This will permanently delete this workout'} positiveOnClick={deleteWorkout} negativeOnClick={()=>(setModal(null))}/>)
    }
    const deleteWorkout = () =>{
        dispatch(deleteWorkout(id))
        setModal(null);
        navigate('/library');
    }   
    //function to search and populate each exercise based on the course
    const fetchExercises = () => {
        const fetchedExercises = workoutData.exercises.map((ex) => {
            if (ex.source === 'library') {
                return libraryExercises.find((el) => el.id === ex.id);
            }
            if (ex.source === 'database') {
                return databaseExercises.find((el) => el.id === ex.id);
            }
            return null; // Handle cases where source is invalid
        }).filter(Boolean); // Remove null values if any source is invalid
    
        setExercises(fetchedExercises);
    };
    

    useEffect(()=>{
        fetchExercises();
    },[])
    return ( 
        <div className="view-workout-page page">
            {modal ? modal : ''}
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>{workoutData.name}</h2>
                <button onClick={()=>setShowMenu(true)}>...</button>
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
                    <div className='info-block-value tags'>{workoutData.tags?.length > 0 ? workoutData.tags.map(tag=>(
                        <div className="tag-body" key={tag.id}>
                            <div className="tag-color" style={{backgroundColor: tag.color}}></div>
                            <div className="tag-name">{tag.name}</div>
                        </div>
                        )) : 'None'}</div>
                </div>
                <div className='info-block tags-block'>
                    <div className='info-block-header'>
                        <img className='small-icon white-icon' src={IconLibrary.Dumbbell} alt=''></img>
                        <p className='info-block-name'>Equipment</p>
                    </div>
                    <div className='info-block-value tags'>{workoutData.equipment && workoutData.equipment?.length > 0 ? workoutData.equipment.map(eq=>(
                        <div className="tag-body" key={eq.id}>
                            <div className="tag-color" style={{backgroundColor: eq.color}}></div>
                            <div className="tag-name">{eq.name}</div>
                        </div>
                        )) : (
                            <div className="tag-body" key={'default equipment'}>
                                <div className="tag-color" style={{backgroundColor: 'white'}}></div>
                                <div className="tag-name">None</div>
                            </div>
                        )}</div>
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
              {exercises?.length > 0 ? exercises.map((exercise, index)=>(
                    <div className='exercise-body' key={index+'ex'}>
                        <div className='exercise-name'><p className='exercise-index'>{index+1}</p><b>   {exercise.name} x {exercise.sets}</b></div>
                    </div>
              )) : (<p>Loading Exercises</p>)}
            </div>
            <Link to={`/workout/${workoutData.id}/start`} className='orange-button large-button'><img src={IconLibrary.Play}/></Link>
            {showMenu ? (<ContextualMenu closeMenu={()=>setShowMenu(false)} buttons={[<Link to={`/workout/${workoutData.id}/edit`}>Edit</Link>, <button onClick={handleDelete}>Delete</button>]} />) : ''}
        </div>
     );
}
 
export default ViewWorkout;