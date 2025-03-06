import { useState } from "react";
import { useDispatch } from "react-redux";

import { v4 as uuidv4 } from 'uuid';
import { addLog } from "../../../store/userSlice";
import { IconLibrary } from "../../../IconLibrary";
import History from './History/History.tsx';

import styles from './FoodLog.module.css';



interface FoodLogProps {
    closeMenu: ()=> void;
}
interface InputsData {
    name: string,
    qty: number;
    unit: string;
    protein: number;
    carbs: number;
    fats: number;
    sugar: number;
    calories: number;
    sodium: number;
    isIncluded: boolean,
    time: string;
    type: string;
    note: string;
}
interface LogData{
    id: string;
    type: string;
    name: string;
    icon: string;
    data: InputsData
}
const FoodLog: React.FC<FoodLogProps> = ({closeMenu}) => {

    
    const dispatch = useDispatch();
    
    const [currentScreen, setCurrentScreen] = useState<string>('log')

    const [name, setName] = useState<string>('');
    const [qty, setQty] = useState<number>(0);
    const [unit, setUnit] = useState<string>('');
    const [protein, setProtein] = useState<number>(0);
    const [carbs, setCarbs] = useState<number>(0);
    const [fats, setFats] = useState<number>(0);
    const [sugar, setSugar] = useState<number>(0);
    const [calories, setCalories] = useState<number>(0);
    const [sodium, setSodium] = useState<number>(0);
    const [time, setTime] = useState<string>('');
    const [type, setType] = useState<string>('unset');
    const [note, setNote] = useState<string>('');
    const [includeInGoals, setIncludeInGoals] = useState<boolean>(true);
    

    const handleLog = ()=>{
        const data: LogData = {
            id: uuidv4(),
            type: 'food', 
            name: 'Food Log', 
            icon: '/icons/food.svg',
            data: {
                name,
                qty,
                unit,
                protein,
                carbs,
                fats,
                sugar,
                calories,
                sodium,
                isIncluded: includeInGoals,
                time,
                type,
                note
            }
        }
        dispatch(addLog(data));
        closeMenu();
    }
    return ( 
        <div className={styles["food-log-form"]}>
            <div className={styles["top-bar"]}>
                <h1>Food Log</h1>
                <button onClick={closeMenu}><img src={IconLibrary.Close} alt=""></img></button>
            </div>
            <div className={styles['toggle-buttons-container']}>
                <button className={`${styles['toggle-button']} ${currentScreen === 'log' ? styles['selected-button'] : ''}`} onClick={()=>setCurrentScreen('log')}>Log</button>
                <button className={`${styles['toggle-button']} ${currentScreen === 'history' ? styles['selected-button'] : ''}`} onClick={()=>setCurrentScreen('history')}>History</button>
            </div>
            <div className={styles.content}>
                {currentScreen === 'log' ? (
                    <div className={styles['log-screen']}>
                    <fieldset>
                        <label>Name</label>
                        <input className={styles.name} type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} value={name} required={true} placeholder="Name" />
                    </fieldset>
                    <fieldset className={styles['half-input']}>
                        <label>Qty</label>
                        <input type="number" name="qty" id="qty" onChange={(e) => setQty(e.target.value)} value={qty} placeholder="Qty" />
                    </fieldset>
                    <fieldset className={styles['half-input']}>
                        <label>Unit</label>
                        <input type="text" name="unit" id="unit" onChange={(e) => setUnit(e.target.value)} value={unit} placeholder="Unit" />
                    </fieldset>
                    <fieldset className={styles['half-input']}>
                        <label>Type</label>
                        <select name="type" id="type" onChange={(e) => setType(e.target.value)} value={type}>
                            <option value={'unset'}>Unset</option>
                            <option value={'breakfast'}>Breakfast</option>
                            <option value={'lunch'}>Lunch</option>
                            <option value={'dinner'}>Dinner</option>
                            <option value={'snack'}>Snack</option>
                        </select>
                    </fieldset>
                    <fieldset className={styles['half-input']}>
                        <label>Time</label>
                        <input type="time" name="time" id="time" onChange={(e) => setTime(e.target.value)} value={time} placeholder="Time" />
                    </fieldset>
                    <fieldset className={styles['half-input']}>
                        <label>Calories</label>
                        <input type="number" name="calories" id="calories" onChange={(e) => setCalories(e.target.value)} value={calories} placeholder="Calories" />
                    </fieldset>
                    <fieldset className={styles['half-input']}>
                        <label>Protein</label>
                        <input type="number" name="protein" id="protein" onChange={(e) => setProtein(e.target.value)} value={protein} placeholder="Protein" />
                    </fieldset>
                    <fieldset className={styles['half-input']}>
                        <label>Carbs</label>
                        <input type="number" name="carbs" id="carbs" onChange={(e) => setCarbs(e.target.value)} value={carbs} placeholder="Carbs" />
                    </fieldset>
                    <fieldset className={styles['half-input']}>
                        <label>Fats</label>
                        <input type="number" name="fats" id="fats" onChange={(e) => setFats(e.target.value)} value={fats} placeholder="Fats" />
                    </fieldset>
                    <fieldset className={styles['half-input']}>
                        <label>Sugar</label>
                        <input type="number" name="sugar" id="sugar" onChange={(e) => setSugar(e.target.value)} value={sugar} placeholder="Sugar" />
                    </fieldset>
                    <fieldset className={styles['half-input']}>
                        <label>Sodium</label>
                        <input type="number" name="sodium" id="sodium" onChange={(e) => setSodium(e.target.value)} value={sodium} placeholder="Sodium" />
                    </fieldset>
                    <fieldset>
                        <label>Notes</label>
                        <input type="text" id="note-content" name="note-content" onChange={(e) => setNote(e.target.value)} value={note} placeholder="Notes" />
                    </fieldset>
                    <button className={`${styles["log-food-btn"]} orange-button`} onClick={handleLog}>Log</button>
                </div>
                
                ) : currentScreen === 'history' ? <History /> : null}
            </div>


            
            {/* <fieldset className={styles.includeInput}>
                <label>Include this food in daily goals?</label>
                <input type="checkbox" checked={includeInGoals} onChange={()=>setIncludeInGoals(includeInGoals => !includeInGoals)}></input>
            </fieldset> */}
            
            
        </div>
     );
}
 
export default FoodLog;