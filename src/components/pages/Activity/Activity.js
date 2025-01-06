import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getDateForHeader, getWeekRange, getCurrentDay } from "../../../helpers";
import ViewLog from "../../common/LogPages/ViewLog";
import { BarChart, Bar, XAxis, LabelList, ResponsiveContainer } from 'recharts';

const Activity = () => {
    const goals = useSelector((state)=>state.user.userData.goals);
    const [logs, setLogs] = useState([]);
    const [showLog, setShowLog] = useState(null);
    const [intervalPart, setIntervalPart] = useState('last-seven-days')
    const activity = useSelector((state)=>state.user.activity)
    const [weekData, setWeekData] = useState(null);
    const [weekRange, setWeekRange] = useState(getWeekRange(getCurrentDay(),'last-seven-days'));
    const [graphData, setGraphData] = useState(null)
    const [graphType, setGraphType] = useState('Steps');


    
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
        <div className="logs page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Activity</h2>
            </div>
            <div className="chart-container">
                <select className="data-type-graph-button" onChange={(e)=>changeGraphType(e.target.value)}>
                    <option value={'Activity'}>Activity (min)</option>
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
            <h3>History</h3>
            {showLog ? <ViewLog log={showLog} closeViewLog={closeViewLog} /> : ''}
            <div className="logs-history-period">
                <button onClick={()=>switchInterval('current-week')} className={`${intervalPart === 'current-week' ? 'selected-button' : ''}`}>Current Week</button>
                <button onClick={()=>switchInterval('last-seven-days')} className={`${intervalPart === 'last-seven-days' ? 'selected-button' : ''}`}>Last 7 Days</button>
            </div>
            {weekData?.map((item, index) => (
                
                <div className='day' key={index+'day'}>
                    <h3>{formatDate(item.date)}</h3>
                    <div className='logs-container'>
                        {item?.logs && item.logs && item.logs.length > 0 ? (
                            item.logs.map((log, index)=>(
                                <div key={index+"log"} className="log-body">
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
};

export default Activity;
