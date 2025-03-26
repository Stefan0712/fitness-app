import styles from './LogsHistory.module.css';
import ExerciseLogView from "../../../common/LogPages/ExerciseLogView";
import FoodLogInfo from '../../../common/FoodLog/FoodLogInfo';
import ViewLog from "../../../common/LogPages/ViewLog";
import { getWeekRange, getCurrentDay, formatActivityDate, getHourFromTimestamp } from "../../../../helpers";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import DaySelector from './DaySelector';
import ViewWorkoutLog from './ViewWorkoutLog.tsx';
import ViewGoalLog from './ViewGoalLog.tsx';
import ViewFoodLog from './ViewFoodLog.tsx';
import ViewExerciseLog from './ViewExerciseLog.tsx';



const LogsHistory = () => {


    const [showInfo, setShowInfo] = useState(null);
    const activity = useSelector((state)=>state.user.activity);
    const [showLog, setShowLog] = useState(null);
    const [intervalPart, setIntervalPart] = useState('last-seven-days')
    const [weekRange, setWeekRange] = useState(getWeekRange(getCurrentDay(),'last-seven-days'));

    const [weekData, setWeekData] = useState(null);
    const [graphType, setGraphType] = useState('Steps');
    const [graphData, setGraphData] = useState(null);

    const todayDateRaw = new Date();
    const todayDate = getCurrentDay(todayDateRaw)
    const [selectedDay, setSelectedDay] = useState(todayDate);

    const [openedLog, setOpenedLog] = useState(null);

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
            const index = activity.findIndex(index=>index.date===item.date);
            console.log(index);
            if (index >= 0 && activity[index] && activity[index].logs && activity[index].logs.length > 0) {
                item.logs = [...activity[index].logs];
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
    const handleDaySelect = (date) =>{
        setSelectedDay(date);
    }
    return ( 
        <div className={styles['logs-history']}>
                {openedLog && openedLog.type === 'workout' ? <ViewWorkoutLog logData={openedLog} closeLog={()=>setOpenedLog(null)} /> : null}
                {openedLog && openedLog.type === 'goal' ? <ViewGoalLog logData={openedLog} closeLog={()=>setOpenedLog(null)} /> : null}
                {openedLog && openedLog.type === 'food' ? <ViewFoodLog logData={openedLog} closeLog={()=>setOpenedLog(null)} /> : null}
                {openedLog && openedLog.type === 'exercise' ? <ViewExerciseLog logData={openedLog} closeLog={()=>setOpenedLog(null)} /> : null}
                <div className={styles['toggle-buttons-container']}>
                    <button onClick={()=>switchInterval('current-week')} className={`${intervalPart === 'current-week' ? styles['selected-button'] : ''} ${styles['toggle-button']}`}>Current Week</button>
                    <button onClick={()=>switchInterval('last-seven-days')} className={`${intervalPart === 'last-seven-days' ? styles['selected-button'] : ''} ${styles['toggle-button']}`}>Last 7 Days</button>
                </div>
                {weekData ? <DaySelector weekData={weekData} selectedDay={selectedDay} selectDay={handleDaySelect} /> : null}
                <div className={styles["logs-container"]}>
                {weekData && weekData.length > 0 && selectedDay ? (
                        weekData.find(item => item.date === selectedDay)?.logs?.length > 0 ? (
                            weekData.find(item => item.date === selectedDay)?.logs.map((item, index) => (
                                <div className={styles['log-body']} key={'log-' + index} onClick={()=>setOpenedLog(item)}>
                                    <img className={styles['log-icon']} src={item.icon} alt='' />
                                    <p className={styles['log-time']}>{getHourFromTimestamp(item.timestamp)}</p>
                                    <p className={styles['log-name']}>{item.type === 'goal' ? item.name : item.type === 'workout' ? item?.name : (item.data?.name || item.name)}</p>
                                    <p className={styles['log-value']}>
                                        {
                                            item.data && item.type === 'exercise' && item.data.sets ? `${ Array.isArray(item.data.sets) ? item.data.sets.length : item.data.sets} sets` : 
                                            item.data && item.type === 'food' ? `${item.data.qty} ${item.data.unit || ''}` : 
                                            item.data && item.type === 'goal' ? `${item.data.value} ${item.data.unit || ''}` :
                                            item.data && item.type === 'workout' && item.data.exercises ? `${item.data.exercises.length} exercises` : null
                                        }
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