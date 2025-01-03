import { IconLibrary } from "../../../IconLibrary";
import './stylings/DefaultItems.css';
import { useState } from "react";

const DefaultItems = ({items, title, addItem, savedItems}) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const checkIfAdded = (item) =>{
        if (savedItems.find(existingItem => existingItem.id === item.id)) {
            return true;
        }
        return false;
    }
    return ( 
        <div className={`default-items ${isExpanded ? 'expanded' : null}`} onClick={()=>setIsExpanded((isExpanded)=>!isExpanded)}>
            <p className="default-items-title">{title}</p>
            <div className="default-items-container">
                {items?.length > 0 ? items.map((item)=>
                    checkIfAdded(item) ? null : (
                        <div className="default-item" key={item.id}>
                            <p className="default-item-name">{item.name}</p>
                            {item.measurements?.length > 0 ? <p className="default-item-measurement"></p> : null}
                            <button type="button" className="clear-button" onClick={()=>addItem(item)}><img src={IconLibrary.Add} className="small-icon" alt="" /></button>
                        </div>
                    )
                ):<p>'Loading'</p>}
            </div>
        </div> 
    );
}
 
export default DefaultItems;