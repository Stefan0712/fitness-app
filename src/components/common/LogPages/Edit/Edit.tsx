import styles from '../../Goals/Goals.module.css';
import React from 'react';
import { useState } from 'react';
import ColorPicker from '../../ColorPicker/ColorPicker.tsx';
import IconPicker from '../../IconPicker/IconPicker.tsx';
import { Goal } from '../../interfaces.ts';
import { saveItem } from '../../../../db.js';
import { useUI } from '../../../../context/UIContext.jsx';


interface EditParams {
    closeEdit: ()=> void;
    goalData: Goal;
    refreshLogData: ()=>void;
}
const Edit: React.FC<EditParams> = ({goalData, closeEdit, refreshLogData}) => {


    const {showMessage} = useUI();
    const [name, setName] = useState<string>(goalData.name || '');
    const [unit, setUnit] = useState<string>(goalData.unit || '');
    const [target, setTarget] = useState<number>(goalData.target || 0);
    const [color, setColor] = useState<string>(goalData.color || 'white');
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
    const [showIconPicker, setShowIconPicker] = useState<boolean>(false);
    const [icon, setIcon] = useState(goalData.icon || '')
    const [type, setType] = useState<string>('target');

    const handleUpdateGoal = async () =>{
        let newData;
        if(name && unit && target){
            if(type === 'target' && target && name && unit){
                newData = {
                    _id: goalData._id,
                    name,
                    unit,
                    target,
                    color,
                    icon,
                    type
                }
            }else if(type === 'yes-no'){
                newData = {
                    _id: goalData._id,
                    name,
                    color,
                    icon,
                    type
                }
            }else if(type === 'number' && name && unit){
                newData = {
                    _id: goalData._id,
                    name,
                    unit,
                    color,
                    icon,
                    type
                }
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
            await saveItem('goals', newData);
            showMessage("Goal updated successfully", 'success');
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
                <button type="button" className={styles.submit} onClick={handleUpdateGoal}>Save</button>
                <button type="button" className={styles.cancel} onClick={closeEdit}>Cancel</button>
            </div>
        </div>
     );
}
 
export default Edit;