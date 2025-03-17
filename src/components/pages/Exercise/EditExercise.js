import { getDateForHeader } from "../../../helpers";
import './exercise.css';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { updateExercise } from "../../../store/userSlice.ts";
import {useNavigate, useParams} from 'react-router-dom'
import { IconLibrary } from "../../../IconLibrary";


const EditExercise = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();



    const exerciseData = useSelector((state)=>state.user.exercises.find(ex => ex.id === id));


    const [fields, setFields] = useState(exerciseData.fields || []);
    const [fieldName, setFieldName] = useState('');
    const [fieldUnit, setFieldUnit] = useState('');
    const [fieldTarget, setFieldTarget] = useState('');
    const [fieldType, setFieldType] = useState('');

    //form values
    const [name, setName] = useState(exerciseData.name || '');
    const [description, setDescription] = useState(exerciseData.description || '');
    const [reference, setReference] = useState(exerciseData.reference || '');
    const [targetGroup, setTargetGroup] = useState(exerciseData.targetGroup || '');
    const [difficulty, setDifficulty] = useState(exerciseData.difficulty || 'begginer');
    const [type, setType] = useState(exerciseData.type || 'cardio');
    const [sets, setSets] = useState(exerciseData.sets || 1);
    const [duration, setDuration] = useState(exerciseData.duration || '');
    const [visibility, setVisibility] = useState(exerciseData.visibility || 'private');



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
        setFields([...fields, { id: uuidv4(), name: fieldName, unit: fieldUnit, target: fieldTarget, type: fieldType, value: '' }]);
        setFieldName('')
        setFieldTarget(0)
        setFieldType('')
        setFieldUnit('')
    }

    
    const handleRemoveField = (e, id) =>{
        e.preventDefault();
        setFields((fields)=>fields.filter((field)=>field.id !== id));
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const exerciseData = {id, type: 'created', author: '', name, description, reference, targetGroup, difficulty, type, sets, duration, visibility, fields};
        dispatch(updateExercise(exerciseData));
        navigate('/exercise/'+exerciseData.id+"/view?");
        
    }

    return ( 
        <div className="create-exercise-page page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Edit Exercise</h2>
            </div>
                <form>
                    <fieldset>
                        <label>Name</label>
                        <input  type="text" name="name" id="name" required={true} minLength={3} maxLength={20} onChange={(e) => setName(e.target.value)} value={name}></input>
                    </fieldset>
                    <fieldset>
                        <label>Visibility</label>
                        <select name="visibility" id="visibility" onChange={(e) => setVisibility(e.target.value)} value={visibility}>
                            <option value="private">Private</option>
                            <option value="public">Public</option>
                        </select>
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
                    <fieldset className="flex-row space-between">
                        <div className="half-width">
                            <label>Duration (min)</label>
                            <input type="number" name="duration" id="duration" onChange={(e) => setDuration(e.target.value)} value={duration} min={0} max={999}></input>
                        </div>
                        <div className="half-width">
                            <label>Sets</label>
                            <input type="number" name="sets" id="sets" onChange={(e) => setSets(e.target.value)} value={sets} min={0} max={999}></input>
                        </div>
                    </fieldset>
                    <fieldset>
                        <label>Fields</label>
                        <div className="fields-container">
                            {fields.length > 0 ? fields.map((field, index)=>(
                                    <div className="field-body" id={index} key={field.id}>
                                        <label>{field.name}</label>
                                        <div className="field-inputs">
                                            <h4>{field.name}</h4>
                                            <p>{field.target}</p>
                                            <p>{field.unit}</p>
                                            <button onClick={(e)=>handleRemoveField(e,field.id)} className="small-square transparent-bg"><img src={IconLibrary.No} className="white-icon small-icon" alt=""></img></button>
                                        </div>
                                    </div>
                            )): <h3>No fields created</h3>}
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

                    <button className="orange-button large-button submit-button" onClick={handleSubmit}>Save Changes</button>
                </form>
        </div>
     );
}
 
export default EditExercise;