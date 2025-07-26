import styles from './Goals.module.css';
import { IconLibrary } from '../../../IconLibrary.js';
import { useEffect, useState } from 'react';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import ColorPicker from '../../common/ColorPicker/ColorPicker.tsx';
import IconPicker from '../../common/IconPicker/IconPicker.tsx';
import { Goal } from '../../common/interfaces.ts';
import { getAllItems, saveItem } from '../../../db.js';
import UnitSelector from '../../common/UnitSelector/UnitSelector.tsx';
import { useUI } from '../../../context/UIContext.jsx';
import { iconList } from '../../../icons.js';

const NewGoal: React.FC<{ close: ()=>void}> = ({close}) => {

    const {showMessage} = useUI();
    const [name, setName] = useState<string>('');
    const [unit, setUnit] = useState<string>('');
    const [target, setTarget] = useState<number>(0);
    const [color, setColor] = useState<string>('#FFFFFF');
    const [icon, setIcon] = useState<string>('goal');
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
    const [showIconPicker, setShowIconPicker] = useState<boolean>(false);
    const [type, setType] = useState<string>('target');
    const [allGoals, setAllGoals] = useState([]);
    const [customValues, setCustomValues] = useState<number[]>([])

    const handleAddGoal = async () =>{
        if(type === 'target' ){
            if(target && name && unit){
                const goalData: Goal = {
                    _id: uuidv4(),
                    name,
                    unit,
                    target,
                    color,
                    icon,
                    type,
                    pinToDashboard: true,
                    defaultValues: customValues,
                    order: allGoals.length
                }
                await saveItem('goals',goalData);
                showMessage("Goal created!",'success');
                close();
            }else{
                if(!target){
                    showMessage("Target is invalid. It should be a number", 'error');
                }
                if(!name){
                    showMessage("Name is invalid. It cannot be empty", 'error');
                }
                if(!unit){
                    showMessage("Unit is invalid. It cannot be empty", 'error');
                }

            }
            
        }else if(type === 'yes-no'){
           if(name && name.length > 0 ){
                const goalData = {
                    _id: uuidv4(),
                    name,
                    color,
                    icon,
                    type,
                    pinToDashboard: true,
                    order: allGoals.length
                }
                await saveItem('goals',goalData);
                showMessage("Goal created!",'success');
                close();
           }else{
            showMessage("Name is invalid. It should be at least one character long", 'error')
           }
        }else if(type === 'number' && name && unit){
            if(name && unit && name.length > 0 ){
                const goalData = {
                    _id: uuidv4(),
                    name,
                    unit,
                    color,
                    icon,
                    type,
                    pinToDashboard: true,
                    order: allGoals.length
                }
                await saveItem('goals',goalData);
                showMessage("Goal created!",'success');
                close();
            }else{
                if(!name){
                    showMessage("Name is invalid. It cannot be empty", 'error');
                }
                if(!unit){
                    showMessage("Unit is invalid. It cannot be empty", 'error');
                }

            }
        }else{
            console.log('Something went wrong',{
                name: name || 'Missing name',
                unit: unit || 'Missing unit',
                target,
                color,
                icon,
                type
            });
            showMessage("There was an error. Check the console!",'error');
        }
        
    }
    const getAllGoals = async () =>{
        try{
            const result = await getAllItems('goals');
            setAllGoals(result);
        }catch(error){
            console.error(error);
            showMessage("Failed to get all goals", "error")
        }
    }
    const addDefaultValue = () =>{
        if(customValues.length < 5){
            setCustomValues(prev=>[...prev, 0]);
        }else{
            showMessage("You cannot have more than 5 custom values for one goal",'error');
        }
    }
    useEffect(()=>{getAllGoals()},[]);


    const IconComponent = iconList.find(item => item.id === icon)?.icon;


    return ( 
        <div className={styles['new-goal']}>
            {showColorPicker ? <ColorPicker getColor={setColor} closeModal={()=>setShowColorPicker(false)} /> : null}
            {showIconPicker ? <IconPicker handleIcon={setIcon} closeModal={()=>setShowIconPicker(false)} currentIcon={icon} /> : null}
            <div className={styles.header}>
                <h3>New Goal</h3>
            </div>
            <fieldset>
                <label>Goal Type</label>
                <select onChange={(e)=>setType(e.target.value)} value={type} id='type' className={styles.targetButton} name='type'>
                    <option value={'yes-no'}>Yes/No</option>
                    <option value={'number'}>Number</option>
                    <option value={'target'}>Target</option>
                </select>
            </fieldset>
            <div className={styles['new-goal-inputs']}>
                {type === 'target' ? <div className={styles.targetInputs}>
                    <div className={styles.firstRow}>
                        <input type='text' name='name' id='name' onChange={(e)=>setName(e.target.value)} value={name} placeholder='Name' autoComplete='false'></input>
                        <button className={styles['icon-button']} onClick={()=>setShowIconPicker(true)}>{IconComponent && <IconComponent fill="white" width="30px" height="30px"/>}</button> 
                    </div>
                    <div className={styles.secondRow}>
                        <UnitSelector unit={unit} setUnit={setUnit} />
                        <input type='number' name='target' id='target' onChange={(e)=>setTarget(parseInt(e.target.value))} value={target} placeholder='Target'></input>
                        <button className={styles['color-button']} style={{backgroundColor: color}} onClick={()=>setShowColorPicker(true)}></button> 
                    </div>
                </div> : type === 'yes-no' ? <div className={styles.yesnoInputs}>
                    <div className={styles.firstRow}>
                        <input type='text' name='name' id='name' onChange={(e)=>setName(e.target.value)} value={name} placeholder='Name' autoComplete='false'></input>
                        <button className={styles['icon-button']} onClick={()=>setShowIconPicker(true)}>{IconComponent && <IconComponent fill="white" width="30px" height="30px"/>}</button> 
                        <button className={styles['color-button']} style={{backgroundColor: color}} onClick={()=>setShowColorPicker(true)}></button> 
                    </div>
                </div> : type === 'number' ? <div className={styles.numberInputs}>
                    <div className={styles.firstRow}>
                        <input type='text' name='name' id='name' onChange={(e)=>setName(e.target.value)} value={name} placeholder='Name' autoComplete='false'></input>
                        <button className={styles['icon-button']} onClick={()=>setShowIconPicker(true)}>{IconComponent && <IconComponent fill="white" width="30px" height="30px"/>}</button> 
                    </div>
                    <div className={styles.secondRow}>
                        <UnitSelector unit={unit} setUnit={setUnit} />
                        <button className={styles['color-button']} style={{backgroundColor: color}} onClick={()=>setShowColorPicker(true)}></button> 
                    </div>
                </div> : null}
            </div>
            {type === 'target' ?
                <>
                    <p style={{width: '100%'}}>Default Values {customValues.length}/5</p>
                    <div className={styles.customValuesSection}>
                        <button className={styles.addCustomValue} onClick={addDefaultValue}><img src={IconLibrary.Add} alt='add custom value'></img></button>
                        <div className={styles.customValues}>
                            {customValues && customValues.length > 0 ? customValues.map(value=><CustomValue customValue={value} setCustomValues={setCustomValues} />) : <p className={styles.customValue}>No custom values</p>}
                        </div>
                    </div>
                </>
            : null}
            <div className={styles['new-goal-buttons']}>
                <button type="button" className={styles.submit} onClick={handleAddGoal}>Create Goal</button>
                <button type="button" className={styles.cancel} onClick={close}>Cancel</button>
            </div>
        </div>
     );
}
 
export default NewGoal;


const CustomValue = ({customValue, setCustomValues}) => {

    const [editMode, setEditMode] = useState(false);
    const [value, setValue] = useState(customValue || 0);

    const updateValue = () => {
        setCustomValues(prev => {
            const index = prev.indexOf(customValue);
            if (index === -1) return prev;
            const updated = [...prev];
            updated[index] = parseInt(value);
            return updated;
        });
        setEditMode(false)
    };
    return (
        <div className={styles.customValueBody} key={customValue} onClick={()=>!editMode ? setEditMode(true) : null}>
            {editMode ? <input type='number' className={styles.customValueInput} value={value} onChange={(e)=>setValue(e.target.value)}></input> : <p className={styles.customValueInput}>{value}</p>}
            <button onClick={()=>editMode ? updateValue() : setCustomValues(prev=>[...prev.filter(item=>item!==customValue)])}>
                <img src={editMode ? IconLibrary.Checkmark : IconLibrary.Close} alt='' />
            </button>
        </div>
    )
}