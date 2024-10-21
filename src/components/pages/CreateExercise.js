import { getDateForHeader } from "../../helpers";
import './stylings/createExercise.css';
import { useState } from "react";
import deleteIcon from '../../assets/close.svg';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { addCreatedExercise } from "../../store/userSlice";
import {useNavigate} from 'react-router-dom'


const CreateExercise = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [fields, setFields] = useState([]);
    const [fieldName, setFieldName] = useState('');
    const [fieldUnit, setFieldUnit] = useState('');
    const [fieldTarget, setFieldTarget] = useState('');
    const [fieldType, setFieldType] = useState('');

    //form values
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [reference, setReference] = useState('');
    const [targetGroup, setTargetGroup] = useState('srms');
    const [difficulty, setDifficulty] = useState('begginer');
    const [type, setType] = useState('cardio');




    const handleFieldNameChange = (e) =>{
        setFieldName(e.target.value);
    } 
    const handleFieldTargetChange = (e) =>{
        setFieldTarget(e.target.value);
    } 
    const handleFieldTypeChange = (e) =>{
        setFieldType(e.target.value);
    } 
    const handleFieldUnitChange = (e) =>{
        setFieldUnit(e.target.value);
    } 
    const handleAddField = (e) =>{
        e.preventDefault();
        setFields([...fields, { id: uuidv4(), name: fieldName, unit: fieldUnit, target: fieldTarget, type: fieldType }]);
        setFieldName('')
        setFieldTarget(0)
        setFieldType('')
        setFieldUnit('')
    }

    const handleRemoveField = (id, e) =>{
        e.preventDefault();
        setFields((fields)=>fields.filter((field)=>field.id !== id));
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const createdAt = new Date().toISOString();
        const exerciseData = {name, description, reference, targetGroup, difficulty, type, fields, createdAt};
        dispatch(addCreatedExercise(exerciseData));
        navigate('./library');
        
    }

    return ( 
        <div className="create-exercise-page page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Create Exercise</h2>
            </div>
                <form>
                    <fieldset>
                        <label>Name</label>
                        <input  type="text" name="name" id="name" required={true} minLength={3} maxLength={20} onChange={(e) => setName(e.target.value)} value={name}></input>
                    </fieldset>
                    <fieldset>
                        <label>Description</label>
                        <input type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)} value={description} minLength={0} maxLength={100}></input>
                    </fieldset>
                    <fieldset>
                        <label>Reference (URL)</label>
                        <input type="url" name="reference" id="reference" onChange={(e) => setReference(e.target.value)} value={reference}></input>
                    </fieldset>
                    <fieldset>
                        <label>Target Group</label>
                        <select name="targetGroup" id="targetGroup" required={true} onChange={(e) => setTargetGroup(e.target.value)} value={targetGroup}>
                            <option value="arms">Arms</option>
                            <option value="legs">Legs</option>
                            <option value="chest">Chest</option>
                            <option value="back">Back</option>
                            <option value="shoulders">Shoulders</option>
                            <option value="abs">Abs</option>
                            <option value="glutes">Glutes</option>
                            <option value="full-body">Full Body</option>
                            <option value="core">Core</option>
                            <option value="calves">Calves</option>
                            <option value="biceps">Biceps</option>
                            <option value="triceps">Triceps</option>
                            <option value="forearms">Forearms</option>
                            <option value="hamstrings">Hamstrings</option>
                            <option value="quads">Quads</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <label>Difficulty</label>
                        <select name="difficulty" id="difficulty" onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="expert">Expert</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <label>Type</label>
                        <select name="type" id="type" onChange={(e) => setType(e.target.value)} value={type}>
                            <option value="cardio">Cardio</option>
                            <option value="strength">Strength</option>
                            <option value="hiit">HIIT</option>
                            <option value="mobility">Mobility</option>
                            <option value="endurance">Endurance</option>
                            <option value="plyometrics">Plyometrics</option>
                            <option value="powerlifting">Powerlifting</option>
                            <option value="calisthenics">Calisthenics</option>
                            <option value="yoga">Yoga</option>
                            <option value="stretching">Stretching</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <label>Fields</label>
                        <div className="fields-container">
                            {fields.length > 0 ? fields.map((field, index)=>(
                                    <div className="field-body" id={index}>
                                        <label>{field.name}</label>
                                        <div className="field-inputs">
                                            <input type={field.type} name={field.name} id={field.name}></input>
                                            <p>{field.unit}</p>
                                            <button onClick={()=>handleRemoveField(field.id)} className="small-square transparent-bg"><img src={deleteIcon} className="white-icon small-icon" alt=""></img></button>
                                        </div>
                                    </div>
                            )): <h3>No custom fields created</h3>}
                        </div>
                        <h3 className="subtitle full-width">Create a new field</h3>
                        <div className="field-creator">
                            <input value={fieldName} type="text" name="fieldName" id="fieldName" placeholder="Field Name" onChange={handleFieldNameChange}></input>
                            <select value={fieldType} name="valueType" id="valueType" onChange={handleFieldTypeChange}>
                                <option value="number">Number</option>
                                <option value="text">Text</option>
                                <option value="time">Time</option>
                            </select>
                            <input value={fieldUnit} type="text" name="fieldUnit" id="fieldUnit" placeholder="Field Unit" onChange={handleFieldUnitChange}></input>
                            <input value={fieldTarget} type="number" name="fieldTarget" id="fieldTarget" placeholder="Target" onChange={handleFieldTargetChange}></input>
                            <button className="orange-button small-button" onClick={handleAddField}>Add Field</button>
                        </div>
                    </fieldset>

                    <button className="orange-button large-button submit-button" onClick={handleSubmit}>Create Exercise</button>
                </form>
        </div>
     );
}
 
export default CreateExercise;