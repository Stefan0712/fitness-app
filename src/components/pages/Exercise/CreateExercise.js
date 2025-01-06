import { getDateForHeader } from "../../../helpers";
import './exercise.css';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { addExercise } from "../../../store/userSlice";
import {useNavigate} from 'react-router-dom';
import { defaultTags } from "../../../constants/defaultTags";
import { defaultTargetGroups } from "../../../constants/defaultTargetGroups";
import { defaultFields } from "../../../constants/defaultFields";
import { defaultEquipment } from "../../../constants/defaultEquipment";
import CustomItemCreator from "../../common/CustomItemCreator/CustomItemCreator";
import DefaultItems from "../../common/DefaultItems/DefaultItems";
import { IconLibrary } from "../../../IconLibrary";
import CreateExerciseField from "../../common/CreateExerciseField/CreateExerciseField";


const CreateExercise = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

 

    //form values
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [reference, setReference] = useState('');
    const [targetGroups, setTargetGroups] = useState([]);
    const [difficulty, setDifficulty] = useState('begginer');
    const [exerciseTags, setExerciseTags] = useState([]);
    const [equipments, setEquipments] = useState([]);
    const [sets, setSets] = useState(1);
    const [duration, setDuration] = useState(0);
    const [fields, setFields] = useState([])

    //TODO: Handle cases where the user might input "None" as Equipment, Tag, or Target Group
    //TODO: Add colors inside the dropdown menu
    //TODO: Put tags, equipements, target groups, and fields inside a section that can be switches between on button click



    const handleSubmit = (e)=>{
        e.preventDefault();
        const createdAt = new Date().toISOString();
        const exerciseData = {id: uuidv4(), type: 'created', createdAt, author: '', name, description, reference, targetGroups, difficulty, sets, duration, fields, tags: exerciseTags, equipments};
        console.log(exerciseData)
        // dispatch(addExercise(exerciseData));
        // navigate('/library');
        
    }
    const addField = (field)=>{
        setFields((fields)=>[...fields, field]);
    }

    const addTag = (newItem) =>{
        setExerciseTags((exerciseTags)=>[...exerciseTags, newItem]);
    }
    const addEquipment = (newItem) =>{
        setEquipments((equipments)=>[...equipments, newItem]);
    }
    const addTargetGroups = (newItem) =>{
        setTargetGroups((targetGorups)=>[...targetGorups, newItem]);
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
                        <label>Difficulty</label>
                        <select name="difficulty" id="difficulty" onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="expert">Expert</option>
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
                    <fieldset className="tag-selector">
                        <label>Target Group</label>
                        <CustomItemCreator addItem={addTargetGroups} type={'target-group'}/>
                        <DefaultItems allItems={defaultTargetGroups} title={'Saved Target Groups'} savedItems={targetGroups} addItem={addTargetGroups}/>
                        <div className="selected-tags">
                            {targetGroups?.length > 0 ? targetGroups.map((item)=><div key={item.name+item.color} className="tag-body"><div className="tag-color" style={{backgroundColor: item.color}}></div><p>{item.name}</p><img className="small-icon" src={IconLibrary.No} onClick={()=>setTargetGroups((targetGroups)=>[...targetGroups.filter(it=>it.id!==item.id)]) }/></div>) : ''}
                        </div>
                    </fieldset>
                    
                    <fieldset className="tag-selector">
                        <label>Tags</label>
                        <CustomItemCreator addItem={addTag} type={'tag'}/>
                        <DefaultItems allItems={defaultTags} title={'Saved Tags'} savedItems={exerciseTags} addItem={addTag}/>
                        <div className="selected-tags">
                            {exerciseTags?.length > 0 ? exerciseTags.map((item)=><div key={item.name+item.color} className="tag-body"><div className="tag-color" style={{backgroundColor: item.color}}></div><p>{item.name}</p><img className="small-icon" src={IconLibrary.No} onClick={()=>setExerciseTags((exerciseTags)=>[...exerciseTags.filter(it=>it.id!==item.id)]) }/></div>) : ''}
                        </div>
                    </fieldset>
                    
                    <fieldset className="tag-selector">
                        <label>Equipment</label>
                        <CustomItemCreator addItem={addEquipment} type={'equipment'}/>
                        <DefaultItems allItems={defaultEquipment} title={'Saved Equipment'} savedItems={equipments} addItem={addEquipment}/>
                        <div className="selected-tags">
                            {equipments?.length > 0 ? equipments.map((item)=><div key={item.name+item.color} className="tag-body"><div className="tag-color" style={{backgroundColor: item.color || 'none'}}></div><p>{item.name}</p><img className="small-icon" src={IconLibrary.No} onClick={()=>setEquipments((equipments)=>[...equipments.filter(it=>it.id!==item.id)]) }/></div>) : ''}
                        </div>
                    </fieldset>
                    <fieldset>
                        <label>Fields</label>
                        <CreateExerciseField addField={addField} />
                        <div className="fields-container">
                            {fields?.length > 0 ? fields.map((field, index)=>(
                                    <div className="field-body" id={index} key={field.id}>
                                        <label>{field.name}</label>
                                        <div className="field-inputs">
                                            <h4>{field.name}</h4>
                                            <p>{field.target}</p>
                                            <p>{field.unit}</p>
                                            <button onClick={()=>console.log(field.id)} className="small-square transparent-bg"><img src={IconLibrary.No} className="white-icon small-icon" alt=""></img></button>
                                        </div>
                                    </div>
                            )): <h3>No fields created</h3>}
                        </div>
                        
                    </fieldset>

                    <button className="orange-button large-button submit-button" onClick={handleSubmit}>Create Exercise</button>
                </form>
        </div>
     );
}
 
export default CreateExercise;