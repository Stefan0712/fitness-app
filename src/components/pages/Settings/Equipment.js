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

    const [showDefaultItems, setShowDefaultItems] = useState(false);
    const [showUserItems, setShowUserItems] = useState(false);

    useEffect(()=>{
        console.log(allItems)
        let defaultItems = [];
        let userItems = [];
        allItems.forEach((i)=>{
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
        console.log(id)
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

            <div className={`${styles["default-tags"]} ${styles['items-container']} ${showDefaultItems ? styles['show-default'] : ''}` }>
                <div className={styles['container-header']} onClick={()=>setShowDefaultItems(showDefaultItems=>!showDefaultItems)}>
                    <p>Default Equipment ({defaultItems.length})</p>
                    <img className='small-icon' src={IconLibrary.Arrow} style={{transform: showDefaultItems ? 'rotateZ(90deg)' : 'rotateZ(180deg)'}}/>
                </div>
                {defaultItems?.map((item)=>(
                    <CustomItem key={item.id} data={item} />
                ))}  
            </div>    
            <div className={`${styles["default-tags"]} ${styles['items-container']} ${showUserItems ? styles['show-default'] : ''}` }>
                <div className={styles['container-header']} onClick={()=>setShowUserItems(showUserItems=>!showUserItems)}>
                    <p>Default Equipment ({userItems.length})</p>
                    <img className='small-icon' src={IconLibrary.Arrow} style={{transform: showUserItems ? 'rotateZ(90deg)' : 'rotateZ(180deg)'}}/>
                </div>
                {userItems?.map((item)=>(
                    <CustomItem key={item.id} data={item} deleteItem={deleteItem} updateItem={updateItem} />
                ))}  
            </div>    
            
            
                 
                    
        </div>
     );
}
 
export default Equipment;