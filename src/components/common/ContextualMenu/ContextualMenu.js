import { useState } from "react";
import './contextualMenu.css';



const ContextualMenu = ({closeMenu, title, buttons}) => {

 
 
    return ( 
        <div className="contextual-menu">
            <h3>{title ? title : ''}</h3>
            <div className="buttons">
                {buttons?.map(button=>button)}
            </div>
            <button onClick={closeMenu} className="close-button">Close</button>
        </div>
        );
    
    
}
 
export default ContextualMenu;