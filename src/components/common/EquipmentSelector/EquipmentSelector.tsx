
import { IconLibrary } from "./../../../IconLibrary";
import { Equipment } from "./../../common/interfaces";
import styles from "./EquipmentSelector.module.css";
import { useState } from "react";
import { defaultEquipment } from "./../../../constants/defaultEquipment";
import { v4 as uuidv4 } from "uuid";

const EquipmentSelector = ({close, equipments, setEquipments}) => {

     const [name, setName] = useState<string>('');
        const [unit, setUnit] = useState<string>('');
        const [value, setValue] = useState<string>('');
        const [error, setError] = useState<boolean>(false);
        const [items, setItems] = useState<Equipment[]>(defaultEquipment || []);
        
        
        
        const checkIfAdded = (item) =>{
            if (equipments.find(existingItem => existingItem.id === item.id)) {
                return true;
            }
            return false;
        }
    
        const handleSeach = (value: string) =>{
            setName(value);
            if (!value.trim()) {
                setItems(defaultEquipment);
                return;
            }
            const filteredItems = defaultEquipment.filter((item: Equipment) => item.name.toLowerCase().includes(value.toLowerCase()));
            setItems(filteredItems);
        }    
        const handleAddEquipment = () =>{
            if(name.length > 0 && name.length < 15){
                const equipmentData: Equipment = {
                    id: uuidv4(),
                    name,
                    attributes: [{name: unit, unit, value: typeof value === 'string' ? parseInt(value) : value}]
                };
                setEquipments(prev=>[...prev, equipmentData]);
                setName('');
                setUnit('');
                setValue('');
            }else{
                setError(true);
            }
        }
    return ( 
        <div className={styles.equipmentSelector}>
            <div className={styles.header}>
                <h3>Equipment</h3>
                <button type="button" className="clear-button" onClick={close}><img src={IconLibrary.Close} className="small-icon" alt="" /></button>
            </div>
            <div className={styles.top}>
                <h3>Selected equipment</h3>
                <div className={styles.selectedEquipment}>
                    {equipments?.length > 0 ? equipments.map((item, index)=><div key={'Selected-equipment-'+index} className={styles.equipment}><b>{item.name}</b><button className="clear-button" onClick={()=>setEquipments(prev=>[...prev.filter(it=>it.id!==item.id)])}><img className="small-icon" src={IconLibrary.Add} alt="" /></button></div>) : <p>No tags selected</p>}
                </div>
            </div>
            <div className={styles.bottom}>
                <h3>All equipment</h3>
                <div className={styles.results}>
                    {items?.length > 0 ? items.map((item,index)=>
                        checkIfAdded(item) ? null : (
                            <div className={styles.resultEquipment} key={'equipment-'+item.name+index}>
                                <p className={styles.name}>{item.name}</p>
                                <button type="button" className="clear-button" onClick={()=>setEquipments(prev =>[...prev, item])}><img src={IconLibrary.Add} className="small-icon" alt="" /></button>
                            </div>
                        )
                    ):<p>Items not found</p>}
                </div>
                <div className={styles.newEquipment}>
                    <div className={styles.newEquipmentInput}>
                        <input type="text" onChange={(e)=>handleSeach(e.target.value)} value={name} placeholder='Equipment name'></input>
                        <input type="text" onChange={(e)=>setUnit(e.target.value)} value={value} placeholder='Unit'></input>
                        <input type="number" onChange={(e)=>setValue(e.target.value)} value={value} placeholder='Value'></input>
                    </div>
                    <button type="button" className='clear-button' onClick={handleAddEquipment}><img style={{width: '40px', height: '40px'}} src={IconLibrary.Add} alt="" /></button>
                </div>
            </div>
        </div>
     );
}
 
export default EquipmentSelector;