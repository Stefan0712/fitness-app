import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getDateForHeader, getWeekRange, getCurrentDay } from "../../helpers";
import ViewLog from "./common/logs/ViewLog";
import { BarChart, Bar, XAxis, LabelList, ResponsiveContainer } from 'recharts';
import ThisWeekActivity from "./common/ThisWeekActivity";

const Logs = () => {
    const goals = useSelector((state)=>state.user.userData.goals);
    const [logs, setLogs] = useState([]);
    const [showLog, setShowLog] = useState(null);
    const [intervalPart, setIntervalPart] = useState('last-seven-days')
    const activity = useSelector((state)=>state.user.activity)
    const [weekData, setWeekData] = useState(null);
    const [weekRange, setWeekRange] = useState(getWeekRange(getCurrentDay(),'last-seven-days'));
    //track which graph to show
    const [isMinutes, setIsMinutes] = useState(true);
    const [graphType, setGraphType] = useState('activity');


    const toggleChart = () => {
        setIsMinutes(!isMinutes);
      };

    
    const minutesData = [
        { name: 'Mon', minutes: 71 },
        { name: 'Tue', minutes: 44 },
        { name: 'Wed', minutes: 12 },
        { name: 'Thu', minutes: 112 },
        { name: 'Fri', minutes: 88 },
        { name: 'Sat', minutes: 68 },
        { name: 'Sun', minutes: 48 }
    ];
    const caloriesData = [
        { name: 'Mon', calories: 240 },
        { name: 'Tue', calories: 281 },
        { name: 'Wed', calories: 529 },
        { name: 'Thu', calories: 650 },
        { name: 'Fri', calories: 230 },
        { name: 'Sat', calories: 753 },
        { name: 'Sun', calories: 674 }
    ];

    const closeViewLog = () =>{
        setShowLog(null)
    }




    const getGraphData = (goalName) =>{
        let sum = 0;
        let sums = [];

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
    const getLogs = (range = weekRange) =>{
        let logsByDay = range.map((item)=>{
            if(activity[item.date] && activity[item.date].logs && activity[item.date].logs.length>0){
                item.logs = [...activity[item.date].logs]
            }else{
                item.logs = [];
            }
            return item;
       });
        setWeekData(logsByDay);
    }
    useEffect(()=>{
        getLogs();
    },[activity, setIntervalPart])

    const switchInterval = (type) =>{
        setIntervalPart(type);
        getLogs(getWeekRange(getCurrentDay(),type));
    }
    return (
        <div className="logs page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Activity</h2>
            </div>
            <div className="chart-container">
                <select className="data-type-graph-button" onChange={(e)=>setGraphType(e.target.value)}>
                    <option value={'activity'}>Activity (min)</option>
                    {goals.map((goal, index)=>(<option key={index} value={goal.name}>{goal.name} ({goal.unit})</option>))}
                </select>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={isMinutes ? minutesData : caloriesData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        borderRadius
                    >
                        <XAxis dataKey="name" />
                        <Bar dataKey={graphType ? 'minutes' : 'calories'} fill="white" radius={[5, 5, 0, 0]} >
                            <LabelList dataKey={isMinutes ? 'minutes' : 'calories'} position="top" />
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
};

export default Logs;
