import styles from './Goals.module.css';
import { IconLibrary } from '../../../IconLibrary';
import { useState } from 'react';
import {colors} from '../../../constants/defaultColors';
import { defaultIcons } from '../../../constants/defaultIcons';
import { useDispatch } from 'react-redux';
import { addGoal } from '../../../store/userSlice.ts';
const NewGoal = ({closeNewGoal}) => {


    const dispatch = useDispatch();
    //TODO: Add validation

    const [name, setName] = useState('');
    const [unit, setUnit] = useState('');
    const [target, setTarget] = useState(0);
    const [color, setColor] = useState('white');
    const [icon, setIcon] = useState(defaultIcons[0]);
    
    const handleAddGoal = () =>{
        if(name && unit && target){
            const goalData = {
                name,
                unit,
                target,
                color,
                icon
            }
            dispatch(addGoal(goalData));
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
                    <div className={styles.items}>
                        {colors.map((c, index)=>(
                            <button key={"color-"+index} className={styles.colorButton} onClick={()=>setColor(c)} style={{backgroundColor: c, border: `2px solid ${color === c ? 'white' : 'transparent'}`}}></button>
                        ))}
                    </div>
                </div>
                    
                <div className={styles['items-container-header']}>
                    <label>Icon</label>
                    <img src={icon.icon} alt='' className={styles['icon-picker-img']} />
                </div>
                <div className={styles['items-container']}>
                    <div className={styles.items}>
                        {defaultIcons.map((i, index)=>(
                            <button key={"icon-"+index} className={styles.iconButton} onClick={()=>setIcon(i)} style={{border: `2px solid ${icon === i ? 'white' : 'transparent'}`}}>
                                <img src={i.icon} alt='' />
                            </button>
                        ))}
                    </div>
                </div>
                
            </div>
            <div className={styles['new-goal-buttons']}>
                <button type="button" className={styles.submit} onClick={handleAddGoal}>Create Goal</button>
                <button type="button" className={styles.cancel} onClick={closeNewGoal}>Cancel</button>
            </div>
        </div>
     );
}
 
export default NewGoal;