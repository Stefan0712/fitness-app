import { useState } from 'react';
import { IconLibrary } from '../../../../../IconLibrary';
import styles from './Phases.module.css';
import ExerciseSelector from '../../../../common/ExerciseSelector/ExerciseSelector.tsx';
const Phase = ({phase, handleRemoveExercise, handleAddExercise}) =>{

    const [showExerciseSelector, setShowExerciseSelector] = useState(null)

    return(
        <div className={styles.phaseBody}>
            {showExerciseSelector ? <ExerciseSelector addExercise={handleAddExercise} phaseId={phase._id} close={()=>setShowExerciseSelector(null)} /> : null}
            <div className={styles.phaseExercises}>
                {phase && phase.exercises && phase.exercises.length > 0 ? phase.exercises.map((exercise, index)=>(
                    <div className={styles.phaseExercise} key={'phase-exercise-'+index}>
                        <b>{exercise.name}</b>
                        <b>x{exercise.sets}</b>
                        <button type="button" className="clear-btn"><img src={IconLibrary.Close} alt="" onClick={()=>handleRemoveExercise(exercise?._id)} /></button>
                    </div>
                )) : <p className={styles.noExercises}>No exercises added</p>}
                <button type="button" className={styles.addExerciseButton} onClick={()=>setShowExerciseSelector(phase._id)}>Add exercise</button>
            </div>
        </div>
    )
}

export default Phase;