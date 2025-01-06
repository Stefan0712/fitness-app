import { getDateForHeader, getCurrentDay, makeDateNice } from '../../../helpers';
import './dashboard.css';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import ProgressCircle from '../../common/ProgressCircle/ProgressCircle';
import { IconLibrary } from '../../../IconLibrary';



const Dashboard = () => {

    const [selectedDate, setSelectedDate] = useState(getCurrentDay());



    const dispatch = useDispatch();
    const userActivity = useSelector((state)=>state.user.activity[selectedDate]);
    const allActivity = useSelector((state)=>state.user.activity);
    const userGoals = useSelector((state)=>state.user.userData.goals);

    const today = dayjs();
    const startOfWeek = today.startOf('week').add(1, 'day'); // Monday as the start of the week
    const [currentMonday, setCurrentMonday] = useState(startOfWeek);
    
    const activity = userActivity?.logs.filter((log)=>log.type==="workout" || log.type==="exercise" || log.type==='activity');

    // Function to get the full week array starting from currentMonday
    const getWeekDates = (monday) => {
        return Array.from({ length: 7 }, (_, i) => monday.add(i, 'day'));
    };

    const weekDates = getWeekDates(currentMonday);

    // Function to move to the next week
    const nextWeek = () => {
        setCurrentMonday(currentMonday.add(7, 'day'));
    };

    // Function to move to the previous week
    const prevWeek = () => {
        setCurrentMonday(currentMonday.subtract(7, 'day'));
    };
    const handleDayClick = (date) => {
        setSelectedDate(date.format('YYYY-MM-DD'))
    };

   

    const getGoalCurrentValue = (arr,goalName) => {
        if(arr && arr.length > 0){
            return arr.reduce((sum, item) => {
                return item.name === goalName ? sum + item.data.value : sum;
            }, 0);
        }else{
            return 0;
        }
        
    };

    return ( 
        <div className="dashboard page">
            
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Dashboard</h2>
            </div>
            <div className='week-days-container'>
                <button className='navigate-week-button' onClick={prevWeek}><img src={IconLibrary.Arrow} style={{transform: 'rotate(180deg)'}} alt=''/></button>
                {weekDates.map((date, index) => (
                    <button
                    className={`week-day-button ${selectedDate === date.format('YYYY-MM-DD') ? 'active-week-button': ''}`}
                    key={index}
                    onClick={() => handleDayClick(date)}
                    >
                    <h3>{date.format('ddd')}</h3>
                    <p>{date.format('D')}</p>
                    </button>
                ))}
                <button className='navigate-week-button' onClick={nextWeek}><img src={IconLibrary.Arrow} alt='' /></button>

            </div>
            
            <h3 className='full-width'>Summary</h3>
            <div className='date' style={{width: '100%'}}>{makeDateNice(selectedDate)}</div>
            <div className='summary-container'>
                {userGoals.length > 0 ? userGoals.map((goal)=>(
                    <div className='summary-cell-body' key={goal.name}>
                        <div className='left'>
                            <div className='cell-name'>{goal.name}</div>
                            <div className='cell-value'><p>{getGoalCurrentValue(userActivity?.logs, goal.name)}</p>/{goal.target}</div>
                        </div>
                        <div className='right'>
                        {<ProgressCircle 
                            currentAmount={getGoalCurrentValue(userActivity?.logs, goal.name)} 
                            targetAmount={goal.target} 
                            size={120} 
                            strokeWidth={5} 
                            color="#3498db"
                            radiusSize={5} 
                        />}
                        </div>
                </div> 
                )): 'No goals found'}  
            </div>
            <h3 className='subtitle'>Activity</h3>
            <div className='activity-container section'>
                    <div className='activity-item border-bottom'>
                        <div className='small-icon'></div>
                        <p className='name'>Name</p> 
                        <p className='duration'>Duration</p>
                        <p className='time'>Time</p>
                    </div>
                {activity?.length > 0 ? (activity.map((log)=>(
                    <div className='activity-item' key={log.timestamp}>
                        <img src={log.icon} className='small-icon'></img>
                        <p className='name'>{log.data.name || log.data.workoutData.name}</p> 
                        <p className='duration'>{log.data.duration} min</p>
                        <p className='time'>{log.data.time || log.data.workoutData.time}</p>
                    </div>
                ))) : (<h3>No activity</h3>)}
            </div>

        </div>
     );
}
 
export default Dashboard;