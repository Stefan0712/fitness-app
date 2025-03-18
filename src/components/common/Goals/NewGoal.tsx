import styles from './Goals.module.css';
import { IconLibrary } from '../../../IconLibrary.js';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addGoal } from '../../../store/userSlice.ts';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import ColorPicker from '../ColorPicker/ColorPicker.tsx';
import IconPicker from '../IconPicker/IconPicker.tsx';

interface Goal {
    id: string,
    name: string,
    unit: string,
    target: number,
    icon: string,
    color: string
}
// TODO: ADD better validation and messages


const NewGoal: React.FC<{ closeNewGoal: ()=>void}> = ({closeNewGoal}) => {


    const dispatch = useDispatch();

    const [name, setName] = useState<string>('');
    const [unit, setUnit] = useState<string>('');
    const [target, setTarget] = useState<number>(0);
    const [color, setColor] = useState<string>('#FFFFFF');
    const [icon, setIcon] = useState<string>(IconLibrary.Dumbbell);
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
    const [showIconPicker, setShowIconPicker] = useState<boolean>(false);




    const handleAddGoal = () =>{
        if(name && unit && target){
            const goalData: Goal = {
                id: uuidv4(),
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
            {showColorPicker ? <ColorPicker getColor={setColor} closeModal={()=>setShowColorPicker(false)} /> : null}
            {showIconPicker ? <IconPicker handleIcon={setIcon} closeModal={()=>setShowIconPicker(false)} currentIcon={icon} /> : null}
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
                <fieldset className={styles.modals}>
                    <div className={styles['color-input']}>
                        <label>Color</label>
                        <button className={styles['color-button']} style={{backgroundColor: color}} onClick={()=>setShowColorPicker(true)}></button> 
                    </div>
                    <div className={styles['icon-input']}>
                        <label>Icon</label>
                        <button className={styles['icon-button']} onClick={()=>setShowIconPicker(true)}><img src={icon} className='small-icon'/></button> 
                    </div>
                </fieldset>
            </div>
            <div className={styles['new-goal-buttons']}>
                <button type="button" className={styles.submit} onClick={handleAddGoal}>Create Goal</button>
                <button type="button" className={styles.cancel} onClick={closeNewGoal}>Cancel</button>
            </div>
        </div>
     );
}
 
export default NewGoal;