import CustomItem from '../../common/CustomItem/CustomItem';
import styles from './Settings.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { IconLibrary } from '../../../IconLibrary';
import { getDateForHeader } from '../../../helpers';
import { useEffect, useState } from 'react';
import CustomItemCreator from '../../common/CustomItemCreator/CustomItemCreator';
import { addEquipment, removeEquipment, updateEquipment } from '../../../store/userSlice';

const Equipment = () => {

    const dispatch = useDispatch();

    const allItems = useSelector((state)=>state.user.equipment);

    const [defaultItems, setDefaultItems] = useState([]);
    const [userItems, setUserItems] = useState([]);

    const [screenToShow, setScreenToShow] = useState('custom')

    useEffect(()=>{
        let defaultItems = [];
        let userItems = [];
        allItems?.forEach((i)=>{
            if(i.source === "system"){
                defaultItems.push(i)
            }else if(i.source === 'user'){
                userItems.push(i)
            }
        })
        setDefaultItems(defaultItems);
        setUserItems(userItems);
    },[allItems])

    const createItem = (item) =>{
        dispatch(addEquipment(item));
    }
    const deleteItem = (id)=>{
        dispatch(removeEquipment(id));

    }
    const updateItem = (data) =>{
        dispatch(updateEquipment(data))
    }
    return ( 
        <div className={`${styles['tags-page']} ${styles['custom-items-page']} page`}>
             <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Manage Equipment</h2>
            </div>
            <CustomItemCreator key='custom-items-fields' addItem={createItem} type={'equipment'} />

            <div className="screen-toggle-buttons">
                <button onClick={()=>setScreenToShow('custom')} className={screenToShow === 'custom' ? 'selected-button' : ''}>Custom Tags ({userItems.length})</button>
                <button onClick={()=>setScreenToShow('default')} className={screenToShow === 'default' ? 'selected-button' : ''}>Default Tags ({defaultItems.length})</button>
            </div>
            <div className='screens-container'>
                {screenToShow === 'custom' ? (
                    <div className={`screen left`}>
                        {userItems?.map((tag)=>(
                            <CustomItem key={tag.id} data={tag} />
                        ))}  
                    </div>  
                ):null}  
                {screenToShow === "default" ? (
                    <div className={`screen right`}>
                        {defaultItems?.map((tag)=>(
                            <CustomItem key={tag.id} data={tag} deleteItem={deleteItem} updateItem={updateItem} />
                        ))}  
                    </div>  
                ) : null}
              
            </div> 
            
            
                 
                    
        </div>
     );
}
 
export default Equipment;