import { IconLibrary } from "../../../IconLibrary";
import './DefaultItems.css';
import { useState } from "react";

const DefaultItems = ({allItems, title, addItem, savedItems}) => {
    //make it so that it adds colors to items that support that
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [items, setItems] = useState(allItems || []);
    const checkIfAdded = (item) =>{
        if (savedItems.find(existingItem => existingItem.id === item.id)) {
            return true;
        }
        return false;
    }

    const handleSeach = (e) =>{
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        
        const filteredItems = allItems.filter(item => item.name.toLowerCase().includes(query));
        setItems(filteredItems);
    }
    return ( 
        <div className={`default-items ${isExpanded ? 'expanded' : null}`}>
            <p className="default-items-title" onClick={()=>setIsExpanded((isExpanded)=>!isExpanded)}>{title}</p>
            <div className="default-item-search-container">
                <input className="default-item-search-input" type="text" minLength={0} maxLength={20} onChange={handleSeach} value={searchQuery}></input>
                <img className="small-icon search-icon" src={IconLibrary.Search} />
            </div>
            <div className="default-items-container">
                {items?.length > 0 ? items.map((item,index)=>
                    checkIfAdded(item) ? null : (
                        <div className="default-item" key={'default-item'+item.name+index}>
                            <p className="default-item-name">{item.name}</p>
                            {item.measurements?.length > 0 ? <p className="default-item-measurement"></p> : null}
                            <button type="button" className="clear-button" onClick={()=>addItem(item)}><img src={IconLibrary.Add} className="small-icon" alt="" /></button>
                        </div>
                    )
                ):<p>Items not found</p>}
            </div>
        </div> 
    );
}
 
export default DefaultItems;