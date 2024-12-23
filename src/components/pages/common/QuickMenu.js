import './stylings/quickMenu.css';
import closeIcon from '../../../assets/close.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeFirstUpperCase } from '../../../helpers';
import { useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import ManageGoalBody from './ManageGoalBody';


const QuickMenu = ({closeQuickmenu, showLog}) => {
    const dailyGoals = useSelector((state)=> state.user.userData.goals);

    const [quickMenuScreen, setQuickMenuScreen] = useState('menu');

    return ( 
        <div className="quick-menu">
            <button id='quick-menu-close-btn' onClick={closeQuickmenu}>
                <img src={closeIcon} alt=''></img>
            </button>
            {quickMenuScreen === 'menu' ? (

                <div className='quick-menu-screen'>
                    <h1>Quick Menu</h1>
                    <div className='new-items-buttons'>
                        <Link to={'/create-workout'} className="orange-button large-button">Create Workout</Link>
                        <Link to={'/create-exercise'} className="orange-button large-button">Create Exercise</Link>
                    </div>
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
                    <button className='quick-button' onClick={()=>setQuickMenuScreen('log-goals')} key={'exercise'}>
                        <img src='/icons/exercise.svg' alt=''></img>
                        <p>Log Goals</p>
                    </button>
                    <button className='quick-button' onClick={()=>setQuickMenuScreen('manage-goals')} key={'exercise'}>
                        <img src='/icons/exercise.svg' alt=''></img>
                        <p>Manage Goals</p>
                    </button>
                </div>
            ) : ''}
            {quickMenuScreen === 'log-goals' ? (

                <div className='quick-menu-screen'>
                    <button className='quick-menu-back-button' onClick={()=>setQuickMenuScreen('menu')}><img src={IconLibrary.BackIcon} className='small-icon white-icon'></img></button>
                    <h1>Log Goals</h1>
                    <button className='quick-button' onClick={()=>showLog("food")} key={"food"}>
                        <img src='/icons/food.svg' alt=''></img>
                        <p>Food</p>
                    </button>
                    <button className='quick-button' onClick={()=>showLog('exercise')} key={'exercise'}>
                        <img src='/icons/exercise.svg' alt=''></img>
                        <p>Exercise</p>
                    </button>
                    {dailyGoals?.map((goal)=>(
                        <button className='quick-button' onClick={()=>showLog(goal.name)} key={goal.name}>
                            <img src={goal.icon} alt=''></img>
                            <p>{makeFirstUpperCase(goal.name)}</p>
                        </button>
                    ))}
                </div>
            ) : ''}
            {quickMenuScreen === 'manage-goals' ? (

                <div className='quick-menu-screen'>
                    <button className='quick-menu-back-button' onClick={()=>setQuickMenuScreen('menu')}><img src={IconLibrary.BackIcon} className='small-icon white-icon'></img></button>
                    <h1>Manage Goals</h1>
                    <Link to={'/create-workout'} className="orange-button large-button">Create Goal</Link>
                    {dailyGoals?.map((goal)=>(
                        <ManageGoalBody goal={goal} showLog={showLog}/>
                    ))}   
                    
                </div>
            ) : ''}
            
            
           
            
        </div>
    );
}
 
export default QuickMenu;