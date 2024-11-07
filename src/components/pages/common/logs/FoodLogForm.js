import { useState } from "react";
import closeIcon from '../../../../assets/close.svg';
import '../stylings/logs.css';
import '../stylings/foodLogForm.css';
import { useSelector, useDispatch } from "react-redux";
import { getCurrentDay } from "../../../../helpers";
import { v4 as uuidv4 } from 'uuid';
import { addLog } from "../../../../store/userSlice";



const FoodLogForm = ({closeLogWindow}) => {
    const currentDate = getCurrentDay();
    const dispatch = useDispatch();
    const logs = useSelector((state)=>state.user.activity[currentDate]);
    const foodLogs = logs?.logs.find((item)=>item.type==='food');

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
                time,
                type,
                note
            }
        }
        dispatch(addLog(data));
        closeLogWindow();
    }
    return ( 
        <div className="food-log-form">
            <div className="top-bar">
                <h1>Food Log</h1>
                <button onClick={closeLogWindow}><img src={closeIcon} alt=""></img></button>
            </div>
            <div className="main-info">
                <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} value={name} required={true} placeholder="Name" />
                <input type="number" name="qty" id="qty" onChange={(e) => setQty(e.target.value)} value={qty} placeholder="Qty" />
                <input type="text" name="unit" id="unit" onChange={(e) => setUnit(e.target.value)} value={unit} placeholder="Unit" />
                <select className='food-type-select input' name="type" id="type" onChange={(e) => setType(e.target.value)} value={type} >
                    <option value={'unset'}>Unset</option>
                    <option value={'breakfast'}>Breakfast</option>
                    <option value={'lunch'}>Lunch</option>
                    <option value={'dinner'}>Dinner</option>
                    <option value={'snack'}>Snack</option>
                </select>
                <input type="time" name="time" id="time" onChange={(e) => setTime(e.target.value)} value={time} placeholder="Time" />
            </div>
            <h3>Advanced</h3>
            <div className="macros-container">
                <input type="number" name="calories" id="calories" onChange={(e) => setCalories(e.target.value)} value={calories} placeholder="Calories" />
                <input type="number" name="protein" id="protein" onChange={(e) => setProtein(e.target.value)} value={protein} placeholder="Protein" />
                <input type="number" name="carbs" id="carbs" onChange={(e) => setCarbs(e.target.value)} value={carbs} placeholder="Carbs" />
                <input type="number" name="fats" id="fats" onChange={(e) => setFats(e.target.value)} value={fats} placeholder="Fats" />
                <input type="number" name="sugar" id="sugar" onChange={(e) => setSugar(e.target.value)} value={sugar} placeholder="Sugar" />
                <input type="number" name="sodium" id="sodium" onChange={(e) => setSodium(e.target.value)} value={sodium} placeholder="Sodium" />
            </div>
            <div className="notes">
                <textarea id="note-content" name="note-content"  onChange={(e)=>setNote(e.target.value)}  value={note} placeholder="Notes"></textarea>
            </div>
            <div className="logs-history">
                {foodLogs?.length > 0 ? foodLogs.map((log)=>(<p>{log.name} - {log.value}</p>)) : 'No food logs'}
            </div>
            <button className="log-food-btn orange-button" onClick={handleLog}>Log</button>
        </div>
     );
}
 
export default FoodLogForm;