import React, { useEffect } from 'react';
import styles from "./ExercisePicker.module.css";
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import { exercises as dbExercises } from '../../../database';


interface Set{
    fields: Field[];
    isCompleted: boolean;
    isSkipped: boolean;
    order: number;
}
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
    targetGroups: TargetGroup[];
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
interface ExercisePickerProps{
    closeModal: ()=>void;
    addExercise: (exercise: Exercise) =>void;
    currentExercises: Exercise[]
}

const ExercisePicker: React.FC<ExercisePickerProps> = ({closeModal, addExercise, currentExercises}) => {

    const libraryExercises = useSelector((state: RootState)=>state.user.exercises);
    
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [showLibraryEx, setShowLibraryEx] = useState(true);
    const [showDatabaseEx, setShowDatabaseEx] = useState(true);

    const getAllItems = () =>{
        const tempDb = showDatabaseEx ? [...dbExercises] : [];
        const tempLib = showLibraryEx ? [...libraryExercises] : [];
        return [...tempDb, ...tempLib]
    }
    const [items, setItems] = useState<Exercise[]>(getAllItems || []);

   
    useEffect(()=>{
        updateFilters();
    },[showDatabaseEx, showLibraryEx]);




    const checkIfAdded = (item) =>{
        if (currentExercises.find(existingItem => existingItem.id === item.id)) {
            return true;
        }
        return false;
    }
    



    const handleSeach = (value: string) =>{

        setSearchQuery(value);
        if (!value.trim()) {
            setItems(getAllItems()); // Reset if search is empty
            return;  
        }
        
        const filteredItems: Exercise[] = items.filter(item => item.name.toLowerCase().includes(value.toLowerCase())) || [];
        setItems(filteredItems);
    }

    const updateFilters = () =>{
        const filteredItems = getAllItems().filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())) || [];
        setItems(filteredItems)
    }




    const convertExercise = (exercise) => {
        const tempExercise = {...exercise};
        // Add a completedSet property to the exercise object to keep track of how many sets were completed if not existent already
        if (tempExercise) {
            if (!tempExercise.completedSets) {
                tempExercise.completedSets = 0;
            }

            // Transform sets property from number to an array to make it easier to track progress of that exercise
            if (typeof tempExercise.sets === "number" || typeof tempExercise.sets === 'string') {
            const setsArray: Set[] = [];
            for (let i = 0; i < tempExercise.sets; i++) {
                    setsArray.push({
                    order: i + 1,
                    fields: tempExercise.fields ? JSON.parse(JSON.stringify(tempExercise.fields)) : [], // Deep copy of fields array
                    isCompleted: false,
                    isSkipped: false,
                });
            }
            tempExercise.sets = setsArray; // Replace the sets number with the array
            }
        } else {
            console.error(`Exercise not found`);
        }

        return tempExercise;
    };
          



    const handleAddExercise = ( exercise ) => {
        addExercise(convertExercise(exercise))
    }




    return ( 
        <div className={styles['exercise-picker']}>
            <div className={styles.top}>
                <h3>Add Exercises</h3>
                <button type="button" className="clear-button" onClick={closeModal}><img src={IconLibrary.Close} className="small-icon" alt="" /></button>
            </div>
            <div className={styles['search-bar']}>
                <input className={styles['search-input']} type="text" minLength={0} maxLength={100} onChange={(e)=>handleSeach(e.target.value)} value={searchQuery} placeholder='Search...'></input>
                <img className="small-icon" src={IconLibrary.Search} />
            </div>
            <div className={styles['source-buttons']}>
                <label>Library</label>
                <input type='checkbox' checked={showLibraryEx} onChange={()=>setShowLibraryEx(showLibraryEx=>!showLibraryEx)}></input>
                <label>Database</label>
                <input type='checkbox' checked={showDatabaseEx}  onChange={()=>setShowDatabaseEx(showDatabaseEx=>!showDatabaseEx)}></input>
            </div>
            <div className={styles.results}>
                {items?.length > 0 ? items.map((item,index)=>
                    checkIfAdded(item) ? null : (
                        <div className={styles.exercise} key={'exercise-'+item.name+index}>
                            <p className={styles.name}>{item.name}</p>
                            {item.sets ? <p>{item.sets} sets</p> : null}
                            <button type="button" className="clear-button" onClick={()=>handleAddExercise(item)}><img src={IconLibrary.Add} className="small-icon" alt="" /></button>
                        </div>
                    )
                ):<p>Items not found</p>}
            </div>
        </div>
     );
}
 
export default ExercisePicker;