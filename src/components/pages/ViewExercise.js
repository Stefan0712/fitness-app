import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDateForHeader, makeFirstUpperCase } from "../../helpers";
import plusIcon from '../../assets/plus.svg';
import './stylings/exercise.css';


const ViewExercise = () => {

    const {id} = useParams();
    const exerciseData = useSelector((state)=>state.user.exercises.find(item => item.id === id));
    const workouts = useSelector((state)=>state.user.workouts);
    
    return ( 
        <div className="view-exercise page">
            <div className='header'>
                <div className='date'>{getDateForHeader}</div>
                <h2>{exerciseData.name}</h2>
                <p><b className="white-50">{makeFirstUpperCase(exerciseData.targetGroup)}</b></p>
            </div>
            <div className="exercise-info section">
                <p><b>Description</b></p>
                <p className="full-width white-50">{exerciseData.description}</p>
                <p><b>Fields</b></p>
                <div className="exercise-fields">
                    {exerciseData.fields.map((fields)=>(
                        <div className="field-body">
                            <p>{fields.name}</p><p> {fields.target}</p>
                        </div>
                    ))}
                </div>

            </div>
            <h3 className="subtitle full-width">Add exercise to a workout</h3>
            <div className="workouts-container section">
            {workouts.length > 0 ? (
                    workouts.map((workout, index) => (
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
                            <button className="orange-button small-square">
                                <img className="small-icon white-icon" src={plusIcon} alt="plus icon" />
                            </button>
                        </div>
                    </div>
                    ))
                ) : (
                    <p>No exercises created yet.</p>
                )}
            </div>
            
        </div>
     );
}
 
export default ViewExercise;