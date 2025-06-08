import { IconLibrary } from "../../../IconLibrary";
import styles from './Sync.module.css';

const ExerciseImport = ({item, index, library, selectedItems, handleItemSelection}) => {
    return ( 
        <div key={'Exercise-'+index} className={`${styles.importExercise} ${selectedItems.includes(item) ? styles.selectedExercise : ''}`} onClick={()=>handleItemSelection(item)}>
            {library.exercises.some(i=>i._id === item._id || i.sourceId === item._id) ? <img src={IconLibrary.Duplicate} className={styles.duplicateImportIcon} alt="" /> : null}
            <h4>{item.name}</h4>
            <div className={styles.rowList}>
                <img src={IconLibrary.Tags} alt='' /> 
                {item.tags?.map((tag, index)=><p key={'tax-'+index}>{tag.name}</p>)}
            </div>
            <div className={styles.rowList}>
                <img src={IconLibrary.Muscle} alt='' /> 
                {item.targetMuscles?.map((muscle, index)=><p key={'tax-'+index}>{muscle.name}</p>)}
            </div>
            <div className={styles.rowList}>
                <img src={IconLibrary.Dumbbell} alt='' /> 
                {item.equipment?.map((eq, index)=><p key={'tax-'+index}>{eq.name}</p>)}
            </div>
            <div className={styles.rowList}>
                <p>{item.sets}x </p>
                {item.fields?.map((field, index)=><p key={'tax-'+index}>{field.target} {field.unit}</p>)}
            </div>
        </div>
     );
}
 
export default ExerciseImport;