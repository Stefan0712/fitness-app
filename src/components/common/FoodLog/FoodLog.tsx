import { useState } from "react";
import { useDispatch } from "react-redux";
import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { IconLibrary } from "../../../IconLibrary";

import {saveItem} from '../../../db.js';

import History from './History/History.tsx';

import styles from './FoodLog.module.css';
import { FoodLog as IFoodLog } from "../interfaces.ts";



interface FoodLogProps {
    closeMenu: ()=> void;
}




const FoodLog: React.FC<FoodLogProps> = ({closeMenu}) => {

    
    const dispatch = useDispatch();
    
    const [currentScreen, setCurrentScreen] = useState<string>('log')

    const [name, setName] = useState<string>('');
    const [qty, setQty] = useState<number | string>('');
    const [unit, setUnit] = useState<string>('');
    const [protein, setProtein] = useState<number | string>('');
    const [carbs, setCarbs] = useState<number | string>('');
    const [fats, setFats] = useState<number | string>('');
    const [sugar, setSugar] = useState<number | string>('');
    const [calories, setCalories] = useState<number | string>('');
    const [sodium, setSodium] = useState<number | string>('');
    const now = new Date();
    const [time, setTime] = useState<string>(now.toTimeString().slice(0, 5));
    const [type, setType] = useState<string>('other');
    const [notes, setNotes] = useState<string>('');
    


    const convertToInt = (value: string | number): number =>{
        if(typeof value === 'string'){
            return parseInt(value);
        }else if(typeof value === 'number'){
            return value;
        }else{
            console.log("Invalid Value: ",value);
            return 0;
        }
    }
    const handleLog = ()=>{
        const currentDate = new Date();
        const data: IFoodLog = {
            _id: uuidv4(),
            type: 'food', 
            title: 'Food Log', 
            icon: '/icons/food.svg',
            timestamp: currentDate,
            data: {
                name,
                unit,
                qty: convertToInt(qty),
                protein: convertToInt(protein),
                carbs: convertToInt(carbs),
                fats: convertToInt(fats),
                sugar: convertToInt(sugar),
                calories: convertToInt(calories),
                sodium: convertToInt(sodium),
                time,
                type,
                notes
            }
        }
        saveItem('logs', data)
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
                        <input className={styles.name} type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} value={name} required={true} placeholder="Name" />
                    </fieldset>
                        <input className={styles['half-input']} type="number" name="qty" id="qty" onChange={(e) => setQty(e.target.value)} value={qty} placeholder="Qty" />
                        <input className={styles['half-input']} type="text" name="unit" id="unit" onChange={(e) => setUnit(e.target.value)} value={unit} placeholder="Unit" />
                        <select className={styles['half-input']} name="type" id="type" onChange={(e) => setType(e.target.value)} value={type}>
                            <option value={'other'}>Other</option>
                            <option value={'breakfast'}>Breakfast</option>
                            <option value={'lunch'}>Lunch</option>
                            <option value={'dinner'}>Dinner</option>
                            <option value={'snack'}>Snack</option>
                        </select>
                        <input className={styles['half-input']} type="time" name="time" id="time" onChange={(e) => setTime(e.target.value)} value={time} placeholder="Time" />
                        <input className={styles['half-input']} type="number" name="calories" id="calories" onChange={(e) => setCalories(e.target.value)} value={calories} placeholder="Calories" />
                        <input className={styles['half-input']} type="number" name="protein" id="protein" onChange={(e) => setProtein(e.target.value)} value={protein} placeholder="Protein" />
                        <input className={styles['half-input']} type="number" name="carbs" id="carbs" onChange={(e) => setCarbs(e.target.value)} value={carbs} placeholder="Carbs" />
                        <input className={styles['half-input']} type="number" name="fats" id="fats" onChange={(e) => setFats(e.target.value)} value={fats} placeholder="Fats" />
                        <input className={styles['half-input']} type="number" name="sugar" id="sugar" onChange={(e) => setSugar(e.target.value)} value={sugar} placeholder="Sugar" />
                        <input className={styles['half-input']} type="number" name="sodium" id="sodium" onChange={(e) => setSodium(e.target.value)} value={sodium} placeholder="Sodium" />
                    <fieldset>
                        <label>Notes</label>
                        <input type="text" id="note-content" name="note-content" onChange={(e) => setNotes(e.target.value)} value={notes} placeholder="Notes" />
                    </fieldset>
                    <button className={`${styles["log-food-btn"]} orange-button`} onClick={handleLog}>Log</button>
                </div>
                
                ) : currentScreen === 'history' ? <History /> : null}
            </div>


    
            
            
        </div>
     );
}
 
export default FoodLog;