import './stylings/quickMenu.css';
import closeIcon from '../../../assets/close.svg';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeFirstUpperCase } from '../../../helpers';


const QuickMenu = ({closeQuickmenu, showLog}) => {

    const [buttons, setButtons] = useState([ 
        { src: 'food.svg', name: "Food", type: "food" },
        { src: 'exercise.svg', name: "Exercise", type: "exercise" },
        { src: 'weight.svg', name: "Weight", type: "weight" },
        { src: 'sleep.svg', name: "Sleep", type: "sleep" },
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
            {buttons.map((btn)=>(
                <button className='quick-button' onClick={()=>showLog(btn.type)} key={btn.type}>
                    <img src={`/icons/${btn.src}`} alt=''></img>
                    <p>{btn.name}</p>
                </button>
            ))}
            <h2>Daily Goals</h2>
            {dailyGoals?.map((goal)=>(
                <button className='quick-button' onClick={()=>showLog(goal.name)} key={goal.name}>
                    <img src={`/icons/${goal.icon}`} alt=''></img>
                    <p>{makeFirstUpperCase(goal.name)}</p>
                </button>
            ))}
        </div>
     );
}
 
export default QuickMenu;