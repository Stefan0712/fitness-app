import React from 'react';
import styles from './TagSelector.module.css';
import { useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import { Tag as ITag } from './../../common/interfaces.ts';
import Tag from '../Tag/Tag.tsx';
import {v4 as uuidv4} from 'uuid';
import ColorPicker from '../ColorPicker/ColorPicker.tsx';
import { defaultTags } from '../../../constants/defaultTags.js';


interface TagPickerProps {
    close: () => void;
    setTags: React.Dispatch<React.SetStateAction<ITag[]>>;
    tags: ITag[]
}

const TagPicker: React.FC<TagPickerProps> = ({close, setTags, tags}) => {

    const [items, setItems] = useState<ITag[]>(defaultTags || []); // Search results
    // Custom tag values
    const [name, setName] = useState<string>('');
    const [color, setColor] = useState<string>('#FFFFFF');
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);



    const checkIfAdded = (item) =>{
        if (tags.find(existingItem => existingItem._id === item._id)) {
            return true;
        }
        return false;
    }

    const handleSeach = (value: string) =>{
        setName(value);
        if (!value.trim()) {
            setItems(defaultTags); // Reset if search is empty
            return;
        }
        const filteredItems = defaultTags.filter((item: ITag) => item.name.toLowerCase().includes(value.toLowerCase()));
        setItems(filteredItems);
    }

    const handleAddTag = () =>{
        if(name.length > 0 && name.length < 18){
            const newTag: ITag = {
                _id: uuidv4(),
                name,
                color: color,
                category: 'activity',
                author: localStorage.getItem('userId') || 'user',
            }
            setTags((prev: ITag[]) => [...prev, newTag]);
        }
    }
    return ( 
        <div className={styles.tagSelector}>
            <div className={styles.header}>
                <h3>Tags</h3>
                <button type="button" className="clear-button" onClick={close}><img src={IconLibrary.Close} className="small-icon" alt="" /></button>
            </div>
            <div className={styles.top}>
                <div className={styles.selectedTags}>
                    {tags?.length > 0 ? tags.map((item, index)=><Tag key={'tag-'+item.name+index} tag={item} removeTag={()=>setTags(prev=>[...prev.filter(tag=>tag._id!==item._id)])}/>) : <p>No tags selected</p>}
                </div>
            </div>
            <div className={styles.bottom}>
                <h3>All tags</h3>
                <div className={styles.results}>
                    {items?.length > 0 ? items.map((item,index)=>
                        checkIfAdded(item) ? null : (
                            <div className={styles.resultTag} key={'tag-'+item.name+index}>
                                <div className={styles.color} style={{backgroundColor: item.color}}></div>
                                <p className={styles.name}>{item.name}</p>
                                <button type="button" className="clear-button" onClick={()=>setTags(prev =>[...prev, item])}><img src={IconLibrary.Add} className="small-icon" alt="" /></button>
                            </div>
                        )
                    ):<p>Items not found</p>}
                </div>
                <div className={styles.newTag}>
                    {showColorPicker ? <ColorPicker closeModal={()=>setShowColorPicker(false)} getColor={setColor} currentColor={color}/> : null}
                    <button className={styles['colorpicker-button']} type="button" onClick={()=>setShowColorPicker(true)} />
                    <input type="text" minLength={0} maxLength={18} onChange={(e)=>handleSeach(e.target.value)} value={name} placeholder='Tag name'></input>
                    <button type="button" className='clear-button' onClick={handleAddTag}><img style={{width: '40px', height: '40px'}} src={IconLibrary.Add} alt="" /></button>
                </div>
            </div>
        </div>
     );
}
 
export default TagPicker;