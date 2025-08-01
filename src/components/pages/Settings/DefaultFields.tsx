import { Field, Unit } from '../../common/interfaces';
import styles from './DefaultFields.module.css';
import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import { IconLibrary } from '../../../IconLibrary.js';
import AppHeader from '../../common/AppHeader/AppHeader.tsx';
import UnitSelector from '../../common/UnitSelector/UnitSelector.tsx';
import { useUI } from '../../../context/UIContext.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/index.ts';
import { updateCustomFields } from '../../../store/userSlice.ts';

const DefaultFields: React.FC = () => {

    const existingFields = useSelector((state: RootState)=>state.user.customFields);
    const [fields, setFields] = useState(existingFields ?? [])
    const [showForm, setShowForm] = useState<boolean>(false);
    const dispatch = useDispatch();
    const {showMessage} = useUI();


    const handleRemove = (field) =>{
        dispatch(updateCustomFields({operation: 'remove', data: field}));
        setFields(prev=>[...prev.filter(item=>item._id !== field._id)]);
        showMessage('Custom field deleted!', "success");
    }
    
    return ( 
        <div className={styles['default-fields']}>
            <AppHeader title='Custom Fields' button={<button className='clear-button' style={{width: '40px', height: '40px', marginLeft: 'auto'}} onClick={()=>setShowForm(true)}><img src={IconLibrary.Add} className='small-icon' alt='' /></button>}/>
            <div className={styles['fields-container']}>
                {fields && fields.length > 0 ? fields.map(field=>
                <div key={field.id} className={styles.field}>
                    <div className={styles.fieldInfo}>
                        <h3>{field.name}</h3>
                        <p>{field.target} {field.unit?.shortLabel}</p>
                        <p>{field.description ?? 'No description'}</p>
                    </div>
                    <button className={styles.deleteFieldButton} onClick={()=>handleRemove(field)}><img src={IconLibrary.Close} className='small-icon' alt='' /></button>
            </div>) : null}
            </div>
            {showForm ? <CustomFieldForm setFields={setFields} closeForm={()=>setShowForm(false)}/> : null}
        </div>
     );
}
 
export default DefaultFields;


const CustomFieldForm = ({setFields, closeForm}) =>{

    const {showMessage} = useUI();
    const dispatch = useDispatch();

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [target, setTarget] = useState<number>('');
    const [unit, setUnit] = useState<Unit | null>();

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
            dispatch(updateCustomFields({operation: 'add', data}))
            setFields(prev=>[...prev, data]);
            setName('');
            setDescription('');
            setTarget(0);
            setUnit(null);
            closeForm();
            showMessage("Custom field created successfully", "success");
        }else{
            showMessage("There was an error creating your custom field!", "error")
        }
    }
    const checkForErrors = () =>{
        if(!name || name.length <3 || name.length > 15 ){
            showMessage("Name is invalid. It should be between 3 and 14 characters", "error");
            return false;
        }
        if(description.length > 50 ){
            showMessage("Description is too long. Keep it under 50 characters.", "error");
            return false;
        }
        if(!target || target < 1 ){
            showMessage("Target should be above 0", "error");
            if(target > 99999){
                showMessage("Target is too high", "error");
            }
            return false;
        }
    }
    return (
        <div className={styles.newCustomField}>
            <h3>Create a new field</h3>
            <input type='text' name='name' id='name' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name'></input>
            <input type='text' name='description' id='description' value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Description'></input>
            <div className={styles['row-inputs']}>
                <input type='number' name='target' id='target' value={target} onChange={(e)=>setTarget(parseInt(e.target.value))} placeholder='Target'></input>
                <UnitSelector unit={unit} setUnit={setUnit} />
            </div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap:'10px'}}>
                <button className={styles.cancel} onClick={closeForm}>Cancel</button>
                <button className={styles.save} onClick={handleCreateField}>Create Field</button>
            </div>
        </div>
    )
}