
import styles from './ExercisesLibrary.module.css';
import { Link } from "react-router-dom";
import { IconLibrary } from "../../../../IconLibrary";
import { useState, useEffect } from "react";
import { getAllItems } from "../../../../db";
import AppHeader from "../../../common/AppHeader/AppHeader.tsx";
import SearchBar from '../../../common/SearchBar/SearchBar.tsx';
import ViewExercise from '../../../common/ViewExercise/ViewExercise.tsx';
import { ConvertMetaDuration } from '../../../../helpers/exerciseHelpers.js';


const ExercisesLibrary = () => {
    const [filteredItems, setFilteredItems] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);


    const getExercises = async () =>{
        const exercises = await getAllItems('exercises');
        setFilteredItems(exercises);
        setAllItems(exercises);
        console.log(exercises)
    }
    useEffect(()=>{
        getExercises();
    },[]);
    
    return ( 
        <div className={`${styles.library}`}>
            {selectedItem ? <ViewExercise data={selectedItem} close={()=>setSelectedItem(null)} /> : null}
            <AppHeader title={"My Exercises"} button={<Link className={styles.newItemBtn} to={'/create-exercise'}><img src={IconLibrary.Add} alt="" /></Link>} />
            <SearchBar originalItemList={allItems} setFilteredItems={setFilteredItems} />
            <div className={styles.exercises}>
                {filteredItems && filteredItems.length > 0 ? filteredItems.map(item=><Exercise key={item._id} data={item} selectItem={()=>setSelectedItem(item)} />) : <p>No items to show</p>}
            </div>
        </div>
    );
}
 
export default ExercisesLibrary;



const Exercise = ({data, selectItem}) =>{
    return(
        <div className={styles.exercise} onClick={selectItem} key={data._id}>
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