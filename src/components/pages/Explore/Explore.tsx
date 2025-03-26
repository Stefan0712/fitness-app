import styles from './Explore.module.css';
import { exercises, workouts } from "../../../database";
import React, { useEffect, useState } from 'react';
import { getDateForHeader } from '../../../helpers';
import { Link } from 'react-router-dom';
import Workout from '../Library/Workout';
import Exercise from '../Library/Exercise';
import { IconLibrary } from '../../../IconLibrary';


const Explore = () => {

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
        <div className={styles.explore}>
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Explore</h2>
            </div>
            <div className={styles["toggle-buttons"]}>
                <button onClick={()=>setLibraryScreen('exercises')} className={libraryScreen === 'exercises' ? styles['selected-button'] : ''}>Exercises</button>
                <button onClick={()=>setLibraryScreen('workouts')} className={libraryScreen === 'workouts' ? styles['selected-button'] : ''}>Workouts</button>
            </div>
            <div className={styles["library-items-container"]}>
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
 
export default Explore;