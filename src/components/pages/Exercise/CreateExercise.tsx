import { getDateForHeader } from "../../../helpers";
import './exercise.css';
import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { addExercise } from "../../../store/userSlice.ts";
import {useNavigate} from 'react-router-dom';
import { IconLibrary } from "../../../IconLibrary";
import CreateExerciseField from "../../common/CreateExerciseField/CreateExerciseField";
import { RootState } from "../../../store/index.ts";
import CreateTag from "./CreateTag.tsx";
import styles from "./CreateExercise.module.css";
import CreateEquipment from "./CreateEquipment.tsx";
import TargetGroupPicker from "../../common/TargetGroupPicker/TargetGroupPicker.tsx";

interface Exercise {
    id: string;
    sourceId?: string;
    createdAt: string; 
    updatedAt?: string | null;
    author: string;
    isFavorite: boolean;
    isCompleted: boolean;
    name: string;
    description: string;
    reference: string;
    difficulty: string;
    sets: number;
    duration: number;
    durationUnit: string;
    rest: number;
    restUnit: string;
    visibility: string;
    fields: Field[];
    notes: string[];
    equipment: Equipment[];
    muscleGroups: TargetGroup[];
    tags: Tag[];
    instructions: string[];
}
interface TargetGroup {
    id: string;
    name: string;
    author: string;
}
  
interface Equipment {
    id: string;
    name: string;
    attributes?: EquipmentAttributes[];
}
  
