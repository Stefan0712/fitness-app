import styles from './Goals.module.css';
import { IconLibrary } from '../../../IconLibrary.js';
import { useState } from 'react';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import ColorPicker from '../../common/ColorPicker/ColorPicker.tsx';
import IconPicker from '../../common/IconPicker/IconPicker.tsx';
import { Goal } from '../../common/interfaces.ts';
import { saveItem } from '../../../db.js';

const NewGoal: React.FC<{ close: ()=>void}> = ({close}) => {
    const [name, setName] = useState<string>('');
    const [unit, setUnit] = useState<string>('');
    const [target, setTarget] = useState<number>(0);
    const [color, setColor] = useState<string>('#FFFFFF');
    const [icon, setIcon] = useState<string>(IconLibrary.Dumbbell);
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
    const [showIconPicker, setShowIconPicker] = useState<boolean>(false);
    const [type, setType] = useState<string>('target');

    const handleAddGoal = async () =>{
        if(type === 'target' && target && name && unit){
            const goalData: Goal = {
                _id: uuidv4(),
                name,
                unit,
                target,
                color,
                icon,
                type
            }
            await saveItem('goals',goalData)
            close();
        }else if(type === 'yes-no'){
            const goalData = {
                _id: uuidv4(),
                name,
                color,
                icon,
                type
            }
            await saveItem('goals',goalData)
            close();
        }else if(type === 'number' && name && unit){
            const goalData = {
                _id: uuidv4(),
                name,
                unit,
                color,
                icon,
                type
            }
            await saveItem('goals',goalData)
            close();
        }else{
            console.log('Something went wrong',{
                name: name || 'Missing name',
                unit: unit || 'Missing unit',
                target,
                color,
                icon,
                type
            })
        }
        
    }
    
    return ( 
        <div className={styles['new-goal']}>
            {showColorPicker ? <ColorPicker getColor={setColor} closeModal={()=>setShowColorPicker(false)} /> : null}
            {showIconPicker ? <IconPicker handleIcon={setIcon} closeModal={()=>setShowIconPicker(false)} currentIcon={icon} /> : null}
            <div className={styles.header}>
                <h3>New Goal</h3>
            </div>
            <div className={styles.goal}>
                <div className={styles["goal-color"]} style={{backgroundColor: color}} />
                <img src={icon} className={styles['goal-icon']}></img>
                <p className={styles.name}>{name}</p>
                <p style={{color: color}} className={styles.target}>0/{target || 0} {unit}</p>
            </div>
            <select onChange={(e)=>setType(e.target.value)} value={type} id='type' className={styles.targetButton} name='type'>
                <option value={'yes-no'}>Yes/No</option>
                <option value={'number'}>Number</option>
                <option value={'target'}>Target</option>
            </select>
            <div className={styles['new-goal-inputs']}>
                {type === 'target' ? <div className={styles.targetInputs}>
                    <div className={styles.firstRow}>
                        <input type='text' name='name' id='name' onChange={(e)=>setName(e.target.value)} value={name} placeholder='Name'></input>
                        <button className={styles['icon-button']} onClick={()=>setShowIconPicker(true)}><img src={icon} className='small-icon'/></button> 
                    </div>
                    <div className={styles.secondRow}>
                        <input type='text' name='unit' id='unit' onChange={(e)=>setUnit(e.target.value)} value={unit} placeholder='Unit'></input>
                        <input type='number' name='target' id='target' onChange={(e)=>setTarget(parseInt(e.target.value))} value={target} placeholder='Target'></input>
                        <button className={styles['color-button']} style={{backgroundColor: color}} onClick={()=>setShowColorPicker(true)}></button> 
                    </div>
                </div> : type === 'yes-no' ? <div className={styles.yesnoInputs}>
                    <div className={styles.firstRow}>
                        <input type='text' name='name' id='name' onChange={(e)=>setName(e.target.value)} value={name} placeholder='Name'></input>
                        <button className={styles['icon-button']} onClick={()=>setShowIconPicker(true)}><img src={icon} className='small-icon'/></button> 
                        <button className={styles['color-button']} style={{backgroundColor: color}} onClick={()=>setShowColorPicker(true)}></button> 
                    </div>
                </div> : type === 'number' ? <div className={styles.numberInputs}>
                    <div className={styles.firstRow}>
                        <input type='text' name='name' id='name' onChange={(e)=>setName(e.target.value)} value={name} placeholder='Name'></input>
                        <button className={styles['icon-button']} onClick={()=>setShowIconPicker(true)}><img src={icon} className='small-icon'/></button> 
                    </div>
                    <div className={styles.secondRow}>
                        <input type='text' className={styles.unitInput} name='unit' id='unit' onChange={(e)=>setUnit(e.target.value)} value={unit} placeholder='Unit'></input>
                        <button className={styles['color-button']} style={{backgroundColor: color}} onClick={()=>setShowColorPicker(true)}></button> 
                    </div>
                </div> : null}
            </div>
            <div className={styles['new-goal-buttons']}>
                <button type="button" className={styles.submit} onClick={handleAddGoal}>Create Goal</button>
                <button type="button" className={styles.cancel} onClick={close}>Cancel</button>
            </div>
        </div>
     );
}
 
export default NewGoal;