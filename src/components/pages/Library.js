import { getDateForHeader, makeFirstUpperCase } from "../../helpers";
import './stylings/library.css';
import arrowIcon from '../../assets/arrow.svg'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const Library = () => {

    const exercises = useSelector((state)=>state.user.exercises);
    const workouts = useSelector((state)=>state.user.workouts);


    return ( 
        <div className="library page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Library</h2>
            </div>
            <div className="library-buttons">
                <Link to={'/create-workout'} className="orange-button large-button">Create Workout</Link>
                <Link to={'/create-exercise'} className="orange-button large-button">Create Exercise</Link>
            </div>
            <div className="subtitle full-width"><h3>Browse Workouts</h3><p className="orange-text">See more</p></div>
            <div className="library-items-container">
                {workouts?.length > 0 ? (
                    workouts.map((workout, index) => (
                    <div key={index} className="item-body">
                        <div className="item-info">
                            <h4>{workout.name}</h4>
                            <div className="item-description">
                                <p>{workout.exercises.length} exercises</p>
                                <p>{makeFirstUpperCase(workout.targetGroup)}</p>
                            </div>
                        </div>
                        <div className="item-button">
                        <Link to={`/workout/${workout.id}/view/`} className="orange-button medium-square">
                            <img className="small-icon white-icon" src={arrowIcon} alt="arrow icon" />
                        </Link>
                        </div>
                    </div>
                    ))
                ) : (
                    <p>No workouts created yet.</p>
                )}
            </div>
            <div className="subtitle full-width"><h3>Browse exercises</h3><p className="orange-text">See more</p></div>
            <div className="library-items-container">
            {exercises?.length > 0 ? (
                exercises.map((exercise, index) => (
                <div key={"exercise-"+index} className="item-body">
                    <div className="item-info">
                        <h4>{exercise.name}</h4>
                        <div className="item-description">
                            <p>{exercise.sets} Sets</p>
                            <p>{makeFirstUpperCase(exercise.targetGroup)}</p>
                        </div>
                    </div>
                    <div className="item-button">
                    <Link to={`/exercise/${exercise.id}/view/`} className="orange-button medium-square">
                        <img className="small-icon white-icon" src={arrowIcon} alt="arrow icon" />
                    </Link>
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
 
export default Library;