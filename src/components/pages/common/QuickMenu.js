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


const QuickMenu = ({closeQuickmenu}) => {
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
            <button className='quick-button'>
                <img src={foodIcon} alt=''></img>
                <p>Food</p>
            </button>
            <button className='quick-button'>
                <img src={waterIcon} alt=''></img>
                <p>Water</p>
            </button>
            <button className='quick-button'>
                <img src={caloriesIcon} alt=''></img>
                <p>Calories</p>
            </button>
            <button className='quick-button'>
                <img src={stepsIcon} alt=''></img>
                <p>Steps</p>
            </button>
            <button className='quick-button'>
                <img src={exerciseIcon} alt=''></img>
                <p>Exercise</p>
            </button>
            <button className='quick-button'>
                <img src={weightIcon} alt=''></img>
                <p>Weight</p>
            </button>
            <button className='quick-button'>
                <img src={sleepIcon} alt=''></img>
                <p>Sleep</p>
            </button>
            <button className='quick-button'>
                <img src={customIcon} alt=''></img>
                <p>Custom</p>
            </button>
        </div>
     );
}
 
export default QuickMenu;