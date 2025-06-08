import styles from './Sync.module.css';
import { handleExportWorkouts, handleExportExercises } from './SyncFunctions';

const Export = () => {
    return ( 
        <div className={styles.exportScreen}>
            <div className={styles.row}>
                <label>Export Workouts</label>
                <button onClick={handleExportWorkouts}>Export</button>
            </div>
            <div className={styles.row}>
                <label>Export Exercises</label>
                <button onClick={handleExportExercises}>Export</button>
            </div>
        </div>
     );
}
 
export default Export;