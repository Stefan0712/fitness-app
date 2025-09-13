// Library shows all workouts and exercises saved locally by the user. From this screen you can create a new one, explore online workouts/exercises and search and filter through existing one


import styles from './Library.module.css';
import { Link } from "react-router-dom";
import { IconLibrary } from "../../../IconLibrary.js";
import { useState, useEffect } from "react";
import { getAllItems } from "../../../db.js";
import AppHeader from "../../common/AppHeader/AppHeader.tsx";
import { ConvertMetaDuration } from '../../../helpers/exerciseHelpers.js';
import ViewWorkout from '../../common/ViewWorkout/ViewWorkout.tsx';
import ViewExercise from '../../common/ViewExercise/ViewExercise.tsx';


const Library = () => {
    const [exercises, setExercises] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);


    const getExercises = async () =>{
        const items = await getAllItems('exercises');
        if(items?.length > 0){
            setExercises(items.slice(-3).map(item=>({...item, type:"exercise"})))
        }
    }
    const getWorkouts = async () =>{
        const items = await getAllItems('workouts');
        if(items?.length > 0){
            setWorkouts(items.slice(-3).map(item=>({...item, type:"workout"})))
        }
    }
    useEffect(()=>{
        getExercises();
        getWorkouts()
    },[]);

    return ( 
        <div className={`${styles.library}`}>
            <AppHeader title={"Library"} />
            {selectedItem && selectedItem.type === 'workout' ? 
                <ViewWorkout data={selectedItem} close={()=>setSelectedItem(null)} /> 
                : selectedItem && selectedItem.type === 'exercise' ? <ViewExercise data={selectedItem} close={()=>setSelectedItem(null)} /> 
                : null
            }
            <div className={styles.category}>
                <Link to={'/exercises-library'} className={styles.header}>
                    <h4>Exercises</h4>
                    <p>View All</p>
                </Link>
                <div className={styles.container}>
                    {exercises?.length > 0 ? exercises.map(item=><Exercise data={item} selectItem={setSelectedItem} />) : <p>No exercises found</p>}
                </div>
            </div>
            <div className={styles.category}>
                <Link to={'/workouts-library'} className={styles.header}>
                    <h4>Workouts</h4>
                    <p>View All</p>
                </Link>
                <div className={styles.container}>
                    {workouts?.length > 0 ? workouts.map(item=><Workout data={item} selectItem={setSelectedItem} />) : <p>No workouts found</p>}
                </div>
            </div>
        </div>
     );
}
 
export default Library;

const Exercise = ({data, selectItem}) =>{
    return(
        <div className={styles.exercise} onClick={()=>selectItem(data)} key={data._id}>
            <div className={styles.header}>
                <h4>{data.name}</h4>
                <div className={styles.duration}>
                    <img className={styles.metaIcon} alt='' src={IconLibrary.Time} />
                    <p>{ConvertMetaDuration(data.duration)}</p>
                </div>
            </div>
            <div className={styles.meta}>
                <div className={styles.tags}>
                    <img className={styles.metaIcon} alt='' src={IconLibrary.Tags} />
                    <p>{data.tags.map(item=>item.name).join(', ') || 'No tags'}</p>
                </div>
                <div className={styles.muscles}>
                    <img className={styles.metaIcon} alt='' src={IconLibrary.Muscle} />
                    <p>{data.targetMuscles.map(item=>item.name).join(', ') || 'No target muscles'}</p>
                </div>
            </div>
        </div>
    )
}

const Workout = ({data, selectItem}) =>{
    return(
        <div className={styles.workout} onClick={()=>selectItem(data)}>
            <div className={styles.header}>
                <h4>{data.name}</h4>
                <div className={styles.exercises}>
                    <img className={styles.metaIcon} alt='' src={IconLibrary.Dumbbell} />
                    <p>{data.phases?.reduce((sum, item)=> sum + item.exercises.length, 0)} exercises</p>
                </div>
            </div>
            <div className={styles.meta}>
                <div className={styles.tags}>
                    <img className={styles.metaIcon} alt='' src={IconLibrary.Tags} />
                    <p>{data.tags.map(item=>item.name).join(', ')}</p>
                </div>
                <div className={styles.muscles}>
                    <img className={styles.metaIcon} alt='' src={IconLibrary.Muscle} />
                    <p>{data.targetMuscles.map(item=>item.name).join(', ') || 'No target muscles'}</p>
                </div>
            </div>
        </div>
    )
}