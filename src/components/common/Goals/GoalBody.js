import { iconList } from '../../../icons';
import styles from './Goals.module.css';

const GoalBody = ({goal, setSelectedGoal}) => {
    const IconComponent = iconList.find(item => item.id === goal.icon)?.icon; // Find the icon based on the saved id
    return ( 
        <div className={styles.goal} key={goal._id+goal.name+goal.color} onClick={()=>setSelectedGoal(goal)}>
            <div className={styles["goal-color"]} style={{backgroundColor: goal.color}} />
            {IconComponent && <IconComponent fill={goal.color} width="25px" height="25px"/>}
            <p className={styles.name}>{goal.name}</p>
        </div>
     );
}
 
export default GoalBody;