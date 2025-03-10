import { getDateForHeader } from "../../../helpers";
import styles from './Library.module.css';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IconLibrary } from "../../../IconLibrary";
import { useState, useEffect } from "react";
import { exercises, workouts } from "../../../database";
import Exercise from './Exercise';
import Workout from "./Workout";


const Library = () => {

    const localExercises = useSelector((state)=>state.user.exercises);
    const localWorkouts = useSelector((state)=>state.user.workouts);


    const [libraryScreen, setLibraryScreen] = useState('exercises');
    const [isLocal, setIsLocal] = useState(true);

    const [filteredItems, setFilteredItems] = useState([]);


    const switchScreen = (screen) =>{
        setLibraryScreen(screen);
        setIsLocal(true);
    }

    useEffect(()=>{
        if(libraryScreen === 'exercises'){
            if(isLocal){
                setFilteredItems(localExercises);
            }else {
                setFilteredItems(exercises);
            }
        }else if(libraryScreen === 'workouts'){
            if(isLocal){
                setFilteredItems(localWorkouts);
            }else {
                setFilteredItems(workouts);
            }
        }
        console.log(`Changed to ${isLocal ? 'my' : 'public'} screen ${libraryScreen}`)
    },[libraryScreen, isLocal])


    return ( 
        <div className={`${styles.library}`}>
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Library</h2>
            </div>
            <div className={styles["toggle-buttons"]}>
                <button onClick={()=>switchScreen('exercises')} className={libraryScreen === 'exercises' ? styles['selected-button'] : ''}>Exercises</button>
                <button onClick={()=>switchScreen('workouts')} className={libraryScreen === 'workouts' ? styles['selected-button'] : ''}>Workouts</button>
            </div>
                <div className={styles["library-items-container"]}>
                    <div className={styles.buttons}>
                        <div className={styles['category-buttons']}>
                            <button className={`${styles['category-button']} ${isLocal ? styles['selected-category'] : ''}`} onClick={()=>setIsLocal(true)}>My Library</button>
                            <button className={`${styles['category-button']} ${!isLocal ? styles['selected-category'] : ''}`} onClick={()=>setIsLocal(false)}>Public Library</button>
                        </div>
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