import { getDateForHeader } from "../../../helpers";
import './exercise.css';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { addExercise } from "../../../store/userSlice.ts";
import {useNavigate} from 'react-router-dom';
import { muscles as defaultmuscleGroups, muscles } from "../../../constants/defaultMuscles";
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

    const equipment = useSelector(state=>state.user.equipment);
    const tags = useSelector(state=>state.user.tags);

    const user = useSelector(state=>state.user.userData)

    const [isExtended, setIsExtended] = useState(false);
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
    const [fields, setFields] = useState<string[]>([]);
    const [rest, setRest] = useState<string>('');

    //TODO: Handle cases where the user might input "None" as Equipment, Tag, or Target Group
    //TODO: Add colors inside the dropdown menu
    //TODO: Put tags, equipements, target groups, and fields inside a section that can be switches between on button click



    const handleSubmit = (e)=>{
        e.preventDefault();
        const createdAt = new Date().toISOString();
        const exerciseData = {
            id: uuidv4(), 
            createdAt, 
            author: user.id,
            isFavorite: false,
            isCompleted: false, 
            name, 
            description, 
            reference, 
            difficulty, 
            sets, 
            duration, 
            durationUnit: 'min',
            rest: parseInt(rest),
            restUnit: 'seconds',
            visibility: 'private',
            notes: [],
            muscleGroups, 
            fields, 
            tags: 
            exerciseTags, 
            equipments, 
            completedSets: 0,
            instructions: []
        };
        console.log(exerciseData)
        dispatch(addExercise(exerciseData));
        navigate('/library');
        
    }
    const addField = (field)=>{
        setFields((fields)=>[...fields, field]);
    }

    const addTag = (newItem) =>{
        setExerciseTags((exerciseTags)=>[...exerciseTags, {...newItem, id:uuidv4()}]);
    }
    const addEquipment = (newItem) =>{
        setEquipments((equipments)=>[...equipments, {...newItem, id:uuidv4()}]);
    }
    const addmuscleGroups = (newItem) =>{
        setMuscleGroups((targetGorups)=>[...targetGorups, {...newItem, id:uuidv4()}]);
    }


    return ( 
        <div className="create-exercise-page page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Create Exercise</h2>
                <button className="orange-button large-button submit-button" onClick={handleSubmit}>Create</button>
            </div>
                <form>
                    <div className={`exercise-info ${isExtended ? 'extended-info' : '' }`} >
                        <h3 onClick={()=>setIsExtended(isExtended=>!isExtended)}>{isExtended ? 'Exercise Info <' : 'Exercise Info V'}</h3>
                        <input  type="text" name="name" id="name" required={true} minLength={3} maxLength={20} onChange={(e) => setName(e.target.value)} value={name} placeholder="Name"></input>
                        <input type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)} value={description} minLength={0} maxLength={100} placeholder="Description"></input>
                        <input type="url" name="reference" id="reference" onChange={(e) => setReference(e.target.value)} value={reference} placeholder="Reference URL"></input>
                        <fieldset className="small-inputs">
                                <select name="difficulty" id="difficulty" onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
                                    <option value="" disabled selected>Difficulty</option>
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                    <option value="expert">Expert</option>
                                </select>
                                <select name="sets" id="sets" onChange={(e) => setSets(e.target.value)} value={sets}>
                                    <option value={0} disabled selected>Sets</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
                                </select>
                            <input type="text" name="rest" id="rest" onChange={(e) => setRest(e.target.value)} value={rest} placeholder="Rest (sec)"></input>
                        </fieldset>
                    </div>
                    <div className="exercise-screens-buttons-container">
                        <button type="button" className={`clear-button ${currentScreen === 'fields' ? 'show-screen' : null}`} onClick={()=>setCurrentScreen('fields')}>Fields</button>
                        <button type="button" className={`clear-button ${currentScreen === 'tags' ? 'show-screen' : null}`} onClick={()=>setCurrentScreen('tags')}>Tags</button>
                        <button type="button" className={`clear-button ${currentScreen === 'groups' ? 'show-screen' : null}`} onClick={()=>setCurrentScreen('groups')}>Groups</button>
                        <button type="button" className={`clear-button ${currentScreen === 'equipment' ? 'show-screen' : null}`} onClick={()=>setCurrentScreen('equipment')}>Equipment</button>
                    </div>
                    <div className="exercise-screens-container">
                        {currentScreen === 'fields' ? 
                             <div className={`screen`}>
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
                        : null}
                        {currentScreen === 'tags' ? 
                            <div className={`screen ${currentScreen === 'tags' ? 'expand' : null}`}>
                                <CustomItemCreator key='custom-items-tags' addItem={addTag} type={'tag'}/>
                                <DefaultItems key='default-items-tags' allItems={tags} title={'Saved Tags'} savedItems={exerciseTags} addItem={addTag}/>
                                <div className="selected-tags">
                                    {exerciseTags?.length > 0 ? exerciseTags.map((item)=><div key={item.name+item.color} className="tag-body"><div className="tag-color" style={{backgroundColor: item.color}}></div><p>{item.name}</p><img className="small-icon" src={IconLibrary.No} onClick={()=>setExerciseTags((exerciseTags)=>[...exerciseTags.filter(it=>it.id!==item.id)]) }/></div>) : ''}
                                </div>
                            </div>
                        : null}
                        {currentScreen === 'groups' ? 
                            <div className={`screen`}>
                                <CustomItemCreator key='custom-items-fields' addItem={addmuscleGroups} type={'target-group'}/>
                                <DefaultItems key='default-items-groups' allItems={muscles} title={'Saved Target Groups'} savedItems={muscleGroups} addItem={addmuscleGroups}/>
                                <div className="selected-tags">
                                    {muscleGroups?.length > 0 ? muscleGroups.map((item)=><div key={item.name+item.color} className="tag-body"><div className="tag-color" style={{backgroundColor: item.color}}></div><p>{item.name}</p><img className="small-icon" src={IconLibrary.No} onClick={()=>setMuscleGroups((muscleGroups)=>[...muscleGroups.filter(it=>it.id!==item.id)]) }/></div>) : ''}
                                </div>
                            </div> 
                        : null}
                        {currentScreen === 'equipment' ? 
                            <div className={`screen`}>
                                <CustomItemCreator key='custom-items-equipment' addItem={addEquipment} type={'equipment'}/>
                                <DefaultItems key='default-items-equipment' allItems={equipment} title={'Saved Equipment'} savedItems={equipments} addItem={addEquipment}/>
                                <div className="selected-tags">
                                    {equipments?.length > 0 ? equipments.map((item)=><div key={item.name+item.color} className="tag-body">
                                        <div className="tag-color" style={{backgroundColor: item.color || 'none'}}></div>
                                        <p>{item.name}</p>
                                        <div>{item.attributes?.length > 0 ? item.attributes.map((item, index)=>(<p className={'attribute'} key={'attribute-'+index}>{item.value} {item.unit}</p>)): null}</div>
                                        <img className="small-icon" src={IconLibrary.No} onClick={()=>setEquipments((equipments)=>[...equipments.filter(it=>it.id!==item.id)]) }/>
                                    </div>) : ''}
                                </div>
                            </div>
                        : null}
                        
                        
                        
                    </div>
                    
                </form>
        </div>
     );
}
 
export default CreateExercise;