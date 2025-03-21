import { useState } from "react";
import { IconLibrary } from "../../../IconLibrary";
import { v4 as uuidv4 } from 'uuid';
import styles from './CreateExerciseField.module.css';

const CreateExerciseField = ({addField}) => {

    const [name, setName] = useState('');
    const [unit, setUnit] = useState('');
    const [target, setTarget] = useState(0);

    const [error, setError] = useState(null)

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
                isCompleted: false,
                value: 0,
            }
            addField(fieldData);
            clearInputs();
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
    const clearInputs = () =>{
        setName('');
        setUnit('');
        setTarget('');
    }
    return ( 
        <div className={styles["create-exercise-field"]}>
            <div className={styles.inputs}>
                {error ? <div className={styles.error}><p className={styles['error-msg']}>{error || null}</p></div> : null}
                <input type="text" name="name" onChange={(e)=>setName(e.target.value)} value={name} placeholder="Name"></input>
                <input type="text" name="unit" onChange={(e)=>setUnit(e.target.value)} value={unit} placeholder="Unit"></input>  
                <input type="number" name="target" onChange={(e)=>setTarget(e.target.value)} value={target} placeholder="Target Value"></input>
            </div>      
            <button type="button" onClick={handleAddField} className={`clear-button ${styles['submit-button']}`}><img className="medium-icon" src={IconLibrary.Add} alt="" /></button>
        </div>
     );
}
 
export default CreateExerciseField;