import styles from './Goals.module.css';
import { IconLibrary } from '../../../IconLibrary';
import { useState } from 'react';
import {colors} from '../../../constants/defaultColors';
import { defaultIcons } from '../../../constants/defaultIcons';
import { useDispatch, useSelector } from 'react-redux';
import { updateGoal } from '../../../store/userSlice';
const NewGoal = ({closeNewGoal, goalId}) => {


    const dispatch = useDispatch();
    const goalData = useSelector((state)=>state.user.userData.find((goal)=>goal.id===goalId));
    //TODO: Add validation

    const [name, setName] = useState(goalData.name || '');
    const [unit, setUnit] = useState(goalData.unit || '');
    const [target, setTarget] = useState(goalData.target || 0);
    const [color, setColor] = useState(goalData.color || 'white');
    const [icon, setIcon] = useState(goalData.icon || defaultIcons[0])

    const handleUpdateGoal = () =>{
        if(name && unit && target){
            const newData = {
                name,
                unit,
                target,
                color,
                icon
            }
            dispatch(updateGoal(newData));
            closeNewGoal();
        }else{
            console.log('Something went wrong',{
                name: name || 'Missing name',
                unit: unit || 'Missing unit',
                target,
                color,
                icon
            })
        }
        
    }

    return ( 
        <div className={styles['new-goal']}>
            <div className={styles.header}>
                <h2>New Goal</h2>
                <img src={IconLibrary.No} className='small-icon' alt='edit goals' onClick={closeNewGoal}/>
            </div>
            <div className={styles['new-goal-inputs']}>
                <fieldset className={styles.name}>
                    <label>Name</label>
                    <input type='text' name='name' id='name' onChange={(e)=>setName(e.target.value)} value={name}></input>
                </fieldset>
                <fieldset className={styles.unit}>
                    <label>Unit</label>
                    <input type='text' name='unit' id='unit' onChange={(e)=>setUnit(e.target.value)} value={unit}></input>
                </fieldset>
                <fieldset className={styles.target}>
                    <label>Target</label>
                    <input type='number' name='target' id='target' onChange={(e)=>setTarget(e.target.value)} value={target}></input>
                </fieldset>
                <div className={styles['items-container-header']}>
                    <label>Color</label>
                    <input type='color' className={styles['color-input']} value={color} onChange={(e)=>setColor(e.target.value)}></input>
                </div>
                    
                <div className={styles['items-container']}>
                    {colors.map((c, index)=>(
                        <button key={"color-"+index} className={styles.colorButton} onClick={()=>setColor(c)} style={{backgroundColor: c, border: `2px solid ${color === c ? 'white' : 'transparent'}`}}></button>
                    ))}
                </div>
                    
                <div className={styles['items-container-header']}>
                    <label>Icon</label>
                    <img src={icon.icon} alt='' className={styles['icon-picker-img']} />
                </div>
                <div className={styles['items-container']}>
                    {defaultIcons.map((i, index)=>(
                        <button key={"icon-"+index} className={styles.iconButton} onClick={()=>setIcon(i)} style={{border: `2px solid ${icon === i ? 'white' : 'transparent'}`}}>
                            <img src={i.icon} alt='' />
                        </button>
                    ))}
                </div>
                
            </div>
            <button type="button" className={styles.submit} onClick={handleUpdateGoal}>Update Goal</button>
        </div>
     );
}
 
export default NewGoal;