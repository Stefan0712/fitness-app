import { useState } from 'react';
import styles from './FieldsScreen.module.css';
import { Field, Unit } from '../../../../common/interfaces';
import {v4 as uuidv4} from 'uuid';
import { IconLibrary } from '../../../../../IconLibrary';
import UnitSelector from '../../../../common/UnitSelector/UnitSelector.tsx';


const FieldsScreen = ({fields, setFields, type='other', defaultFields}) => {
    const [name, setName] = useState('');
    const [target, setTarget] = useState('');
    const [value, setValue] = useState('')
    const [unit, setUnit] = useState<Unit | null>(null);




    const handleAddField = () =>{
        if(name.length > 0 && name.length <= 20){
            const fieldData: Field = {
                _id: uuidv4(),
                name,
                value: type === 'log' && value !== '' ? parseInt(value) : 0,
                target: parseInt(target) > 0 ? parseInt(target) : 0,
                unit,
                isCompleted: false
            }
            setFields(prev=>[...prev, fieldData]);
            setName('');
            setUnit(null);
            setTarget("");
        }
    }
    return ( 
        <div className={`${styles.fieldsScreen} ${styles.screen}`}>
            <h4>Custom fields</h4>
            <div className={styles.customFields}>
                {defaultFields?.length > 0 ? defaultFields.map((field, index)=><CustomFieldBody key={'Custom-field-'+index} field={field} setFields={setFields} />) : null}
            </div>
            <h4>Recorded values</h4>
            <div className={styles.newField}>
                <input type='text' id='name' name='name' value={name} onChange={(e)=>setName(e.target.value)} minLength={0} maxLength={20} placeholder='Name' />
                {type === 'log' ? 
                    <input type='string' id='value' name='value' value={value} onChange={(e)=>setValue(e.target.value)} placeholder='Value'/> :
                    <input type='string' id='target' name='target' value={target} onChange={(e)=>setTarget(e.target.value)} placeholder='Target'/>
                }
                <UnitSelector unit={unit} setUnit={setUnit} />
                <button onClick={handleAddField} type='button' className='clear-button'><img src={IconLibrary.Add} alt='add new field' style={{width: '30px', height: '30px'}} /></button>
            </div>
            <div className={styles.fields}>
                {fields?.length > 0 ? fields?.map((field, index)=><FieldBody key={'Created-field-'+index} field={field} setFields={setFields} />) : <p>No fields</p>}
            </div>
        </div>
     );
}
 
export default FieldsScreen;

const FieldBody = ({field, setFields}) =>{

    return(
        <div className={styles.field}>
            <h4>{field.name}</h4>
            <b>{field.target || field.value || ''} {field.unit.shortLabel || 'No unit'}</b>
            <button type='button' className='clear-button' onClick={()=>setFields(prev=>[...prev.filter(item=>item._id !== field._id)])}><img src={IconLibrary.Close} alt='remove field' style={{width: '30px', height: '30px'}} /></button>
        </div>
    )
}
const CustomFieldBody = ({field, setFields}) =>{

    const [value, setValue] = useState(1)
    const handleAddField = (newValue) =>{
        const fieldData: Field = {
                _id: uuidv4(),
                name: field.name,
                value: value ?? 0,
                target: field.target,
                unit: field.unit,
                isCompleted: false
            }
        setFields(prev=>[...prev, fieldData])
    }
    return(
        <div className={styles.customField}>
            <h4>{field.name}</h4>
            <input type='number' min={0} value={value} onChange={(e)=>setValue(parseInt(e.target.value))} />
            <b>{field.unit.shortLabel || 'No unit'}</b>
            <button type='button' className='clear-button' onClick={handleAddField}><img src={IconLibrary.Add} alt='add field' style={{width: '30px', height: '30px'}} /></button>
        </div>
    )
}
