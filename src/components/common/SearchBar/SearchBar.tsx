// SeachBar component contains the search bar and filters. It takes the entire list of items and updates them based on the filters selected by the user
// It takes in the original list of all items and then saves the filtered list to a separate one so it won't modify the original list

import { useEffect, useState } from 'react';
import styles from './SearchBar.module.css';
import { IconLibrary } from '../../../IconLibrary';
import TagSelector from '../TagSelector/TagSelector.tsx';
import MuscleSelector from '../MuscleSelector/MuscleSelector.tsx';
import EquipmentSelector from '../EquipmentSelector/EquipmentSelector.tsx';
import {useUI} from '../../../context/UIContext.jsx'

const SearchBar = ({originalItemList, setFilteredItems}) => {

    const {showMessage} = useUI();

    const [expandFilters, setExpandFilters] = useState(false);

    const [query, setQuery] = useState<string>(''); // Search query
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedMuscles, setSelectedMuscles] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState('beginner');
    const [selectedDuration, setSelectedDuration] = useState(999);
    const [orderBy, setOrderBy] = useState('old');

    const [showTagPicker, setShowTagPicker] = useState(false);
    const [showMusclePicker, setShowMusclePicker] = useState(false);
    const [showEquipmentPicker, setShowEquipmentPicker] = useState(false);

    // Since the results in the Library components are rendered based on filteredItems, this sets that list to the originalItemList so that all items are shown by default
    useEffect(()=>{
        if(originalItemList && originalItemList.length > 0){
            setFilteredItems(originalItemList);
        }
    },[originalItemList]); 


    // A simple function that applies filters one by one which triggers only when the user press the Apply filters button
    const applyFilters = () => {
        let filtered = [...originalItemList];
        // Filter by tags
        if (selectedTags.length > 0) {
            filtered = filtered.filter(item => selectedTags.every(tag => item.tags.some(itemTag => itemTag.name === tag.name)));
        }
        // Filter by target muscles
        if (selectedMuscles.length > 0) {
            filtered = filtered.filter(item => selectedMuscles.every(muscle => item.targetMuscles.some(itemMuscle => itemMuscle.name === muscle.name)));
        }
        // Filter by equipment
        if (selectedEquipment.length > 0) {
            filtered = filtered.filter(item => selectedEquipment.every(eq => item.equipment.some(itemEq => itemEq.name === eq.name)));
        }
        // Filter by difficulty
        if (selectedDifficulty) {
            filtered = filtered.filter(item => item.difficulty === selectedDifficulty);
        }
        // Filter by duration
        filtered = filtered.filter(item => item.duration <= selectedDuration);
        setFilteredItems(filtered);
        showMessage('Filters were applied', "success");
    };

    // This will show only items with names matchingthe search query (trimmed) and resets them if the query is empty
    const handleQuerySearch = (searchQuery) => {
        setQuery(searchQuery);
        const tempQuery = searchQuery.trim().toLowerCase();
        if (tempQuery.length > 2) {
            const filtered = originalItemList.filter(item => item.name.toLowerCase().includes(tempQuery));
            setFilteredItems(filtered);
        } else {
            // Reset to full list if query is empty or too short
            setFilteredItems(originalItemList);
        }
    };
    
    // Triggers filtering by order when this filter is changed
    const handleOrder = (order) => {
        setOrderBy(order)
        const sorted = [...originalItemList]; 
        switch (order) {
            case 'asc':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'dec':
                sorted.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'new':
                sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'old':
                sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            default:
            break;
        }
        setFilteredItems(sorted);
    };

    return ( 
        <div className={styles.searchBarContainer}>
           <div className={styles.searchBar}>
                <input type='text' minLength={3} id='searchBox' name='searchBox' value={query} onChange={(e)=>handleQuerySearch(e.target.value)} placeholder='Search....'/>
                <button onClick={()=>setExpandFilters(prev=>!prev)} className={styles.filterButton}><img src={IconLibrary.Filter} alt='filters' /></button>
           </div>
           {showTagPicker ? <TagSelector close={()=>setShowTagPicker(false)} tags={selectedTags} setTags={setSelectedTags} /> : null}
           {showMusclePicker ? <MuscleSelector close={()=>setShowMusclePicker(false)} targetMuscles={selectedMuscles} setTargetMuscles={setSelectedMuscles} /> : null}
           {showEquipmentPicker ? <EquipmentSelector close={()=>setShowEquipmentPicker(false)} equipments={selectedEquipment} setEquipments={setSelectedEquipment}/> : null}
           <div className={`${styles.filters} ${expandFilters ? styles.expandedFilters : ''}`}>
                <div className={styles.twoItems}>
                    <fieldset>
                        <img src={IconLibrary.Sort} alt='' className={styles.filterIcon} />
                        <select onChange={(e)=>handleOrder(e.target.value)} value={orderBy}>
                            <option value={'asc'}>Ascending</option>
                            <option value={'desc'}>Descending</option>
                            <option value={'new'}>New First</option>
                            <option value={'old'}>Old First</option>
                            <option value={'popular'}>Popularity</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <img src={IconLibrary.Levels} alt='' className={styles.filterIcon} />
                        <select onChange={(e)=>setSelectedDifficulty(e.target.value)} value={selectedDifficulty}>
                            <option value={'beginner'}>Beginner</option>
                            <option value={'intermediate'}>Intermediate</option>
                            <option value={'advanced'}>Advanced</option>
                        </select>
                    </fieldset>
                </div>
                <div className={styles.filterByTag}>
                    <img src={IconLibrary.Tags} alt='' className={styles.filterIcon} />
                    <div className={styles.itemsContainer}>
                        {selectedTags && selectedTags.length > 0 ? selectedTags.map(tag=><div className={styles.selectedTag} key={tag._id}><div className={styles.tagColor} style={{backgroundColor: tag.color}}></div><p>{tag.name}</p></div>) : <div className={styles.selectedTag}>None</div>}
                    </div>
                    <button className={styles.addFilterButton} onClick={()=>setShowTagPicker(true)}><img src={IconLibrary.Add} alt='' /></button>
                </div>
                <div className={styles.filterByMuscles}>
                    <img src={IconLibrary.Muscle} alt='' className={styles.filterIcon} />
                    <div className={styles.itemsContainer}>
                        {selectedMuscles && selectedMuscles.length > 0 ? selectedMuscles.map(muscle=><div className={styles.selectedMuscle} key={muscle._id}>{muscle.name}</div>) : <div className={styles.selectedMuscle}>None</div>}
                    </div>
                    <button className={styles.addFilterButton} onClick={()=>setShowMusclePicker(true)}><img src={IconLibrary.Add} alt='' /></button>
                </div>
                <div className={styles.filterByEquipment}>
                    <img src={IconLibrary.Equipment} alt='' className={styles.filterIcon} />
                    <div className={styles.itemsContainer}>
                        {selectedEquipment && selectedEquipment.length > 0 ? selectedEquipment.map(equipment=><div className={styles.selectedTag} key={equipment._id}>{equipment.name}</div>) : <div className={styles.selectedEquipment}>None</div>}
                    </div>
                    <button className={styles.addFilterButton} onClick={()=>setShowEquipmentPicker(true)}><img src={IconLibrary.Add} alt='' /></button>
                </div>
                <div className={styles.duration}>
                    <label>Duration</label>
                    <input type='range' min={0} max={999} onChange={(e)=>setSelectedDuration(parseInt(e.target.value))} value={selectedDuration} />
                    <p>{selectedDuration} min</p>
                </div>
                <button className={styles.applyFiltersButton} onClick={applyFilters}>Apply Filters</button>
           </div>
        </div>
     );
}
 
export default SearchBar;