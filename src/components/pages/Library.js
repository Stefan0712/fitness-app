import { getDateForHeader, makeFirstUpperCase } from "../../helpers";
import './stylings/library.css';
import arrowIcon from '../../assets/arrow.svg'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IconLibrary } from "../../IconLibrary";
import { useState } from "react";


const Library = () => {

    const exercises = useSelector((state)=>state.user.exercises);
    const workouts = useSelector((state)=>state.user.workouts);

    const [libraryScreen, setLibraryScreen] = useState('exercises');


    return ( 
        <div className="library page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Library</h2>
            </div>
            <div className="library-navigation">
                <button onClick={()=>setLibraryScreen('exercises')} className={libraryScreen === 'exercises' ? 'selected-button' : ''}>Exercises</button>
                <button onClick={()=>setLibraryScreen('workouts')} className={libraryScreen === 'workouts' ? 'selected-button' : ''}>Workouts</button>
            </div>
            {libraryScreen === "workouts" ? (
                <div className="library-items-container">
                {workouts?.length > 0 ? (
                    workouts.map((workout, index) => (
                    <Link to={`/workout/${workout.id}/view/`} key={index} className="item-body">
                        <div className="item-info">
                            <h4>{workout.name}</h4>
                            <div className="item-description">
                                <p>{workout.exercises.length} exercises</p>
                                <p>{makeFirstUpperCase(workout.targetGroup)}</p>
                            </div>
                        </div>
                        <div className="item-button">
                            <img className="small-icon" src={IconLibrary.Arrow} alt="icon" />
                        </div>
                    </Link>
                    ))
                ) : (
                    <p>No workouts created yet.</p>
                )}
            </div>
            ) : ""}
            {libraryScreen === "exercises" ? (
                <div className="library-items-container">
                {exercises?.length > 0 ? (
                    exercises.map((exercise, index) => (
                    <Link to={`/exercise/${exercise.id}/view/`} key={"exercise-"+index} className="item-body">
                        <div className="item-info">
                            <h4>{exercise.name}</h4>
                            <div className="item-description">
                                <p>{exercise.sets} Sets</p>
                                <p>{makeFirstUpperCase(exercise.targetGroup)}</p>
                            </div>
                        </div>
                        <div className="item-button">
                            <img className="small-icon" src={IconLibrary.Arrow} alt="icon" />
                        </div>
                    </Link>
                    ))
                ) : (
                    <p>No exercises created yet.</p>
                )}
                </div>
    
            ):''}
            <Link to={'/browse'} className="browse-button">Browse more</Link>
        </div>
     );
}
 
export default Library;