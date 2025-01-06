import { useState } from "react";
import { IconLibrary } from "../../../IconLibrary";
import { v4 as uuidv4 } from 'uuid';
import { makeFirstUpperCase } from "../../../helpers";




const CreateExerciseField = () => {

    const [name, setName] = useState('');
    const [unit, setUnit] = useState('');
    const [unitType, setUnitType] = useState('number');
    const [description, setDescription] = useState('');
    const [target, setTarget] = useState(0);

    const [error, setError] = useState(null);

    const handleAddField = () =>{
        if(!name && name.length < 3){
            addError('name')
        }else if(unit && unit.length > 3){
            addError('unit')
        }else{
            const fieldData = {
                id: uuidv4(),
                name,
                unit,
                unitType,
                targetValue: target,
                description,
                source: 'user',
                isCompleted: false,
                value: null,
            }
            console.log(fieldData)
        }
    }

    const addError = (type) =>{
        
        setError({type, msg: `${makeFirstUpperCase(type)} is invalid`});
        setTimeout(removeError, 2000);
    }

    const removeError = () =>{
        setError(null);
    }
    return ( 
        <div className="create-exercise-field">
            <fieldset>
                <input type="text" name="name" onChange={(e)=>setName(e.target.value)} value={name} placeholder="Name"></input>
                {error && error.type === 'name' ? <p className="error-msg">{error || null}</p> : null}
            </fieldset>
            <input type="text" name="description" onChange={(e)=>setDescription(e.target.value)} value={description} placeholder="Description"></input>
            <fieldset>
                <input type="text" name="unit" onChange={(e)=>setUnit(e.target.value)} value={unit} placeholder="Unit"></input>
                {error && error.type === 'unit' ? <p className="error-msg">{error || null}</p> : null}
            </fieldset>
            <select name="unitType" onChange={(e)=>setUnitType(e.target.value)} value={unitType}>
                <option value={'text'}>Text</option>
                <option value={'number'}>Number</option>
                <option value={'boolean'}>Yes/No</option>
            </select>
            <input type="number" name="target" onChange={(e)=>setTarget(e.target.value)} value={target} placeholder="Target Value"></input>
            <button type="button" className="clear-button"><img className="small-icon" src={IconLibrary.PlusCircle} alt="" /></button>
        </div>
     );
}
 
export default CreateExerciseField;