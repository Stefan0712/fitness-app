import { useDispatch, useSelector } from 'react-redux';
import { getDateForHeader } from '../../../helpers';
import { Field } from '../../common/interfaces';
import styles from './DefaultFields.module.css';
import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import {RootState} from '../../../store/index.ts';
import { IconLibrary } from '../../../IconLibrary.js';

const DefaultFields: React.FC = () => {

    const existingFields = []
    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [target, setTarget] = useState<number>(0);
    const [unit, setUnit] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);


    const handleCreateField = () =>{
        if(!checkForErrors()){
            const data: Field = {
                _id: uuidv4(),
                name,
                description,
                target,
                unit,
                value: 0,
                isCompleted: false,
                isEnabled: true
            }
            console.log(data)
            setName('');
            setDescription('');
            setTarget(0);
            setUnit('');
        }
    }
    const checkForErrors = () =>{
        setErrors([]);
        let tempErrors: string[] = []
        if(!name || name.length <3 || name.length > 15 ){
            tempErrors.push("Name is invalid. It should be between 3 and 14 characters");
        }
        if(!unit || unit.length <1 || unit.length > 5 ){
            tempErrors.push("Unit is invalid. It should be between 1 and 5 characters");
        }
        if(description.length > 50 ){
            tempErrors.push("Description is too long. Keep it under 50 characters.");
        }
        if(!target || target < 1 ){
             tempErrors.push("Target should be above 0");
            if(target > 99999){
                 tempErrors.push("Target is too high");
            }
        }
        setErrors(tempErrors);
        if(errors.length > 0){
            return true;
        }else{
            return false;
        }

    }
    const toggleField = (field) =>{
        console.log("Enabled field: ",field)
    }
    return ( 
        <div className={styles['default-fields']}>
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}><h2>Default Fields</h2><button style={{backgroundColor: "transparent", border: 'none'}} onClick={()=>setEditMode(prev=>!prev)}><img style={{width: '25px', height: '25px'}} src={editMode ? IconLibrary.Checkmark : IconLibrary.Edit} alt='Enable edit mode'/></button></div>
            </div>
            {errors && errors.length > 0 ? <ul className={styles.errors}>
                {errors.map((item, index)=><li key={"Error-"+index}>{item}</li>)}
            </ul> : null}
            <div className={styles['fields-container']}>
                {existingFields && existingFields.length > 0 ? existingFields.map((item,index)=><div className={styles.field} key={'Field-'+index}>
                    <div className={styles['field-info']}>
                        <h4>{item.name}</h4>
                        <p>{item.description || 'Description not set'}</p>
                        <p>Target: {item.target} {item.unit}</p>
                    </div>
                    <div>
                        {editMode ? 
                        <button style={{backgroundColor: "transparent", border: 'none'}} onClick={()=>dispatch(deleteDefaultField(item))}>
                            <img style={{width: '25px', height: '25px'}} src={IconLibrary.Close} alt='delete field'></img>
                        </button> 
                        : 
                        <button onClick={()=>toggleField(item)} className={`${styles.toggle} ${item.isEnabled ? styles.enabled : styles.disabled}`}>
                            <div className={styles['toggle-ball']}></div>
                        </button> } 
                    </div>
                </div>) : <p>No fields created</p>}
            </div>
            <div className={`${styles['new-field-form']} ${showForm ? styles.extended : ''}`}>
                <h3 onClick={()=>setShowForm(prev=>!prev)}>Create a new field</h3>
                <fieldset>
                    <label>Name</label>
                    <input type='text' name='name' id='name' value={name} onChange={(e)=>setName(e.target.value)}></input>
                </fieldset>
                <fieldset>
                    <label>Description</label>
                    <input type='text' name='description' id='description' value={description} onChange={(e)=>setDescription(e.target.value)}></input>
                </fieldset>
                <div className={styles['row-inputs']}>
                    <fieldset>
                        <label>Target Value</label>
                        <input type='number' name='target' id='target' value={target} onChange={(e)=>setTarget(parseInt(e.target.value))}></input>
                    </fieldset>
                    <fieldset>
                        <label>Unit</label>
                        <input type='text' name='unit' id='unit' value={unit} onChange={(e)=>setUnit(e.target.value)}></input>
                    </fieldset>
                </div>
                <button className={styles['save-field']} onClick={handleCreateField}>Create Field</button>
            </div>
        </div>
     );
}
 
export default DefaultFields;