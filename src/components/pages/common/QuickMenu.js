import './stylings/quickMenu.css';
import stopwatchIcon from '../../../assets/stopwatch.svg';
import foodIcon from '../../../assets/food.svg';
import waterIcon from '../../../assets/water.svg';
import stepsIcon from '../../../assets/steps.svg';
import exerciseIcon from '../../../assets/exercise.svg';
import weightIcon from '../../../assets/weight.svg';
import caloriesIcon from '../../../assets/calories.svg';
import sleepIcon from '../../../assets/sleep.svg';
import customIcon from '../../../assets/plus.svg';
import closeIcon from '../../../assets/close.svg';

import { useState } from 'react';


const QuickMenu = ({closeQuickmenu, showLog}) => {

    const [buttons, setButtons] = useState([ 
        { src: foodIcon, name: "Food", type: "food" },
        { src: waterIcon, name: "Water", type: "water" },
        { src: caloriesIcon, name: "Calories", type: "calories" },
        { src: stepsIcon, name: "Steps", type: "steps" },
        { src: exerciseIcon, name: "Exercise", type: "exercise" },
        { src: weightIcon, name: "Weight", type: "weight" },
        { src: sleepIcon, name: "Sleep", type: "sleep" },
        { src: customIcon, name: "Custom", type: "custom" }])




    return ( 
        <div className="quick-menu">
            
            <button id='quick-menu-close-btn' onClick={closeQuickmenu}>
                <img src={closeIcon} alt=''></img>
            </button>
            <h1>Quick Menu</h1>

            <h2>Tools</h2>
            <button className='quick-button'>
                <img src={stopwatchIcon} alt=''></img>
                <p>Stopwatch</p>
            </button>
            <h2>Quick Logs</h2>
            {buttons.map((btn)=>(
                <button className='quick-button' onClick={()=>showLog(btn)}>
                    <img src={btn.src} alt=''></img>
                    <p>{btn.name}</p>
                </button>
                ))}
        </div>
     );
}
 
export default QuickMenu;