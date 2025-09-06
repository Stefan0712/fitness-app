import { IconLibrary } from "../../../../IconLibrary";
import styles from './Import.module.css';

const ExerciseImport = ({item, index, library, selectedItems, handleItemSelection}) => {
    return ( 
        <div key={'Exercise-'+item._id} className={`${styles.importExercise} ${selectedItems.includes(item) ? styles.selectedExercise : ''}`} onClick={()=>handleItemSelection(item)}>
            {library.exercises.some(i=>i._id === item._id || i.sourceId === item._id) ? <img src={IconLibrary.Duplicate} className={styles.duplicateImportIcon} alt="" /> : null}
            <h4>{item.name}</h4>
            <div className={styles.rowList}>
                <img src={IconLibrary.Tags} alt='' /> 
                {item.tags && item.tags.length > 0 ? item.tags.map((tag, index)=><p key={'tax-'+index}>{tag.name}</p>) : <p>No tags</p>}
            </div>
            <div className={styles.rowList}>
                <img src={IconLibrary.Muscle} alt='' /> 
                {item.targetMuscles && item.targetMuscles.length > 0 ? item.targetMuscles.map((muscle, index)=><p key={'tax-'+index}>{muscle.name}</p>) : <p>No target muscles</p>}
            </div>
            <div className={styles.rowList}>
                <img src={IconLibrary.Dumbbell} alt='' /> 
                {item.equipment && item.equipment.length > 0 ? item.equipment.map((eq, index)=><p key={'tax-'+index}>{eq.name}</p>) : <p>No equipment</p>}
            </div>
            <div className={styles.rowList}>
                <p>{item.sets}x </p>
                {item.fields?.map((field, index)=><p key={'tax-'+index}>{field.target} {field.unit.shortLabel}</p>)}
            </div>
        </div>
     );
}
 
export default ExerciseImport;