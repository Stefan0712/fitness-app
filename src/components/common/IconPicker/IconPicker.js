import './iconPicker.css';
import { iconList } from '../../../icons';
import { useState } from 'react';
import closeIcon from '../../../assets/close.svg'


const IconPicker = ({handleIcon}) => {

    const [selectedIcon, setSelectedIcon] = useState(iconList[0]);
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleIconPicker = (e) =>{
        e.preventDefault();
        setIsExpanded((isExpanded)=>!isExpanded);
    }
    const selectIcon = (icon) =>{
        setSelectedIcon(icon);
        handleIcon(icon);
        setIsExpanded(false)
    }
    return ( 
        <div className={`icon-picker ${isExpanded ? 'expand-icon-picker' : ''}`}>
            <div className='top'>
                <button onClick={toggleIconPicker}><img className='icon' src={isExpanded ? closeIcon : selectedIcon}></img></button>
                <h2>Pick an icon</h2>
            </div>
            <div className='bottom'>
                {iconList.map((icon)=>(
                    <div key={icon} className='icon-button' onClick={()=>selectIcon(icon)}>
                        <img className='icon' src={icon}></img>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default IconPicker;