import styles from './LogsHistory.module.css';
import ExerciseLogView from "../../../common/LogPages/ExerciseLogView";
import FoodLogInfo from '../../../common/FoodLog/FoodLogInfo';
import ViewLog from "../../../common/LogPages/ViewLog";
import { getWeekRange, getCurrentDay } from "../../../../helpers";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";



const LogsHistory = () => {


    const [showInfo, setShowInfo] = useState(null);
    const activity = useSelector((state)=>state.user.activity)
    const [showLog, setShowLog] = useState(null);
    const [intervalPart, setIntervalPart] = useState('last-seven-days')
    const [weekRange, setWeekRange] = useState(getWeekRange(getCurrentDay(),'last-seven-days'));

    const [weekData, setWeekData] = useState(null);
    const [graphType, setGraphType] = useState('Steps');
    const [graphData, setGraphData] = useState(null);


    const formatDate = (date) => {
        const dateObj = new Date(date);

        // Check if the conversion is valid
        if (isNaN(dateObj.getTime())) {
            throw new Error("Invalid date format");
        }


        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        return dateObj.toLocaleDateString('en-US', options);  // "Wed, 25 Nov"
    };
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
        console.log(progress);
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
    /* instead of a list with days make it a two button container with This week and Last 7 days
    Under it add buttons with current week or seven days  buttons with day name and number and a list of logs or none
    Recreate screens for viewing logs. Maybe some modal at the middle of the screen with the data and a delete button.
    */
    return ( 
        <div className={styles['logs-history']}>
            <h3>Logs</h3>
                {showLog ? <ViewLog log={showLog} closeViewLog={closeViewLog} /> : ''}
                <div className='screen-toggle-buttons'>
                    <button onClick={()=>switchInterval('current-week')} className={`${intervalPart === 'current-week' ? 'selected-button': ''}`}>Current Week</button>
                    <button onClick={()=>switchInterval('last-seven-days')} className={`${intervalPart === 'last-seven-days' ? 'selected-button' : ''}`}>Last 7 Days</button>
                </div>
                <div className={styles["history-container"]}>
                    {weekData?.map((item, index) => (
                        
                        <div className={styles['day']} key={index+'day'}>
                            <p className={styles.logDay}>{formatDate(item.date)}</p>
                            <div className={styles['logs-container']}>
                                {item?.logs && item.logs && item.logs.length > 0 ? (
                                    item.logs.map((log, index)=>(
                                        <div key={index+"log"} className={styles["log-body"]} onClick={(()=>setShowInfo(log))}>
                                            <img className="small-icon" src={log.icon.icon}></img>
                                            <div className={styles["log-info"]}>
                                                <p>{log.name}</p>
                                                <div className={styles["log-meta"]}>
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
                {showInfo && showInfo.type === 'exercise' ? <ExerciseLogView data={showInfo.data} close={()=>setShowInfo(null)} /> : null }
                {showInfo && showInfo.type === 'food' ? <FoodLogInfo data={showInfo.data} close={()=>setShowInfo(null)} /> : null }
        </div>
     );
}
 
export default LogsHistory;