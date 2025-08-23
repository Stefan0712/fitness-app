import AppHeader from '../../common/AppHeader/AppHeader';
import styles from './Muscles.module.css';
import { muscles as defaultMuscles } from '../../../constants/defaultMuscles';
import { deleteItem, getAllItems, saveItem } from '../../../db';
import { useEffect, useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import { v4 as uuidv4 } from 'uuid';
import { getUser } from '../../../auth';
import { useUI } from '../../../context/UIContext';

const Muscles = () => {
    const {showMessage} = useUI();

    const [showNewMuscle, setShowNewMuscle] = useState(false);
    const [customMuscles, setCustomMuscles] = useState([]);
    const [showEdit, setShowEdit] = useState(null);
    const [showCustomItems, setShowCustomItems] = useState(true);
    const [showDefaultItems, setShowDefaultItems] = useState(true);

    const getCustomMuscles = async () =>{
        try{
            const response = await getAllItems('muscles');
            if(response){
                setCustomMuscles(response);
            }
        }catch(err) {
            showMessage('Failed to get custom mucles!', "error");
            console.error(err);
        }
    };
    useEffect(()=>{
        getCustomMuscles()
    },[]);


    return ( 
        <div className={styles.musclesPage}>
            {showNewMuscle ? <NewMuscle close={()=>setShowNewMuscle(false)} addNewItem={(newItem)=>setCustomMuscles(prev=>[...prev, newItem])} />: null}
            {showEdit ? <EditMuscle close={()=>setShowEdit(null)} muscleData={showEdit} updateItem={setCustomMuscles} />: null}
            <AppHeader title='Muscles' button={<button type='button' onClick={()=>setShowNewMuscle(true)} style={{backgroundColor: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent:'end'}}><img className='small-icon' src={IconLibrary.Add} alt='' /></button>} />
            <div className={styles.listFilters}>
                <fieldset>
                    <label>Custom Muscles</label>
                    <input type='checkbox' checked={showCustomItems} onChange={(e)=>setShowCustomItems(e.target.checked)}></input>
                </fieldset>
                <fieldset>
                    <label>Default Muscles</label>
                    <input type='checkbox' checked={showDefaultItems} onChange={(e)=>setShowDefaultItems(e.target.checked)}></input>
                </fieldset>
            </div>
            <div className={styles.itemsContainer}>
                {showCustomItems ? <div className={styles.musclesContainer}>
                    {customMuscles && customMuscles.length > 0 ? customMuscles.map((muscle, index)=><CustomMuscle key={"custom-muscle-"+index} data={muscle} showEdit={(itemData)=>setShowEdit(itemData)} />) : null}
                </div> : null}
                {showDefaultItems ? <div className={styles.musclesContainer}>
                    {defaultMuscles && defaultMuscles.length > 0 ? defaultMuscles.map((muscle, index)=><DefaultMuscle key={"custom-muscle-"+index} data={muscle} />) : null}
                </div> : null}
                </div>
        </div>
     );
}
 
export default Muscles;

const CustomMuscle = ({data, showEdit}) =>{
    return (
        <div className={styles.customMuscle} key={data._Id}>
            <b>{data.name}</b>
            <button className={styles.muscleButton} onClick={()=>showEdit(data)}><img src={IconLibrary.Edit} alt=''/></button>
        </div>
    )
}
const DefaultMuscle = ({data}) =>{
    return (
        <div className={styles.defaultMuscle} key={data._Id}>
            <b>{data.name}</b>
        </div>
    )
}

const NewMuscle = ({close, addNewItem}) => {
    const {showMessage} = useUI();
    const [name, setName] = useState('');
    const [parent, setParent] = useState('');

    const handleSave = async () =>{
        const user = getUser();
        const userId = user ?? 'local-user';
        try{
            const newMuscle = {
                _id: uuidv4(),
                name,
                parent,
                author: userId,
                value: name.trim().toLowerCase().replace(/\s+/g, "-")
            }
            await saveItem('muscles', newMuscle);
            showMessage("Muscle created successfully!", 'success');
            addNewItem(newMuscle);
            close();
        }catch(err){
            showMessage("There has been an error!", "error");
            console.error(err)
        }
    }
    return(
        <div className={styles.newMuscle}>
            <h4>New Muscle</h4>
            <div className={styles.newMuscleForm}>
                <fieldset>
                    <label>Muscle Name*</label>
                    <input type='text' minLength={3} maxLength={100} value={name} onChange={(e)=>setName(e.target.value)}></input>
                </fieldset>
                <fieldset>
                    <label>Parent Muscle (optional)</label>
                    <select name='parent-muscle' value={parent} onChange={(e)=>setParent(e.target.value)}>
                        <option key={'no-parent-muscle'} value={''}>None</option>
                        {defaultMuscles?.length > 0 ? defaultMuscles.map(muscle=><option key={muscle._id} value={muscle._id}>{muscle.name}</option>) : null}
                    </select>
                </fieldset>
                <div className={styles.buttons}>
                    <button type='button' className={styles.cancelButton} onClick={close}>Cancel</button>
                    <button type='button' className={styles.saveButton} onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    )
}
const EditMuscle = ({close, muscleData, updateItem}) => {
    const {showMessage, showConfirmationModal} = useUI();
    const [name, setName] = useState(muscleData.name ?? '');
    const [parent, setParent] = useState(muscleData.parent ?? '');

    const handleSave = async () =>{
        try{
            const newMuscleData = {
                ...muscleData,
                name,
                parent,
                value: name.trim().toLowerCase().replace(/\s+/g, "-")
            }
            await saveItem('muscles', newMuscleData);
            showMessage("Muscle updated successfully!", 'success');
            updateItem(prev=>[...prev.filter(item=>item._id !== newMuscleData._id), newMuscleData]);
            close();
        }catch(err){
            showMessage("There has been an error!", "error");
            console.error(err)
        }
    }
    const handleDelete = async () =>{
        try{
            await deleteItem('muscles', muscleData._id);
            showMessage("Muscle deleted successfully!", 'success');
            updateItem(prev=>[...prev.filter(item=>item._id !== muscleData._id)]);
            close();
        }catch(err){
            showMessage("There has been an error!", "error");
            console.error(err)
        }
    }

    return(
        <div className={styles.newMuscle}>
            <h4>Edit Muscle</h4>
            <div className={styles.newMuscleForm}>
                <fieldset>
                    <label>Muscle Name*</label>
                    <input type='text' minLength={3} maxLength={100} value={name} onChange={(e)=>setName(e.target.value)}></input>
                </fieldset>
                <fieldset>
                    <label>Parent Muscle (optional)</label>
                    <select name='parent-muscle' value={parent} onChange={(e)=>setParent(e.target.value)}>
                        <option key={'no-parent-muscle'} value={''}>None</option>
                        {defaultMuscles?.length > 0 ? defaultMuscles.map(muscle=><option key={muscle._id} value={muscle._id}>{muscle.name}</option>) : null}
                    </select>
                </fieldset>
                <button className={styles.deleteButton} onClick={()=>showConfirmationModal({title: 'Are you sure?', message: "Are you sure you want to delete your custom muscle? It cannot be undone!", onConfirm: handleDelete})}>Delete</button>
                <div className={styles.buttons}>
                    <button type='button' className={styles.cancelButton} onClick={close}>Cancel</button>
                    <button type='button' className={styles.saveButton} onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    )
}

const Filters = ({}) =>{
    
}