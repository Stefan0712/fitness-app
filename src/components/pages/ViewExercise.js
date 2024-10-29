import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDateForHeader } from "../../helpers";


const ViewExercise = () => {

    const {id} = useParams();
    const exerciseData = useSelector((state)=>state.user.createdExercises.find(item => item.id === id));

    
    return ( 
        <div className="view-exercise page">
            <div className='header'>
                <div className='date'>{getDateForHeader}</div>
                <h2>{exerciseData.name}</h2>
            </div>
            
        </div>
     );
}
 
export default ViewExercise;