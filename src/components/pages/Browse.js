import { getDateForHeader, makeFirstUpperCase } from "../../helpers";
import { useState } from "react";
import { exercises, workouts } from "../../database";
import { IconLibrary } from "../../IconLibrary";
import { Link } from "react-router-dom";


const Browse = () => {

    const [libraryScreen, setLibraryScreen] = useState('exercises');


    return ( 
        <div className="library page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Browse</h2>
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
                            <img className="small-icon" src={IconLibrary.PlayIcon} alt="icon" />
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
                    <Link to={`/browse/exercise/${exercise.id}/view/`} key={"exercise-"+index} className="item-body">
                        <div className="item-info">
                            <h4>{exercise.name}</h4>
                            <div className="item-description">
                                <p>{exercise.sets} Sets</p>
                                <p>{makeFirstUpperCase(exercise.targetGroup)}</p>
                            </div>
                        </div>
                        <div className="item-button">
                            <img className="small-icon" src={IconLibrary.DownloadIcon} alt="icon" />
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
 
export default Browse;