import { IconLibrary } from "../../../IconLibrary";
import { useState } from "react";
import './stylings/quickMenu.css';


const TagBody = ({data}) => {

    const [showEdit, setShowEdit] = useState(false);
    const [confirmButtons, setConfirmButtons] = useState(false);
    const [itemName, setItemName] = useState(data.name || "");


    return ( 
        <div className={`tag-body`} key={data.id}>
            <div className='tag-body'>
                <div className='tag-color' style={{backgroundColor: data.color}}></div>
                <div className='tag-name'>{showEdit ? <input type="text" name="name" id="name" value={itemName} onChange={(e)=>setItemName(e.target.value)}></input> : itemName}</div>
                <div className="tag-buttons">
                    {!showEdit ? <button className="tag-button" onClick={()=>setShowEdit(true)}><img src={IconLibrary.Edit} alt=""/></button> : <button className="tag-button" onClick={()=>setShowEdit(false)}><img src={IconLibrary.Close} alt=""/></button>}
                    {confirmButtons ? (
                        <div className="confirm-buttons">
                            <button className="tag-button" onClick={()=>console.log('deleted')}><img src={IconLibrary.Yes} alt=""/></button>
                            <button className="tag-button" onClick={()=>setConfirmButtons(false)}><img src={IconLibrary.No} alt=""/></button>
                        </div>
                    ):(
                        <button className="tag-button" onClick={()=>setConfirmButtons(true)}><img src={IconLibrary.Delete} alt=""/></button>
                    )}
                </div>
            </div>
            
        </div>
     );
}
 
export default TagBody;