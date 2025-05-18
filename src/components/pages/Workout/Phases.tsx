import { useState } from "react";
import { Phase, WorkoutExercise } from "../../common/interfaces.ts";
import styles from './Phases.module.css';
import { IconLibrary } from "../../../IconLibrary.js";
import ExerciseSelector from "../../common/ExerciseSelector/ExerciseSelector.tsx";
import NewPhase from "./AddPhase.tsx";
import EditPhase from "./EditPhase.tsx";


const Phases = ({phases, setPhases}) => {

    const [selectedPhase, setSelectedPhase] = useState<Phase | null>(phases[0]);

    const [showAddPhase, setShowAddPhase] = useState(false);
    const [showEditPhase, setShowEditPhase] = useState<Phase | null>(null);

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
    const handleDeletePhase = (phase: Phase) => {
        const updatedPhases = phases.filter(p => p.id !== phase.id);
        setPhases(updatedPhases);
        if (updatedPhases.length > 0) {
            setSelectedPhase(updatedPhases[0]);
        } else {
            setSelectedPhase(null);
        }
    }
    const handleUpdatePhase = (phase: Phase) => {
        const updatedPhases = phases.map(p => {
            if (p.id === phase.id) {
                return {...p, name: phase.name};
            }
            return p;
        });

        setPhases(updatedPhases);
        setShowEditPhase(null);
    }
    return ( 
        <div className={styles.phases}>
            {showExerciseSelector ? <ExerciseSelector addExercise={handleAddExercise} close={()=>setShowExerciseSelector(false)} /> : null}
            {showAddPhase ? <NewPhase close={()=>setShowAddPhase(false)} addPhase={(phase: Phase)=>{setPhases([...phases, phase]); setSelectedPhase(phase);}} lastOrder={phases.length} /> : null}
            {showEditPhase ? <EditPhase close={()=>setShowEditPhase(null)} updatePhase={handleUpdatePhase} phase={showEditPhase}/> : null}
            <div className={styles.phaseContent}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                    <h4>Workout phases</h4>
                    {selectedPhase ? <div style={{display: 'flex', gap: '20px'}}>
                        <button type="button" style={{background: 'none', border: 'none'}} onClick={()=>handleDeletePhase(selectedPhase)}><img src={IconLibrary.Delete} style={{height: '20px', width: '20px'}} /></button>
                        <button type="button" style={{background: 'none', border: 'none'}} onClick={()=>setShowEditPhase(selectedPhase)}><img src={IconLibrary.Edit} style={{height: '20px', width: '20px'}} /></button>
                    </div> : null}
                </div>
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
                <div style={{display: 'flex', alignItems: 'center', width: 'calc(100% - 50px)', overflowX: 'auto', overflowY: 'hidden'}}>
                    {phases && phases.length > 0 ? phases.map((item: Phase, index: number)=>(<button type="button" key={'Phase-button-'+index} className={`${styles.phaseButton} ${selectedPhase.id === item.id ? styles.selectedButton : ''}`} onClick={()=>setSelectedPhase(item)}>{item.name}</button>)):null}
                </div>
                <button type="button" className={styles.addPhaseButton} onClick={()=>setShowAddPhase(true)}><img src={IconLibrary.Add} style={{height: '30px', width: '30px'}} /></button>
            </div>
        </div>
     );
}
 
export default Phases;