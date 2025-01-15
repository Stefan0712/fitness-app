import { removeGoal } from '../../../store/userSlice';
import { makeFirstUpperCase } from '../../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import styles from './Goals.module.css';
import { IconLibrary } from '../../../IconLibrary';

const GoalBody = ({goal, index, enableEdit, editGoal, openLogForm}) => {


    const dispatch = useDispatch();
    const [confirmDelete, setConfirmDelete] = useState(false);



    return ( 
        <div className={styles.goal} key={index} onClick={!enableEdit ? ()=>openLogForm(goal.id) : null}>
            <div className={styles["goal-color"]} style={{backgroundColor: goal.color}} />
            <img src={goal.icon.icon} className={styles['goal-icon']}></img>
            <p className={styles.name}>{goal.name}</p>
            <p className={styles.target}>{goal.target} {makeFirstUpperCase(goal.unit)}</p>
            {enableEdit && !confirmDelete ? (
                    <div className={styles['edit-goal-buttons']}>
                        <button type='button' className='clear-button' onClick={()=>editGoal(goal.id)}><img src={IconLibrary.Edit} className='small-icon' alt=''/></button>
                        <button type='button' className='clear-button' onClick={()=>setConfirmDelete(true)}><img src={IconLibrary.Delete} className='small-icon' alt=''/></button>
                    </div>   
                ) : enableEdit && confirmDelete ?  (
                    <div className={styles['edit-goal-buttons']}>
                        <button type='button' className='clear-button' onClick={()=>dispatch(removeGoal(goal.id))}><img src={IconLibrary.Yes} className='small-icon' alt=''/></button>
                        <button type='button' className='clear-button' onClick={()=>setConfirmDelete(false)}><img src={IconLibrary.No} className='small-icon' alt=''/></button>
                    </div>   
                ) : null }   
            
        </div>
     );
}
 
export default GoalBody;