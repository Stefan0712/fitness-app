import styles from './Goals.module.css';

const GoalBody = ({goal, index, setSelectedGoal}) => {
    return ( 
        <div className={styles.goal} key={"Goal-"+index} onClick={()=>setSelectedGoal(goal)}>
            <div className={styles["goal-color"]} style={{backgroundColor: goal.color}} />
            <img src={goal.icon} className={styles['goal-icon']}></img>
            <p className={styles.name}>{goal.name}</p>
        </div>
     );
}
 
export default GoalBody;