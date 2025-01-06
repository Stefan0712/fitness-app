import { useState } from "react";
import { IconLibrary } from "../../../IconLibrary";
import { v4 as uuidv4 } from 'uuid';
import styles from './CreateExerciseField.module.css';




const CreateExerciseField = ({addField}) => {

    const [name, setName] = useState('');
    const [unit, setUnit] = useState('');
    const [description, setDescription] = useState('');
    const [target, setTarget] = useState(0);

    const [error, setError] = useState(null)
    const [isShown, setIsShown] = useState(false);

    const handleAddField = () =>{
        if(!name && name.length < 3){
            addError('name')
        }else if(!unit && unit.length < 1){
            addError('unit')
        }else{
            const fieldData = {
                id: uuidv4(),
                name,
                unit,
                targetValue: target,
                description,
                source: 'user',
                isCompleted: false,
                value: null,
            }
            addField(fieldData)
        }
    }
    const addError = (type) => {
        console.log(type);
    
        if (type === 'name') {
            setError('Invalid Name');
            setTimeout(() => setError(null), 3000); 
        } else if (type === 'unit') {
            setError('Invalid Unit'); 
            setTimeout(() => setError(null), 3000); 
        }
    };
    
 
    const toggleForm = () =>{
        setIsShown(isShown=>!isShown);
        clearInputs();
        
    }
    const clearInputs = () =>{
        setName('');
        setUnit('');
        setDescription('');
    }
    return ( 
        <div className={`${styles["create-exercise-field"]} ${isShown ? styles.show : null} `}>
            {error ? <div className={styles.error}><p className={styles['error-msg']}>{error || null}</p></div> : null}
            <div className={styles.header} onClick={toggleForm}>
                <h3>Add New Field</h3>
                <img src={IconLibrary.Arrow} className={`small-icon ${isShown ? styles.down : styles.left}`} />
            </div>
            <fieldset className={styles['same-line']}>
                <input type="text" name="name" onChange={(e)=>setName(e.target.value)} value={name} placeholder="Name"></input>
                <input type="text" name="unit" onChange={(e)=>setUnit(e.target.value)} value={unit} placeholder="Unit"></input>  
                <input type="number" name="target" onChange={(e)=>setTarget(e.target.value)} value={target} placeholder="Target Value"></input>
            </fieldset>
            <input type="text" name="description" onChange={(e)=>setDescription(e.target.value)} value={description} placeholder="Description"></input>
            <button type="button" onClick={handleAddField} className={`clear-button ${styles['submit-button']} ${styles.full}`}>Add</button>
            <button type="button" onClick={clearInputs} className={`clear-button ${styles['submit-button']}`}>Clear</button>
        </div>
     );
}
 
export default CreateExerciseField;