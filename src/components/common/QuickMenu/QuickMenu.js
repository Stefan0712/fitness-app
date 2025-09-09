import styles from './QuickMenu.module.css';
import { IconLibrary } from '../../../IconLibrary';
import { useEffect, useState } from 'react';
import Goals from '../../common/Goals/Goals'
import TargetGoalForm from './TargetGoalForm.tsx';
import BooleanGoalForm from './BooleanGoalForm.tsx';
import NumberGoalForm from './NumberGoalForm.tsx';
import { getItems } from '../../../db.js';
import { iconList } from '../../../icons.js';
import { useNavigate } from 'react-router-dom';


const QuickMenu = ({openExerciseLogs, openFoodLogs, closeQuickMenu}) => {


    const [selectedGoal, setSelectedGoal] = useState(null)
    const [showGoals, setShowGoals] = useState(false);
    const [pinnedGoals, setPinnedGoals] = useState([]);


    const openGoal = (goal) =>{
        setSelectedGoal(goal);
        setShowGoals(false);
    }
    const closeLogScreen = () =>{
        closeQuickMenu();
        setSelectedGoal(null);
    }

    const getPinnedGoals = async () =>{
        try{
            const response = await getItems('goals', {pinnedToQuickmenu: 'true'});
            if(response){
                setPinnedGoals(response);
            }else{
                console.log("Failed to get pinned goals")
            }
        }catch(error){
            console.error(error)
        }
    };
    useEffect(()=>{
        getPinnedGoals();
    },[]);

    return ( 
        <div className={styles["quick-menu"]}>  
            {showGoals ? <Goals closeMenu={()=>setShowGoals(false)} selectedGoal={selectedGoal} setSelectedGoal={openGoal}/> : null}
            {selectedGoal ? 
                selectedGoal.type === 'target' ? <TargetGoalForm close={closeLogScreen} goalData={selectedGoal} /> 
                : selectedGoal.type === 'yes-no' ? <BooleanGoalForm close={closeLogScreen} goalData={selectedGoal} /> 
                : selectedGoal.type === 'number' ? <NumberGoalForm close={closeLogScreen} goalData={selectedGoal} /> 
                : null 
            : null}
            <div className={styles.menuBg} onClick={closeQuickMenu}></div>
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
                <div className={styles.pinsContainer}>
                    {pinnedGoals?.length > 0 ? pinnedGoals.map((goal, index)=><PinnedGoal openGoal={()=>setSelectedGoal(goal)} close={closeQuickMenu} goal={goal}  key={'goal-'+index} className={styles.pinnedGoal} />) : null}
                </div>
            </div>}
        </div>
    );
}
export default QuickMenu;


const PinnedGoal = ({goal, close, openGoal}) =>{

    const IconComponent = iconList.find(item => item.id === goal.icon)?.icon; // Find the icon based on the saved id

    return ( 
        <div className={styles.pinnedGoal} onClick={()=>openGoal()}>
            {IconComponent && <IconComponent fill={'white'} width="70%" height="70%"/>}
        </div>
     )
}