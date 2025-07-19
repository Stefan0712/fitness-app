import { IconLibrary } from '../../../IconLibrary';
import styles from './Field.module.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


interface FieldDataObject {
    
}
interface FieldParams {
    fieldData?: FieldDataObject;
    saveField: (data: FieldDataObject) => void;
    type: string;
}

interface FieldDataObject {
    id?: string;
    name?: string;
    description?: string;
    unit?: string;
    value?: number;
    target?: number;
}

const Field: React.FC<FieldParams> = ({fieldData, saveField, type}) => {

    const [name, setName] = useState<string>(fieldData?.name || '');
    const [unit, setUnit] = useState<string>(fieldData?.unit || '');
    const [target, setTarget] = useState<number>(fieldData?.target || 0)
    const [value, setValue] = useState<number>(0);
    const [viewType, setViewType] = useState<string>(type || "view");



    const handleSave = () =>{
        const data: FieldDataObject = {
            ...fieldData,
            id: uuidv4(),
            description: fieldData?.description || 'No description set',
            name,
            unit,
            value,
            target: target
        }
        if(fieldData){
            setViewType('view')
        }else if(!fieldData){
            setName('');
            setUnit('');
            setTarget(0);
            setValue(0);
        }

        saveField(data);
        
        
    }

    if(viewType === 'edit'){

        return ( 
            <div className={styles.field}>
                <fieldset className={styles.name}>
                    <label>Name</label>
                    <input type='text' name='name' id='name' onChange={(e)=>setName(e.target.value)} value={name}></input>
                </fieldset>
                <fieldset className={styles.unit}>
                    <label>Unit</label>
                    <input type='text' name='name' id='name' onChange={(e)=>setUnit(e.target.value)} value={unit}></input>
                </fieldset>
                <fieldset className={styles.value}>
                    <label>Value</label>
                    <input type='number' name='value' id='value' onChange={(e)=>setValue(e.target.value)} value={value}></input>
                </fieldset>
                <fieldset className={styles.target}>
                    <label>Target</label>
                    <input type='number' name='target' id='target' onChange={(e)=>setTarget(e.target.value)} value={target}></input>
                </fieldset>
                <fieldset className={styles.button}>
                    <label>.</label>
                    <img className='small-icon' src={IconLibrary.Add} onClick={handleSave}></img>
                </fieldset>
                
            </div>
         );
    }else if(viewType==='view'){
        return (
            <div className={`${styles.field} ${styles.view}`}>
                <p className={styles["name"]}><b>{fieldData.name}</b></p>
                <p className={styles["target"]}>{fieldData.target || 0}</p>
                <p className={styles["unit"]}>{fieldData.unit}</p>
                <img className="small-icon" src={IconLibrary.Add} onClick={()=>setViewType('edit')} />
            </div>
        )
        
    }
}
 
export default Field;