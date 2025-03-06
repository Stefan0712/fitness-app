import styles from './LogsHistory.module.css';
import ExerciseLogView from "../../../common/LogPages/ExerciseLogView";
import FoodLogInfo from '../../../common/FoodLog/FoodLogInfo';
import ViewLog from "../../../common/LogPages/ViewLog";
import { getWeekRange, getCurrentDay, formatActivityDate, getHourFromTimestamp } from "../../../../helpers";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import DaySelector from './DaySelector';



const LogsHistory = () => {


    const [showInfo, setShowInfo] = useState(null);
    const activity = useSelector((state)=>state.user.activity)
    const [showLog, setShowLog] = useState(null);
    const [intervalPart, setIntervalPart] = useState('last-seven-days')
    const [weekRange, setWeekRange] = useState(getWeekRange(getCurrentDay(),'last-seven-days'));

    const [weekData, setWeekData] = useState(null);
    console.log(weekData)
    const [graphType, setGraphType] = useState('Steps');
    const [graphData, setGraphData] = useState(null);

    const todayDateRaw = new Date();
    const todayDate = getCurrentDay(todayDateRaw)
    const [selectedDay, setSelectedDay] = useState(todayDate);


    const calculateGoalProgress = (weekData, type = graphType) => {
        const goalProgressByDay = weekData.map((day) => {
            let goalValue = 0;
    
            day.logs.forEach((log) => {
                if (log.type === 'goal' && log.name === type) {
                    goalValue += log.data?.value || 0;  
                }
            });
    
            return {
                name: day.short,  
                value: goalValue  
            };
        });
    
        return goalProgressByDay;
    };
    const getLogs = (range = weekRange) => {
        let logsByDay = range.map((item) => {
            if (activity[item.date] && activity[item.date].logs && activity[item.date].logs.length > 0) {
                item.logs = [...activity[item.date].logs];
            } else {
                item.logs = [];
            }
            return item;
        });
    
        setWeekData(logsByDay, graphType);
        const progress = calculateGoalProgress(logsByDay);
        setGraphData(progress);
    };
    useEffect(()=>{
        getLogs();
    },[activity, setIntervalPart])

    const switchInterval = (type) =>{
        setIntervalPart(type);
        getLogs(getWeekRange(getCurrentDay(), type));
        calculateGoalProgress(weekData, graphType);
    }

    const closeViewLog = () =>{
        setShowLog(null)
    }
    /* 
     TODO: Recreate screens for viewing logs. Maybe some modal at the middle of the screen with the data and a delete button.
    */
    const handleDaySelect = (date) =>{
        setSelectedDay(date);
    }
    return ( 
        <div className={styles['logs-history']}>
                
                <div className={styles['time-interval-buttons-container']}>
                    <button onClick={()=>switchInterval('current-week')} className={`${intervalPart === 'current-week' ? styles['selected-button'] : ''}`}>Current Week</button>
                    <button onClick={()=>switchInterval('last-seven-days')} className={`${intervalPart === 'last-seven-days' ? styles['selected-button'] : ''}`}>Last 7 Days</button>
                </div>
                {weekData ? <DaySelector weekData={weekData} selectedDay={selectedDay} selectDay={handleDaySelect} /> : null}
                <div className={styles["logs-container"]}>
                {weekData && weekData.length > 0 && selectedDay ? (
                        weekData.find(item => item.date === selectedDay)?.logs?.length > 0 ? (
                            weekData.find(item => item.date === selectedDay)?.logs.map((item, index) => (
                                <div className={styles['log-body']} key={'log-' + index}>
                                    <p className={styles['log-name']}>{item.type === 'goal' ? item.name : (item.data?.name || item.name)}</p>
                                    <p className={styles['log-time']}>{getHourFromTimestamp(item.timestamp)}</p>
                                    <p className={styles['log-value']}>
                                        {item.type === 'exercise' ? `${item.data.sets} sets` : 
                                        item.type === 'food' ? `${item.data.qty} ${item.data.unit || ''}` : 
                                        item.type === 'goal' ? `${item.data.value} ${item.data.unit || ''}` : null}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>No logs for that date</p>
                        )
                    ) : (
                        <p>No logs for that date</p>
                    )}
                </div>
                {showInfo && showInfo.type === 'exercise' ? <ExerciseLogView data={showInfo.data} close={()=>setShowInfo(null)} /> : null }
                {showInfo && showInfo.type === 'food' ? <FoodLogInfo data={showInfo.data} close={()=>setShowInfo(null)} /> : null }
                {showLog ? <ViewLog log={showLog} closeViewLog={closeViewLog} /> : ''}
        </div>
     );
}
 
export default LogsHistory;