import './logs.css';
import { useEffect, useState } from 'react';
import { getCurrentDay, getWeekRange } from '../../../helpers';
import { useSelector } from 'react-redux';

const ThisWeekActivity = () => {

    const activity = useSelector((state)=>state.user.activity)
    const [weekData, setWeekData] = useState(null);
    const [weekRange, setWeekRange] = useState(getWeekRange(getCurrentDay()));



    
    const formatDate = (date) => {
        const dateObj = new Date(date);

        // Check if the conversion is valid
        if (isNaN(dateObj.getTime())) {
            throw new Error("Invalid date format");
        }


        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        return dateObj.toLocaleDateString('en-US', options);  // "Wed, 25 Nov"
    };
    
        
 

   useEffect(()=>{
        let logsByDay = weekRange.map((item)=>{
            {console.log("item :",item)}
            if(activity[item.date] && activity[item.date].logs && activity[item.date].logs.length>0){
                item.logs = [...activity[item.date].logs]
            }else{
                item.logs = [];
            }
            return item;
       });
        setWeekData(logsByDay);
    },[activity])






    return ( 
        <div className="this-week-activity activity-logs">
            {weekData?.map((item, index) => (
                
                <div className='day'>
                    <h3>{formatDate(item.date)}</h3>
                    <div className='logs-container'>
                        {item?.logs && item.logs && item.logs.length > 0 ? (
                            item.logs.map((log, index)=>(
                                <div key={index} className="log-body">
                                    <img className="small-icon" src={log.icon}></img>
                                    <div className="log-info">
                                        <p>{log.name}</p>
                                        <div className="log-meta">
                                            <p>{log.data.value}</p>
                                            <p>{log.timestamp.split('T')[1].split('.')[0]}</p>
                                        </div>
                                    </div>
                                    
                                </div>
                            ))
                        ): <h3>No Logs</h3>}
                    </div>
                </div>
            ))}
            
        </div>
    );
}
 
export default ThisWeekActivity;