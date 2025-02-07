import styles from './Goals.module.css';
import GoalsLog from '../LogPages/GoalsLog';
import { useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import { useSelector } from 'react-redux';
import NewGoal from './NewGoal';
import GoalBody from './GoalBody';
import EditGoal from './EditGoal.js';
import LogForm from '../LogPages/GoalsLog';



const Goals = ({closeMenu}) => {


    const [logForm, setLogForm] = useState(null);
    const goals = useSelector((state)=>state.user.userData.goals);
    {console.log(goals ? goals : 'Loading goals')}
    const [showNewGoal, setShowNewGoal] = useState(false);
    const [enableEdit, setEnableEdit] = useState(false);
    const [editGoal, setEditGoal] = useState(null);
    const [logGoal, setLogGoal] = useState(null);

    const handleEdit = (id) =>{
        setEditGoal(id);
        setEnableEdit(false);
    }
    const handleOpenLogForm = (id) =>{
        setLogGoal(id);
    }
    const handleCloseGoalsLog = () =>{
        setLogGoal(null);
        closeMenu();
    }
    return ( 
        <div className={styles.goals}>
            <div className={styles.header}>
                <h2>Goals</h2>
                <img src={IconLibrary.No} className='small-icon' alt='edit goals' onClick={closeMenu} />
            </div>
            <div className={styles.content}>
                    {goals?.map((goal, index)=>(
                        <GoalBody goal={goal} index={index} openLogForm={handleOpenLogForm} enableEdit={enableEdit} editGoal={handleEdit}/>
                    ))}
                </div>
                <div className={styles['buttons-container']}>
                    <button type='button' onClick={()=>setShowNewGoal(true)}>
                        <img src={IconLibrary.Plus} alt='create goal'></img>
                        <p>New Goal</p>
                    </button>
                    <button  onClick={()=>setEnableEdit(enableEdit=>!enableEdit)}>
                        <img src={IconLibrary.Edit} alt='manage goal'></img>
                        <p>Manage Goals</p>
                    </button>
            </div>
                {showNewGoal ? <NewGoal closeNewGoal={()=>setShowNewGoal(false)} /> : null}
                {editGoal ? <EditGoal closeNewGoal={()=>setEditGoal(null)} goalId={editGoal}/> : null}
                {logGoal ? <GoalsLog closeLogWindow={()=>handleCloseGoalsLog()} id={logGoal} /> : null}
        </div>
     );
}
 
export default Goals;