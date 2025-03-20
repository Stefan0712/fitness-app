import React from 'react';
import styles from '../styles/DefaultItemPicker.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';

interface TargetGroup {
    id: string;
    name: string;
    author: string;
}
interface TargetGroupPickerProps {
    closeModal: () => void;
    addItem: (item: TargetGroup) => void;
    currentItems: TargetGroup[]
}
const TargetGroupPicker: React.FC<TargetGroupPickerProps> = ({closeModal, addItem, currentItems}) => {

    const tags = useSelector((state: RootState)=>state.user.tags);

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [items, setItems] = useState<TargetGroup[]>(tags || []);



    const checkIfAdded = (item) =>{
        if (currentItems.find(existingItem => existingItem.id === item.id)) {
            return true;
        }
        return false;
    }

    const handleSeach = (value: string) =>{
        setSearchQuery(value.toLowerCase());
        if(value.toLowerCase().length > 0){
            const filteredItems = currentItems.filter((item: TargetGroup) => item.name.toLowerCase().includes(value.toLowerCase()));
            setItems(filteredItems);
        }
       
    }


    return ( 
        <div className={styles['tag-picker']}>
            <div className={styles.top}>
                <h3>My Tags</h3>
                <button type="button" className="clear-button" onClick={closeModal}><img src={IconLibrary.Close} className="small-icon" alt="" /></button>
            </div>
            <div className={styles['search-bar']}>
                <input className={styles['search-input']} type="text" minLength={0} maxLength={20} onChange={(e)=>handleSeach(e.target.value)} value={searchQuery} placeholder='Search...'></input>
                <img className="small-icon" src={IconLibrary.Search} />
            </div>
            <div className={styles.results}>
                {items?.length > 0 ? items.map((item,index)=>
                    checkIfAdded(item) ? null : (
                        <div className={styles.tag} key={'equipment-'+item.name+index}>
                            <p className={styles.name}>{item.name}</p>
                            <button type="button" className="clear-button" onClick={()=>addItem(item)}><img src={IconLibrary.Add} className="small-icon" alt="" /></button>
                        </div>
                    )
                ):<p>Items not found</p>}
            </div>
        </div>
     );
}
 
export default TargetGroupPicker;