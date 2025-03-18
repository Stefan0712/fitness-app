import styles from './Edit.module.css';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeGoal, updateGoal } from '../../../../store/userSlice.ts';
import MessageModal from '../../MessageModal/MessageModal.tsx';
import ColorPicker from '../../ColorPicker/ColorPicker.tsx';
import IconPicker from '../../IconPicker/IconPicker.tsx';
import DeletePrompt from './DeletePrompt.tsx';

interface Icon {
    url: string;
    name: string;
}
interface GoalData{
    icon: Icon;
    id: string;
    name: string;
    target: number;
    unit: string;
    color: string;
}
interface EditParams {
    closeEdit: ()=> void;
    goalId: string;
}
interface MessageObject{
    message: string;
    type: string;
}
const Edit: React.FC<EditParams> = ({closeEdit, goalId}) => {


    const dispatch = useDispatch();
    const goalData = useSelector<GoalData>((state)=>state.user.goals.find((item)=>item.id===goalId));

    const [name, setName] = useState<string>(goalData.name || '');
    const [unit, setUnit] = useState<string>(goalData.unit || '');
    const [target, setTarget] = useState<number>(goalData.target || 0);
    const [color, setColor] = useState<string>(goalData.color || 'white');
    const [icon, setIcon] = useState<Icon>(goalData.icon)
    const [message, setMessage] = useState<MessageObject | null>(null);
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
    const [showIconPicker, setShowIconPicker] = useState<boolean>(false);
    const [showDeletePrompt, setShowDeletePrompt] = useState<boolean>(false);


    const handleUpdateGoal = () =>{
       if(!name){
        setMessage({type: 'fail', message: "Name invalid"});
       }else if(!target || target <= 0){
        setMessage({type: 'fail', message: "Target value invalid"});
       }else if(!unit){
        setMessage({type: 'fail', message: "Unit invalid"});
       }else{
        if(name && unit && target){
            const newData: GoalData = {
                id: goalId,
                name,
                unit,
                target,
                color,
                icon
            }
            console.log(newData)
            dispatch(updateGoal(newData));
            setMessage({type: 'success', message: "Goal updated successfully"});
            closeEdit();

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
        
    }

    return ( 
        <div className={styles['edit-goal']}>
            {message ? <MessageModal closeModal={()=>setMessage(null)} type={message.type} message={message.message} /> : null}
            {showColorPicker ? <ColorPicker getColor={setColor} closeModal={()=>setShowColorPicker(false)} /> : null}
            {showIconPicker ? <IconPicker handleIcon={setIcon} closeModal={()=>setShowIconPicker(false)} currentIcon={icon} /> : null}
            {showDeletePrompt ? <DeletePrompt closeModal={()=>setShowDeletePrompt(false)} id={goalId} sendMessage={()=>setMessage({type: 'success', message: "Deleted successfully"})} /> : null }
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
                <input type='number' name='target' id='target' onChange={(e)=>setTarget(parseInt(e.target.value))} value={target}></input>
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
            <button type="button" className={styles.submit} onClick={handleUpdateGoal} disabled={showDeletePrompt}>Update Goal</button>
            <button type="button" className={styles.delete} onClick={()=>setShowDeletePrompt(true)}>Delete Goal</button>
        </div>
     );
}
 
export default Edit;