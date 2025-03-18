import { useState } from "react";
import ColorPicker from "../ColorPicker/ColorPicker.tsx";
import { v4 as uuidv4 } from "uuid";
import { IconLibrary } from "../../../IconLibrary";
import { useSelector } from "react-redux";

const CustomItemCreator = ({addItem, type}) => {

    const [selectedColor, setSelectedColor] = useState('white');
    const userId = useSelector(state=>state.user.userData.id);
    const [name, setName] = useState('');
    const [error, setError] = useState(null);

    const handleSaveItem = (e) =>{
        e.preventDefault();
        if(name.length < 1){
            showError('Name too short')
        }else{
            const item = {
                id: uuidv4(),
                author: userId,
                name,
                color: type === 'tag' ? selectedColor : null,
            }
            addItem(item);
            setName('')
        }
        
    }
    
    const getColor = (color) =>{
        setSelectedColor(color);
    }
    const showError = (msg='Invalid input') =>{
        setError(msg);
        setTimeout(()=>hideError(), 2000)
    }
    const hideError = () =>{
        setError(null)
    }
    return ( 
        <div className="custom-item-creator" style={{paddingLeft: type==='tag' ? '60px' : null}}>
            {type === 'tag' ? <ColorPicker getColor={getColor} /> : null}
            <div className="custom-item-input">
                <input className={`${error ? 'show-error' : null}`} type="text" name="name" id="name" onChange={(e)=>setName(e.target.value)} value={name} placeholder="Name"></input>
                {error ? <p className="error-msg">{error || null}</p> : null}
            </div>
            <button className="clear-button" onClick={e=>handleSaveItem(e)}><img src={IconLibrary.PlusCircle} /></button>
        </div>
     );
}
 
export default CustomItemCreator;