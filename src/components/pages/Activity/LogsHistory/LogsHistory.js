import styles from './LogsHistory.module.css';
import { getWeekRange, getCurrentDay, getHourFromTimestamp } from "../../../../helpers";
import { useState, useEffect } from "react";
import DaySelector from './DaySelector';
import ViewWorkoutLog from './ViewWorkoutLog/ViewWorkoutLog.tsx';
import ViewGoalLog from './ViewGoalLog.tsx';
import ViewFoodLog from './ViewFoodLog/ViewFoodLog.tsx';
import { getAllItems } from '../../../../db.js';
import { IconLibrary } from '../../../../IconLibrary.js';
import ActivityLog from './ActivityLog/ActivityLog.tsx';
import ViewExerciseLog from './ViewExerciseLog/ViewExerciseLog.tsx';

const LogsHistory = () => {
    const [logs, setLogs] = useState([])
    const [weekData, setWeekData] = useState(null);
    const todayDateRaw = new Date();
    const todayDate = getCurrentDay(todayDateRaw)
    const [selectedDay, setSelectedDay] = useState(todayDate);
    const [openedLog, setOpenedLog] = useState(null);

    useEffect(()=>{
        setWeekData(getWeekRange(getCurrentDay(),'last-seven-days'))
    },[])

    const getLogs = async () =>{
        const result = await getAllItems('logs', {date: selectedDay});
        if(result){
            setLogs(result);
        }
    }

    useEffect(()=>{if(selectedDay){getLogs()}},[selectedDay]);

    const handleDaySelect = (date) =>{
        setSelectedDay(date);
    }
    return ( 
        <div className={styles['logs-history']}>
                {openedLog && openedLog.type === 'workout' ? 
                    <ViewWorkoutLog logData={openedLog} closeLog={()=>{
                        setOpenedLog(null);
                        getLogs();
                }} /> : null}
                {openedLog && openedLog.type === 'goal' ? 
                    <ViewGoalLog logData={openedLog} closeLog={()=>{
                        setOpenedLog(null);
                        getLogs();
                }} /> : null}
                {openedLog && openedLog.type === 'food' ? 
                    <ViewFoodLog logData={openedLog} closeLog={()=>{
                        setOpenedLog(null);
                        getLogs();
                }} /> : null}
                {(openedLog && openedLog.type === 'activity') ? 
                    <ActivityLog logData={openedLog} closeLog={()=>{
                        setOpenedLog(null);
                        getLogs();
                }} /> : null}
                {(openedLog && openedLog.type === 'exercise') ? 
                    <ViewExerciseLog logData={openedLog} closeLog={()=>{
                        setOpenedLog(null);
                        getLogs();
                }} /> : null}
                {weekData ? <DaySelector weekData={weekData} selectedDay={selectedDay} selectDay={handleDaySelect} /> : null}
                <div className={styles["logs-container"]}>
                    {logs && logs.length > 0 ? logs.map((item, index) => (
                            <div className={styles['log-body']} key={'log-' + index} onClick={()=>setOpenedLog(item)}>
                                <img className={styles['log-icon']} src={item.type === 'food' ? IconLibrary.Food : item.type === 'exercise' ? IconLibrary.Exercise : item.type === 'workout' ? IconLibrary.Dumbbell : IconLibrary.Goals} alt='' />
                                <p className={styles['log-name']}>{item.type === 'goal' ? item.name || item.title : item.type === 'workout' ? item?.title : (item.data?.name || item.name)}</p>
                                <p className={styles['log-time']}>{getHourFromTimestamp(item.timestamp)}</p>
                            </div>
                        )): <p className={styles.noLogsMessage}>No logs</p>
                    }
                </div>
        </div>
     );
}
 
export default LogsHistory;