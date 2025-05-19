import { IconLibrary } from "../../../../../IconLibrary";
import styles from "../CreateWorkout.module.css";
import { useState } from "react";
import MuscleSelector from "../../../../common/MuscleSelector/MuscleSelector.tsx";

const MuscleScreen = ({targetGroups, setTargetGroups}) => {

    const [showMuscleSelector, setShowMuscleSelector] = useState(false);

    return ( 
        <div className={styles.screen}>
            {showMuscleSelector ? <MuscleSelector close={()=>setShowMuscleSelector(false)} targetGroups={targetGroups} setTargetGroups={setTargetGroups} /> : null}
            <button type='button' className={styles.addTagButton} onClick={()=>setShowMuscleSelector(true)}> Add Muscle Group</button>
            <div className={styles.equipmentContainer}>
                {targetGroups?.length > 0 ? targetGroups.map((item, index)=><div className={styles.addedEquipment} key={'Added-muscle-'+index}><b>{item.name}</b> <button onClick={(tagId)=>targetGroups(prev => [...prev.filter(item=>item.id !== tagId)])} className="clear-button"><img className="small-icon" src={IconLibrary.Close} alt=""/></button> </div>) : ''}
            </div>
        </div>
     );
}
 
export default MuscleScreen;