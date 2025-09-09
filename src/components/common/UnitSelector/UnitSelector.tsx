import { useState } from 'react';
import styles from './UnitSelector.module.css';
import { units as defaultUnits } from '../../../constants/units';
import { makeFirstUpperCase } from '../../../helpers';
import { IconLibrary } from '../../../IconLibrary';
import {useUI} from '../../../context/UIContext';
import { Unit } from '../interfaces';


type GroupedUnits = {
  [category: string]: Unit[];
};


const UnitSelector = ({unit, setUnit}) => {

    const {showMessage} = useUI();

    const [units, setUnits] = useState(defaultUnits || []);
    const [label, setLabel] = useState('');
    const [shortLabel, setShortLabel] = useState('');
    const [showList, setShowList] = useState(false);

    const groupByCategory = (items: Unit[]): GroupedUnits => {
        return items.reduce((acc, item) => {
            if (!acc[item.category]) acc[item.category] = [];
            acc[item.category].push(item);
            return acc;
        }, {});
    };

    const handleSearchUnit = (query) =>{
        setLabel(query);
        const searchQuery = query.trim().toLowerCase();
        if(searchQuery && searchQuery.length > 0){
            const filtered = defaultUnits.filter(item=>item.label.toLowerCase().includes(searchQuery) || item.shortLabel.toLowerCase().includes(searchQuery));
            setUnits(filtered);
        }else{
            setUnit(defaultUnits);
        }
    }

    const handleAddCustomUnit = () =>{
        if(label && label.length > 0 && shortLabel && shortLabel.length > 0){
            const customUnit = {label, shortLabel, value: units.some(item=>item.shortLabel !== shortLabel) ? shortLabel+'-'+units.length : shortLabel, category: 'custom'}
            setUnit(customUnit);
            showMessage("Unit selected",' success');
            console.log('customUnit: ',customUnit)
        }else{
            if(!label || label.length < 0){
                showMessage('Invalid label. Try another one','error');
            }
            if(!shortLabel || shortLabel.length < 0){
                showMessage('Invalid short label. Try another one','error');
            }
        }
    }
    return ( 
        <div className={styles.unitSelector}>
            <button type='button' className={styles.unitButton} onClick={()=>setShowList(prev=>!prev)}>{unit?.label || 'Unit'}</button>
            {showList ? <div className={styles.results}>
                <h3>Select Unit</h3>
                <div className={styles.units}>
                    {Object.entries(groupByCategory(units)).map(([category, items]) => (
                        <div className={styles.category} key={category}>
                            <h4>{makeFirstUpperCase(category)}</h4>
                            <div className={styles["unit-list"]}>
                            {items.map((unit) => (
                                <button type='button' key={unit.value} onClick={()=>{
                                        setUnit(unit)
                                        setShowList(false)
                                    }}>
                                    <b>{unit.label}</b><p>{unit.shortLabel}</p>
                                </button>
                            ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.unitHeader}>
                    <input type='text' id='unit' name='unit' placeholder='Unit' onChange={(e)=>handleSearchUnit(e.target.value)} value={label} />
                    <input type='text' id='unit' name='shortLabel' placeholder='Short name' onChange={(e)=>setShortLabel(e.target.value)} value={shortLabel} />
                    <button type='button' className={styles.addUnitButton} onClick={handleAddCustomUnit}>
                        <img src={IconLibrary.Add} alt=''></img>
                    </button>
                </div>
                <button type='button' className={styles.cancelButton} onClick={()=>setShowList(false)}>Cancel</button>
            </div> : null}
        </div>
     );
}
 
export default UnitSelector;