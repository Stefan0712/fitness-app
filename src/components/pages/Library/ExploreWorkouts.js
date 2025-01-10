import { getDateForHeader } from "../../../helpers";
import { useState } from "react";
import { exercises, workouts } from "../../../database";
import { IconLibrary } from "../../../IconLibrary";
import { Link } from "react-router-dom";
import { saveExerciseToLibrary, saveWorkoutToLibrary } from "../../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const ExploreWorkouts = () => {

    const workoutsLibrary = useSelector((state)=>state.user.workouts);

    const dispatch = useDispatch();

    return ( 
        <div className="library page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Browse</h2>
            </div>

                <div className="library-items-container">
                {workouts?.length > 0 ? (
                    workouts.map((workout, index) => (
                    <div key={index} className="item-body">
                        <Link to={`/browse/workout/${workout.id}/view/`} className="item-info">
                            <h4>{workout.name}</h4>
                            <div className="item-description">
                                <p>{workout.exercises.length} exercises</p>
                                <p>{workout.targetGroup.map(group=>group.name+' ')}</p>
                            </div>
                        </Link>
                        <div className="item-button">
                        {!workoutsLibrary.some(userWorkout => userWorkout.sourceId === workout.id) ? (
                                <button onClick={()=>dispatch(saveWorkoutToLibrary(workout))}><img className="small-icon" src={IconLibrary.Download} alt="icon" /></button>         
                            ) : (<p>Saved</p>)}
                        </div>
                    </div>
                    ))
                ) : (
                    <p>Loading workouts...</p>
                )}
            </div>
            
        </div>
     );
}
 
export default ExploreWorkouts;