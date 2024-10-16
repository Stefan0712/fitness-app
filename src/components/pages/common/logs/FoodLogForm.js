import { useState } from "react";
import closeIcon from '../../../../assets/close.svg';
import '../stylings/foodLogForm.css'
const FoodLogForm = ({data, closeLogWindow}) => {
    return ( 
        <div className="food-log-form">
            <div className="top-bar">
                <h1>{data.name}</h1>
                <button onClick={closeLogWindow}><img src={closeIcon} alt=""></img></button>
            </div>
            <div className="main-info">
                <input type="text" name="name" id="name" required={true} placeholder="Name"></input>
                <input type="number" name="qty" id="qty" placeholder="Qty"></input>
                <input type="text" name="unit" id="unit" placeholder="Unit"></input>
            </div>
            <h3>Macros</h3>
            <div className="macros-container">
                <input type="number" name="protein" id="protein" placeholder="Protein"></input>
                <input type="number" name="carbs" id="carbs" placeholder="Carbs"></input>
                <input type="number" name="fats" id="fats" placeholder="Fats"></input>
                <input type="number" name="fiber" id="fiber" placeholder="Fiber"></input>
            </div>
            <button className="log-food-btn orange-button">Log</button>
        </div>
     );
}
 
export default FoodLogForm;