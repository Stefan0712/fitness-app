import { getDateForHeader } from '../../helpers';
import './stylings/dashboard.css';
import { useState } from 'react';
import dayjs from 'dayjs';
import arrowIcon from '../../assets/arrow.svg';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../../store/userSlice';
import ProgressCircle from './common/ProgressCircle';



const Dashboard = () => {

    const dispatch = useDispatch();

    const today = dayjs();
    const startOfWeek = today.startOf('week').add(1, 'day'); // Monday as the start of the week
    const [currentMonday, setCurrentMonday] = useState(startOfWeek);
    const [selectedDate, setSelectedDate] = useState(dayjs().format('dddd, D MMM'))
    

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

   



    return ( 
        <div className="dashboard">
            
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Dashboard</h2>
            </div>
            <button className='orange-button large-button' onClick={()=>dispatch(reset())}>Reset Store</button>
            <div className='week-days-container'>
                <button className='navigate-week-button' onClick={prevWeek}><img src={arrowIcon} style={{transform: 'rotate(180deg)'}} alt=''/></button>
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
                <button className='navigate-week-button' onClick={nextWeek}><img src={arrowIcon} alt='' /></button>

            </div>
            
            <div className='date' style={{width: '100%'}}>{selectedDate}</div>
            <h3 className='subtitle'>Summary</h3>
            <div className='summary-container'>



                <div className='summary-cell-body'>
                    <div className='left'>
                        <div className='cell-name'>Calories</div>
                        <div className='cell-value'><p>450</p>/1500</div>
                    </div>
                    <div className='right'>
                    {<ProgressCircle 
                        currentAmount={60} 
                        targetAmount={100} 
                        size={120} 
                        strokeWidth={5} 
                        color="#3498db"
                        radiusSize={5} 
                    />}
  
                    </div>
                </div>
                
            </div>

        </div>
     );
}
 
export default Dashboard;