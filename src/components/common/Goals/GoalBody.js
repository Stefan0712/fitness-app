import { makeFirstUpperCase } from '../../../helpers';
import styles from './Goals.module.css';

const GoalBody = ({goal, index, enableEdit, openLogForm}) => {





    return ( 
        <div className={styles.goal} key={"Goal-"+index} onClick={!enableEdit ? ()=>openLogForm(goal.id) : null}>
            <div className={styles["goal-color"]} style={{backgroundColor: goal.color}} />
            <img src={goal.icon.icon} className={styles['goal-icon']}></img>
            <p className={styles.name}>{goal.name}</p>
            {/* <p className={styles.target}>{goal.target} {makeFirstUpperCase(goal.unit)}</p>    */}
        </div>
     );
}
 
export default GoalBody;