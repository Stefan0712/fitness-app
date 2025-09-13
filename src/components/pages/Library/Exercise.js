import styles from './Library.module.css';
import { IconLibrary } from '../../../IconLibrary';

const Exercise = ({data}) => {
    return ( 
        <div className={styles.libraryExercise}>
            <h3>{data.name}</h3>
            <div className={styles.bottom}>
                <div className={styles.tags}>
                    <div className={styles.tag}><img className={styles.exerciseIcon} src={IconLibrary.Tags} alt=''/></div>
                    {data.tags && data.tags.length > 0 ? data.tags.map((tag, index)=><div className={styles.tag} key={'Tag-'+index}><div className={styles.tagColor} style={{backgroundColor: tag.color}} /><p>{tag.name}</p></div>) : <p className={styles.tag}>No tags</p>}
                </div>
                <div className={styles.muscles}>
                    <div className={styles.muscle}><img className={styles.exerciseIcon} src={IconLibrary.Muscle} alt=''/></div>
                    {data.targetMuscles && data.targetMuscles.length > 0 ? data.targetMuscles.map((muscle, index)=><p className={styles.tag} key={'Muscle-'+index}>{muscle.name}</p>) : <p className={styles.muscle}>No target muscles specified</p>}
                </div>
            </div>
        </div>
     );
}
 
export default Exercise;