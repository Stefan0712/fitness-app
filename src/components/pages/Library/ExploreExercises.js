import { getDateForHeader } from "../../../helpers";
import { exercises } from "../../../database";
import { IconLibrary } from "../../../IconLibrary";
import { Link } from "react-router-dom";
import { saveExerciseToLibrary } from "../../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const ExploreExercises = () => {

    const exercisesLibrary = useSelector((state)=>state.user.exercises);

    const dispatch = useDispatch();

    return ( 
        <div className="library page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <div className="header-title">
                    <Link className="back-to-library" to={'/library'}><img src={IconLibrary.BackArrow} className="small-icon"></img></Link>
                    <h2>Explore Exercises</h2>
                </div>
            </div>
            
                <div className="library-items-container">
                    {exercises?.length > 0 ? (
                        exercises.map((exercise, index) => (
                        <div key={"exercise-"+index} className="item-body">
                            <Link to={`/browse/exercise/${exercise.id}/view/`} className="item-info">
                                <h4>{exercise.name}</h4>
                                <div className="item-description">
                                    <p>{exercise.sets} Sets</p>
                                    <p>{exercise.targetGroup.map(group=>group+' ')}</p>
                                </div>
                            </Link>
                            <div className="item-button">
                                {!exercisesLibrary.some(userExercise => userExercise.sourceId === exercise.id) ? (
                                    <button onClick={()=>dispatch(saveExerciseToLibrary(exercise))}><img className="small-icon" src={IconLibrary.Download} alt="icon" /></button>         
                                ) : (<p>Saved</p>)}
                            </div>
                        </div>
                        ))
                    ) : (
                        <p>Loading exercises...</p>
                    )}
                </div>
    
        
        </div>
     );
}
 
export default ExploreExercises;