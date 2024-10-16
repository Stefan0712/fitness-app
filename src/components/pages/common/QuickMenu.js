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


const QuickMenu = ({closeQuickmenu}) => {

    const [buttons, setButtons] = useState([ 
        { src: foodIcon, name: "Food", functionName: "handleFood" },
        { src: waterIcon, name: "Water", functionName: "handleWater" },
        { src: caloriesIcon, name: "Calories", functionName: "handleCalories" },
        { src: stepsIcon, name: "Steps", functionName: "handleSteps" },
        { src: exerciseIcon, name: "Exercise", functionName: "handleExercise" },
        { src: weightIcon, name: "Weight", functionName: "handleWeight" },
        { src: sleepIcon, name: "Sleep", functionName: "handleSleep" },
        { src: customIcon, name: "Custom", functionName: "handleCustom" }])





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
                <button className='quick-button' onClick={`handle${btn.name}`}>
                    <img src={btn.src} alt=''></img>
                    <p>{btn.name}</p>
                </button>
                ))}
        </div>
     );
}
 
export default QuickMenu;