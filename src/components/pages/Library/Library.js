import { getDateForHeader } from "../../../helpers";
import './library.css';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IconLibrary } from "../../../IconLibrary";
import { useState } from "react";


const Library = () => {

    const exercises = useSelector((state)=>state.user.exercises);
    const workouts = useSelector((state)=>state.user.workouts);


    const [libraryScreen, setLibraryScreen] = useState('exercises');

    //TODO: Move Browse more button and maybe use only an icon

    return ( 
        <div className="library page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Library</h2>
            </div>
            <div className="explore-buttons">
                <Link to={'/explore-exercises'} className="explore-button">
                    <img src={IconLibrary.Exercise} className="small-icon"></img>
                    <p>Explore exercises</p>
                </Link>
                <Link to={'/explore-workouts'} className="explore-button">
                    <img src={IconLibrary.Dumbbell} className="small-icon"></img>
                    <p>Explore workouts</p>
                </Link>
            </div>
            <div className="screen-toggle-buttons">
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
        </div>
     );
}
 
export default Library;