import styles from './QuickMenu.module.css';
import { IconLibrary } from '../../../IconLibrary';


const QuickMenu = ({openGoals, openExerciseLogs, openFoodLogs, }) => {


    return ( 
        <div className={styles["quick-menu"]}>  
            <div className={styles.menuBg}></div>
            <div className={styles.buttonsContainer}>
                <button id='thirdButton' className={styles['quick-button']} onClick={openFoodLogs} key={"food"}>
                    <p>Log Food</p>
                    <div className={styles.iconBg}>
                        <img src={IconLibrary.Food} alt=''></img>
                    </div>
                </button>
                <button id='secondButton' className={styles['quick-button']} onClick={openExerciseLogs} key={'exercise'}>
                    <p>Log Activity</p>
                    <div className={styles.iconBg}>
                        <img src={IconLibrary.Exercise} alt=''></img>
                    </div>
                </button>
                <button id='firstButton' className={styles['quick-button']} onClick={openGoals} key={'goals'}>
                    <p>Log Goal</p>
                    <div className={styles.iconBg}>
                        <img src={IconLibrary.Goals} alt=''></img>
                    </div>
                </button> 
            </div>
        </div>
    );
}
 
export default QuickMenu;