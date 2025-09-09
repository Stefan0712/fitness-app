import { useState } from "react";
import { Phase as IPhase, WorkoutExercise } from "../../../../common/interfaces.ts";
import styles from './Phases.module.css';
import { IconLibrary } from "../../../../../IconLibrary.js";
import NewPhase from "./AddPhase.tsx";
import Phase from './Phase.tsx';
import { useUI } from "../../../../../context/UIContext.jsx";
import EditPhase from "./EditPhase.tsx";


const Phases = ({phases, setPhases, setDuration, setTargetMuscles, setTags, setEquipment}) => {

    const [selectedPhase, setSelectedPhase] = useState<IPhase | null>(phases[0] || null);
    

    const [showAddPhase, setShowAddPhase] = useState(false);
    const [showEditPhase, setShowEditPhase] = useState<IPhase | null>(null);
    const {showMessage, showConfirmationModal} = useUI();

    const handleRemoveExercise = (exerciseId: string) => {
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
                setDuration(prev=>{
                        const newValue = parseInt(prev) + exercise.duration
                        return newValue.toString()
                    }
                );
                setTags(prev => {
                    const combined = [...prev, ...exercise.tags];
                    const uniqueMap = new Map(); // Use a Map to ensure uniqueness by _id
                    combined.forEach(tag => {
                        if (tag._id) uniqueMap.set(tag._id.toString(), tag);
                    });
                    return Array.from(uniqueMap.values());
                });
                setEquipment(prev => {
                    const combined = [...prev, ...exercise.equipment];
                    const uniqueMap = new Map();
                    combined.forEach(eq => {
                        if (eq._id) uniqueMap.set(eq._id.toString(), eq);
                    });
                    return Array.from(uniqueMap.values());
                });
                setTargetMuscles(prev => {
                    const combined = [...prev, ...exercise.targetMuscles];
                    const uniqueMap = new Map();
                    combined.forEach(muscle => {
                        if (muscle._id) uniqueMap.set(muscle._id.toString(), muscle);
                    });
                    return Array.from(uniqueMap.values());
                });
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
    const handleUpdatePhase = (updatedPhase) =>{
        
        setPhases(prev=>{
            const tempPhases = [...prev];
            const phaseIndex = tempPhases.findIndex(item=>item._id === updatedPhase._id);
            if(phaseIndex > -1){
                tempPhases[phaseIndex] = updatedPhase;
                showMessage('Phase updated successfully', "success");
                return tempPhases;
            }else{
                showMessage('Failed to update phase', "error");
                return prev;
            }
        })
    }
    if(phases){
        return ( 
        <div className={styles.phases}>
            {showAddPhase ? <NewPhase close={()=>setShowAddPhase(false)} addPhase={(phase: IPhase)=>{setPhases([...phases, phase]); setSelectedPhase(phase);}} lastOrder={phases.length} /> : null}
            {showEditPhase ? <EditPhase updatePhase={handleUpdatePhase} close={()=>setShowEditPhase(null)} phaseData={showEditPhase}/> : null}
            <div className={styles.phaseList}>
                <div className={styles.phasesContainer}>
                    {phases && phases.length > 0 ? phases.map(item=><button type="button" key={item._id} onClick={()=>setSelectedPhase(item)} className={`${selectedPhase?._id === item._id ? styles.selectedButton : ''} ${styles.phaseButton}`}>{item.name}</button>) : null}
                </div>
                <div className={styles.phaseButtons}>
                    <button className={styles.addPhaseButton} type="button" onClick={()=>setShowAddPhase(true)}><img src={IconLibrary.Add} alt="" /></button>
                </div>
            </div>
            {selectedPhase ? <Phase phase={selectedPhase} handleRemoveExercise={handleRemoveExercise} handleAddExercise={handleAddExercise} handleDeletePhase={handleDeletePhase} setShowEditPhase={setShowEditPhase}/> : null}
        </div>
     );
    }
}
 
export default Phases;