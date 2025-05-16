import { useState } from "react";
import { Phase, WorkoutExercise } from "../../common/interfaces.ts";
import styles from './Phases.module.css';
import { IconLibrary } from "../../../IconLibrary.js";
import ExerciseSelector from "../../common/ExerciseSelector/ExerciseSelector.tsx";


const Phases = ({phases, setPhases}) => {

    const [selectedPhase, setSelectedPhase] = useState<Phase>(phases[0]);

    const [showExerciseSelector, setShowExerciseSelector] = useState(false);
    

    const handleRemoveExercise = (exerciseId: string) => {
        const updatedPhases = phases.map(phase => {
            if (phase.id === selectedPhase.id) {
                return {...phase, exercises: phase.exercises.filter(ex => ex.sourceId !== exerciseId)};
            }
            return phase;
        });

        // Also update selectedPhase state to reflect the change
        const updatedSelectedPhase = updatedPhases.find(p => p.id === selectedPhase.id);

        setPhases(updatedPhases);
        if (updatedSelectedPhase) {
            setSelectedPhase(updatedSelectedPhase);
        }
    };

    const handleAddExercise = (exercise: WorkoutExercise) => {
       const updatedPhases = phases.map(phase => {
            if (phase.id === selectedPhase.id) {
                return {...phase, exercises: [...phase.exercises, exercise]};
            }
            return phase;
        });

        // Also update selectedPhase state to reflect the change
        const updatedSelectedPhase = updatedPhases.find(p => p.id === selectedPhase.id);

        setPhases(updatedPhases);
        if (updatedSelectedPhase) {
            setSelectedPhase(updatedSelectedPhase);
        }
    }
    return ( 
        <div className={styles.phases}>
            {showExerciseSelector ? <ExerciseSelector addExercise={handleAddExercise} close={()=>setShowExerciseSelector(false)} /> : null}
            <div className={styles.phasesHeader}>
                <h4>Workout Phases</h4>
                <button type="button" className={styles.addPhaseButton}><img src={IconLibrary.Add} style={{height: '30px', width: '30px'}} /> </button>
            </div>
            <div className={styles.phaseContent}>
                <button type="button" className={styles.addExerciseButton} onClick={()=>setShowExerciseSelector(true)}>Add exercise</button>
                <div className={styles.phaseExercises}>
                    {selectedPhase && selectedPhase.exercises && selectedPhase.exercises.length > 0 ? selectedPhase.exercises.map((exercise, index)=>(<div className={styles.phaseExercise} key={'phase-exercise-'+index}>
                        <b>{exercise.name}</b>
                        <p>{exercise.sets || 0} sets</p>
                        <button type="button" className="clear-btn"><img src={IconLibrary.Close} alt="" onClick={()=>handleRemoveExercise(exercise.sourceId)} /></button>
                    </div>)) : <p className={styles.noExercises}>No exercises added</p>}
                </div>
            </div>
            <div className={styles.phasesButtons}>
                {phases && phases.length > 0 ? phases.map((item: Phase, index: number)=>(<button type="button" key={'Phase-button-'+index} className={`${styles.phaseButton} ${selectedPhase.id === item.id ? styles.selectedButton : ''}`} onClick={()=>setSelectedPhase(item)}>{item.name}</button>)):null}
            </div>
        </div>
     );
}
 
export default Phases;