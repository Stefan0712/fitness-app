import { IconLibrary } from "../../../../../IconLibrary";
import styles from "../CreateWorkout.module.css";
import { useState } from "react";
import EquipmentSelector from "../../../../common/EquipmentSelector/EquipmentSelector.tsx";

const EquipmentScreen = ({equipments, setEquipments}) => {

    const [showEquipmentSelector, setShowEquipmentSelector] = useState(false);

    return ( 
        <div className={styles.screen}>
            {showEquipmentSelector ? <EquipmentSelector close={()=>setShowEquipmentSelector(false)} equipments={equipments} setEquipments={setEquipments} /> : null}
            <button type='button' className={styles.addTagButton} onClick={()=>setShowEquipmentSelector(true)}> Add Equipment</button>
            <div className={styles.equipmentContainer}>
                {equipments?.length > 0 ? equipments.map((item, index)=><div className={styles.addedEquipment} key={'Added-equipment-'+index}><b>{item.name}</b> <button onClick={(tagId)=>setEquipments(prev => [...prev.filter(item=>item._id !== tagId)])} className="clear-button"><img className="small-icon" src={IconLibrary.Close} alt=""/></button> </div>) : ''}
            </div>
        </div>
     );
}
 
export default EquipmentScreen;