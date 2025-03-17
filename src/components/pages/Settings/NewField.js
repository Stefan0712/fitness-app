import { useState } from "react";
import { IconLibrary } from "../../../IconLibrary";
import styles from './NewField.module.css';
import { useDispatch } from "react-redux";
import { addCustomField } from "../../../store/userSlice.ts";

const NewField = ({closeModal}) => {

    const dispatch = useDispatch();


    const [name, setName] = useState('');
    const [unit, setUnit] = useState('');
    const [description, setDescription] = useState('');
    const [target, setTarget] = useState(0);

    const [error, setError] = useState(null)

    const handleConfirm = () =>{
        if(!name && name.length < 3){
            addError('name')
        }else if(!unit && unit.length < 1){
            addError('unit')
        }else{
            const fieldData = {
                name,
                unit,
                targetValue: target,
                description,
            }
            dispatch(addCustomField(fieldData))
            closeModal();
        }
    }
    const addError = (type) => {
    
        if (type === 'name') {
            setError('Invalid Name');
            setTimeout(() => setError(null), 3000); 
        } else if (type === 'unit') {
            setError('Invalid Unit'); 
            setTimeout(() => setError(null), 3000); 
        }
    };
    
 
 
    const handleCancel = () =>{
        setName('');
        setUnit('');
        setDescription('');
        setTarget(0);
        closeModal();
    }



    return ( 
        <div className={`${styles["new-field"]}`}>
            {error ? <div className={styles.error}><p className={styles['error-msg']}>{error || null}</p></div> : null}
            <h3>Add New Field</h3>
            <fieldset>
                <label>Name</label>
                <input type="text" name="name" onChange={(e)=>setName(e.target.value)} value={name}></input>
            </fieldset>
           <div className={styles["one-line"]}>
            <fieldset className={styles.unit}>
                    <label>Unit</label>
                    <input type="text" name="unit" onChange={(e)=>setUnit(e.target.value)} value={unit}></input>  
                </fieldset>
                <fieldset className={styles.target}>
                    <label>Target Value</label>
                    <input type="number" name="target" onChange={(e)=>setTarget(e.target.value)} value={target}></input>
                </fieldset>
           </div>
            <fieldset>
                <label>Description</label>
                <input type="text" name="description" onChange={(e)=>setDescription(e.target.value)} value={description}></input>
            </fieldset>

            <div className={styles['buttons-container']}>
                <button type="button" onClick={handleConfirm} className={`clear-button ${styles['submit-button']} ${styles.full}`}>Add</button>
                <button type="button" onClick={handleCancel} className={`clear-button ${styles['submit-button']}`}>Cancel</button>
            </div>
        </div>
     );
}
 
export default NewField;