
import styles from './WorkoutsLibrary.module.css';
import { Link } from "react-router-dom";
import { IconLibrary } from "../../../../IconLibrary";
import { useState, useEffect } from "react";
import { getAllItems } from "../../../../db";
import AppHeader from "../../../common/AppHeader/AppHeader.tsx";
import SearchBar from '../../../common/SearchBar/SearchBar.tsx';
import ViewWorkout from '../../../common/ViewWorkout/ViewWorkout.tsx';


const WorkoutsLibrary = () => {
    const [filteredItems, setFilteredItems] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);


    const getWorkouts = async () =>{
        const workouts = await getAllItems('workouts');
        setFilteredItems(workouts);
        setAllItems(workouts);
        console.log(workouts)
    }
    useEffect(()=>{
        getWorkouts();
    },[])
    return ( 
        <div className={`${styles.library}`}>
            {selectedItem ? <ViewWorkout data={selectedItem} close={()=>setSelectedItem(null)} /> : null}
            <AppHeader title={"My Workouts"} button={<Link className={styles.newItemBtn} to={'/create-workout'}><img src={IconLibrary.Add} alt="" /></Link>} />
            <SearchBar originalItemList={allItems} setFilteredItems={setFilteredItems} />
            <div className={styles.workouts}>
                {filteredItems && filteredItems.length > 0 ? filteredItems.map(item=><Workout key={item._id} data={item} selectItem={()=>setSelectedItem(item)} />) : <p>No items to show</p>}
            </div>
        </div>
    );
}
 
export default WorkoutsLibrary;



const Workout = ({data, selectItem}) =>{

    return(
        <div className={styles.workout} onClick={selectItem}>
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