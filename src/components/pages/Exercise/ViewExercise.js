import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import './exercise.css';
import { useState } from "react";
import { getDateForHeader, makeFirstUpperCase } from "../../../helpers";
import { deleteExercise } from "../../../store/userSlice.ts";
import { IconLibrary } from "../../../IconLibrary";
import { exercises as databaseExercises } from "../../../database.js";



const ViewExercise = () => {

    const {id} = useParams();
    const libraryExercises = useSelector((state)=>state.user.exercises);

    const libraryExerciseIndex = libraryExercises.findIndex(item=>item.id===id);
    const databaseExerciseIndex = databaseExercises.findIndex(item=>item.id===id);

    const exerciseData = libraryExerciseIndex >=0 ? libraryExercises[libraryExerciseIndex] : databaseExerciseIndex >=0 ? databaseExercises[databaseExerciseIndex] : null;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);



    const deleteEx = (id) =>{
        dispatch(deleteExercise(id))
        navigate('/library');
           
    }
    if(exerciseData){

        return ( 
            <div className="view-exercise page">
                <div className='header'>
                    <div className='date'>{getDateForHeader()}</div>
                    <h2>{exerciseData?.name}</h2>
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
                        <div className='info-block-value tags'>{exerciseData.tags?.length > 0 ? exerciseData.tags.map(tag=>(
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
                            <img className='small-icon white-icon' src={IconLibrary.Time} alt=''></img>
                            <p className='info-block-name'>Difficulty</p>
                        </div>
                        <p className='info-block-value'>{exerciseData.difficulty ? makeFirstUpperCase(exerciseData.difficulty) : 'Not Set'}</p>
                    </div>
                    <div className='info-block fields'>
                        <div className='info-block-header'>
                            <img className='small-icon white-icon' src={IconLibrary.List} alt=''></img>
                            <p className='info-block-name'>Fields</p>
                        </div>
                        <div className='info-block-value'>
                            {exerciseData?.fields && exerciseData.fields.length > 0 ? (
                                <div className="full-width exercise-fields">
                                    {exerciseData?.fields?.map((fields, index)=>(
                                        <div className="field-body" key={'field'+index}>
                                            <p id="field-name">{fields.name}</p>
                                            <p id="field-target">{fields.target}</p>
                                            <p id="field-unit">{fields.unit}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    </div>
                    
                    <div className="info-block full-width exercise-fields">
                        <div className='info-block-header'>
                            <p className='info-block-name'>Steps</p>
                        </div>
                        {exerciseData.steps?.length > 0 ? exerciseData.steps.map((step, index) => (<p>{index}. {step}</p>)) : 'None'}
                    </div>
                    <div className='view-workout-buttons'>
                        <div className='view-workout-menu-buttons'>
                            {showConfirmDelete ? (
                                <div className='buttons-container'>
                                    <button className='view-workout-menu-button' onClick={deleteEx}><img className='small-icon' src={IconLibrary.Yes} alt=''/></button>
                                    <div className='divider' />
                                    <button className='view-workout-menu-button' onClick={()=>setShowConfirmDelete(false)}><img className='small-icon' src={IconLibrary.No} alt=''/></button>
                                </div>
                            ):(
                                <div className='buttons-container'>
                                    <button className='view-workout-menu-button' onClick={()=>setShowConfirmDelete(true)}>Delete</button>
                                    <div className='divider' />
                                    <Link className='view-workout-menu-button' to={`/exercise/${exerciseData.id}/edit`}>Edit</Link>
                                </div>
                            )}
                            
                        </div>
                        <Link to={`/exercise/${exerciseData.id}/start`} className='orange-button large-button start-workout-button'>Start Exercise</Link>
                    </div>
                </div>
    
            </div>
         );
    }else{
        return(
            <div className="page exercise-page">
                <div className="header">
                    <div className="date">{getDateForHeader()}</div>
                    <h2>Exercise loading</h2>
                </div>
                <h1>Loading...</h1>
            </div>
        )
    }
}
 
export default ViewExercise;