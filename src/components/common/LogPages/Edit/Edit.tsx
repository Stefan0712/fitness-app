import styles from './Edit.module.css';
import React from 'react';
import { useState } from 'react';
import {colors} from '../../../../constants/defaultColors';
import { defaultIcons } from '../../../../constants/defaultIcons';
import { useDispatch, useSelector } from 'react-redux';
import { updateGoal } from '../../../../store/userSlice.ts';
import MessageModal from '../../MessageModal/MessageModal.tsx';
import ColorPicker from '../../ColorPicker/ColorPicker.tsx';

interface Icon {
    id: string;
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
    //TODO: Add validation

    const [name, setName] = useState<string>(goalData.name || '');
    const [unit, setUnit] = useState<string>(goalData.unit || '');
    const [target, setTarget] = useState<number>(goalData.target || 0);
    const [color, setColor] = useState<string>(goalData.color || 'white');
    const [icon, setIcon] = useState<Icon>(goalData.icon || defaultIcons[0])
    const [message, setMessage] = useState<MessageObject | null>(null);
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);



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
            <label className={styles.fullLabel}>Color</label>
            <button className={styles['color-button']} style={{backgroundColor: color}} onClick={()=>setShowColorPicker(true)}></button> 
            <label className={styles.fullLabel}>Icon</label>
            <div className={styles['items-container']}>
                <div className={styles['items']}>
                    {defaultIcons.map((i, index)=>(
                        <button key={"icon-"+index} className={styles.iconButton} onClick={()=>setIcon(i)} style={{border: `2px solid ${icon === i ? 'white' : 'transparent'}`}}><img src={i.icon} alt='' /></button>
                    ))}
                </div>
            </div>  
            <button type="button" className={styles.submit} onClick={handleUpdateGoal}>Update Goal</button>
        </div>
     );
}
 
export default Edit;