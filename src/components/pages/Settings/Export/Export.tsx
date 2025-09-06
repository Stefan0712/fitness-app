import styles from "./Export.module.css";
import { useEffect, useState } from "react";
import { getAllItems } from "../../../../db.js";
import { useUI } from "../../../../context/UIContext.jsx";
import AppHeader from "../../../common/AppHeader/AppHeader.tsx";
import { IconLibrary } from "../../../../IconLibrary.js";


// TODO: Allow to export workouts and make it so it also exports exercises found in the workout (or not?)

const Export = () => {

    const {showMessage} = useUI();

    const [viewMode, setViewMode] = useState("list")

    const [selectedItems, setSelectedItems] = useState([])
    const [library, setLibrary] = useState({exercises:[], workouts: []});



    const handleGetLibrary = async () =>{
        const exercises = await getAllItems('exercises');
        const workouts = await getAllItems('workouts');
        setLibrary({exercises, workouts});
    }
    useEffect(()=>{handleGetLibrary()},[])

    function downloadJsonFile() {
        const jsonData = {
            type: "exercises",
            version: "1.0",
            createdAt: new Date().toISOString(),
            source: "local",
            itemCount: selectedItems.length,
            data: selectedItems
        };

        const jsonString = JSON.stringify(jsonData, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "exercises.json";
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showMessage(`Successfully exported ${selectedItems.length} items`, "success");
    }


    const handleItemSelection = (item) =>{
        if(selectedItems.includes(item)){
            setSelectedItems(prev=>[...prev.filter(itm=>itm._id !== item._id)]);
        }else {
            setSelectedItems(prev=>[...prev, item]);
        }
    }

    const handleSelectAll = async () =>{
        if(selectedItems.length === library.exercises.length){
            setSelectedItems([])
        }else{
            setSelectedItems([...library.exercises])
        }
    }
    return (
        <div className={styles.export}>
            <AppHeader title="Export" />
            <div className={styles.menu}>
                <p>{selectedItems?.length > 0 ? `${selectedItems.length} selected` : `${library.exercises?.length ?? 0} items`}</p>
                <div className={styles.viewButtons}>
                    <button className={viewMode === "list" ? styles.selectedViewButton : ''} onClick={()=>setViewMode('list')}><img src={IconLibrary.ItemList} alt=""/></button>
                    <button className={viewMode === "expanded-list" ? styles.selectedViewButton : ''} onClick={()=>setViewMode('expanded-list')}><img src={IconLibrary.ExpandedList} alt=""/></button>
                    <button className={viewMode === "cards" ? styles.selectedViewButton : ''} onClick={()=>setViewMode('cards')}><img src={IconLibrary.CardList} alt=""/></button>
                </div>
            </div>
            <div className={styles.viewContainer}>
                    <ListView items={library.exercises} handleItemSelection={handleItemSelection} selectedItems={selectedItems}/>
            </div>
            <div className={styles.buttons}>
                <button onClick={handleSelectAll}>Select All</button>
                <button disabled={selectedItems.length < 1} onClick={downloadJsonFile}>Export</button> 
            </div>
        </div>
    );
};

export default Export;


const ListView = ({items, handleItemSelection, selectedItems}) =>{

    return(
        <div className={styles.ListView}>
            {items?.length > 0 ? items.map((item, index) =><div className={`${selectedItems.some(obj=>obj._id === item._id) ? styles.selectedItem : ''} ${styles.listItem}`} key={index}>
                <div className={styles.info}>
                    <h4>{item.name}</h4>
                    <div className={styles.meta}>
                        <img src={IconLibrary.Tags} style={{width: '15px', height: '15px'}} alt="" />
                        <p className={styles.metaString}>{item.tags?.length > 0 ? item.tags?.map(i => i.name).join(", ") : "None"}</p>
                    </div>
                    <div className={styles.meta}>
                        <img src={IconLibrary.Muscle} style={{width: '15px', height: '15px'}} alt="" />
                        <p className={styles.metaString}>{item.targetMuscles?.length > 0 ? item.targetMuscles?.map(i => i.name).join(", ") : "None"}</p>
                    </div>
                    <div className={styles.meta}>
                        <img src={IconLibrary.Equipment} style={{width: '15px', height: '15px'}} alt="" />
                        <p className={styles.metaString}>{item.equpment?.length > 0 ? item.equipment?.map(i => i.name).join(", ") : "None"}</p>
                    </div>
                    <div className={styles.meta}>
                        <img src={IconLibrary.Fields} style={{width: '15px', height: '15px'}} alt="" />
                        <p className={styles.metaString}>{item.fields?.length > 0 ? item.fields?.map(i => `${i.name} - ${i.target} ${i.unit.shortLabel}`).join(", ") : "None"}</p>
                    </div>
                </div>
                <img onClick={()=>handleItemSelection(item)} className={styles.checkMarkIcon} src={selectedItems.some(obj=>obj._id === item._id) ? IconLibrary.Checkmark : IconLibrary.Plus} alt="" />
            </div>) 
            : <p>No items found</p>}
        </div>
    )
}
