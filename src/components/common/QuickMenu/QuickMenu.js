import styles from './QuickMenu.module.css';
import { IconLibrary } from '../../../IconLibrary';
import { useState } from 'react';
import Goals from '../../common/Goals/Goals'
import TargetGoalForm from './TargetGoalForm.tsx';
import BooleanGoalForm from './BooleanGoalForm.tsx';
import NumberGoalForm from './NumberGoalForm.tsx';


const QuickMenu = ({openExerciseLogs, openFoodLogs, closeQuickMenu}) => {

    const [selectedGoal, setSelectedGoal] = useState(null)
    const [showGoals, setShowGoals] = useState(false);


    const openGoal = (goal) =>{
        setSelectedGoal(goal);
        setShowGoals(false);
    }
    const closeLogScreen = () =>{
        closeQuickMenu();
        setSelectedGoal(null);
    }
    return ( 
        <div className={styles["quick-menu"]}>  
            {showGoals ? <Goals closeMenu={()=>setShowGoals(false)} selectedGoal={selectedGoal} setSelectedGoal={openGoal}/> : null}
            {selectedGoal ? 
                selectedGoal.type === 'target' ? <TargetGoalForm close={closeLogScreen} goalData={selectedGoal} /> 
                : selectedGoal.type === 'yes-no' ? <BooleanGoalForm close={closeLogScreen} goalData={selectedGoal} /> 
                : selectedGoal.type === 'number' ? <NumberGoalForm close={closeLogScreen} goalData={selectedGoal} /> 
                : null 
            : null}
            <div className={styles.menuBg}></div>
            {showGoals || selectedGoal ? null : <div className={styles.buttonsContainer}>
                <button className={styles['quick-button']} onClick={openFoodLogs} key={"food"}>
                    <p>Log Food</p>
                    <div className={styles.iconBg}>
                        <img src={IconLibrary.Food} alt=''></img>
                    </div>
                </button>
                <button className={styles['quick-button']} onClick={openExerciseLogs} key={'exercise'}>
                    <p>Log Activity</p>
                    <div className={styles.iconBg}>
                        <img src={IconLibrary.Exercise} alt=''></img>
                    </div>
                </button>
                <button className={styles['quick-button']} onClick={()=>setShowGoals(true)} key={'goals'}>
                    <p>Log Goal</p>
                    <div className={styles.iconBg}>
                        <img src={IconLibrary.Goals} alt=''></img>
                    </div>
                </button> 
            </div>}
        </div>
    );
}
 
export default QuickMenu;