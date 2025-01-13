import styles from './Goals.module.css';
import LogForm from '../LogPages/LogForm';
import { useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import { useSelector } from 'react-redux';
import { makeFirstUpperCase } from '../../../helpers';



const Goals = () => {

    const [logForm, setLogForm] = useState(null);
    const goals = useSelector((state)=>state.user.userData.goals);


    return ( 
        <div className={styles.goals}>
            <div className={styles.header}>
                <h2>Goals</h2>
                <img src={IconLibrary.Edit} className='small-icon' alt='edit goals'/>
            </div>
            <div className={styles.content}>
                {goals?.map((goal)=>(
                    <div className={styles.goal} onClick={()=>setLogForm(goal.name)}>
                        <img src={goal.icon} className={styles['goal-icon']}></img>
                        {console.log(goal.icon)}
                        <p className={styles.name}>{goal.name}</p>
                        <p className={styles.target}>{goal.target} {makeFirstUpperCase(goal.unit)}</p>
                    </div>
                ))}
            </div>
            {logForm ? <LogForm type={logForm} closeLogWindow={()=>setLogForm(false)}/> : null}
        </div>
     );
}
 
export default Goals;