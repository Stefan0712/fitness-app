import { useState } from 'react';
import styles from './FieldsScreen.module.css';
import { Field } from '../../../../common/interfaces';
import {v4 as uuidv4} from 'uuid';
import { IconLibrary } from '../../../../../IconLibrary';


const FieldsScreen = ({values, setters}) => {
    const [name, setName] = useState('');
    const [target, setTarget] = useState('');
    const [unit, setUnit] = useState('');




    const handleAddField = () =>{
        if(name.length > 0 && name.length <= 20){
            const fieldData: Field = {
                _id: uuidv4(),
                name,
                value: 0,
                target: parseInt(target) > 0 ? parseInt(target) : 0,
                unit,
                isCompleted: false
            }
            setters.setFields(prev=>[...prev, fieldData]);
            setName('');
            setUnit('');
            setTarget("");
        }
    }
    return ( 
        <div className={`${styles.fieldsScreen} ${styles.screen}`}>
            
            <div className={styles.requiredFields}>
                <fieldset className={styles.sets}>
                    <label htmlFor='sets'>Sets</label>
                    <input type='number' id='sets' name='sets' value={values.sets} onChange={(e)=>setters.setSets(parseInt(e.target.value))} min={1} max={50} />
                </fieldset>
                <fieldset className={styles.durationInputs}>
                    <label htmlFor="duration">Duration</label>
                    <input type="number" name="duration" id={styles.durationValue} onChange={(e) => setters.setDuration(parseInt(e.target.value))} value={values.duration} placeholder="Duration"></input>
                    <select name="durationUnit" id={styles.durationUnit} onChange={(e) => setters.setDurationUnit(e.target.value)} value={values.durationUnit}>
                        <option value={'seconds'}>Seconds</option>
                        <option value={'minutes'}>Minutes</option>
                        <option value={'hours'}>Hours</option>
                    </select>
                </fieldset>
                <fieldset className={styles.restInputs}>
                    <label htmlFor="rest">Rest</label>
                    <input type="number" name="rest" id={styles.restValue} onChange={(e) => setters.setRest(parseInt(e.target.value))} value={values.rest} placeholder="Rest"></input>
                    <select name="restUnit" id={styles.restUnit} onChange={(e) => setters.setRestUnit(e.target.value)} value={values.restUnit}>
                        <option value={'seconds'}>Seconds</option>
                        <option value={'minutes'}>Minutes</option>
                        <option value={'hours'}>Hours</option>
                    </select>
                </fieldset>
            </div>
            <div className={styles.newField}>
                <input type='text' id='name' name='name' value={name} onChange={(e)=>setName(e.target.value)} minLength={0} maxLength={20} placeholder='Name' />
                <input type='string' id='target' name='target' value={target} onChange={(e)=>setTarget(e.target.value)} placeholder='Target'/>
                <input type='text' id='unit' name='unit' value={unit} onChange={(e)=>setUnit(e.target.value)} minLength={0} maxLength={6} placeholder='Unit'/>
                <button onClick={handleAddField} type='button' className='clear-button'><img src={IconLibrary.Add} alt='add new field' style={{width: '30px', height: '30px'}} /></button>
            </div>
            <div className={styles.fields}>
                {values.fields?.length > 0 ? values.fields?.map((field, index)=><FieldBody key={'Created-field-'+index} field={field} setFields={setters.setFields} />) : <p>No custom fields created</p>}
            </div>
        </div>
     );
}
 
export default FieldsScreen;

const FieldBody = ({field, setFields}) =>{

    return(
        <div className={styles.field}>
            <h4>{field.name}</h4>
            <b>{field.target || ''} {field.unit || 'No unit'}</b>
            <button type='button' className='clear-button' onClick={()=>setFields(prev=>[...prev.filter(item=>item._id !== field._id)])}><img src={IconLibrary.Close} alt='remove field' style={{width: '30px', height: '30px'}} /></button>
        </div>
    )
}