import { IconLibrary } from "../../../IconLibrary";
import { useEffect, useState } from "react";
import styles from "./Filter.module.css";
import { getQueriesForElement } from "@testing-library/react";

const Filter = ({allItems, filterItems}) => {

    const [isExpanded, setIsExpanded] = useState(false)

    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const [equipment, setEquipment] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState([]);

    const [targetMuscles, settargetMuscles] = useState([]);
    const [selectedtargetMuscles, setSelectedtargetMuscles] = useState([]);





    const getTags = () =>{
        const uniqueItems = new Set();

        allItems?.forEach((item) => {
            item.tags?.forEach((i) => {
                uniqueItems.add(i.name); // Add the tag name to the Set
            });
        });

        return Array.from(uniqueItems); // Convert the Set back to an array

    }
    const gettargetMuscles = () =>{
        const uniqueItems = new Set();

        allItems?.forEach((item) => {
            item.targetGroup?.forEach((i) => {
                uniqueItems.add(i.name); // Add the tag name to the Set
            });
        });

        return Array.from(uniqueItems); // Convert the Set back to an array

    }
    const getEquipment = () => {
        const uniqueItems = [];
    
        allItems.forEach((item) => {
            item.equipment?.forEach((i) => {
                if (!uniqueItems.includes(i.name)) { // Check for duplicates
                    uniqueItems.push(i.name); // Add the tag name to the array
                    console.log(i.name);
                }
            });
        });
    
        console.log(uniqueItems);
        return uniqueItems; // Return the array directly
    };
    
    
    useEffect(()=>{
        console.log(allItems)
        setTags(getTags())
        setEquipment(getEquipment());
        settargetMuscles(gettargetMuscles());
    },[allItems])


    return ( 
        <div className={`${styles["filter-body"]} ${isExpanded ? styles.expanded : ''}`} >
            <div className={styles.header}>
                <select className={styles['filter-dropdown']}>
                    <option value={'asc-name'}>Name Asc</option>
                    <option value={'desc-name'}>Name Desc</option>
                    <option value={'asc-duration'}>Duration Asc</option>
                    <option value={'desc-duration'}>Duration Desc</option>
                </select>
                <img src={IconLibrary.Filter} className={styles['filter-icon']} alt="filters" onClick={()=>setIsExpanded(isExpanded=>!isExpanded)}></img>
            </div>
            <div className={styles.container}>
                <fieldset>
                    <label>Difficulty</label>
                    <select className={styles['filter-dropdown']}>
                        <option value={'beginner'}>Beginner</option>
                        <option value={'intermediate'}>Intermediate</option>
                        <option value={'advanced'}>Advanced</option>
                    </select>
                </fieldset>
                <fieldset className={styles.durationInputs}>
                    <label>Duration</label>
                    <input type="number" name="minDuration"></input>
                    <input type="number" name="maxDuration"></input>
                </fieldset>
                
                <fieldset>
                    <label>Equipment</label>
                    <select className={styles['filter-dropdown']}>
                        {equipment && equipment.length > 0 ? equipment.map((item)=>(<option value={item}>{item}</option>)) : null}
                    </select>
                </fieldset>
                <fieldset>
                    <label>Target Muscles</label>
                    <select className={styles['filter-dropdown']}>
                        {targetMuscles && targetMuscles.length > 0 ? targetMuscles.map((item)=>(<option value={item}>{item}</option>)) : null}
                        {targetMuscles?.length === 0 ? <option value={'none'}>None found</option> :null}
                    </select>
                </fieldset>
                <fieldset>
                    <label>Tags</label>
                    <select className={styles['filter-dropdown']}>
                        {tags && tags.length > 0 ? tags.map((item)=>(<option value={item}>{item}</option>)) : null}
                    </select>
                </fieldset>
            </div>
        </div>
     );
}
 
export default Filter;