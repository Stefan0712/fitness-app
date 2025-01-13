import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentDay } from "../../../helpers";
import { v4 as uuidv4 } from 'uuid';
import { addLog } from "../../../store/userSlice";
import { IconLibrary } from "../../../IconLibrary";

import styles from './FoodLog.module.css';
import LogItem from "./LogItem";


const FoodLog = ({closeLogWindow}) => {
    const currentDate = getCurrentDay();
    const dispatch = useDispatch();
    const activity = useSelector((state)=>state.user.activity[currentDate]);
    console.log(activity)
    const foodLogs = activity?.logs.filter((item)=>item.type==='food');

    const [showAdvanced, setShowAdvanced] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    const [name, setName] = useState('');
    const [qty, setQty] = useState('');
    const [unit, setUnit] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fats, setFats] = useState('');
    const [sugar, setSugar] = useState('');
    const [calories, setCalories] = useState('');
    const [sodium, setSodium] = useState('');
    const [time, setTime] = useState('');
    const [type, setType] = useState('unset');
    const [note, setNote] = useState('');
    const [includeInGoals, setIncludeInGoals] = useState(true);


    const handleLog = ()=>{
        const data = {
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
        closeLogWindow();
    }
    return ( 
        <div className={styles["food-log-form"]}>
            <div className={styles["top-bar"]}>
                <h1>Food Log</h1>
                <button onClick={closeLogWindow}><img src={IconLibrary.Close} alt=""></img></button>
            </div>
            <div className={styles["main-info"]}>
                <input className={styles.name} type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} value={name} required={true} placeholder="Name" />
                <input type="number" name="qty" id="qty" onChange={(e) => setQty(e.target.value)} value={qty} placeholder="Qty" />
                <input type="text" name="unit" id="unit" onChange={(e) => setUnit(e.target.value)} value={unit} placeholder="Unit" />
                <select className={`${styles['food-type-select']} ${styles['input']}`} name="type" id="type" onChange={(e) => setType(e.target.value)} value={type} >
                    <option value={'unset'}>Unset</option>
                    <option value={'breakfast'}>Breakfast</option>
                    <option value={'lunch'}>Lunch</option>
                    <option value={'dinner'}>Dinner</option>
                    <option value={'snack'}>Snack</option>
                </select>
                <input type="time" name="time" id="time" onChange={(e) => setTime(e.target.value)} value={time} placeholder="Time" />
            </div>
            
            <div className={styles["collapsed-header"]} onClick={()=>setShowAdvanced(showAdvanced=>!showAdvanced)}><h3>Advanced Macros</h3><img src={IconLibrary.Arrow} className={`small-icon ${showAdvanced ? styles.down : styles.left}`} /></div>
            <div className={`${styles["macros-container"]} ${showAdvanced ? styles["expand-macros"] : ''}`}>
                <input type="number" name="calories" id="calories" onChange={(e) => setCalories(e.target.value)} value={calories} placeholder="Calories" />
                <input type="number" name="protein" id="protein" onChange={(e) => setProtein(e.target.value)} value={protein} placeholder="Protein" />
                <input type="number" name="carbs" id="carbs" onChange={(e) => setCarbs(e.target.value)} value={carbs} placeholder="Carbs" />
                <input type="number" name="fats" id="fats" onChange={(e) => setFats(e.target.value)} value={fats} placeholder="Fats" />
                <input type="number" name="sugar" id="sugar" onChange={(e) => setSugar(e.target.value)} value={sugar} placeholder="Sugar" />
                <input type="number" name="sodium" id="sodium" onChange={(e) => setSodium(e.target.value)} value={sodium} placeholder="Sodium" />
            </div>
            <div className={styles["notes"]}>
                <input type="text" id="note-content" name="note-content"  onChange={(e)=>setNote(e.target.value)}  value={note} placeholder="Notes" />
            </div>
            <fieldset className={styles.includeInput}>
                <label>Include this food in daily goals?</label>
                <input type="checkbox" checked={includeInGoals} onChange={()=>setIncludeInGoals(includeInGoals => !includeInGoals)}></input>
            </fieldset>
            <div className={styles["collapsed-header"]} onClick={()=>setShowHistory(showHistory=>!showHistory)}><h3>History</h3><img src={IconLibrary.Arrow} className={`small-icon ${showHistory ? styles.down : styles.left}`} /></div>
            <div className={`${styles["logs-history"]}  ${showHistory ? styles["expand-history"] : ''}`}>
                {foodLogs?.length > 0 ? foodLogs.map((log, index)=>(
                    <LogItem data={log.data} key={'history-item-'+index} />
                )) : 'No food logs'}
            </div>
            <button className={`${styles["log-food-btn"]} orange-button`} onClick={handleLog}>Log</button>
        </div>
     );
}
 
export default FoodLog;