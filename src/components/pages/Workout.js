import { getDateForHeader } from "../../helpers";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Timer from "./common/Timer";
import './stylings/workout.css';
import checkIcon from '../../assets/checkmark.svg';

const Workout = () => {
    const {id} = useParams();
    const workoutData = useSelector((state)=>state.user.workouts.find((itme)=>itme.id===id));
    const [exercises, setExercises] = useState(workoutData.exercises);
    const [currentExercise, setCurrentExercise] = useState(0);




    console.log(exercises)
    return ( 
        <div className="workout-page page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>{workoutData.name}</h2>
            </div>
            <img src="/icons/stopwatch.svg" className="small-icon"></img>
            <Timer />

            <div className="section">
                <h3>{exercises[currentExercise]['name']}</h3>
                <div className="fields">
                    {exercises[currentExercise].fields.map((field)=>(
                        field.target ? (
                            <div className="field">
                                <p><b>{field.name}</b></p>
                                <input></input>
                                <img className="small-icon orange-background" src={checkIcon}></img>
                            </div>
                        ): ''
                    ))}
                </div>
            </div>
            <div className="workout-exercises section">
                <h3 className="subtitle full-width">Exercises</h3>
                {exercises.map((exercise, index)=>(
                    <div className="exercise-body" key={index+'exercise'} onClick={()=>setCurrentExercise(index)}>
                        <b>{index}</b><p>{exercise.name}</p>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default Workout;