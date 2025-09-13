import styles from './EditGoal.module.css';
import { IconLibrary } from '../../../IconLibrary.js';
import { useState } from 'react';
import ColorPicker from '../../common/ColorPicker/ColorPicker.tsx';
import IconPicker from '../../common/IconPicker/IconPicker.tsx';
import { Goal, Unit } from '../../common/interfaces.ts';
import { deleteAllGoalLogs, deleteGoalLogs, deleteItem, saveItem } from '../../../db.js';
import { useUI } from '../../../context/UIContext.jsx';
import UnitSelector from '../../common/UnitSelector/UnitSelector.tsx';
import { iconList } from '../../../icons.js';
import Toggle from '../../common/Toggle/Toggle.tsx';
import { useNavigate } from 'react-router-dom';
import { getCurrentDay } from '../../../helpers.js';


const EditGoal = ({close, goalData}) => {

    const {showMessage, showConfirmationModal} = useUI();
    const navigate = useNavigate();

    const [name, setName] = useState<string>(goalData.name || '');
    const [unit, setUnit] = useState<Unit>(goalData.unit);
    const [target, setTarget] = useState<number>(goalData.target || 0);
    const [color, setColor] = useState<string>(goalData.color || '#FFFFFF');
    const [icon, setIcon] = useState<string>(goalData.icon || IconLibrary.Dumbbell);
    const [pinToDashboard, setPinToDashboard] = useState<string>(goalData.pinToDashboard || 'hide');
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
    const [showIconPicker, setShowIconPicker] = useState<boolean>(false);
    const [customValues, setCustomValues] = useState<number[]>(goalData.defaultValues || [])
    const [type, setType] = useState<string>(goalData.type || 'target');
    const [showNewCustomValue, setShowNewCustomValue] = useState(false);
    const [pinnedToQuickmenu, setPinnedToQuickmenu] = useState(goalData.pinnedToQuickmenu || false)

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
                defaultValues: customValues,
                pinnedToQuickmenu,
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
                pinnedToQuickmenu,
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
                pinnedToQuickmenu,
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
                pinnedToQuickmenu,
                type,
                pinToDashboard
            })
        }
        
    }
    const IconComponent = iconList.find(item => item.id === goalData.icon)?.icon; // Find the icon based on the saved id
    
    const handleDeleteGoal = async () =>{
        try{
            await deleteItem('goals', goalData._id);
            await deleteAllGoalLogs(goalData._id);
            showMessage("Goal deleted successfully!", "success");
            navigate('/goals');
        }catch(error){
            console.error(error)
        }
    }

    const handleResetGoal = async () =>{
        if(goalData){
            const todayDate = getCurrentDay();
            await deleteGoalLogs(goalData._id, todayDate);
        }else{
            showMessage("Something went wrong! No goal data found?", "error");
        }
    }
    return ( 
        <div className={styles.editGoal}>
           <div className={styles.content}>
                {showColorPicker ? <ColorPicker getColor={setColor} closeModal={()=>setShowColorPicker(false)} /> : null}
                {showIconPicker ? <IconPicker handleIcon={setIcon} closeModal={()=>setShowIconPicker(false)} currentIcon={icon} /> : null}
                {showNewCustomValue ? <NewCustomValue customValues={customValues} setCustomValues={setCustomValues} close={()=>setShowNewCustomValue(false)} unit={unit}/> : null}

                <div className={styles.header}>
                    <h3>Edit Goal</h3>
                </div>
                <div className={styles.goalSettings}>
                    <div className={styles.toggleInput}>
                        <label>Type</label>
                        <select onChange={(e)=>setType(e.target.value)} value={type} id='type' className={styles.targetButton} name='type'>
                            <option value={'yes-no'}>Yes/No</option>
                            <option value={'number'}>Number</option>
                            <option value={'target'}>Target</option>
                        </select>
                    </div>
                    <div className={styles.toggleInput}>
                        <label>Pin to Quick Menu</label>
                        <Toggle isActive={pinnedToQuickmenu === 'true'} turnOn={()=>setPinnedToQuickmenu('true')} turnOff={()=>setPinnedToQuickmenu('false')} />
                    </div>
                    <div className={styles.toggleInput}>
                        <label>Tracker Size</label>
                        <select onChange={(e)=>setPinToDashboard(e.target.value)} value={pinToDashboard.toString()} id='dashboardShow' className={styles.targetButton} name='dashboardShow'>
                            <option value={'large'}>Large</option>
                            <option value={'small'}>Small</option>
                            <option value={'hide'}>Hide</option>
                        </select>
                    </div>
                </div>
                <div className={styles.generalInputs}>
                    <div className={styles.toggleInput}>
                        <label>Name</label>
                        <input type='text' name='name' id='name' onChange={(e)=>setName(e.target.value)} value={name} placeholder='Name'></input>
                    </div>
                    <div className={styles.toggleInput}>
                        <label>Goal Icon</label>
                        <button className={styles['icon-button']} onClick={()=>setShowIconPicker(true)}>{IconComponent && <IconComponent fill={goalData.color} width="100%" height="100%"/>}</button> 
                    </div>
                    <div className={styles.toggleInput}>
                        <label>Goal Color</label>
                        <button className={styles['color-button']} style={{backgroundColor: color}} onClick={()=>setShowColorPicker(true)}></button>
                    </div>
                </div>
                {type === 'target' ? 
                    <div className={styles.toggleInput}>
                        <label>Target</label>
                        <input type='number' min={0} max={99999} id='target' name='target' onChange={(e)=>setTarget(parseInt(e.target.value))} value={target} />
                    </div> 
                : null}
                {type === 'target' || type === 'number' ? 
                    <div className={styles.toggleInput}>
                        <label>Unit</label>
                        <UnitSelector unit={unit} setUnit={setUnit} />
                    </div> 
                : null}
                {type === 'target' ?
                    <>
                        <div className={styles.customValueHeader}>
                            <p style={{width: '100%'}}>Default Values {customValues.length}/5</p>
                            <button className={styles.addCustomValue} onClick={()=>setShowNewCustomValue(true)}><img src={IconLibrary.Add} alt='add custom value'></img></button>
                        </div>
                        <div className={styles.customValues}>
                            {customValues && customValues.length > 0 ? customValues.map(value=><CustomValue index={value} unit={goalData.unit} customValues={customValues} customValue={value} setCustomValues={setCustomValues} />) : <p className={styles.customValue}>No custom values</p>}
                        </div>
                    </>
                : null}
                <div className={styles.dangerButtons}>
                    <button className={styles.dangerButton} onClick={()=>showConfirmationModal({title: 'Are you sure?', message:'This will delete all logs recorded today and cannot be undone. Are you sure you want to continue?', onConfirm: handleResetGoal})}>Reset</button>
                    <button className={styles.dangerButton} onClick={()=>showConfirmationModal({title: 'Are you sure?', message:'This will delete your goal and all related logs. Are you sure you want to continue?', onConfirm: handleDeleteGoal})}>Delete Goal</button>
                </div>
                <div className={styles.confirmButtons}>
                    <button type="button" className={styles.cancel} onClick={close}>Cancel</button>
                    <button type="button" className={styles.submit} onClick={handleEditGoal}>Update</button>
                </div>
           </div>
        </div>
     );
}
 
