import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getDateForHeader, getWeekRange, getCurrentDay } from "../../../helpers";
import ViewLog from "../../common/LogPages/ViewLog";
import { BarChart, Bar, XAxis, LabelList, ResponsiveContainer } from 'recharts';
import styles from './Activity.module.css';
import ExerciseLogView from "../../common/LogPages/ExerciseLogView";
import FoodLogInfo from '../../common/FoodLog/FoodLogInfo';



const Activity = () => {
    const goals = useSelector((state)=>state.user.userData.goals);
    const [showLog, setShowLog] = useState(null);
    const [intervalPart, setIntervalPart] = useState('last-seven-days')
    const activity = useSelector((state)=>state.user.activity)
    const [weekData, setWeekData] = useState(null);
    const [weekRange, setWeekRange] = useState(getWeekRange(getCurrentDay(),'last-seven-days'));
    const [graphData, setGraphData] = useState(null)
    const [graphType, setGraphType] = useState('Steps');

    const [showInfo, setShowInfo] = useState(null);


    
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
    
    //TODO: Add some kind of identifier to goals (eg: lowered case goal name) and use that to filter them
    //TODO: Make it so that it also counts food logs into calories or other macros, or make some kind of quick add button
    //TODO: to food log that counts towards the goal, or maybe move exercises to somewhere else
       
  
    
    
      

    const closeViewLog = () =>{
        setShowLog(null)
    }




 

    const formatDate = (date) => {
        const dateObj = new Date(date);

        // Check if the conversion is valid
        if (isNaN(dateObj.getTime())) {
            throw new Error("Invalid date format");
        }


        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        return dateObj.toLocaleDateString('en-US', options);  // "Wed, 25 Nov"
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



    const changeGraphType = (type) =>{
        setGraphData(calculateGoalProgress(weekData, type))
        setGraphType(type);
    }
    return (
        <div className={`${styles["logs"]} page`}>
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Activity</h2>
            </div>
            <div className={styles["chart-container"]}>
                <select className={styles["data-type-graph-dropdown"]} onChange={(e)=>changeGraphType(e.target.value)} value={graphType}>
                    {goals.map((goal, index)=>(<option key={index+'dropdown'} value={goal.name}>{goal.name} ({goal.unit})</option>))}
                </select>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={graphData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        borderRadius
                    >
                        <XAxis dataKey="name" />
                        <Bar dataKey={'value'} fill="white" radius={[5, 5, 0, 0]} >
                            <LabelList dataKey={'value'} position="top" />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
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
};

export default Activity;
