import { useEffect, useState } from 'react';
import {deleteItem, getAllItems, saveItem} from '../../../db';
import {useUI} from '../../../context/UIContext.jsx';
import styles from './Tags.module.css';
import {IconLibrary} from '../../../IconLibrary.js';
import AppHeader from '../../common/AppHeader/AppHeader.tsx';
import { getUser } from '../../../auth.ts';
import ColorPicker from '../../common/ColorPicker/ColorPicker.tsx';
import {v4 as uuidv4} from 'uuid';



// TODO: Search existing tags when entering a name into new Tag form
const Tags = () => {

    const {showMessage, showConfirmationModal} = useUI();
    const [selectedTag, setSelectedTag] = useState(null);
    const [editTag, setEditTag] = useState(null);

    const [tags, setTags] = useState([]);

    const getTags = async () =>{
        try{
            const result = await getAllItems('tags');
            setTags(result)
        }catch(error){
            console.error(error);
        }
    };
    useEffect(()=>{getTags()},[]);



    const handleDelete = async () =>{
        if(selectedTag){
            await deleteItem('tags', selectedTag._id);
            showMessage('Tag deleted successfully!', 'success');
            setSelectedTag(null);
            setTags(prev=>[...prev.filter(item=>item._id!==selectedTag._id)]);
        }
    }
    return ( 
        <div className={styles.tagsPage}>
             <AppHeader title={'Tags'} />
             <div className={styles.menu}>
                {selectedTag ? 
                    <div className={styles.menuButtons}>
                        <button className={styles.addTagButton} onClick={()=>showConfirmationModal({title: "Are you sure?", message: 'This will delete your tag and cannot be undone. Do you want to continue?', onConfirm: ()=>handleDelete()})}><img src={IconLibrary.Delete} alt='' className='small-icon'/></button>
                        <button className={styles.addTagButton} onClick={()=>setEditTag(selectedTag)}><img src={IconLibrary.Edit} alt='' className='small-icon'/></button>
                    </div> 
                : null}
             </div>
             <div className={styles.tagsContainer}>
                {tags && tags.length > 0 ? tags.map(item=><Tag tag={item} key={item._id+item.name} selectTag={setSelectedTag} selectedTag={selectedTag} />) : <p>No tags</p>}
             </div>
             <TagForm key={editTag ? editTag._id : "Tag-form-key"} tag={editTag} addTag={setTags} clearSelected={()=>setSelectedTag(null)} />
        </div>
     );
}
export default Tags;


const Tag = ({tag, selectedTag, selectTag}) =>{
    return (
        <div className={`${styles.tag} ${selectedTag ? styles.selectedTag : ''}`} onClick={()=>selectTag(prev=> prev && prev._id === tag._id ? null : tag)}>
            <div style={{width: '30px', height: '30px', backgroundColor: tag.color, borderRadius: '5px'}}></div>
            <h3>{tag.name}</h3>
        </div>
    )
}

const TagForm = ({tag, addTag, clearSelected}) => {

    const {showMessage} = useUI();
    const [name, setName] = useState(tag ? tag.name : '');
    const [color, setColor] = useState(tag ? tag.color :  '#FFFFFF');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [editMode, setEditMode] = useState(tag ? true : false);


    
    const handleAddTag = () =>{
        if(name && name.length > 0){
            const newTag = {
                _id: tag ? tag._id :  uuidv4(),
                author: tag ? tag.author :  getUser(),
                name,
                color
            }
            saveItem('tags', newTag);
            addTag(prev=>[...prev.filter(item=>item._id!==newTag._id), newTag]);
            showMessage(editMode ? 'Tag updated successfully' : 'Tag created successfully!', 'success');
            setName('');
            setColor('#FFFFFF');
            clearSelected();
            if(editMode){
                setEditMode(false);
            };
        }
    }
    return(
        <div className={styles.tagForm}>
            <input type='text' id='name' name='name' onChange={(e)=>setName(e.target.value)} value={name} placeholder='Tag name...'/>
            {showColorPicker ? <ColorPicker getColor={setColor} currentColor={color} closeModal={()=>setShowColorPicker(false)}/> : null }
            <div onClick={()=>setShowColorPicker(prev=>!prev)} className={styles.colorButton} style={{backgroundColor: color}}></div>
            <button className={styles.addTagButton} onClick={handleAddTag}><img src={editMode ? IconLibrary.Save : IconLibrary.Add} alt='' /></button>
        </div>
    )
    
}