import styles from './Explore.module.css';
import { exercises, workouts } from "../../../database";
import React, { useEffect, useState } from 'react';
import { getDateForHeader } from '../../../helpers';
import { Link } from 'react-router-dom';
import Workout from '../Library/Workout';
import Exercise from '../Library/Exercise';
import axios from 'axios';


const Explore = () => {

    const [libraryScreen, setLibraryScreen] = useState('exercises');
    const [filteredItems, setFilteredItems] = useState([]);

    const fetchExercises = async () =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/exercise`,{ withCredentials: true });
            if(response.data){
                setFilteredItems(response.data)
            }
        }catch(error){
            console.error(error)
        }
    }
    const fetchWorkouts = async () =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/workout`,{ withCredentials: true });
            if(response.data){
                setFilteredItems(response.data)
            }
        }catch(error){
            console.error(error)
        }
    }
    useEffect(()=>{fetchExercises()},[])

    return ( 
        <div className={styles.explore}>
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Explore</h2>
            </div>
            <div className={styles["toggle-buttons"]}>
                <button onClick={fetchExercises} className={libraryScreen === 'exercises' ? styles['selected-button'] : ''}>Exercises</button>
                <button onClick={fetchWorkouts} className={libraryScreen === 'workouts' ? styles['selected-button'] : ''}>Workouts</button>
            </div>
            <Link className={styles['category-button']} to={'/library'}>Back to library</Link>
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