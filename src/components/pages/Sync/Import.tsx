import { useEffect, useState } from "react";
import styles from "./Sync.module.css";
import { getAllItems, saveMultipleItems } from "../../../db.js";
import { useUI } from "../../../context/UIContext.jsx";
import ObjectID from "bson-objectid";
import ExerciseImport from "./ExerciseImport.tsx";
import WorkoutImport from "./WorkoutImport.tsx";

const Import = () => {

    const {showMessage, showConfirmationModal} = useUI();

    const [importData, setImportData] = useState<any>(null);
    const [selectedItems, setSelectedItems] = useState([])
    const [library, setLibrary] = useState({exercises:[], workouts: []});



    const handleGetLibrary = async () =>{
        const exercises = await getAllItems('exercises');
        const workouts = await getAllItems('workouts');
        setLibrary({exercises, workouts});
        console.log(library)
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
            console.log(parsed)
            setImportData(parsed);
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
            <div className={styles.fileInput}>
                <label>JSON file: </label>
                <input type="file" accept="application/json" onChange={handleInitialImport} />
            </div>
            <h3>Items</h3>
            <div className={styles.exercisesContainer}>
                {importData?.data && importData?.data.length > 0 ? importData?.data.map((item, index)=>(
                    importData.type === 'exercises' ? 
                        <ExerciseImport key={"Exercise-"+index} item={item} index={index} library={library} selectedItems={selectedItems} handleItemSelection={handleItemSelection} /> 
                    : importData.type === 'workouts' ? 
                        <WorkoutImport key={"Workout-"+index} item={item} index={index} library={library} selectedItems={selectedItems} handleItemSelection={handleItemSelection} /> 
                    : null
                )): <p>No exercises found</p>}
            </div>
            <div className={styles.buttons}>
                <button onClick={(()=>showConfirmationModal({title: "Are you sure?", message: "All items will be imported to your library, even duplicates. Do you want to continue?", onConfirm: handleImportAll}))}>Import All</button>
                <button onClick={handleImportNew}>Import Only New</button>
                <button disabled={selectedItems.length < 1} onClick={(()=>showConfirmationModal({title: "Are you sure?", message: "Selected items will be added to your library, even if there are duplicates. Do you want to continue?", onConfirm: handleImportSelected}))}>Import Selected ({selectedItems.length})</button> 
            </div>
        </div>
    );
};

export default Import;
