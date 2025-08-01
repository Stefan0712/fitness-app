
import { IconLibrary } from "./../../../IconLibrary";
import { Equipment, Unit } from "./../../common/interfaces";
import styles from "./EquipmentSelector.module.css";
import { useState } from "react";
import { defaultEquipment } from "./../../../constants/defaultEquipment";
import { v4 as uuidv4 } from "uuid";
import UnitSelector from "../UnitSelector/UnitSelector.tsx";

const EquipmentSelector = ({close, equipments, setEquipments}) => {

    const [name, setName] = useState<string>('');
    const [unit, setUnit] = useState<Unit | null>(null);
    const [value, setValue] = useState<string>('');
    const [items, setItems] = useState<Equipment[]>(defaultEquipment || []);
    
    
    
    const checkIfAdded = (item) =>{
        if (equipments.find(existingItem => existingItem._id === item._id)) {
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
        if(name.length > 0 && name.length < 15 && unit){
            const equipmentData: Equipment = {
                _id: uuidv4(),
                name,
                attributes: [{name: 'No unit', unit, value: typeof value === 'string' ? parseInt(value) : value}]
            };
            console.log(equipmentData)
            setEquipments(prev=>[...prev, equipmentData]);
            setName('');
            setUnit(null);
            setValue('');
            handleSeach('');
        }
    }
    return ( 
        <div className={styles.equipmentSelector}>
            <div className={styles.header}>
                <h3>Equipment</h3>
                <button type="button" className="clear-button" onClick={close}><img src={IconLibrary.Close} className="small-icon" alt="" /></button>
            </div>
            <div className={styles.top}>
                <h4>Selected equipment</h4>
                <div className={styles.selectedEquipment}>
                    {equipments?.length > 0 ? equipments.map((item, index)=>
                        <div key={'Selected-equipment-'+index} className={styles.equipment}>
                            <b>{item.name}</b>
                            {item.attributes && item.attributes.length > 0 ? <p className={styles.attributes}>{item?.attributes[0]?.value} {item?.attributes[0]?.unit?.shortLabel}</p> : null}
                            <button className="clear-button" onClick={()=>setEquipments(prev=>[...prev.filter(it=>it._id!==item._id)])}><img className="small-icon" src={IconLibrary.Close} alt="" /></button>
                        </div>) 
                    : <p>No tags selected</p>}
                </div>
            </div>
            <div className={styles.bottom}>
                <h3>All equipment</h3>
                <div className={styles.results}>
                    {items?.length > 0 ? items.map((item,index)=>
                        checkIfAdded(item) ? null : (
                            <div className={styles.resultEquipment} key={'equipment-'+item.name+index}>
                                <p className={styles.name}>{item.name}</p>
                                {item.attributes && item.attributes.length > 0 ? <p className={styles.attributes}>{item?.attributes[0]?.value} {item?.attributes[0]?.unit?.shortLabel}</p> : null}
                                <button type="button" className="clear-button" onClick={()=>setEquipments(prev =>[...prev, item])}><img src={IconLibrary.Add} className="small-icon" alt="" /></button>
                            </div>
                        )
                    ):<p>Items not found</p>}
                </div>
                <div className={styles.newEquipment}>
                    <div className={styles.newEquipmentInput}>
                        <input type="text" onChange={(e)=>handleSeach(e.target.value)} value={name} placeholder='Equipment name'></input>
                        <UnitSelector unit={unit} setUnit={setUnit} />
                        <input type="number" onChange={(e)=>setValue(e.target.value)} value={value} placeholder='Value'></input>
                    </div>
                    <button type="button" className='clear-button' onClick={handleAddEquipment}><img style={{width: '40px', height: '40px'}} src={IconLibrary.Add} alt="" /></button>
                </div>
            </div>
        </div>
     );
}
 
export default EquipmentSelector;