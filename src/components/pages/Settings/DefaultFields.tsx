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
    const [fields, setFields] = useState<Field[]>(existingFields ?? [])
    const [showForm, setShowForm] = useState<boolean>(false);
    const [editItem, setEditItem] = useState(null)
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
                <div key={field._id} className={styles.field}>
                    <div className={styles.fieldInfo} onClick={()=>setEditItem(field)}>
                        <h3>{field.name}</h3>
                        <p>{field.target} {field.unit?.shortLabel}</p>
                        <p>{field.description ?? 'No description'}</p>
                    </div>
                    <button className={styles.deleteFieldButton} onClick={()=>handleRemove(field)}><img src={IconLibrary.Close} className='small-icon' alt='' /></button>
            </div>) : null}
            </div>
            {showForm ? <CustomFieldForm setFields={setFields} closeForm={()=>setShowForm(false)} /> : null}
            {editItem ? <CustomFieldForm setFields={setFields} closeForm={()=>setEditItem(null)} fieldData={editItem}/> : null}
        </div>
     );
}
 
export default DefaultFields;

interface CustomFieldProps {
    setFields: React.Dispatch<React.SetStateAction<Field[]>>;
    closeForm: ()=>void;
    fieldData?: Field
}
const CustomFieldForm: React.FC<CustomFieldProps> = ({setFields, closeForm, fieldData}) =>{

    const {showMessage} = useUI();
    const dispatch = useDispatch();

    const [name, setName] = useState<string>(fieldData.name ?? '');
    const [description, setDescription] = useState<string>(fieldData.description ?? '');
    const [target, setTarget] = useState<number>(fieldData.target ?? 0);
    const [unit, setUnit] = useState<Unit | null>(fieldData.unit ?? null);

    const handleCreateField = () =>{
        if(!checkForErrors()){
            const data: Field = {
                _id: uuidv4(),
                name,
                description,
                target: target,
                unit,
                value: 0,
                isCompleted: false,
                isEnabled: true
            }
            dispatch(updateCustomFields({operation: fieldData ? 'update' : 'add', data}))
            if(fieldData){
                setFields(prev=>[...prev.filter(item=>item._id!==fieldData._id), data]);
            }else{
                setFields(prev=>[...prev, data]);
            }
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
                <button className={styles.save} onClick={handleCreateField}>{fieldData ? 'Update' : 'Create Field'}</button>
            </div>
        </div>
    )
}