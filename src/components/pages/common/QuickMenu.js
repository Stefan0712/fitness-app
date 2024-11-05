import './stylings/quickMenu.css';
import closeIcon from '../../../assets/close.svg';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeFirstUpperCase } from '../../../helpers';


const QuickMenu = ({closeQuickmenu, showLog}) => {

    const [buttons, setButtons] = useState([ 
        { src: 'food.svg', name: "Food", type: "food" },
        { src: 'exercise.svg', name: "Exercise", type: "exercise" },
    ]);

    const dailyGoals = useSelector((state)=> state.user.userData.goals);

    return ( 
        <div className="quick-menu">
            <button id='quick-menu-close-btn' onClick={closeQuickmenu}>
                <img src={closeIcon} alt=''></img>
            </button>
            <h1>Quick Menu</h1>

            <h2>Tools</h2>
            <button className='quick-button' onClick={()=>showLog('stopwatch')}>
                <img src={'/icons/stopwatch.svg'} alt=''></img>
                <p>Stopwatch</p>
            </button>
            <h2>Quick Logs</h2>
            <button className='quick-button' onClick={()=>showLog("food")} key={"food"}>
                <img src='/icons/food.svg' alt=''></img>
                <p>Food</p>
            </button>
            <button className='quick-button' onClick={()=>showLog('exercise')} key={'exercise'}>
                <img src='/icons/exercise.svg' alt=''></img>
                <p>Exercise</p>
            </button>
            
           
            <h2>Goals</h2>
            {dailyGoals?.map((goal)=>(
                <button className='quick-button' onClick={()=>showLog(goal.name)} key={goal.name}>
                    <img src={goal.icon} alt=''></img>
                    <p>{makeFirstUpperCase(goal.name)}</p>
                </button>
            ))}
        </div>
     );
}
 
export default QuickMenu;