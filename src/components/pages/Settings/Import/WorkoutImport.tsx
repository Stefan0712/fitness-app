import { IconLibrary } from "../../../../IconLibrary";
import styles from './Import.module.css';

const WorkoutImport = ({item, index, library, selectedItems, handleItemSelection}) => {
    return ( 
        <div key={'Workout-'+item._id} className={`${styles.importExercise} ${selectedItems.includes(item) ? styles.selectedExercise : ''}`} onClick={()=>handleItemSelection(item)}>
            {library.workouts.some(i=>i._id === item._id || i.sourceId === item._id) ? <img src={IconLibrary.Duplicate} className={styles.duplicateImportIcon} alt="" /> : null}
            <h4>{item.name}</h4>
            <div className={styles.rowList}>
                <img src={IconLibrary.Tags} alt='' /> 
                {item.tags && item.tags.length > 0 ? item.tags?.map((tag, index)=><p key={'tax-'+index}>{tag.name}</p>) : <p>No tags</p>}
            </div>
            <div className={styles.rowList}>
                <img src={IconLibrary.Muscle} alt='' /> 
                {item.targetGroups?.length > 0 ? item.targetGroups?.map((muscle, index)=><p key={'tax-'+index}>{muscle.name}</p>) : <p>No target muscles</p>}
            </div>
            <div className={styles.rowList}>
                <img src={IconLibrary.Dumbbell} alt='' /> 
                {item.equipment?.length > 0 ? item.equipment?.map((eq, index)=><p key={'tax-'+index}>{eq.name}</p>) : <p>No equipment</p>}
            </div>
            <div className={styles.rowList}>
                <img src={IconLibrary.Activity} alt='' />
                <p>{item.phases.flatMap(phase => phase.exercises).length} exercises</p>
            </div>
        </div>
     );
}
 
export default WorkoutImport;