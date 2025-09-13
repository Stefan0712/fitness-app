import styles from "./Import.module.css";
import { useEffect, useState } from "react";
import { getAllItems, saveMultipleItems } from "../../../../db.js";
import { useUI } from "../../../../context/UIContext.jsx";
import ObjectID from "bson-objectid";
import AppHeader from "../../../common/AppHeader/AppHeader.tsx";
import { IconLibrary } from "../../../../IconLibrary.js";


// TODO: Allow to import workouts
// TODO: Check for duplicates and missing data when importing


const Import = () => {

    const {showMessage, showConfirmationModal} = useUI();

    const [viewMode, setViewMode] = useState("list")
    const [type, setType] = useState('')

    const [importData, setImportData] = useState<any>(null);
    const [selectedItems, setSelectedItems] = useState([])
    const [library, setLibrary] = useState({exercises:[], workouts: []});



    const handleGetLibrary = async () =>{
        const exercises = await getAllItems('exercises');
        const workouts = await getAllItems('workouts');
        setLibrary({exercises, workouts});
    }
    useEffect(()=>{handleGetLibrary()},[])

    const handleInitialImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const parsed = JSON.parse(event.target?.result as string);
            if (Array.isArray(parsed.data)) {
                parsed.data = parsed.data.map(item => {
                    if (item.muscleGroups && !item.targetMuscles) {
                        return {...item, targetMuscles: item.muscleGroups, muscleGroups: undefined};
                    }
                    return item;
                });
            }
            setImportData(parsed);
            if(parsed.type === 'exercises' || parsed.type === 'workouts') {
                setType(parsed.type)
            }
            showMessage("File successfully imported!", "success");
        } catch (err) {
            console.error("Failed to parse JSON:", err);
            alert("Invalid JSON file.");
        }
    };
    reader.readAsText(file);
};


    const handleItemSelection = (item) =>{
        if(selectedItems.includes(item)){
            setSelectedItems(prev=>[...prev.filter(itm=>itm._id !== item._id)]);
        }else {
            setSelectedItems(prev=>[...prev, item]);
        }
    }

    const handleImportSelected = async () =>{
        if(selectedItems.length > 0){
            const tempItems = selectedItems.map((item)=>({...item, sourceId: item._id, _id: ObjectID().toHexString()}))
            await saveMultipleItems(importData.type, tempItems);
            showMessage(`${tempItems.length} new items were saved to ${importData.type}`, 'success') 
        }
    }
    const handleImportNew = async () =>{
        const tempItems = importData.data.filter(item=>!library.workouts.some(i=>i._id===item._id)).map((item)=>({...item, sourceId: item._id, _id: ObjectID().toHexString()}))
        await saveMultipleItems(importData.type, tempItems);
        showMessage(`${tempItems.length} new items were saved to ${importData.type}`, 'success')  
    }
    const handleImportAll = async () =>{
        const tempItems = importData.data.map((item)=>({...item, sourceId: item._id, _id: ObjectID().toHexString()}))
        await saveMultipleItems(importData.type, tempItems);
        showMessage(`${tempItems.length} new items were saved to ${importData.type}`, 'success');
    }
    return (
        <div className={styles.importScreen}>
            <AppHeader title="Import" />
            <div className={styles.inputContainer}>
                <label>JSON File</label>
                <input className={styles.fileInput} type="file" accept="application/json" onChange={handleInitialImport} />
            </div>
            <div className={styles.menu}>
                <p>{selectedItems?.length > 0 ? `${selectedItems.length} selected` : importData?.length ?? 'No items'}</p>
                <div className={styles.viewButtons}>
                    <button className={viewMode === "list" ? styles.selectedViewButton : ''} onClick={()=>setViewMode('list')}><img src={IconLibrary.ItemList} alt=""/></button>
                    <button className={viewMode === "expanded-list" ? styles.selectedViewButton : ''} onClick={()=>setViewMode('expanded-list')}><img src={IconLibrary.ExpandedList} alt=""/></button>
                    <button className={viewMode === "cards" ? styles.selectedViewButton : ''} onClick={()=>setViewMode('cards')}><img src={IconLibrary.CardList} alt=""/></button>
                </div>
            </div>
            <div className={styles.viewContainer}>
                    <ListView type={type} items={importData?.data} handleItemSelection={handleItemSelection} selectedItems={selectedItems}/>
            </div>
            <div className={styles.buttons}>
                <button onClick={(()=>showConfirmationModal({title: "Are you sure?", message: "All items will be imported to your library, even duplicates. Do you want to continue?", onConfirm: handleImportAll}))}>Import All</button>
                <button onClick={handleImportNew}>Import New</button>
                <button disabled={selectedItems.length < 1} onClick={(()=>showConfirmationModal({title: "Are you sure?", message: "Selected items will be added to your library, even if there are duplicates. Do you want to continue?", onConfirm: handleImportSelected}))}>Import Selected</button> 
            </div>
        </div>
    );
};

export default Import;


const ListView = ({items, handleItemSelection, selectedItems, type}) =>{

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
                    {type === 'exercise' ? <div className={styles.meta}>
                            <img src={IconLibrary.Fields} style={{width: '15px', height: '15px'}} alt="" />
                            <p className={styles.metaString}>{item.fields?.length > 0 ? item.fields?.map(i => `${i.name} - ${i.target} ${i.unit.shortLabel}`).join(", ") : "None"}</p>
                        </div> : <div className={styles.meta}>
                            <img src={IconLibrary.Fields} style={{width: '15px', height: '15px'}} alt="" />
                            <p className={styles.metaString}>{item.exercises?.length > 0 ? item.exercises?.map(i => i.name) : "None"}</p>
                        </div>
                    }
                </div>
                <img onClick={()=>handleItemSelection(item)} className={styles.checkMarkIcon} src={selectedItems.some(obj=>obj._id === item._id) ? IconLibrary.Checkmark : IconLibrary.Plus} alt="" />
            </div>) 
            : <p>No items found</p>}
        </div>
    )
}
