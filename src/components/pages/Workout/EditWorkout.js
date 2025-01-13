import { updateWorkout, addExercise } from "../../../store/userSlice";
import {useNavigate} from 'react-router-dom';
import { useParams } from "react-router-dom";

import { getDateForHeader } from "../../../helpers.js";
import './workout.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {IconLibrary} from '../../../IconLibrary.js';
import CustomItemCreator from "../../common/CustomItemCreator/CustomItemCreator.js";
import { exercises as databaseExercises } from "../../../database.js";

//default values
import { defaultTags } from "../../../constants/defaultTags.js";
import { muscles as defaultTargetGroups } from "../../../constants/defaultMuscles.js";
import {defaultEquipment} from "../../../constants/defaultEquipment.js";
import DefaultItems from "../../common/DefaultItems/DefaultItems.js";

const EditWorkout = () => {
    
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const libraryExercises = useSelector((state) => state.user.exercises);
    const workoutData = useSelector((state)=>state.user.workouts.find((workout)=>workout.id === id));


    const [exercisesSource, setExercisesSource] = useState('library');
    const [exercises, setExercises] = useState();

    //form values
    const [name, setName] = useState(workoutData?.name || '');
    const [description, setDescription] = useState(workoutData?.description || '');
    const [reference, setReference] = useState(workoutData?.reference || '');
    const [difficulty, setDifficulty] = useState(workoutData?.difficulty || 'beginner');
    const [duration, setDuration] = useState(workoutData?.duration || 0);

    const [workoutTags, setWorkoutTags] = useState(workoutData?.tags && workoutData.tags.length > 0 ? [...workoutData.tags] : [])
    const [equipments, setEquipments] = useState(workoutData?.equipments && workoutData.equipments.length > 0 ? [...workoutData.equipments] : [])
    const [targetGroups, setTargetGroups] = useState(workoutData?.targetGroups && workoutData.targetGroups.length > 0 ? [...workoutData.targetGroups] : [])

    const [notes, setNotes] = useState(workoutData?.notes || '');

    useEffect(()=>console.log(workoutData, workoutData.tags),[])



    const handleRemoveExercise = (id) =>{
        setExercises((exercises)=>exercises.filter((item)=>item.id !== id));
    }

    const getExercises = () => {
        //make deep copies of all exercises
        return workoutData.exercises.map(({ source, id }) => {
          let exercise = null;
        
          //check the source and make a deep copy of the object
          if (source === 'database') {
            exercise = JSON.parse(JSON.stringify(databaseExercises.find((item) => item.id === id)));

          } else if (source === 'library') {
            exercise = JSON.parse(JSON.stringify(libraryExercises.find((item) => item.id === id)));

          }
          //add a completedSet property to the exercise object to keep track of how many sets were completed
          if (exercise) {
            if(!exercise.completedSets){exercise.completedSets = 0} 
          } else {
            console.error(`Exercise with id "${id}" not found in "${source}"`);
          }
      
          return exercise || null; // Return null if not found
        }).filter(Boolean); // Remove null values
    };


    useEffect(()=>{
        if(workoutData){
            setExercises(getExercises())
        }
}   ,[workoutData]);



    const handleSubmit = (e)=>{
        e.preventDefault();
        const newData = {
            ...workoutData, 
            name,
            description,
            reference,
            equipment: equipments,
            tags: workoutTags,
            targetGroups,
            difficulty,
            notes,
            exercises: exercises.map((item)=> ({source: item.source, id: item.id})),
            duration
          };
          
        console.log(JSON.stringify(newData) === JSON.stringify(workoutData));
        console.log(newData)
        dispatch(updateWorkout(newData));
        navigate('/workout/'+id+'/view/');
        
    }
    const handleAddExercise = (source,exercise,e)=>{
        console.log({source, exercise})
        setExercises((exercises)=>[...exercises, exercise]);
    }

    const addTag = (newItem) =>{
        setWorkoutTags((workoutTags)=>[...workoutTags, newItem]);
    }
    const addEquipment = (newItem) =>{
        setEquipments((equipments)=>[...equipments, newItem]);
    }
    const addTargetGroups = (newItem) =>{
        setTargetGroups((targetGroups)=>[...targetGroups, newItem]);
    }

    return (
        <div className="create-workout-page page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Edit Workout</h2>
            </div>
                <form>
                    <fieldset className="full-width">
                        <label>Name</label>
                        <input  type="text" name="name" id="name" required={true} minLength={3} maxLength={20} onChange={(e) => setName(e.target.value)} value={name}></input>
                    </fieldset>
                    <fieldset>
                        <label>Description</label>
                        <input type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)} value={description} minLength={0} maxLength={100}></input>
                    </fieldset>
                    <fieldset className="half-width">
                        <label>Duration (minutes)</label>
                        <input type="number" name="duration" id="duration" onChange={(e) => setDuration(e.target.value)} value={duration} min={0} max={9999}></input>
                    </fieldset>
                    <fieldset className="half-width">
                        <label>Difficulty</label>
                        <select name="difficulty" id="difficulty" onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="expert">Expert</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <label>Reference (URL)</label>
                        <input type="url" name="reference" id="reference" onChange={(e) => setReference(e.target.value)} value={reference}></input>
                    </fieldset>
                    <fieldset>
                        <label>Notes</label>
                        <input type="text" name="notes" id="notes" onChange={(e) => setNotes(e.target.value)} value={notes}></input>
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
                        <DefaultItems allItems={defaultTags} title={'Saved Tags'} savedItems={workoutTags} addItem={addTag}/>
                        <div className="selected-tags">
                            {workoutTags?.length > 0 ? workoutTags.map((item)=><div key={item.name+item.color} className="tag-body"><div className="tag-color" style={{backgroundColor: item.color}}></div><p>{item.name}</p><img className="small-icon" src={IconLibrary.No} onClick={()=>setWorkoutTags((workoutTags)=>[...workoutTags.filter(it=>it.id!==item.id)]) }/></div>) : ''}
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
                        <label>Exercises</label>
                        <div className="exercises-container">
                            {exercises?.length > 0 ? exercises.map((item, index)=>(
                                    <div className="exercise-body" id={index} key={index+'exercise'}>
                                        <div className="exercise-info">
                                            <h4>{item.name}</h4>
                                                {item.sets ? (<p>{item.sets} sets</p>) : ''}
                                        </div>
                                        <button type="button" onClick={()=>handleRemoveExercise(item.id)} className="small-square transparent-bg"><img src={IconLibrary.No} className="white-icon small-icon" alt=""></img></button>
                                    </div>
                            )): <h3>No exercises added.</h3>}
                        </div>
                        <label>Exercises Library</label>
                        <div className="source-buttons">
                            <button type="button" className={exercisesSource === "library" ? 'selected-button' : ''} onClick={()=>setExercisesSource('library')}>Library</button>
                            <button type="button" className={exercisesSource === "database" ? 'selected-button' : ''} onClick={()=>setExercisesSource('database')}>Database</button>
                        </div>
                        <div className="exercises-container">
                        {exercisesSource === 'library' && (
                            libraryExercises?.length > 0 ? (
                                libraryExercises.map((exercise, index) => 
                                exercises?.some((ex) => ex.id === exercise.id) ? null : (
                                    <div className="exercise-body" id={index} key={index}>
                                    <div className="exercise-info">
                                        <h4>{exercise.name}</h4>
                                        <div className="exercise-tags">
                                            
                                            {exercise.tags?.length > 0 ? exercise.tags.map(tag=><p key={tag.name}>{tag.name}</p>) : ''}
                                        </div>
                                    </div>
                                    <p className="exercise-sets">{exercise.sets} sets</p>
                                    <button
                                        type="button"
                                        onClick={(e) => handleAddExercise('library', exercise, e)}
                                        className="small-square transparent-bg"
                                    >
                                        <img
                                        src={IconLibrary.Add}
                                        className="small-icon"
                                        alt=""
                                        />
                                    </button>
                                    </div>
                                )
                                )
                            ) : (
                                <h3>Your library is empty</h3>
                            )
                            )}
                        {exercisesSource === 'database' && (
                            databaseExercises?.length > 0 ? (
                                databaseExercises.map((exercise, index) => 
                                exercises.some((ex) => ex.id === exercise.id) ? null : (
                                    <div className="exercise-body" id={index} key={index}>
                                    <div className="exercise-info">
                                        <h4>{exercise.name}</h4>
                                        <div className="exercise-tags">
                                            {exercise.tags?.length > 0 ? exercise.tags.map(tag=><p>{tag.name}</p>) : ''}
                                        </div>
                                    </div>
                                    <p className="exercise-sets">{exercise.sets} sets</p>
                                    <button
                                        type="button"
                                        onClick={(e) => handleAddExercise('database', exercise, e)}
                                        className="small-square transparent-bg"
                                    >
                                        <img
                                        src={IconLibrary.Add}
                                        className="small-icon"
                                        alt=""
                                        />
                                    </button>
                                    </div>
                                )
                                )
                            ) : (
                                <h3>Could not load exercises</h3>
                            )
                            )}

                        </div>
                    </fieldset>

                    <button className="orange-button large-button submit-button" onClick={handleSubmit}>Save</button>
                </form>
        </div>
    );
};

export default EditWorkout;
