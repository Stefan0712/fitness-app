import styles from './Library.module.css';
import { IconLibrary } from '../../../IconLibrary';
import { Link } from 'react-router-dom';
import { makeFirstUpperCase } from '../../../helpers';

const Exercise = ({data, id, type}) => {
    return ( 
        <Link className={styles.libraryExercise} to={`/exercise/${id}/view/${type === 'online' ? '?type=online' : type !== 'online' && data.isCached ? '?type=cached' : ''}`}>
            <div className={styles.top}>
                <h4>{data.name}</h4>
                <p>{data.sets} Sets</p>
                <p>{makeFirstUpperCase(data?.difficulty || '')}</p>
            </div>
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
        </Link>
     );
}
 
export default Exercise;