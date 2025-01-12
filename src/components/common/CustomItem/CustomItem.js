import { IconLibrary } from "../../../IconLibrary";
import { useState } from "react";
import '../QuickMenu/quickMenu.css';
import styles from './CustomItem.module.css';




const CustomItem = ({data, deleteItem, updateItem}) => {

    const [showEdit, setShowEdit] = useState(true);
    const [confirmEdit, setConfirmEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(true);
    const [confirmDelete, setConfirmDelete] = useState(false);


    const [itemName, setItemName] = useState(data.name || "");


  
    const handleDelete = () =>{
         //make sure edit buttons are not shown when in edit mode
         setShowEdit(false);
         setConfirmEdit(false);
 
         setShowDelete(false); //hide the delete button
         setConfirmDelete(true); //show confirmation buttons for the delete mode
    }
    const handleEdit = () =>{
        //make sure edit buttons are not shown when in edit mode
        setShowDelete(false);
        setConfirmDelete(false);

        setShowEdit(false); //hide the edit button
        setConfirmEdit(true); //show confirmation buttons for the edit mode
    }
    const handleCancelEdit = () =>{
        setConfirmEdit(false);
        setShowEdit(true);
        setShowDelete(true);
    }
    const handleCancelDelete = () =>{
        setConfirmDelete(false);
        setShowDelete(true);
        setShowEdit(true);
    }
    const handleUpdateItem = () =>{
        const newItemData = {...data, name: itemName};
        updateItem(newItemData);
        handleCancelEdit();
    }
    return ( 
        <div className={styles[`custom-item`]} key={data.id}>
            <div className={styles['custom-item']}>
                <div className={styles['custom-item-color']} style={{backgroundColor: data.color}}></div>
                <div className={styles['custom-item-name']}>
                    {confirmEdit ? 
                    <input type="text" name="name" id="name" value={itemName} onChange={(e)=>setItemName(e.target.value)}></input> 
                    : itemName}
                </div>
                {data.source === 'user' ? (
                    <div className={styles["custom-item-buttons"]}>
                        {showEdit && !confirmEdit ? (<button className={styles["custom-item-button"]} onClick={handleEdit}><img src={IconLibrary.Edit} alt=""/></button>) : null }
                         
                        {confirmEdit ? (
                            <div className={styles["confirm-buttons"]}>
                                <button className={styles["custom-item-button"]} onClick={handleUpdateItem}><img src={IconLibrary.Save} alt=""/></button>
                                <button className={styles["custom-item-button"]} onClick={handleCancelEdit}><img src={IconLibrary.No} alt=""/></button>
                            </div>
                        ) : null}
                    
                        {confirmDelete && !showDelete && !showEdit && !confirmEdit ? (
                            <div className={styles["confirm-buttons"]}>
                                <button className={styles["custom-item-button"]} onClick={()=>deleteItem(data.id)}><img src={IconLibrary.Yes} alt=""/></button>
                                <button className={styles["custom-item-button"]} onClick={handleCancelDelete}><img src={IconLibrary.No} alt=""/></button>
                            </div>
                        ) : null}
                        {showDelete && !confirmDelete ? (<button className={styles["custom-item-button"]} onClick={handleDelete}><img src={IconLibrary.Delete} alt=""/></button>) : null}
                    </div>
                ): null}
            </div>
            
        </div>
     );
}
 
export default CustomItem;