import styles from './Library.module.css';
import { IconLibrary } from '../../../IconLibrary';
import { Link } from 'react-router-dom';
import { makeFirstUpperCase } from '../../../helpers';

const Workout = ({workout, id}) => {
    return ( 
        <Link to={`/workout/${id}/view/?type=online`} className={`${styles["item-body"]} ${styles['workout-body']}`}>
            <div className={`${styles["item-info"]}`}>
                <h4>{workout.name}</h4>
                <div className={styles["item-description"]}>
                    <p>{workout.exercises?.length || 0} exercises</p>
                    <p>{makeFirstUpperCase(workout.difficulty || '')}</p>
                </div>
                <div className={styles['workout-tags']}>
                    {workout.tags && workout.tags.length > 0 ? 
                        workout.tags.map((tag, index) => (
                        <div className={styles['workout-tag-body']} key={'workout-tag-' + index}>
                            <p className={styles['workout-tag-name']}>{tag.name}</p>
                        </div>
                        ))
                    : null}
                </div>
            </div>
            <div className={styles["item-button"]}>
                <img className="small-icon" src={IconLibrary.Arrow} alt="icon" />
            </div>
            

        </Link>
     );
}
 
export default Workout;