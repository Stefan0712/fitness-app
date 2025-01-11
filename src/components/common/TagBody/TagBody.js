import { IconLibrary } from "../../../IconLibrary";
import { useState } from "react";
import '../QuickMenu/quickMenu.css';
import styles from './TagBody.module.css';




const TagBody = ({data, deleteTag}) => {

    const [showEdit, setShowEdit] = useState(false);
    const [confirmButtons, setConfirmButtons] = useState(false);
    const [itemName, setItemName] = useState(data.name || "");


    return ( 
        <div className={styles[`tag-body`]} key={data.id}>
            <div className={styles['tag-body']}>
                <div className={styles['tag-color']} style={{backgroundColor: data.color}}></div>
                <div className={styles['tag-name']}>{showEdit ? <input type="text" name="name" id="name" value={itemName} onChange={(e)=>setItemName(e.target.value)}></input> : itemName}</div>
                {data.source === 'user' ? (
                    <div className={styles["tag-buttons"]}>
                    {!showEdit ? <button className={styles["tag-button"]} onClick={()=>setShowEdit(true)}><img src={IconLibrary.Edit} alt=""/></button> : <button className={styles["tag-button"]} onClick={()=>setShowEdit(false)}><img src={IconLibrary.Close} alt=""/></button>}
                    {confirmButtons ? (
                        <div className={styles["confirm-buttons"]}>
                            <button className={styles["tag-button"]} onClick={()=>deleteTag(data.id)}><img src={IconLibrary.Yes} alt=""/></button>
                            <button className={styles["tag-button"]} onClick={()=>setConfirmButtons(false)}><img src={IconLibrary.No} alt=""/></button>
                        </div>
                    ):(
                        <button className={styles["tag-button"]} onClick={()=>setConfirmButtons(true)}><img src={IconLibrary.Delete} alt=""/></button>
                    )}
                </div>
                ): null}
            </div>
            
        </div>
     );
}
 
export default TagBody;