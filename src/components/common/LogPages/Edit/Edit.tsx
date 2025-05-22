import styles from '../../Goals/Goals.module.css';
import React from 'react';
import { useState } from 'react';
import ColorPicker from '../../ColorPicker/ColorPicker.tsx';
import IconPicker from '../../IconPicker/IconPicker.tsx';
import DeletePrompt from './DeletePrompt.tsx';
import { Goal } from '../../interfaces.ts';
import { saveItem } from '../../../../db.js';


interface EditParams {
    closeEdit: ()=> void;
    goalData: Goal;
    refreshLogData: ()=>void;
}
const Edit: React.FC<EditParams> = ({goalData, closeEdit, refreshLogData}) => {

    const [name, setName] = useState<string>(goalData.name || '');
    const [unit, setUnit] = useState<string>(goalData.unit || '');
    const [target, setTarget] = useState<number>(goalData.target || 0);
    const [color, setColor] = useState<string>(goalData.color || 'white');
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
    const [showIconPicker, setShowIconPicker] = useState<boolean>(false);
    const [showDeletePrompt, setShowDeletePrompt] = useState<boolean>(false);
    const [icon, setIcon] = useState(goalData.icon || '')


    const handleUpdateGoal = async () =>{
       
        if(name && unit && target){
            const newData: Goal = {
                _id: goalData._id,
                name,
                unit,
                target,
                color,
                icon: goalData.icon
            }
            console.log(newData);
            await saveItem('goals', newData)
            closeEdit();
            refreshLogData();
        }
 
        
    }

    return ( 
        <div className={styles['edit-goal']}>
            {showColorPicker ? <ColorPicker getColor={setColor} closeModal={()=>setShowColorPicker(false)} /> : null}
            {showIconPicker ? <IconPicker handleIcon={setIcon} closeModal={()=>setShowIconPicker(false)} currentIcon={icon} /> : null}
            <div className={styles.goal}>
                <div className={styles["goal-color"]} style={{backgroundColor: color}} />
                <img src={icon} className={"small-icon"}></img>
                <p className={styles.name}>{name}</p>
                <p style={{color: color}} className={styles.target}>0/{target || 0} {unit}</p>
            </div>
            <div className={styles['new-goal-inputs']}>
                <div className={styles.firstRow}>
                    <input type='text' name='name' id='name' onChange={(e)=>setName(e.target.value)} value={name} placeholder='Name'></input>
                    <button className={styles['icon-button']} onClick={()=>setShowIconPicker(true)}><img src={icon} className='small-icon'/></button> 
                </div>
                <div className={styles.secondRow}>
                    <input type='text' name='unit' id='unit' onChange={(e)=>setUnit(e.target.value)} value={unit} placeholder='Unit'></input>
                    <input type='number' name='target' id='target' onChange={(e)=>setTarget(parseInt(e.target.value))} value={target} placeholder='Target'></input>
                    <button className={styles['color-button']} style={{backgroundColor: color}} onClick={()=>setShowColorPicker(true)}></button> 
                </div>
            </div>
            <div className={styles['new-goal-buttons']}>
                <button type="button" className={styles.submit} onClick={handleUpdateGoal}>Save</button>
                <button type="button" className={styles.cancel} onClick={closeEdit}>Cancel</button>
            </div>
        </div>
     );
}
 
export default Edit;