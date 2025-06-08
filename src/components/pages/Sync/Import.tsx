import { useEffect, useState } from "react";
import styles from "./Sync.module.css";
import { IconLibrary } from "../../../IconLibrary.js";
import { getAllItems, saveMultipleItems } from "../../../db.js";
import { useUI } from "../../../context/UIContext.jsx";
import ObjectID from "bson-objectid";

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
            setImportData(parsed);
            showMessage("File successfully imported!", "success")
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
            setSelectedItems(prev=>[...prev, item])
        }
    }

    const handleImportSelected = async () =>{
        if(selectedItems.length > 0){
            const tempItems = selectedItems.map((item)=>({...item, sourceId: item._id, _id: ObjectID().toHexString()}))
            await saveMultipleItems('exercises', tempItems);
            showMessage(`${tempItems.length} new items were saved`, 'success') 
        }
    }
    const handleImportNew = async () =>{
        const tempItems = importData.data.filter(item=>!library.exercises.some(i=>i._id===item._id)).map((item)=>({...item, sourceId: item._id, _id: ObjectID().toHexString()}))
        await saveMultipleItems('exercises', tempItems);
        showMessage(`${tempItems.length} new items were saved`, 'success')  
    }
    const handleImportAll = async () =>{
        const tempItems = importData.data.map((item)=>({...item, sourceId: item._id, _id: ObjectID().toHexString()}))
        await saveMultipleItems('exercises', tempItems);
        showMessage(`${tempItems.length} new items were saved`, 'success')  
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
                <div key={'Exercise-'+index} className={`${styles.importExercise} ${selectedItems.includes(item) ? styles.selectedExercise : ''}`} onClick={()=>handleItemSelection(item)}>
                    {library.exercises.some(i=>i._id === item._id || i.sourceId === item._id) ? <img src={IconLibrary.Duplicate} className={styles.duplicateImportIcon} alt="" /> : null}
                    <h4>{item.name}</h4>
                    <div className={styles.rowList}>
                        <img src={IconLibrary.Tags} alt='' /> 
                        {item.tags?.map((tag, index)=><p key={'tax-'+index}>{tag.name}</p>)}
                    </div>
                    <div className={styles.rowList}>
                        <img src={IconLibrary.Muscle} alt='' /> 
                        {item.targetMuscles?.map((muscle, index)=><p key={'tax-'+index}>{muscle.name}</p>)}
                    </div>
                    <div className={styles.rowList}>
                        <img src={IconLibrary.Dumbbell} alt='' /> 
                        {item.equipment?.map((eq, index)=><p key={'tax-'+index}>{eq.name}</p>)}
                    </div>
                    <div className={styles.rowList}>
                        <p>{item.sets}x </p>
                        {item.fields?.map((field, index)=><p key={'tax-'+index}>{field.target} {field.unit}</p>)}
                    </div>
                </div>
            )): <p>No exercises found</p>}
        </div>
        <div className={styles.buttons}>
            <button onClick={handleImportAll}>Import All</button>
            <button onClick={handleImportNew}>Import Only New</button>
            <button disabled={selectedItems.length < 1} onClick={handleImportSelected}>Import Selected ({selectedItems.length})</button> 
        </div>
    </div>
  );
};

export default Import;