interface EquipmentAttributes {
    name: string;
    value?: number;
    unit?: string;
}
  
  
interface Tag {
    id: string;
    name: string;
    color: string;
    author: string;
}
interface Field {
    name: string,
    unit: string,
    value: number,
    target?: number,
    description?: string,
    isCompleted: boolean
}
const CreateExercise: React.FC = () => {

    

    const user = useSelector((state: RootState)=>state.user.userData.id)

    const [isExtended, setIsExtended] = useState<boolean>(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currentScreen, setCurrentScreen] = useState<string>('fields');
    const [showGroups, setShowGroups] = useState<boolean>(false);

    //form values
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [reference, setReference] = useState<string>('');
    const [muscleGroups, setMuscleGroups] = useState<TargetGroup[]>([]);
    const [difficulty, setDifficulty] = useState<string>('');
    const [exerciseTags, setExerciseTags] = useState<Tag[]>([]);
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [sets, setSets] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [fields, setFields] = useState<Field[]>([]);
    const [rest, setRest] = useState<string>('');

    const [groupName, setGroupName] = useState<string>('');

    const handleSubmit = (e)=>{
        e.preventDefault();
        const createdAt = new Date().toISOString();
        const exerciseData: Exercise = {
            id: uuidv4(), 
            createdAt, 
            author: user,
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
            tags: exerciseTags, 
            equipment: equipments, 
            instructions: []
        };
        console.log(exerciseData)
        dispatch(addExercise(exerciseData));
        navigate('/library');
        
    }
    const addField = (field)=>{
        setFields((fields)=>[...fields, field]);
    }

    const addTag = (newItem: Tag) =>{
        setExerciseTags((exerciseTags)=>[...exerciseTags, newItem]);
    }
    const addEquipment = (newItem: Equipment) =>{
        setEquipments((equipments)=>[...equipments, newItem]);
    }
    const addmuscleGroups = (newItem: TargetGroup) =>{
        setMuscleGroups((targetGorups)=>[...targetGorups, newItem]);
    }
    const handleAddGroup = () =>{
        if(groupName.length > 0 && groupName.length < 15){
            const groupData: TargetGroup = {
                id: uuidv4(),
                author: user,
                name: groupName
            }
            addmuscleGroups(groupData);
            setGroupName('');
        }
    }
    
    return ( 
        <div className={`${styles["create-exercise-page"]} page`}>
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Create Exercise</h2>
                <button className={styles.submit} onClick={handleSubmit}>Create</button>
            </div>
                <form>
                    <div className={`${styles['exercise-info']} ${isExtended ? styles['extended-info'] : '' }`} >
                        <div onClick={()=>setIsExtended(isExtended=>!isExtended)} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <h3 style={{width: 'fit-content', display: 'flex', alignItems: 'center'}}>Exercise Info</h3> 
                            <img className="small-icon" src={IconLibrary.Arrow} alt="" style={{transform: `rotateZ(${isExtended ? '90deg' : '180deg'})`, transition: 'all 0.1s'}}/>
                        </div>
                        <input  type="text" name="name" id="name" required={true} minLength={3} maxLength={20} onChange={(e) => setName(e.target.value)} value={name} placeholder="Name"></input>
                        <input type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)} value={description} minLength={0} maxLength={300} placeholder="Description"></input>
                        <input type="url" name="reference" id="reference" onChange={(e) => setReference(e.target.value)} value={reference} placeholder="Reference URL"></input>
                        <fieldset className={styles["small-inputs"]}>
                                <select name="difficulty" id="difficulty" onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
                                    <option value="" disabled>Difficulty</option>
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                    <option value="expert">Expert</option>
                                </select>
                                <select name="sets" id="sets" onChange={(e) => setSets(parseInt(e.target.value))} value={sets}>
                                    <option value={0} disabled>Sets</option>
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
                    <div className={styles["exercise-screens-buttons-container"]}>
                        <button type="button" className={`clear-button ${currentScreen === 'fields' ? styles['show-screen'] : null}`} onClick={()=>setCurrentScreen('fields')}>Fields</button>
                        <button type="button" className={`clear-button ${currentScreen === 'tags' ? styles['show-screen'] : null}`} onClick={()=>setCurrentScreen('tags')}>Tags</button>
                        <button type="button" className={`clear-button ${currentScreen === 'groups' ? styles['show-screen'] : null}`} onClick={()=>setCurrentScreen('groups')}>Groups</button>
                        <button type="button" className={`clear-button ${currentScreen === 'equipment' ? styles['show-screen'] : null}`} onClick={()=>setCurrentScreen('equipment')}>Equipment</button>
                    </div>
                    <div className={styles["exercise-screens-container"]}>
                        {currentScreen === 'fields' ? 
                             <div className={styles.screen}>
                                <CreateExerciseField key='fields-create-field' addField={addField} />
                                <div className={styles["fields-container"]}>
                                    {fields?.length > 0 ? fields.map((field, index)=>(
                                            <div className={styles["field-body"]} id={'field-'+index} key={field.name}>
                                                <h4>{field.name}</h4>
                                                <p>{field.target || null}</p>
                                                <p>{field.unit}</p>
                                                <button type="button" onClick={()=>setFields((fields)=>[...fields.filter(item=>item==field)])} className="small-square transparent-bg"><img src={IconLibrary.No} className="white-icon small-icon" alt=""></img></button>
                                            </div>
                                    )): <h3>No fields created</h3>}
                                </div>
                            </div>
                        : null}
                        {currentScreen === 'tags' ? 
                             <div className={styles.screen}>
                                <CreateTag addTag={addTag} author={user} allTags={exerciseTags} />
                                
                                <div className={styles["tags-container"]}>
                                    {exerciseTags?.length > 0 ? exerciseTags.map((item)=><div key={item.name+item.color} className={styles["tag-body"]}><div className={styles["tag-color"]} style={{backgroundColor: item.color}}></div><p>{item.name}</p><img className="small-icon" src={IconLibrary.No} onClick={()=>setExerciseTags((exerciseTags)=>[...exerciseTags.filter(it=>it.id!==item.id)]) }/></div>) : ''}
                                </div>
                            </div>
                        : null}
                        {currentScreen === 'groups' ? 
                            <div className={styles.screen}>
                                <div className={styles['new-target-group']}>
                                    <button type="button" className="clear-button" onClick={()=>setShowGroups(true)}><img style={{filter: 'invert(1)'}} className="small-icon" src={IconLibrary.Search} alt=""/></button>
                                    <input type='text' name="groupName" onChange={(e)=>setGroupName(e.target.value)} value={groupName} placeholder="Muscle Name" />
                                    <button type="button" className="clear-button" onClick={handleAddGroup}><img className="small-icon" src={IconLibrary.Add} alt="" /></button>
                                </div>  
                                {showGroups ? <TargetGroupPicker closeModal={()=>setShowGroups(false)} currentItems={muscleGroups} addItem={addmuscleGroups} /> : null}
                                <div className={styles["tags-container"]}>
                                    {muscleGroups?.length > 0 ? muscleGroups.map((item, index)=><div key={item.name+index} className={styles["tag-body"]}><div className={styles["tag-color"]}></div><p>{item.name}</p><img className="small-icon" src={IconLibrary.No} onClick={()=>setMuscleGroups((muscleGroups)=>[...muscleGroups.filter(it=>it.id!==item.id)]) }/></div>) : ''}
                                </div>
                            </div> 
                        : null}
                        {currentScreen === 'equipment' ? 
                            <div className={styles.screen}>
                                <CreateEquipment addEquipment={addEquipment} allItems={equipments} />
                                <div className={styles["equipments-container"]}>
                                    {equipments?.length > 0 ? equipments.map((item,index)=><div key={item.name+index} className={styles["equipment-body"]}>
                                        <p>{item.name}</p>
                                        <div>{item.attributes && item.attributes.length > 0 ? item.attributes.map((item, index)=>(<p className={styles.attribute} key={'attribute-'+index}>{item.value} {item.unit}</p>)): null}</div>
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