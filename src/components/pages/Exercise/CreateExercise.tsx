import { getDateForHeader } from "../../../helpers";
import './exercise.css';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { addExercise } from "../../../store/userSlice.ts";
import {useNavigate} from 'react-router-dom';
import { defaultTags } from "../../../constants/defaultTags";
import { muscles as defaultmuscleGroups } from "../../../constants/defaultMuscles";
import { defaultFields } from "../../../constants/defaultFields";
import { defaultEquipment } from "../../../constants/defaultEquipment";
import CustomItemCreator from "../../common/CustomItemCreator/CustomItemCreator";
import DefaultItems from "../../common/DefaultItems/DefaultItems";
import { IconLibrary } from "../../../IconLibrary";
import CreateExerciseField from "../../common/CreateExerciseField/CreateExerciseField";

interface CustomItem {
    id: String,
    author: String,
    name: String,
    color: string | null
}

const CreateExercise: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currentScreen, setCurrentScreen] = useState<string>('fields')

    //form values
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [reference, setReference] = useState<string>('');
    const [muscleGroups, setMuscleGroups] = useState<CustomItem[]>([]);
    const [difficulty, setDifficulty] = useState<string>('');
    const [exerciseTags, setExerciseTags] = useState<CustomItem[]>([]);
    const [equipments, setEquipments] = useState<string[]>([]);
    const [sets, setSets] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [fields, setFields] = useState<string>([])

    //TODO: Handle cases where the user might input "None" as Equipment, Tag, or Target Group
    //TODO: Add colors inside the dropdown menu
    //TODO: Put tags, equipements, target groups, and fields inside a section that can be switches between on button click



    const handleSubmit = (e)=>{
        e.preventDefault();
        const createdAt = new Date().toISOString();
        const exerciseData = {id: uuidv4(), type: 'created', createdAt, author: '', name, description, reference, muscleGroups, difficulty, sets, duration, fields, tags: exerciseTags, equipments, completedSets: 0};
        console.log(exerciseData)
        dispatch(addExercise(exerciseData));
        navigate('/library');
        
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
    const addmuscleGroups = (newItem) =>{
        setMuscleGroups((targetGorups)=>[...targetGorups, newItem]);
    }


    return ( 
        <div className="create-exercise-page page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Create Exercise</h2>
            </div>
                <form>
                    <input  type="text" name="name" id="name" required={true} minLength={3} maxLength={20} onChange={(e) => setName(e.target.value)} value={name} placeholder="Name"></input>
                    <input type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)} value={description} minLength={0} maxLength={100} placeholder="Description"></input>
                    <input type="url" name="reference" id="reference" onChange={(e) => setReference(e.target.value)} value={reference} placeholder="Reference URL"></input>
                    <fieldset className="flex-row space-between">
                        <div className="half-width">
                            <select name="difficulty" id="difficulty" onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
                                <option value="" disabled selected>Difficulty</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                                <option value="expert">Expert</option>
                            </select>
                        </div>
                        <div className="half-width">
                            <select name="sets" id="sets" onChange={(e) => setSets(e.target.value)} value={sets}>
                                <option value={0} disabled selected>Sets</option>
                                <option value={1} disabled selected>1</option>
                                <option value={2} disabled selected>2</option>
                                <option value={3} disabled selected>3</option>
                                <option value={4} disabled selected>4</option>
                                <option value={5} disabled selected>5</option>
                                <option value={6} disabled selected>6</option>
                                <option value={7} disabled selected>7</option>
                                <option value={8} disabled selected>8</option>
                                <option value={9} disabled selected>9</option>
                                <option value={10} disabled selected>10</option>
                             </select>
                        </div>
                    </fieldset>
                    <div className="exercise-screens-buttons-container">
                        <button type="button" className={`clear-button ${currentScreen === 'fields' ? 'show-screen' : null}`} onClick={()=>setCurrentScreen('fields')}>Fields</button>
                        <button type="button" className={`clear-button ${currentScreen === 'tags' ? 'show-screen' : null}`} onClick={()=>setCurrentScreen('tags')}>Tags</button>
                        <button type="button" className={`clear-button ${currentScreen === 'groups' ? 'show-screen' : null}`} onClick={()=>setCurrentScreen('groups')}>Groups</button>
                        <button type="button" className={`clear-button ${currentScreen === 'equipments' ? 'show-screen' : null}`} onClick={()=>setCurrentScreen('equipments')}>Equipment</button>
                    </div>
                    <div className="exercise-screens-container">
                        <div className={`screen ${currentScreen === 'fields' ? 'expand' : null}`}>
                            <CreateExerciseField key='fields-create-field' addField={addField} />
                            <div className="fields-container">
                                {fields?.length > 0 ? fields.map((field, index)=>(
                                        <div className="field-body" id={index} key={field.id}>
                                            <h4>{field.name}</h4>
                                            <p>{field.targetValue || null}</p>
                                            <p>{field.unit}</p>
                                            <button type="button" onClick={()=>console.log(field.id)} className="small-square transparent-bg"><img src={IconLibrary.No} className="white-icon small-icon" alt=""></img></button>
                                        </div>
                                )): <h3>No fields created</h3>}
                            </div>
                        </div>
                        <div className={`screen ${currentScreen === 'groups' ? 'expand' : null}`}>
                            <label>Target Group</label>
                            <CustomItemCreator key='custom-items-fields' addItem={addmuscleGroups} type={'target-group'}/>
                            <DefaultItems key='default-items-groups' allItems={defaultmuscleGroups} title={'Saved Target Groups'} savedItems={muscleGroups} addItem={addmuscleGroups}/>
                            <div className="selected-tags">
                                {muscleGroups?.length > 0 ? muscleGroups.map((item)=><div key={item.name+item.color} className="tag-body"><div className="tag-color" style={{backgroundColor: item.color}}></div><p>{item.name}</p><img className="small-icon" src={IconLibrary.No} onClick={()=>setMuscleGroups((muscleGroups)=>[...muscleGroups.filter(it=>it.id!==item.id)]) }/></div>) : ''}
                            </div>
                        </div>
                        <div className={`screen ${currentScreen === 'tags' ? 'expand' : null}`}>
                            <label>Tags</label>
                            <CustomItemCreator key='custom-items-tags' addItem={addTag} type={'tag'}/>
                            <DefaultItems key='default-items-tags' allItems={defaultTags} title={'Saved Tags'} savedItems={exerciseTags} addItem={addTag}/>
                            <div className="selected-tags">
                                {exerciseTags?.length > 0 ? exerciseTags.map((item)=><div key={item.name+item.color} className="tag-body"><div className="tag-color" style={{backgroundColor: item.color}}></div><p>{item.name}</p><img className="small-icon" src={IconLibrary.No} onClick={()=>setExerciseTags((exerciseTags)=>[...exerciseTags.filter(it=>it.id!==item.id)]) }/></div>) : ''}
                            </div>
                        </div>
                        <div className={`screen ${currentScreen === 'equipments' ? 'expand' : null}`}>
                            <label>Equipment</label>
                            <CustomItemCreator key='custom-items-equipment' addItem={addEquipment} type={'equipment'}/>
                            <DefaultItems key='default-items-equipment' allItems={defaultEquipment} title={'Saved Equipment'} savedItems={equipments} addItem={addEquipment}/>
                            <div className="selected-tags">
                                {equipments?.length > 0 ? equipments.map((item)=><div key={item.name+item.color} className="tag-body"><div className="tag-color" style={{backgroundColor: item.color || 'none'}}></div><p>{item.name}</p><img className="small-icon" src={IconLibrary.No} onClick={()=>setEquipments((equipments)=>[...equipments.filter(it=>it.id!==item.id)]) }/></div>) : ''}
                            </div>
                        </div>
                        
                    </div>
                    <button className="orange-button large-button submit-button" onClick={handleSubmit}>Create Exercise</button>
                </form>
        </div>
     );
}
 
export default CreateExercise;