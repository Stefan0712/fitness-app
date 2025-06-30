import styles from './Library.module.css';
import { Link } from "react-router-dom";
import { IconLibrary } from "../../../IconLibrary";
import { useState, useEffect } from "react";
import Exercise from './Exercise';
import Workout from "./Workout";
import { getAllItems } from "../../../db";
import AppHeader from "../../common/AppHeader/AppHeader.tsx";
import SearchBar from '../../common/SearchBar/SearchBar.tsx';


const Library = () => {
    const [libraryScreen, setLibraryScreen] = useState('exercises');
    const [filteredItems, setFilteredItems] = useState([]);
    const [allItems, setAllItems] = useState([])

    useEffect(()=>{
        if(libraryScreen === 'exercises'){
            getExercises();
        }else if(libraryScreen === 'workouts'){
            getWorkouts();
        }
    },[libraryScreen])

    const getWorkouts = async () =>{
        const workouts = await getAllItems('workouts');
        setAllItems(workouts)
    }
    const getExercises = async () =>{
        const exercises = await getAllItems('exercises');
        setAllItems(exercises)
    }
    return ( 
        <div className={`${styles.library}`}>
            <AppHeader title={"Library"} />
            <div className={styles["toggle-buttons"]}>
                <button onClick={()=>setLibraryScreen('exercises')} className={libraryScreen === 'exercises' ? styles['selected-button'] : ''}>Exercises</button>
                <button onClick={()=>setLibraryScreen('workouts')} className={libraryScreen === 'workouts' ? styles['selected-button'] : ''}>Workouts</button>
            </div>
            <SearchBar originalItemList={allItems} setFilteredItems={setFilteredItems} />
            <div className={styles["library-items-container"]}>
                <div className={styles.buttons}>
                    <Link className={styles['category-button']} to={'/explore'}>Explore more</Link>
                    {libraryScreen === "workouts" ? <Link className={`${styles['category-button']} ${styles['add-button']}`} to={'/create-workout'}><img src={IconLibrary.Add} alt="" /></Link> :  <Link className={`${styles['category-button']} ${styles['add-button']}`} to={'/create-exercise'}><img src={IconLibrary.Add} alt="" /></Link>}
                </div>
                {filteredItems && filteredItems.length > 0 ? (
                    filteredItems.map((data, index) => (
                        libraryScreen === "workouts" ? <Workout key={'workout-'+index} id={data._id} index={index} workout={data} /> : <Exercise key={'exercise-'+index} id={data._id} index={index} data={data} />
                    ))
                ) : (
                    libraryScreen === 'workouts' ? <p>No workouts created yet.</p> : <p>No exercises created yet.</p>
                )}
            </div>        
            </div>
     );
}
 
export default Library;