import './stylings/quickMenu.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeFirstUpperCase } from '../../../helpers';
import { useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import ManageGoalBody from './ManageGoalBody';
import TagBody from './TagBody';


const QuickMenu = ({closeQuickmenu, showLog}) => {
    const dailyGoals = useSelector((state)=> state.user.userData.goals);
    const categories = useSelector((state)=>state.user.categories);
    const tags = useSelector((state)=>state.user.tags);
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
                    <div className='new-items-buttons'>
                        <Link onClick={closeQuickmenu} to={'/create-workout'} className="orange-button large-button">Create Workout</Link>
                        <Link onClick={closeQuickmenu} to={'/create-exercise'} className="orange-button large-button">Create Exercise</Link>
                    </div>
                    <h2>Tools</h2>
                    <button className='quick-button' onClick={()=>showLog('stopwatch')}>
                        <img src={IconLibrary.Stopwatch} alt=''></img>
                        <p>Stopwatch</p>
                    </button>
                    <button className='quick-button' onClick={()=>setQuickMenuScreen('tags')}>
                        <img src={IconLibrary.Stopwatch} alt=''></img>
                        <p>Tags</p>
                    </button>
                    <button className='quick-button' onClick={()=>setQuickMenuScreen('categories')}>
                        <img src={IconLibrary.Stopwatch} alt=''></img>
                        <p>Categories</p>
                    </button>
                    <button className='quick-button' onClick={()=>setQuickMenuScreen('targetGroups')}>
                        <img src={IconLibrary.Stopwatch} alt=''></img>
                        <p>Target Groups</p>
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
            {quickMenuScreen === 'targetGroups' ? (

                <div className='quick-menu-screen custom-elements'>
                    <button className='quick-menu-back-button' onClick={()=>setQuickMenuScreen('menu')}><img src={IconLibrary.Back} className='small-icon white-icon'></img></button>
                    <h1>Manage Target Groups</h1>
                    
                    <div className='items-container'>
                        {targetGroups?.map((group)=>(
                            <TagBody data={group} />
                        ))}  
                    </div>
                    <div className='goal-body create-goal-button'>
                        <p>New Target Group</p>
                    </div> 
                    
                </div>
            ) : ''}
            {quickMenuScreen === 'tags' ? (

                <div className='quick-menu-screen custom-elements'>
                    <button className='quick-menu-back-button' onClick={()=>setQuickMenuScreen('menu')}><img src={IconLibrary.Back} className='small-icon white-icon'></img></button>
                    <h1>Manage Tags</h1>
                    
                    <div className='items-container'>
                        {tags?.map((tag)=>(
                            <TagBody data={tag} />
                        ))}  
                    </div>
                    <div className='goal-body create-goal-button'>
                        <p>New Tag</p>
                    </div> 
                    
                </div>
            ) : ''}
            {quickMenuScreen === 'categories' ? (

                <div className='quick-menu-screen custom-elements'>
                    <button className='quick-menu-back-button' onClick={()=>setQuickMenuScreen('menu')}><img src={IconLibrary.Back} className='small-icon white-icon'></img></button>
                    <h1>Manage Categories</h1>
                    
                    <div className='items-container'>
                        {categories?.map((category)=>(
                            <TagBody data={category} />
                        ))}  
                    </div>
                    <div className='goal-body create-goal-button'>
                        <p>New Category</p>
                    </div> 
                    
                </div>
            ) : ''}
            
            
           
            
        </div>
    );
}
 
export default QuickMenu;