import CustomItem from '../../common/CustomItem/CustomItem';
import styles from './Settings.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getDateForHeader } from '../../../helpers';
import { useEffect, useState } from 'react';
import CustomItemCreator from '../../common/CustomItemCreator/CustomItemCreator';

const Tags = () => {

    const dispatch = useDispatch();

    const tags = [];

    const [defaultTags, setDefaultTags] = useState([]);
    const [userTags, setUserTags] = useState([]);


    const [screenToShow, setScreenToShow] = useState('custom')




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
        console.log("Created tag")
    }
    const deleteTag = (id)=>{
        console.log("Deleted tag")

    }
    const editTag = (data) =>{
        console.log("Edit tag")
    }
    return ( 
        <div className={`${styles['tags-page']} ${styles['custom-items-page']} page`}>
             <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Manage Tags</h2>
            </div>
            <CustomItemCreator key='custom-items-fields' addItem={createTag} type={'tag'} />
            <div className="screen-toggle-buttons">
                <button onClick={()=>setScreenToShow('custom')} className={screenToShow === 'custom' ? 'selected-button' : ''}>Custom Tags ({userTags.length})</button>
                <button onClick={()=>setScreenToShow('default')} className={screenToShow === 'default' ? 'selected-button' : ''}>Default Tags ({defaultTags.length})</button>
            </div>
            <div className='screens-container'>
                {screenToShow === 'custom' ? (
                    <div className={`screen left`}>
                        {userTags?.map((tag)=>(
                            <CustomItem key={tag.id} data={tag} />
                        ))}  
                    </div>  
                ):null}  
                {screenToShow === "default" ? (
                    <div className={`screen right`}>
                        {defaultTags?.map((tag)=>(
                            <CustomItem key={tag.id} data={tag} deleteItem={deleteTag} updateItem={editTag} />
                        ))}  
                    </div>  
                ) : null}
              
            </div>
            
            
                 
                    
        </div>
     );
}
 
export default Tags;