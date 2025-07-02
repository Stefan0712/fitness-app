import { useState } from 'react';
import styles from './UnitSelector.module.css';
import { units as defaultUnits } from '../../../constants/units';
import { makeFirstUpperCase } from '../../../helpers';
import { IconLibrary } from '../../../IconLibrary';
import {useUI} from '../../../context/UIContext';

const UnitSelector = ({unit, setUnit}) => {

    const {showMessage} = useUI();

    const [units, setUnits] = useState(defaultUnits || []);
    const [label, setLabel] = useState('');
    const [shortLabel, setShortLabel] = useState('');
    const [showList, setShowList] = useState(false);

    const groupByCategory = (items) => {
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
            const filtered = defaultUnits.filter(item=>item.label.toLowerCase().includes(searchQuery));
            setUnits(filtered);
        }else{
            setUnit(defaultUnits);
        }
    }

    const handleAddCustomUnit = () =>{
        if(label && label.length > 0 && shortLabel && shortLabel > 0){
            setUnit({label, shortLabel, value: units.some(item=>item.shortLabel !== shortLabel) ? shortLabel+'-'+units.length : shortLabel, category: 'custom'});
            showMessage("Unit selected",' success');
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
            <button type='button' className={styles.unitButton} onClick={()=>setShowList(prev=>!prev)}>{unit.label || 'Unit'}</button>
            {showList ? <div className={styles.results}>
                <div className={styles.unitHeader}>
                    <input type='text' id='unit' name='unit' placeholder='Unit' onChange={(e)=>handleSearchUnit(e.target.value)} value={label} />
                    <input type='text' id='unit' name='shortLabel' placeholder='Short name' onChange={(e)=>setShortLabel(e.target.value)} value={shortLabel} />
                    <button type='button' className={styles.addUnitButton} onClick={handleAddCustomUnit}>
                        <img src={IconLibrary.Add} alt=''></img>
                    </button>
                </div>
                <div className={styles.units}>
                    {Object.entries(groupByCategory(units)).map(([category, items]) => (
                        <div key={category}>
                            <b>{makeFirstUpperCase(category)}</b>
                            <div className={styles["unit-list"]}>
                            {items.map((unit) => (
                                <button type='button' key={unit.value} onClick={()=>(setUnit(unit), setShowList(false))}>
                                    {unit.label} ({unit.shortLabel})
                                </button>
                            ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button type='button' className={styles.cancelButton} onClick={()=>setShowList(false)}>Cancel</button>
            </div> : null}
        </div>
     );
}
 
export default UnitSelector;