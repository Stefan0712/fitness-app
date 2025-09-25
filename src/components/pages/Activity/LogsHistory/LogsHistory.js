import styles from './LogsHistory.module.css';
import { getWeekRange, getCurrentDay, getHourFromTimestamp, makeFirstUpperCase, getDateFromTimestamp } from "../../../../helpers";
import { useState, useEffect } from "react";
import DaySelector from './DaySelector';
import ViewWorkoutLog from './ViewWorkoutLog/ViewWorkoutLog.tsx';
import ViewFoodLog from './ViewFoodLog/ViewFoodLog.tsx';
import { deleteItem, getAllItems } from '../../../../db.js';
import { IconLibrary } from '../../../../IconLibrary.js';
import ActivityLog from './ActivityLog/ActivityLog.tsx';
import ViewExerciseLog from './ViewExerciseLog/ViewExerciseLog.tsx';
import { iconList } from '../../../../icons.js';
import { useNavigate } from 'react-router-dom';
import { useUI } from '../../../../context/UIContext.jsx';

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
                {(openedLog && openedLog.type === 'goal') ? 
                    <GoalLogMenu logData={openedLog} closeLog={()=>{
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
                    {logs && logs.length > 0 ? logs.map((item, index) => {
                        if(item.type === 'goal' ) {return <GoalLog logData={item} key={'log-' + index} openLog={()=>setOpenedLog(item)}/>} 
                        return (<div className={styles['log-body']} key={'log-' + index} onClick={()=>setOpenedLog(item)}>
                            <img className={styles['log-icon']} src={item.type === 'food' ? IconLibrary.Food : item.type === 'exercise' ? IconLibrary.Exercise : item.type === 'workout' ? IconLibrary.Dumbbell : IconLibrary.Goals} alt='' />
                            <p className={styles['log-name']}>{item.type === 'goal' ? item.name || item.title : item.type === 'workout' ? item?.title : (item.data?.name || item.name)}</p>
                            <p className={styles['log-time']}>{getHourFromTimestamp(item.timestamp)}</p>
                        </div>) 
                        }): <p className={styles.noLogsMessage}>No logs</p>
                    }
                </div>
        </div>
     );
}
 
export default LogsHistory;



const GoalLog = ({logData, openLog}) => {
    const IconComponent = logData ? iconList.find(item => item.id === logData.icon)?.icon : null; // Find the icon based on the saved id
    return (
        <div className={styles['log-body']} style={{gridTemplateColumns: '20px 1fr minmax(50px, 100px)'}} onClick={()=>openLog(logData)}>
            <IconComponent fill={'white'} width="20px" height="20px"/>
            <p className={styles['log-name']}>{logData.title}</p>
            {
                logData.data.type === 'yes-no' ? <p style={{textAlign: 'end'}}>{makeFirstUpperCase(logData.data.value)}</p>
                : logData.data.type === 'target' || logData.data.type === 'number' ? <p style={{textAlign: 'end'}}>{logData.data.value} {makeFirstUpperCase(logData.data.unit?.shortLabel)}</p>
                : null
            }
        </div>
    )
}
const GoalLogMenu = ({logData, closeLog}) =>{

    const navigate = useNavigate();
    const {showConfirmationModal, showMessage} = useUI();

    const handleDelete = async () =>{
        await deleteItem('logs', logData.goalId);
        showMessage("Log deleted!", "success");
        closeLog();
    }

    return (
        <div className={styles.goalMenu}>
            <div className={styles.content}>
                <h3>{logData.title}</h3>
                <p>Logged {logData.data.value} {logData.data.unit?.shortLabel ?? ''} on {getDateFromTimestamp(logData.timestamp)} at {getHourFromTimestamp(logData.timestamp)}</p>
                <div className={styles.menuButtons}>
                    <button onClick={()=>navigate(`/goals/view/${logData.goalId}`)}>View Goal</button>
                    <button onClick={()=>showConfirmationModal({title:"Are you sure?", message: "This goal will be deleted and cannot be recovered!", onConfirm: handleDelete})}>Delete</button>
                    <button onClick={closeLog}>Close</button>
                </div>
            </div>
        </div>
    )
}