import styles from './Goal.module.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { convertFullDate, formatTime, getCurrentDay, getDateFromTimestamp, getHourFromTimestamp } from '../../../helpers';
import { startOfWeek, addDays, format } from 'date-fns';
import { IconLibrary } from '../../../IconLibrary';
import useCurrentWeekLogs from './useCurrentWeekLogs';




const Goal = ({data}) => {

    const logs = useSelector((state)=>state.user?.activity[getCurrentDay()]?.logs?.filter(item=>item.id === data.id));
    const currentWeeksLogs = useCurrentWeekLogs();
    const [currentWeek, setCurrentWeek] = useState([]);

    const [isHistoryExpanded, setIsHistoryExpanded] = useState(false)
    

    const getCurrentWeek = () => {
        const today = new Date();
        return Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(today, { weekStartsOn: 1 }), i));
    };
    useEffect(()=>{
        const weeksData = currentWeeksLogs?.map(item=>({logs: item.logs,date: item.date, dayName: item.shortDayName, completion: getCompletionRates(item.logs)}));
        console.log(weeksData)
        setCurrentWeek(weeksData);
    },[]);

    const getCompletionRates = (logs) =>{
        

        if(logs && logs.length > 0){
            return logs.filter(item=>item.id===data.id).reduce((sum, obj)=> sum + parseInt(obj.data.value || 0, 10), 0)/data.target*100;
        }else{
            return 0;
        }
    }

    return ( 
        <div className={`${styles.goal} ${isHistoryExpanded ? styles['expand-goal'] : ''}`}>
            <div className={styles.header}>
                <img className={styles.icon} src={data.icon.icon}></img>
                <h3>{data.name}</h3>
                <p>{logs?.reduce((sum, obj)=>sum + parseInt(obj.data.value,10),0) || 0}/{data.target}</p>
            </div>
            <div className={styles.days}>
                {currentWeek?.map((item, index)=>{
                    return (<div className={`${styles.day} ${getCurrentDay() === item.date ? styles.selected : ''}`} key={index}>
                            <div className={styles['day-circle']} key={index} style={{'--completion': item.completion * 3.6}}>
                                <img className={styles.checkmark} src={IconLibrary.Checkmark} alt=''></img>
                            </div>
                            <p>{item.dayName}</p>
                        </div>)
                })}
            </div>
            <div className={`${styles.history} ${isHistoryExpanded ? styles['expand-history'] : ''}`}>
                <div className={styles['history-header']} onClick={()=>setIsHistoryExpanded(isHistoryExpanded=>!isHistoryExpanded)}>
                    <h4>History</h4>
                    <button className='clear-button'><img className='small-icon' src={IconLibrary.Arrow} alt='' style={{transform: `rotateZ(${isHistoryExpanded ? '90' : '180'}deg)`}}/></button>
                </div>
                <div className={styles['history-container']}>
                    {logs && logs?.length > 0 ? logs.map((item,index)=>(
                         <div className={styles.log} key={index}>
                            <p>{item.data.value} {data.unit} at {getHourFromTimestamp(item.timestamp)} on {getDateFromTimestamp(item.timestamp)}</p>
                            <p>{(item.data.value/data.target)*100}%</p>
                         </div>
                    )) : <p>No logs found</p>}
                </div>
            </div>
        </div>
     );
}
 
export default Goal;