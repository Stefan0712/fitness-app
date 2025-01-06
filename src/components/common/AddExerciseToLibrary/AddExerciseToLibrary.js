import { useDispatch, useSelector } from "react-redux";
import { addExercise } from "../../../store/userSlice";
import { useState, useEffect } from "react";



const AddExerciseToLibrary = ({exerciseData}) => {
    
    const dispatch = useDispatch();
    const exercises = useSelector((state)=>state.user.exercises);
    const [isInLibrary, setIsInLibrary] = useState(false);

    const saveExercise = (e) => {
        e.preventDefault();
        dispatch(addExercise(exerciseData))
    }
    useEffect(()=>{
        if(exercises.find(item=>item.id===exerciseData.id)){
            setIsInLibrary(true);
        }else{
            setIsInLibrary(false);
        }
    },[exercises])

    return ( 
        <button className={`add-exercise-to-library transparent-bg`} style={{display: isInLibrary ? 'none' : 'block'}} onClick={saveExercise}>
            <img src="/icons/save.svg" className="small-icon"></img>
        </button>
    );


}
 
export default AddExerciseToLibrary;