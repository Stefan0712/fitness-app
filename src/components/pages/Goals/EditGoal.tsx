import styles from './Goals.module.css';
import { IconLibrary } from '../../../IconLibrary.js';
import { useState } from 'react';
import ColorPicker from '../../common/ColorPicker/ColorPicker.tsx';
import IconPicker from '../../common/IconPicker/IconPicker.tsx';
import { Goal } from '../../common/interfaces.ts';
import { saveItem } from '../../../db.js';
import { useUI } from '../../../context/UIContext.jsx';

const EditGoal = ({close, goalData}) => {

    const {showMessage} = useUI();


    const [name, setName] = useState<string>(goalData.name || '');
    const [unit, setUnit] = useState<string>(goalData.unit || '');
    const [target, setTarget] = useState<number>(goalData.target || 0);
    const [color, setColor] = useState<string>(goalData.color || '#FFFFFF');
    const [icon, setIcon] = useState<string>(goalData.icon || IconLibrary.Dumbbell);
    const [pinToDashboard, setPinToDashboard] = useState<boolean>(goalData.pinToDashboard || false);
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
    const [showIconPicker, setShowIconPicker] = useState<boolean>(false);
    const [type, setType] = useState<string>(goalData.type || 'target');

    const handleEditGoal = async () =>{
        if(type === 'target' && target && name && unit){
            const newData: Goal = {
                _id: goalData._id,
                name,
                unit,
                target,
                color,
                icon,
                type,
                pinToDashboard,
                order: goalData.order || -1
            }
            await saveItem('goals',newData);
            showMessage("Goal updated successfully!",'success');
            close();
        }else if(type === 'yes-no'){
            const newData = {
                _id: goalData._id,
                name,
                color,
                icon,
                type,
                pinToDashboard,
                order: goalData.order || -1
            }
            await saveItem('goals',newData);
            showMessage("Goal updated successfully!",'success');
            close();
        }else if(type === 'number' && name && unit){
            const newData = {
                _id: goalData._id,
                name,
                unit,
                color,
                icon,
                type,
                pinToDashboard,
                order: goalData.order || -1
            }
            await saveItem('goals',newData);
            showMessage("Goal updated successfully!",'success');
            close();
        }else{
            console.log('Something went wrong',{
                name: name || 'Missing name',
                unit: unit || 'Missing unit',
                target,
                color,
                icon,
                type,
                pinToDashboard
            })
        }
        
    }
    
    return ( 
        <div className={styles['new-goal']}>
            {showColorPicker ? <ColorPicker getColor={setColor} closeModal={()=>setShowColorPicker(false)} /> : null}
            {showIconPicker ? <IconPicker handleIcon={setIcon} closeModal={()=>setShowIconPicker(false)} currentIcon={icon} /> : null}
            <div className={styles.header}>
                <h3>Edit Goal</h3>
            </div>
            <div className={styles.goal}>
                <div className={styles["goal-color"]} style={{backgroundColor: color}} />
                <img src={icon} className={'small-icon'}></img>
                <p className={styles.name}>{name}</p>
                <p style={{color: color}} className={styles.target}>0/{target || 0} {unit}</p>
            </div>
            <div className={styles.goalSettings}>
                <fieldset className={styles.goalType}>
                    <label>Goal Type</label>
                    <select onChange={(e)=>setType(e.target.value)} value={type} id='type' className={styles.targetButton} name='type'>
                        <option value={'yes-no'}>Yes/No</option>
                        <option value={'number'}>Number</option>
                        <option value={'target'}>Target</option>
                    </select>
                </fieldset>
                <fieldset className={styles.goalPin}>
                    <label>Pin to Dashboard ?</label>
                    <input type='checkbox' onChange={(e)=>setPinToDashboard(e.target.checked)} checked={pinToDashboard} id='pin' className={styles.targetButton} name='pin' />
                </fieldset>
            </div>
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
                <button type="button" className={styles.submit} onClick={handleEditGoal}>Update Goal</button>
                <button type="button" className={styles.cancel} onClick={close}>Cancel</button>
            </div>
        </div>
     );
}
 
export default EditGoal;