import { useState } from "react";
import ColorPicker from "./ColorPicker";
import { v4 as uuidv4 } from "uuid";
import { IconLibrary } from "../../../IconLibrary";

const CustomItemCreator = ({addItem}) => {

    const [selectedColor, setSelectedColor] = useState('white');
    const [name, setName] = useState('');

    const handleSaveItem = (e) =>{
        e.preventDefault();
        const item = {
            id: uuidv4(),
            source: 'user',
            name,
            color: selectedColor,
        }
        addItem(item);
        setName('')
    }
    const getColor = (color) =>{
        setSelectedColor(color);
    }
    return ( 
        <div className="custom-item-creator">
            <ColorPicker getColor={getColor} />
            <input type="text" name="name" id="name" onChange={(e)=>setName(e.target.value)} value={name} placeholder="Name"></input>
            <button className="clear-button" onClick={e=>handleSaveItem(e)}><img src={IconLibrary.PlusCircle} /></button>
        </div>
     );
}
 
export default CustomItemCreator;