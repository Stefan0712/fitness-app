import { getDateForHeader } from "../../../helpers";
import styles from './Library.module.css';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IconLibrary } from "../../../IconLibrary";
import { useState, useEffect } from "react";

import Exercise from './Exercise';
import Workout from "./Workout";


const Library = () => {

    const exercises = useSelector((state)=>state.user.exercises);
    const workouts = useSelector((state)=>state.user.workouts);


    const [libraryScreen, setLibraryScreen] = useState('exercises');

    const [filteredItems, setFilteredItems] = useState([]);


    useEffect(()=>{
        if(libraryScreen === 'exercises'){
            setFilteredItems(exercises);
        }else if(libraryScreen === 'workouts'){
            setFilteredItems(workouts);
        }
    },[libraryScreen])


    return ( 
        <div className={`${styles.library}`}>
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Library</h2>
            </div>
            <div className={styles["toggle-buttons"]}>
                <button onClick={()=>setLibraryScreen('exercises')} className={libraryScreen === 'exercises' ? styles['selected-button'] : ''}>Exercises</button>
                <button onClick={()=>setLibraryScreen('workouts')} className={libraryScreen === 'workouts' ? styles['selected-button'] : ''}>Workouts</button>
            </div>
            <div className={styles["library-items-container"]}>
                <div className={styles.buttons}>
                    <Link className={styles['category-button']} to={'/explore'}>Explore more</Link>
                    {libraryScreen === "workouts" ? <Link className={`${styles['category-button']} ${styles['add-button']}`} to={'/create-workout'}><img src={IconLibrary.Add} alt="" /></Link> :  <Link className={`${styles['category-button']} ${styles['add-button']}`} to={'/create-exercise'}><img src={IconLibrary.Add} alt="" /></Link>}
                </div>
                {filteredItems && filteredItems.length > 0 ? (
                    filteredItems.map((data, index) => (
                        libraryScreen === "workouts" ? <Workout key={'workout-'+index} index={index} workout={data} /> : <Exercise key={'exercise-'+index} index={index} data={data} />
                    ))
                ) : (
                    libraryScreen === 'workouts' ? <p>No workouts created yet.</p> : <p>No exercises created yet.</p>
                )}
            </div>        
            </div>
     );
}
 
export default Library;