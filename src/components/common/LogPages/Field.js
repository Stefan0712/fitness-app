import { IconLibrary } from '../../../IconLibrary';
import styles from './Field.module.css';
import { useState } from 'react';


const Field = ({fieldData, saveField}) => {

    const [name, setName] = useState(fieldData.name || '');
    const [unit, setUnit] = useState(fieldData.unit || '');
    const [target, setTarget] = useState(fieldData.targetValue || 0)
    const [value, setValue] = useState(0);



    const handleSave = () =>{
        const data = {
            ...fieldData,
            name,
            unit,
            targetValue: target
        }
        console.log('Original data: ', fieldData)
        console.log('Logged data: ', data)
    }


    return ( 
        <div className={styles.field}>
            <fieldset className={styles.name}>
                <label>Name</label>
                <input type='text' name='name' id='name' onChange={(e)=>setName(e.target.value)} value={name}></input>
            </fieldset>
            <fieldset className={styles.unit}>
                <label>Unit</label>
                <input type='text' name='name' id='name' onChange={(e)=>setUnit(e.target.value)} value={unit}></input>
            </fieldset>
            <fieldset className={styles.value}>
                <label>Value</label>
                <input type='number' name='value' id='value' onChange={(e)=>setValue(e.target.value)} value={value}></input>
            </fieldset>
            <fieldset className={styles.target}>
                <label>Target</label>
                <input type='number' name='target' id='target' onChange={(e)=>setTarget(e.target.value)} value={target}></input>
            </fieldset>
            <fieldset className={styles.button}>
                <label>.</label>
                <img className='small-icon' src={IconLibrary.Add} onClick={handleSave}></img>
            </fieldset>
            
        </div>
     );
}
 
export default Field;