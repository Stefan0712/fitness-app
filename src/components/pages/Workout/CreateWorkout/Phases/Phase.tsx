import { useState } from 'react';
import { IconLibrary } from '../../../../../IconLibrary';
import styles from './Phases.module.css';
import ExerciseSelector from '../../../../common/ExerciseSelector/ExerciseSelector.tsx';
import { Phase as IPhase } from '../../../../common/interfaces.ts';

interface PhaseProps {
    phase: IPhase;
    handleRemoveExercise: (id: string) => void;
    handleAddExercise: (exercise) => void;
    handleDeletePhase: (phase) => void;
    setShowEditPhase: (phase) => void;
}



const Phase: React.FC<PhaseProps> = ({phase, handleRemoveExercise, handleAddExercise, handleDeletePhase, setShowEditPhase}) =>{

    const [showExerciseSelector, setShowExerciseSelector] = useState(null)
    console.log(phase)
    return(
        <div className={styles.phaseBody}>
            {showExerciseSelector ? <ExerciseSelector addExercise={handleAddExercise} phaseId={phase._id} close={()=>setShowExerciseSelector(null)} /> : null}
            <div className={styles.phaseExercises}>
                {phase && phase.exercises && phase.exercises.length > 0 ? phase.exercises.map((exercise, index)=>(
                    <div className={styles.phaseExercise} key={'phase-exercise-'+index}>
                        <b>{exercise.name}</b>
                        <b>x{exercise.sets.length}</b>
                        <button type="button" className="clear-btn"><img src={IconLibrary.Close} alt="" onClick={()=>handleRemoveExercise(exercise?._id)} /></button>
                    </div>
                )) : <p className={styles.noExercises}>No exercises added</p>}
            </div>
            <div className={styles.phaseButtons}>
                <div className={styles.modifyPhaseButtons}>
                    <button type="button" style={{background: 'none', border: 'none'}} onClick={()=>handleDeletePhase(phase)}><img src={IconLibrary.Delete} alt=""/></button>
                    <button type="button" style={{background: 'none', border: 'none'}} onClick={()=>setShowEditPhase(phase)}><img src={IconLibrary.Edit} alt=""/></button>
                </div> 
                <button type="button" className={styles.addExerciseButton} onClick={()=>setShowExerciseSelector(phase._id)}>Add exercise</button>
            </div>
        </div>
    )
}

export default Phase;