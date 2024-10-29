import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDateForHeader, makeFirstUpperCase } from "../../helpers";
import plusIcon from '../../assets/plus.svg';


const ViewExercise = () => {

    const {id} = useParams();
    const exerciseData = useSelector((state)=>state.user.createdExercises.find(item => item.id === id));
    const createdWorkouts = useSelector((state)=>state.user.createdWorkouts);
    
    return ( 
        <div className="view-exercise page">
            <div className='header'>
                <div className='date'>{getDateForHeader}</div>
                <h2>{exerciseData.name}</h2>
            </div>
            <p>{makeFirstUpperCase(exerciseData.targetGroup)}</p>
            <div className="exercise-info">
                <p className="full-width">{exerciseData.description}</p>
                <p>Exercise Fields</p>
                <div className="exercise-fields">
                    {exerciseData.fields.map((fields)=>(
                        <div className="field-body">
                            <p>{fields.name} - {fields.unit}</p>
                        </div>
                    ))}
                </div>

            </div>
            <h3 className="subtitle full-width">Add exercise to a workout</h3>

            <div className="workouts-container">
            {createdWorkouts.length > 0 ? (
                    createdWorkouts.map((workout, index) => (
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