import { useState } from 'react';
import styles from './ExercisesList.module.css';
import { IconLibrary } from '../../../../IconLibrary';
import ExerciseSelector from '../../../common/ExerciseSelector/ExerciseSelector';


const ExercisesList = ({exercises, setExercises}) => {

    const [showExercisePicker, setShowExercisePicker] = useState(false);
    return ( 
        <div className={styles.exercisesList}>
            {showExercisePicker ? <ExerciseSelector addExercise={(newEx)=>setExercises(prev=>[...prev, newEx])} close={()=>setShowExercisePicker(false)} /> : null}
            <div className={styles.header}>
                <h3>Exercises: {exercises.length}</h3>
                <button><img src={IconLibrary.Close} className='small-icon' alt='' /></button>
            </div>
            <div className={styles.exercisesContainer}>
                {exercises && exercises.length > 0 ? exercises.map((ex, index)=><Exercise key={'Exercise-'+index} data={ex} />): <p>No exercises</p>}
            </div>
            <button onClick={()=>setShowExercisePicker(true)} className={styles.closeButton}>Add exercise</button>
        </div>
     );
}
 
export default ExercisesList;


const Exercise = ({data}) =>{
    return (
        <div className={styles.exercise}>
            <div className={styles.header}>
                <h4>{data.name}</h4>
                <p>x{data.sets?.length}</p>
            </div>
            <div className={styles.fields}>
                {data.fields?.length > 0 ? data.fields.map((field,index)=><div className={styles.field} key={"field-"+index}><p>{field.name ?? ''}</p><p>{field.target ?? ''} {field.unit?.shortLabel ?? ''}</p></div>) : null}
            </div>
        </div>
    )
}