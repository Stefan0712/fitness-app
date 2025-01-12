import CustomItem from '../../common/CustomItem/CustomItem';
import styles from './Settings.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { IconLibrary } from '../../../IconLibrary';
import { getDateForHeader } from '../../../helpers';
import { useEffect, useState } from 'react';
import CustomItemCreator from '../../common/CustomItemCreator/CustomItemCreator';
import { addTag, removeTag, updateTag } from '../../../store/userSlice';

const Tags = () => {

    const dispatch = useDispatch();

    const tags = useSelector((state)=>state.user.tags);

    const [defaultTags, setDefaultTags] = useState([]);
    const [userTags, setUserTags] = useState([]);

    const [showDefaultTags, setShowDefaultTags] = useState(false);
    const [showUserTags, setShowUserTags] = useState(false);
    useEffect(()=>{
        console.log(tags)
        let defaultTags = [];
        let userTags = [];
        tags.forEach((tag)=>{
            if(tag.source === "system"){
                defaultTags.push(tag)
            }else if(tag.source === 'user'){
                userTags.push(tag)
            }
        })
        setDefaultTags(defaultTags);
        setUserTags(userTags);
    },[tags])

    const createTag = (tag) =>{
        dispatch(addTag(tag));
    }
    const deleteTag = (id)=>{
        dispatch(removeTag(id));

    }
    const editTag = (data) =>{
        dispatch(updateTag(data));
    }
    return ( 
        <div className={`${styles['tags-page']} ${styles['custom-items-page']} page`}>
             <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Manage Tags</h2>
            </div>
            <CustomItemCreator key='custom-items-fields' addItem={createTag} type={'tag'} />

            <div className={`${styles["default-tags"]} ${styles['items-container']} ${showDefaultTags ? styles['show-default'] : ''}` }>
                <div className={styles['container-header']} onClick={()=>setShowDefaultTags(showDefaultTags=>!showDefaultTags)}>
                    <p>Default Tags ({defaultTags.length})</p>
                    <img className='small-icon' src={IconLibrary.Arrow} style={{transform: showDefaultTags ? 'rotateZ(90deg)' : 'rotateZ(180deg)'}}/>
                </div>
                {defaultTags?.map((tag)=>(
                    <CustomItem key={tag.id} data={tag} />
                ))}  
            </div>    
            <div className={`${styles["default-tags"]} ${styles['items-container']} ${showUserTags ? styles['show-default'] : ''}` }>
                <div className={styles['container-header']} onClick={()=>setShowUserTags(showUserTags=>!showUserTags)}>
                    <p>Default Tags ({userTags.length})</p>
                    <img className='small-icon' src={IconLibrary.Arrow} style={{transform: showUserTags ? 'rotateZ(90deg)' : 'rotateZ(180deg)'}}/>
                </div>
                {console.log(userTags)}
                {userTags?.map((tag)=>(
                    <CustomItem key={tag.id} data={tag} deleteItem={deleteTag} updateItem={editTag} />
                ))}  
            </div>    
            
            
                 
                    
        </div>
     );
}
 
export default Tags;