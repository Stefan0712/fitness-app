// Explore page will show exercises and workouts fetched from the API, or a cached version if the API is not available and it managed to get at least one list of items from it

import styles from './Explore.module.css';
import React, { useEffect, useState } from 'react';
import AppHeader from '../../common/AppHeader/AppHeader.tsx';
import { Link } from 'react-router-dom';
import Workout from '../Library/Workout';
import Exercise from '../Library/Exercise';
import axios from '../../../axios.js';
import { getAllItems, saveItem } from '../../../db';
import { Exercise as IExercise, Workout as IWorkout } from '../../common/interfaces';
import { useUI } from '../../../context/UIContext';


const Explore = () => {

    const [libraryScreen, setLibraryScreen] = useState('exercises');
    const [filteredItems, setFilteredItems] = useState<IExercise[] | IWorkout[]>([]);
    const [source, setSource] = useState<string | null>(null); // This state tracks if the items shown are cached or straight from the API
    const { showMessage } = useUI();

    const fetchExercises = async () =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/exercise?app=true`,{ withCredentials: true, headers: {"ngrok-skip-browser-warning": true} }); // app=true is used to let the api know how to format the items returned
            if(response.data){
                setSource('online');
                setFilteredItems(response.data);
                for (let ex of response.data) {
                    await saveItem('cachedExercises', ex);
                }; // Cache all fetched items
            }
        }catch(error){
            console.error(error);
            showMessage("Could not get exercises from the API", 'error');
            getSavedExercises();
        }
    }

    const fetchWorkouts = async () =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/workout`,{ withCredentials: true });
            if(response.data){
                setSource('online')
                setFilteredItems(response.data);
                for (let workout of response.data) {
                    await saveItem('cachedWorkouts',workout);
                }
            }
        }catch(error){
            console.error(error);
            showMessage("Could not get workouts from the API", 'error');
            getSavedWorkouts();
        }
    };

    useEffect(()=>{
        fetchExercises();
    },[]); // Fetch exercises by default since that is also the default screen on first load

    // Restores the cached list of workouts
    const getSavedWorkouts = async () =>{
        const workouts = await getAllItems('workouts');
        setFilteredItems(workouts);
        showMessage("Restored cached workouts");
        setSource('cache')
    }
    // Restores the cached list of exercises
    const getSavedExercises = async () =>{
        const exercises = await getAllItems('exercises');
        setFilteredItems(exercises);
        showMessage("Restored cached exercises");
        setSource('cache')
    }

    return ( 
        <div className={styles.explore}>
            <AppHeader title="Explore" />
            <div className={styles["toggle-buttons"]}>
                <button onClick={()=>(fetchExercises(), setLibraryScreen('exercises'))} className={libraryScreen === 'exercises' ? styles['selected-button'] : ''}>Exercises</button>
                <button onClick={()=>(fetchWorkouts(), setLibraryScreen('workouts'))} className={libraryScreen === 'workouts' ? styles['selected-button'] : ''}>Workouts</button>
            </div>
            <Link className={styles['category-button']} to={'/library'}>Back to library</Link>
            <div className={styles["library-items-container"]}>
            {filteredItems && filteredItems.length > 0 ? (
                filteredItems.map((data, index) => (
                    libraryScreen === "workouts" ? <Workout id={data._id} key={'workout-'+index} workout={data} type={source === 'cache' ? 'offline' : 'online'} /> : <Exercise key={'exercise-'+index} data={data} />
                ))
            ) : (
                libraryScreen === 'workouts' ? <p>No workouts created yet.</p> : <p>No exercises created yet.</p>
            )}
        </div>      
        </div>
     );
}
 
export default Explore;