export default EditGoal;



const CustomValue = ({customValue, setCustomValues, customValues, unit, index}) => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className={styles.customValueBody} key={index}>
            {showForm ? <NewCustomValue customValue={customValue} customValues={customValues} setCustomValues={setCustomValues} close={()=>setShowForm(false)} unit={unit}/> : null}
            <p className={styles.customValueInput} onClick={()=>setShowForm(true)}>{customValue}</p>
            <button onClick={()=>setCustomValues(prev=>[...prev.filter(item=>item!==customValue)])}>
                <img src={IconLibrary.Close} alt='' />
            </button>
        </div>
    )
}



interface NewCustomValueProps {
    customValues: number[];
    setCustomValues: React.Dispatch<React.SetStateAction<number[]>>;
    customValue?: number;
    unit: Unit;
    close: () =>void;
}
const NewCustomValue: React.FC<NewCustomValueProps> = ({customValues, setCustomValues, customValue, unit, close}) =>{

    const [value, setValue] = useState<number>(customValue ?? 0);
    const {showMessage} = useUI();

    const handleSaveCustomValue = () =>{
        // Checks if the value already exists only when there is no custom value provided (if there is a custom value then it will already exist and won't let the user save the already existing value)
        if(!customValue && customValues.includes(value)){
            showMessage("Value already exist!", "error");
        }else if(value < 1 || !value){
            showMessage("Value is invalid! It should be more than 0", "error"); // Shows an error if the value is 0 or less
        }else{
            // If there is a custom value then copy the custom values array without it and add the new value, even if it might be the same. Otherwise, just add the new value
            if(customValue){
                setCustomValues(prev=>[...prev.filter(item=>item!==customValue), value]);        
            }else{
                setCustomValues(prev=>[...prev, value]);
            }
            showMessage("Custom value saved", "success");
            close();
        }
    }
    return(
        <div className={styles.newCustomValue}>
            <fieldset>
                <label>Custom Value</label>
                <div className={styles.customValueInput}>
                    <input type='number' onChange={(e)=>setValue(parseInt(e.target.value))} value={value} required={true} />
                    <p>{unit.shortLabel}</p>
                </div>
            </fieldset>
            <div className={styles.buttonsContainer}>
                <button className={styles.closeButton} onClick={close}>Close</button>
                <button className={styles.saveButton} onClick={handleSaveCustomValue}>Save</button>
            </div>
        </div>
    )
}