import styles from './LogsHistory.module.css';
import ExerciseLogView from "../../../common/LogPages/ExerciseLogView";
import FoodLogInfo from '../../../common/FoodLog/FoodLogInfo';
import ViewLog from "../../../common/LogPages/ViewLog";
import { getWeekRange, getCurrentDay, getHourFromTimestamp } from "../../../../helpers";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import DaySelector from './DaySelector';
import ViewWorkoutLog from './ViewWorkoutLog.tsx';
import ViewGoalLog from './ViewGoalLog.tsx';
import ViewFoodLog from './ViewFoodLog.tsx';
import ViewExerciseLog from './ViewExerciseLog/ViewExerciseLog.tsx';
import { getAllItems } from '../../../../db.js';



const LogsHistory = () => {


    const [showInfo, setShowInfo] = useState(null);
    const [logs, setLogs] = useState([])
    const [showLog, setShowLog] = useState(null);
    const [intervalPart, setIntervalPart] = useState('last-seven-days')
    const [weekRange, setWeekRange] = useState(getWeekRange(getCurrentDay(),'last-seven-days'));

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
            console.log(result)
        }
    }

    useEffect(()=>{if(selectedDay){getLogs()}},[selectedDay]);


    const switchInterval = (type) =>{
        setIntervalPart(type);
        getLogs(getWeekRange(getCurrentDay(), type));
    }

    const closeViewLog = () =>{
        setShowLog(null);
    }
    const handleDaySelect = (date) =>{
        setSelectedDay(date);
    }
    return ( 
        <div className={styles['logs-history']}>
                {openedLog && openedLog.type === 'workout' ? <ViewWorkoutLog logData={openedLog} closeLog={()=>(setOpenedLog(null), getLogs())} /> : null}
                {openedLog && openedLog.type === 'goal' ? <ViewGoalLog logData={openedLog} closeLog={()=>(setOpenedLog(null), getLogs())} /> : null}
                {openedLog && openedLog.type === 'food' ? <ViewFoodLog logData={openedLog} closeLog={()=>(setOpenedLog(null), getLogs())} /> : null}
                {openedLog && openedLog.type === 'exercise' ? <ViewExerciseLog logData={openedLog} closeLog={()=>(setOpenedLog(null), getLogs())} /> : null}
                <div className={styles['toggle-buttons-container']}>
                    <button onClick={()=>switchInterval('current-week')} className={`${intervalPart === 'current-week' ? styles['selected-button'] : ''} ${styles['toggle-button']}`}>Current Week</button>
                    <button onClick={()=>switchInterval('last-seven-days')} className={`${intervalPart === 'last-seven-days' ? styles['selected-button'] : ''} ${styles['toggle-button']}`}>Last 7 Days</button>
                </div>
                {weekData ? <DaySelector weekData={weekData} selectedDay={selectedDay} selectDay={handleDaySelect} /> : null}
                <div className={styles["logs-container"]}>
                {logs && logs.length > 0 ? logs.map((item, index) => (
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
                    )): <p>No logs</p>
                }
                </div>
                {showInfo && showInfo.type === 'exercise' ? <ExerciseLogView data={showInfo.data} close={()=>setShowInfo(null)} /> : null }
                {showInfo && showInfo.type === 'food' ? <FoodLogInfo data={showInfo.data} close={()=>setShowInfo(null)} /> : null }
                {showLog ? <ViewLog log={showLog} closeViewLog={closeViewLog} /> : ''}
        </div>
     );
}
 
export default LogsHistory;