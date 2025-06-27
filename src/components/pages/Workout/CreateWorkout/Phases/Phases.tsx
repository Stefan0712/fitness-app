import { useState } from "react";
import { Phase as IPhase, WorkoutExercise } from "../../../../common/interfaces.ts";
import styles from './Phases.module.css';
import { IconLibrary } from "../../../../../IconLibrary.js";
import NewPhase from "./AddPhase.tsx";
import Phase from './Phase.tsx';


const Phases = ({phases, setPhases}) => {

    const [selectedPhase, setSelectedPhase] = useState<IPhase | null>(phases[0] || null);
    

    const [showAddPhase, setShowAddPhase] = useState(false);
    const [showEditPhase, setShowEditPhase] = useState<IPhase | null>(null);

    const [showExerciseSelector, setShowExerciseSelector] = useState(false);
    

    const handleRemoveExercise = (exerciseId: string) => {
        console.log(exerciseId)
        const updatedPhases = phases.map(phase => {
            if (phase._id === selectedPhase?._id) {
                return {...phase, exercises: phase.exercises.filter(ex => ex._id !== exerciseId)};
            }
            return phase;
        });

        // Also update selectedPhase state to reflect the change
        const updatedSelectedPhase = updatedPhases.find(p => p._id === selectedPhase?._id);

        setPhases(updatedPhases);
        if (updatedSelectedPhase) {
            setSelectedPhase(updatedSelectedPhase);
        }
    };

    const handleAddExercise = (exercise: WorkoutExercise) => {
       if(selectedPhase){
        const updatedPhases = phases.map(phase => {
            if (phase._id === selectedPhase._id) {
                return {...phase, exercises: [...phase.exercises, exercise]};
            }
            return phase;
        });

        // Also update selectedPhase state to reflect the change
        const updatedSelectedPhase = updatedPhases.find(p => p._id === selectedPhase._id);

        setPhases(updatedPhases);
        if (updatedSelectedPhase) {
            setSelectedPhase(updatedSelectedPhase);
        }
       }
    }
    const handleDeletePhase = (phase: IPhase) => {
        const updatedPhases = phases.filter(p => p._id !== phase._id);
        setPhases(updatedPhases);
        if (updatedPhases.length > 0) {
            setSelectedPhase(updatedPhases[0]);
        } else {
            setSelectedPhase(null);
        }
    }
    const handleUpdatePhase = (phase: IPhase) => {
        const updatedPhases = phases.map(p => {
            if (p._id === phase._id) {
                return {...p, name: phase.name};
            }
            return p;
        });

        setPhases(updatedPhases);
        setShowEditPhase(null);
    }

    if(phases){
        return ( 
        <div className={styles.phases}>
            <div className={styles.phaseList}>
                <div className={styles.phasesContainer}>
                    {phases && phases.length > 0 ? phases.map(item=><button type="button" onClick={()=>setSelectedPhase(item)} className={`${selectedPhase._id === item._id ? styles.selectedButton : ''} ${styles.phaseButton}`}>{item.name}</button>) : null}
                </div>
                <div className={styles.phaseButtons}>
                    {selectedPhase ? <div className={styles.selectedPhaseButtons}>
                        <button type="button" style={{background: 'none', border: 'none'}} onClick={()=>handleDeletePhase(selectedPhase)}><img src={IconLibrary.Delete} /></button>
                        <button type="button" style={{background: 'none', border: 'none'}} onClick={()=>setShowEditPhase(selectedPhase)}><img src={IconLibrary.Edit} /></button>
                    </div> : null}
                    <button className={styles.addPhaseButton} type="button" onClick={()=>setShowAddPhase(true)}><img src={IconLibrary.Add} alt="" /></button>
                </div>
            </div>
            {showAddPhase ? <NewPhase close={()=>setShowAddPhase(false)} addPhase={(phase: IPhase)=>{setPhases([...phases, phase]); setSelectedPhase(phase);}} lastOrder={phases.length} /> : null}
            <div className={styles.phaseContent}>
                {selectedPhase ? <Phase phase={selectedPhase} phaseIndex={phases.indexOf(selectedPhase)} handleRemoveExercise={handleRemoveExercise} handleAddExercise={handleAddExercise} /> : null}
            </div>
        </div>
     );
    }
}
 
export default Phases;