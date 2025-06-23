import styles from './Equipment.module.css';
import { IconLibrary } from '../../../IconLibrary.js';
import { useEffect, useState } from 'react';
import { deleteItem, getAllItems, saveItem } from '../../../db.js';
import AppHeader from '../../common/AppHeader/AppHeader.tsx';
import { getUser } from '../../../auth.ts';
import {v4 as uuidv4} from 'uuid';
import {useUI} from '../../../context/UIContext.jsx';

const Equipment = () => {

    const {showMessage, showConfirmationModal} = useUI();
    const [equipment, setEquipment] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const [showEditForm, setShowEditForm] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false)


    const getEquipment = async () =>{
        try{
            const response = await getAllItems('equipment');
            console.log(response)
            setEquipment(response);
        }catch(error){
            console.error(error);
        }
    }
    useEffect(()=>{getEquipment()},[]);

    const deleteEquipment = async (id)=> {
        try{
            await deleteItem('equipment', id);
            showMessage("Equipment Deleted!", 'success');
            setSelectedItem(null);
            getEquipment();
        }catch(error){
            console.error(error)
        }
    }

    return ( 
        <div className={styles.equipmentPage}>
             <AppHeader title='Equipment' button={<button style={{backgroundColor: 'transparent', alignSelf: 'center'}} className={styles['menu-button']} onClick={()=>setShowAddForm(true)}><img className='small-icon' src={IconLibrary.Add} alt='edit item' /></button>} />
            <div className={styles.menu}>
                {selectedItem ? 
                <div className={styles.equipmentMenu}>
                    <button className={styles['menu-button']} onClick={()=>setShowEditForm(selectedItem)}><img className='small-icon' src={IconLibrary.Edit} alt='edit item' /></button>
                    <button className={styles['menu-button']} onClick={()=>showConfirmationModal({title: "Delete equipment", message: "Are you sure you want to delete this equipment? This cannot be undone!", onConfirm: ()=>deleteEquipment(selectedItem)})}><img className='small-icon' src={IconLibrary.Delete} alt='delete item' /></button>
                </div> : null}
            </div>
            <div className={styles.equipmentContainer}>
                {equipment?.map((item, index)=>(
                    <div className={`${styles['equipment']} ${selectedItem === item._id ? styles['selected-equipment'] : ''}`} key={"equipment-"+index} onClick={()=>setSelectedItem(prev=> prev ? null : item._id)}>
                        <div className={styles.equipmentTop}>
                            <h4>{item.name}</h4>
                            <p>{item.attributes.length} attributes</p>
                        </div>
                        <div className={styles.attributes}>
                            {item.attributes?.length > 0 ? item.attributes.map((item, index)=>(<p className={styles['attribute']} key={'attribute-'+index}>{item.value} {item.unit}</p>)): null}
                        </div>
                        
                    </div>
                )) }  
            </div> 
            
            
                 
            {showAddForm ? <EquipmentForm type={'add'} closeForm={()=>setShowAddForm(false)} /> : null}
            {showEditForm ? <EquipmentForm type={'edit'} closeForm={()=>setShowEditForm(false)} data={equipment.find(item=>item._id===selectedItem)} /> : null}
        </div>
     );
}
 
export default Equipment;


const EquipmentForm = ({closeForm, data, type}) =>{

    const {showMessage} = useUI();

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
    const handleAddEquipment = async () =>{
        const itemData = {
            _id: uuidv4(),
            author: getUser()._id || 'local-user',
            name, 
            attributes,   
        }
        await saveItem('equipment',itemData)
        showMessage("Equipment created!",'success');
        closeForm();
    }


    const handleUpdateEquipment = async () =>{
        const itemData = {
            ...data,
            name,
            attributes
        }
        await saveItem('equipment', itemData)
        showMessage("Equipment updated successfully!",'success');
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
