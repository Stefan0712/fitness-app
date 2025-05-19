import { getDateForHeader } from "../../../../helpers.js";
import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import {useNavigate} from 'react-router-dom'
import {IconLibrary} from '../../../../IconLibrary.js';

//default values
import CreateTag from "../../Exercise/CreateTag.tsx";
import TargetGroupPicker from "../../../common/TargetGroupPicker/TargetGroupPicker.tsx";
import CreateEquipment from "../../Exercise/CreateEquipment.tsx";
import { saveItem } from "../../../../db.js";
import { Equipment, Phase, Tag, TargetGroup, Workout } from "../../../common/interfaces.ts";
import Phases from "./Phases/Phases.tsx";

const CreateWorkout: React.FC = () => {

    const navigate = useNavigate();

    const [showGroups, setShowGroups] = useState(false);
    const [groupName, setGroupName] = useState('');
    const userId = localStorage.getItem('userId') || '';

    //form values
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [reference, setReference] = useState<string>('');
    const [difficulty, setDifficulty] = useState<string>('beginner');
    const [duration, setDuration] = useState<string>('');

    const [workoutTags, setWorkoutTags] = useState<Tag[]>([])
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [targetGroups, setTargetGroups] = useState<TargetGroup[]>([])

    const [notes, setNotes] = useState<string>('');

    const [phases, setPhases] = useState<Phase[]>([{id: 'phase-id-1', name: 'Warm-up', order: 1, exercises:[]},{id: 'phase-id-2', name: 'Workout', order: 1, exercises:[]}]);




    const [currentScreen, setCurrentScreen] = useState<string>('exercises');

    const handleSubmit = (e)=>{
        e.preventDefault();
        const createdAt = new Date().toISOString(); //get timestamp
        
       if(userId && userId.length > 0){
            const workoutData: Workout = {
                _id: uuidv4(), 
                author: userId, 
                createdAt, 
                updatedAt: '',
                name, 
                description,
                isFavorite: false,
                isCompleted: false,
                reference, 
                difficulty,
                visibility: 'private',
                imageUrl: '',
                duration: duration ? parseInt(duration) : 0,
                equipment: equipments, 
                tags: workoutTags, 
                targetGroups, 
                phases,
                notes
            };

            console.log(workoutData);
            if(workoutData.name.length < 1){
                console.log("Workout name is required");
            }else if(workoutData.name.length > 100){
                console.log("Workout name is too long");
            }else{
                saveItem('workouts', workoutData)
                navigate('/library');
                console.log('Workout created');
            }
       }
    }

    const addTag = (newItem) =>{
        setWorkoutTags((workoutTags)=>[...workoutTags, {...newItem, id: uuidv4()}]);
    }
    const addEquipment = (newItem) =>{
        setEquipments((equipments)=>[...equipments, {...newItem, id: uuidv4()}]);
    }

   const handleAddGroup = () =>{
           if(groupName.length > 0 && groupName.length < 15){
               const groupData: TargetGroup = {
                   id: uuidv4(),
                   author: userId,
                   name: groupName
               }
               setTargetGroups(targetGroups=>[...targetGroups,groupData]);
               setGroupName('');
           }
       }
       
    return ( 
        <div className="create-workout-page page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Create Workout</h2>
                <button className="orange-button submit-button" onClick={handleSubmit}>Create</button>
            </div>
                <form onSubmit={(e)=>e.preventDefault()}>
                    <input  type="text" name="name" id="name" required={true} minLength={3} maxLength={100} onChange={(e) => setName(e.target.value)} value={name} placeholder="Name"></input>
                    <input type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)} value={description} minLength={0} maxLength={100} placeholder="Description"></input>
                    <div className="two-inputs">
                        <input type="number" name="duration" id="duration" onChange={(e) => setDuration(e.target.value)} value={duration} min={0} max={9999} placeholder="Duration"></input>
                        <select name="difficulty" id="difficulty" onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="expert">Expert</option>
                        </select>
                    </div>
                    <input type="url" name="reference" id="reference" onChange={(e) => setReference(e.target.value)} value={reference} placeholder="Reference URL"></input>
                    <input type="test" name="notes" id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} placeholder="Notes..."></input>
                    <div className='screen-selector'>
                        <button type="button" onClick={()=>setCurrentScreen('exercises')} className={currentScreen === 'exercises' ? 'selected-screen-button' : ''}>Exercises</button>
                        <button type="button" onClick={()=>setCurrentScreen('tags')} className={currentScreen === 'tags' ? 'selected-screen-button' : ''}>Tags</button>
                        <button type="button" onClick={()=>setCurrentScreen('equipment')} className={currentScreen === 'equipment' ? 'selected-screen-button' : ''}>Equipment</button>
                        <button type="button" onClick={()=>setCurrentScreen('groups')} className={currentScreen === 'groups' ? 'selected-screen-button' : ''}>Groups</button>
                    </div>
                    <div className="selected-screen-container">
                        {currentScreen === 'exercises' ? (
                            <Phases phases={phases} setPhases={setPhases} />
                        ) : currentScreen === 'tags' ? (
                            <div className="screen">
                                <CreateTag addTag={addTag} author={userId} allTags={workoutTags} />
                                
                                <div className="tags-container">
                                    {workoutTags?.length > 0 ? workoutTags.map((item)=><div key={item.name+item.color} className="tag-body"><div className="tag-color" style={{backgroundColor: item.color}}></div><p>{item.name}</p><img className="small-icon" src={IconLibrary.No} onClick={()=>setWorkoutTags((workoutTags)=>[...workoutTags.filter(it=>it.id!==item.id)]) }/></div>) : ''}
                                </div>
                            </div>
                        ) : currentScreen === 'equipment' ? (
                            <div className="screen">
                                <CreateEquipment addEquipment={addEquipment} allItems={equipments} />
                                <div className="equipments-container">
                                    {equipments?.length > 0 ? equipments.map((item,index)=><div key={item.name+index} className="equipment-body">
                                        <p>{item.name}</p>
                                        <div>{item.attributes && item.attributes.length > 0 ? item.attributes.map((item, index)=>(<p className="attribute" key={'attribute-'+index}>{item.value} {item.unit}</p>)): null}</div>
                                        <img className="small-icon" src={IconLibrary.No} onClick={()=>setEquipments((equipments)=>[...equipments.filter(it=>it.id!==item.id)]) }/>
                                    </div>) : ''}
                                </div>
                            </div>
                        ) : currentScreen === 'groups' ? (
                            <div className="screen">
                                <div className='new-target-group'>
                                    <button type="button" className="clear-button" onClick={()=>setShowGroups(true)}><img   className="small-icon" src={IconLibrary.Search} alt=""/></button>
                                    <input type='text' name="groupName" onChange={(e)=>setGroupName(e.target.value)} value={groupName} placeholder="Muscle Name" />
                                    <button type="button" className="clear-button" onClick={handleAddGroup}><img className="small-icon" src={IconLibrary.Add} alt="" /></button>
                                </div>  
                                {showGroups ? <TargetGroupPicker closeModal={()=>setShowGroups(false)} currentItems={targetGroups} addItem={(groupData)=>setTargetGroups(targetGroups=>[...targetGroups,groupData])} /> : null}
                                <div className="tags-container">
                                    {targetGroups?.length > 0 ? targetGroups.map((item, index)=><div key={item.name+index} className="tag-body"><div className="tag-color"></div><p>{item.name}</p><img className="small-icon" src={IconLibrary.No} onClick={()=>setTargetGroups((muscleGroups)=>[...muscleGroups.filter(it=>it.id!==item.id)]) }/></div>) : ''}
                                </div>
                            </div> 
                        ) : null}
                    </div>
                    
                    
                </form>
        </div>
     );
}
 
export default CreateWorkout;