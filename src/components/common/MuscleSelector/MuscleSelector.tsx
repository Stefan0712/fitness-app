import React from 'react';
import styles from './MuscleSelector.module.css';
import { useState } from 'react';
import { IconLibrary } from '../../../IconLibrary.js';
import { TargetGroup } from '../interfaces.ts';
import {v4 as uuidv4} from 'uuid';
import { muscles } from '../../../constants/defaultMuscles.js';


interface TagPickerProps {
    close: () => void;
    settargetMuscles: (muscle: TargetGroup) => void;
    targetMuscles: TargetGroup[]
}

const TagPicker: React.FC<TagPickerProps> = ({close, settargetMuscles, targetMuscles}) => {

    const [items, setItems] = useState<TargetGroup[]>(muscles || []); // Search results
    const [name, setName] = useState<string>('');
    const [error, setError] = useState<boolean>(false);



    const checkIfAdded = (item) =>{
        if (targetMuscles?.find(existingItem => existingItem._id === item._id)) {
            return true;
        }
        return false;
    }

    const handleSeach = (value: string) =>{
        setName(value);
        if (!value.trim()) {
            setItems(muscles); // Reset if search is empty
            return;
        }
        const filteredItems = muscles.filter((item: TargetGroup) => item.name.toLowerCase().includes(value.toLowerCase()));
        setItems(filteredItems);
    }

    const handleAddMuscle = () =>{
        if(name.length > 0 && name.length < 18){
            const newGroup: TargetGroup = {
                _id: uuidv4(),
                name,
                author: localStorage.getItem('userId') || 'user',
            }
            settargetMuscles((prev: TargetGroup[]) => [...prev, newGroup]);
        }
    }
    return ( 
        <div className={styles.muscleSelector}>
            <div className={styles.header}>
                <h3>Muscle Groups</h3>
                <button type="button" className="clear-button" onClick={close}><img src={IconLibrary.Close} className="small-icon" alt="" /></button>
            </div>
            <div className={styles.top}>
                <h3>Added muscles</h3>
                <div className={styles.selectedMuscles}>
                    {targetMuscles?.length > 0 ? targetMuscles.map((item, index)=><div key={'Selected-muscle-'+index} className={styles.muscle}><b>{item.name}</b><button className="clear-button" onClick={()=>settargetMuscles(prev=>[...prev.filter(it=>it._id!==item._id)])}><img className="small-icon" src={IconLibrary.Add} alt="" /></button></div>) : <p>No muscle added</p>}
                </div>
            </div>
            <div className={styles.bottom}>
                <h3>All muscle groups</h3>
                <div className={styles.results}>
                    {items?.length > 0 ? items.map((item,index)=>
                        checkIfAdded(item) ? null : (
                            <div className={styles.resultMuscle} key={'muscle-'+item.name+index}>
                                <p className={styles.name}>{item.name}</p>
                                <button type="button" className="clear-button" onClick={()=>settargetMuscles(prev =>[...prev, item])}><img src={IconLibrary.Add} className="small-icon" alt="" /></button>
                            </div>
                        )
                    ):<p>Items not found</p>}
                </div>
                <div className={styles.newMuscle}>
                    <input type="text" minLength={0} maxLength={50} onChange={(e)=>handleSeach(e.target.value)} value={name} placeholder='Muscle name'></input>
                    <button type="button" className='clear-button' onClick={handleAddMuscle}><img style={{width: '40px', height: '40px'}} src={IconLibrary.Add} alt="" /></button>
                </div>
            </div>
        </div>
     );
}
 
export default TagPicker;