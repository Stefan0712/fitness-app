import styles from './Settings.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { IconLibrary } from '../../../IconLibrary.js';
import { getDateForHeader } from '../../../helpers.js';
import { useEffect, useState } from 'react';
import { addEquipment, removeEquipment, updateEquipment } from '../../../store/userSlice.ts';

const Equipment = () => {

    const dispatch = useDispatch();

    const allItems = useSelector((state)=>state.user.equipment);

    const [selectedItem, setSelectedItem] = useState(null);

    const [showEditForm, setShowEditForm] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false)


    const deleteItem = (id)=>{
        dispatch(removeEquipment(id));
    }

    return ( 
        <div className={`${styles['tags-page']} ${styles['custom-items-page']} page`}>
             <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Manage Equipment</h2>
            </div>
            <div className={styles.menu}>
                <button className={styles['menu-button']} onClick={()=>setShowAddForm(true)}><img className='small-icon' src={IconLibrary.Add} alt='edit item' /></button>
                {selectedItem ? 
                    <>
                        <button className={styles['menu-button']} onClick={()=>setShowEditForm(selectedItem)}><img className='small-icon' src={IconLibrary.Edit} alt='edit item' /></button>
                        <button className={styles['menu-button']} onClick={()=>deleteItem(selectedItem)}><img className='small-icon' src={IconLibrary.Delete} alt='delete item' /></button>
                    </> : null}
            </div>
            <div className='screens-container'>
                <div className={`screen`}>
                    {allItems?.map((item, index)=>(
                        <div className={`${styles['equipment']} ${selectedItem === item.id ? styles['selected-equipment'] : ''}`} key={"equipment-"+index} onClick={()=>setSelectedItem(item.id)}>
                            <h4>{item.name}</h4>
                            {item.attributes?.length > 0 ? item.attributes.map((item, index)=>(<p className={styles['attribute']} key={'attribute-'+index}>{item.value} {item.unit}</p>)): null}
                        </div>
                    )) }  
                </div>  
            </div> 
            
            
                 
            {showAddForm ? <EquipmentForm type={'add'} closeForm={()=>setShowAddForm(false)} /> : null}
            {showEditForm ? <EquipmentForm type={'edit'} closeForm={()=>setShowEditForm(false)} data={allItems.find(item=>item.id===selectedItem)} /> : null}
        </div>
     );
}
 
export default Equipment;


const EquipmentForm = ({closeForm, data, type}) =>{

    const dispatch = useDispatch();

    const [name, setName] = useState(data?.name || '');
    const [attributes, setAttributes] = useState(data?.attributes || []);

    const [attributeName, setAttrtibuteName] = useState('');
    const [attributeUnit, setAttributeUnit] = useState('');
    const [attributeValue, setAttributeValue] = useState(0);

    const handleAddAttribute = () =>{
        if(attributeName.length > 0 && attributeUnit.length > 0 && attributeValue > 0){
            setAttributes(attributes=>[...attributes, {name: attributeName, unit: attributeUnit, value: attributeValue}]);
            setAttributeUnit('');
            setAttributeValue(0);
            setAttrtibuteName('');
        };
    };
    const removeItem = (name)=>{
        setAttributes(attributes=>[...attributes.filter(item=>item.name!==name)]);
    };
    const handleAddEquipment = () =>{
        const itemData = {
            name, 
            attributes,   
        }
        dispatch(addEquipment(itemData));
        closeForm();
    }
    const handleUpdateEquipment = () =>{
        const itemData = {
            id: data.id,
            name,
            attributes
        }
        dispatch(updateEquipment(itemData));
        closeForm();
    }
    return (
        <div className={styles['equipment-form']}>
            <div className={styles['form-top']}>
                <h2>{type==='add' ? 'New Equipment' : "Edit Equipment"}</h2>
                <button className='clear-button' type='button' onClick={closeForm}><img src={IconLibrary.Close} className='small-icon' alt='' /></button>
            </div>
            <input type='text' name='name' id='name' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} minLength={1} required></input>
            <label>Attributes</label>
            <div className={styles['new-attribute']}>
                <input type='text' name='attributeName' id='attributeName' placeholder='Name' value={attributeName} onChange={(e)=>setAttrtibuteName(e.target.value)}></input>
                <input type='number' name='attributeValue' id='attributeValue' placeholder='Value' value={attributeValue} onChange={(e)=>setAttributeValue(e.target.value)}></input>
                <input type='text' name='attributeUnit' id='attributeUnit' placeholder='Unit' value={attributeUnit} onChange={(e)=>setAttributeUnit(e.target.value)}></input>
                <button className='clear-button' type='button' onClick={handleAddAttribute}><img src={IconLibrary.Add} className='small-icon' alt='' /></button>
            </div>
            <div className={styles['attributes-container']}>
                {attributes?.length > 0 ? attributes?.map((item, index)=>(
                    <div className={styles['attribute-body']} key={"attribute-no-"+index}>
                    <h4>{item.name}</h4>
                    <p>{item.value} {item.unit}</p>
                    <button className='clear-button' type='button' onClick={()=>removeItem(item.name)}><img src={IconLibrary.Close} className='small-icon' alt='' /></button>
                </div>
                )) : null}
            </div>
            <button className={styles['submit-equipment-button']} type='button' onClick={type === 'add' ? handleAddEquipment : type === 'edit' ? handleUpdateEquipment : null}>{type==='add' ? 'Add Equipment' : 'Update'}</button>
        </div>
    )
}
