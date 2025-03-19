import React from "react";
import styles from './Exercise.module.css';
import { useState } from "react";
import ColorPicker from "../../common/ColorPicker/ColorPicker.tsx";
import { IconLibrary } from "../../../IconLibrary";
import {v4 as uuidv4} from 'uuid';

interface Tag {
    id: string;
    name: string;
    color: string;
    author: string;
  }
interface CreateTagProps {
    addTag: (tag: Tag)=>void;
    author: string;
}
const CreateTag: React.FC<CreateTagProps> = ({addTag, author}) => {

    const [name, setName] = useState<string>('');
    const [color, setColor] = useState<string>('#FFFFF');
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const addButtonStyles = {
        width: '40px', 
        height: '40px',
        backgroundColor: 'transparent',
        borderRadius: '5px',
        border: 'none'
    }
    const colorButtonStyles = {
        width: '40px', 
        height: '40px',
        backgroundColor: color,
        borderRadius: '5px',
        border: 'none'
    }
    const createTagStyles = {
        width: '100%', 
        height: '50px', 
        display: 'grid', 
        gridTemplateColumns: '50px 1fr 50px', 
        gap: '5px'
    }






    const handleAddTag = () =>{
        if(name.length > 0 && name.length < 18){
            const tagData = {
                id: uuidv4(),
                name,
                color,
                author
            }
            addTag(tagData);
            setName('');
            setColor('#FFFFFF');
        }else{
            setError(true);
        }
    }
    const handleNameInput = (value) =>{
        setName(value);
        if(name.length > 0 && name.length < 18 && error){
            setError(false);
        }
    }
    return ( 
        <div style={createTagStyles}>
            {showColorPicker ? <ColorPicker closeModal={()=>setShowColorPicker(false)} getColor={setColor} currentColor={color}/> : null}
            <button className={styles['colorpicker-button']} type="button" style={colorButtonStyles} onClick={()=>setShowColorPicker(true)} />
            <input className={`${error ? 'error-input' : ''}`} type="text" name="name" id="name" onChange={(e)=>handleNameInput(e.target.value)} value={name} placeholder="Name"/>
            <button type="button" className={styles['add-tag-button']} onClick={handleAddTag} style={addButtonStyles}><img style={{width: '40px', height: '40px'}} src={IconLibrary.Add} alt="" /></button>
        </div>
     );
}
 
export default CreateTag;