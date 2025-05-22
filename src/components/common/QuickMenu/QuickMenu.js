import styles from './QuickMenu.module.css';
import { IconLibrary } from '../../../IconLibrary';


const QuickMenu = ({openGoals, openExerciseLogs, openFoodLogs, }) => {


    return ( 
        <div className={styles["quick-menu"]}>  
            <h3 className={styles.header}>Log</h3>           
            <div className={styles.buttons}>
                <button className={styles['quick-button']} onClick={openFoodLogs} key={"food"}>
                    <img src={IconLibrary.Food} alt=''></img>
                    <p>Food</p>
                </button>
                <button className={styles['quick-button']} onClick={openExerciseLogs} key={'exercise'}>
                    <img src={IconLibrary.Exercise} alt=''></img>
                    <p>Exercise</p>
                </button>
                <button className={styles['quick-button']} onClick={openGoals} key={'goals'}>
                    <img src={IconLibrary.Goals} alt=''></img>
                    <p>Goal</p>
                </button> 
            </div>
        </div>
    );
}
 
export default QuickMenu;