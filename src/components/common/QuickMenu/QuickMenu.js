import './quickMenu.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeFirstUpperCase } from '../../../helpers';
import { useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import ManageGoalBody from '../ManageGoalBody/ManageGoalBody';
import CustomItem from '../CustomItem/CustomItem';


const QuickMenu = ({closeQuickmenu, showLog}) => {
    const dailyGoals = useSelector((state)=> state.user.userData.goals);
    const categories = useSelector((state)=>state.user.categories);
    
    const targetGroups = useSelector((state)=>state.user.targetGroups);


    const [quickMenuScreen, setQuickMenuScreen] = useState('menu');
    //TODO: Add an icon picker and update icon sources for all custom goals


    return ( 
        <div className="quick-menu">
            <button id='quick-menu-close-btn' onClick={closeQuickmenu}>
                <img src={IconLibrary.Close} alt=''></img>
            </button>
            {quickMenuScreen === 'menu' ? (

                <div className='quick-menu-screen'>
                    <h1>Quick Menu</h1>
                  
                    <h2>Tools</h2>
                    <button className='quick-button' onClick={()=>showLog('stopwatch')}>
                        <img src={IconLibrary.Stopwatch} alt=''></img>
                        <p>Stopwatch</p>
                    </button>

                    <h2>Quick Logs</h2>
                    <button className='quick-button' onClick={()=>showLog("food")} key={"food"}>
                        <img src={IconLibrary.Food} alt=''></img>
                        <p>Food</p>
                    </button>
                    <button className='quick-button' onClick={()=>showLog('exercise')} key={'exercise'}>
                        <img src={IconLibrary.Exercise} alt=''></img>
                        <p>Exercise</p>
                    </button>


                    <h2>Goals</h2>
                    <button className='quick-button' onClick={()=>setQuickMenuScreen('log-goals')} key={'exercise'}>
                        <img src={IconLibrary.Exercise} alt=''></img>
                        <p>Log Goals</p>
                    </button>
                    <button className='quick-button' onClick={()=>setQuickMenuScreen('manage-goals')} key={'exercise'}>
                        <img src={IconLibrary.Exercise} alt=''></img>
                        <p>Manage Goals</p>
                    </button>
                </div>
            ) : ''}
            {quickMenuScreen === 'log-goals' ? (

                <div className='quick-menu-screen'>
                    <button className='quick-menu-back-button' onClick={()=>setQuickMenuScreen('menu')}><img src={IconLibrary.Back} className='small-icon white-icon'></img></button>
                    <h1>Log Goals</h1>
                    <button className='quick-button' onClick={()=>showLog("food")} key={"food"}>
                        <img src={IconLibrary.Food} alt=''></img>
                        <p>Food</p>
                    </button>
                    <button className='quick-button' onClick={()=>showLog('exercise')} key={'exercise'}>
                        <img src={IconLibrary.Exercise} alt=''></img>
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
                    <button className='quick-menu-back-button' onClick={()=>setQuickMenuScreen('menu')}><img src={IconLibrary.Back} className='small-icon white-icon'></img></button>
                    <h1>Manage Goals</h1>
                    
                    {dailyGoals?.map((goal)=>(
                        <ManageGoalBody goal={goal} showLog={showLog}/>
                    ))}  
                    <div className='goal-body create-goal-button'>
                        <p>New Goal</p>
                    </div> 
                    
                </div>
            ) : ''}
           
        
            
           
            
        </div>
    );
}
 
export default QuickMenu;