import { useState } from "react";


const ColorPicker = ({getColor}) => {

    const [colors, setColors] = useState(["#FF6F61", "#6B5B95", "#88B04B", "#F7CAC9", "#92A8D1", "#955251", "#B565A7", "#009B77", 
        "#DD4124", "#45B8AC", "#EFC050", "#5B5EA6", "#9B2335", "#DFCFBE", "#BC243C", "#C3447A", "#98B4D4", "#D94F70", "#6C7A89", 
        "#F7786B", "#F0EAD6", "#C39BD3", "#7FCDCD", "#D5A6BD", "#FFD662"]);

    const [selectedColor, setSelectedColor] = useState('white')
    const [isExtended, setIsExtended] = useState(false)

    const handleColorChange = (e,value) => {
        e.preventDefault();
        setSelectedColor(value);
        getColor(value);
        setIsExtended(false);
    }
    return ( 
        <div className={`color-picker ${isExtended ? 'extended-color-picker' : ''}`}>
            <div className="color-picker-header" onClick={()=>setIsExtended(isExtended ? false : true)}>
                <div className="color-button" style={{backgroundColor: selectedColor}}></div>
            </div>
            <div className="colors-container">
                {colors.map( item =>  <button key={item} className="color-button" style={{backgroundColor: item}} onClick={(e)=>handleColorChange(e, item)}></button>)}
            </div>
        </div>
     );
}
 
export default ColorPicker;