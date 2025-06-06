import { IconLibrary } from "../../../../../IconLibrary";
import styles from "../CreateWorkout.module.css";
import { useState } from "react";
import MuscleSelector from "../../../../common/MuscleSelector/MuscleSelector.tsx";

const MuscleScreen = ({targetMuscles, setTargetMuscles}) => {

    const [showMuscleSelector, setShowMuscleSelector] = useState(false);

    return ( 
        <div className={styles.screen}>
            {showMuscleSelector ? <MuscleSelector close={()=>setShowMuscleSelector(false)} targetMuscles={targetMuscles} setTargetMuscles={setTargetMuscles} /> : null}
            <button type='button' className={styles.addTagButton} onClick={()=>setShowMuscleSelector(true)}> Add Muscle Group</button>
            <div className={styles.equipmentContainer}>
                {targetMuscles?.length > 0 ? targetMuscles.map((item, index)=><div className={styles.addedEquipment} key={'Added-muscle-'+index}><b>{item.name}</b> <button type='button' onClick={()=>setTargetMuscles(prev => [...prev.filter(muscle=>muscle._id !== item._id)])} className="clear-button"><img className="small-icon" src={IconLibrary.Close} alt=""/></button> </div>) : ''}
            </div>
        </div>
     );
}
 
export default MuscleScreen;