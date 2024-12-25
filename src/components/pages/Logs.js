import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getDateForHeader } from "../../helpers";
import ViewLog from "./common/logs/ViewLog";
import { BarChart, Bar, XAxis, LabelList, ResponsiveContainer } from 'recharts';
import ThisWeekActivity from "./common/ThisWeekActivity";

const Logs = () => {
    const activity = useSelector((state) => state.user.activity);
    const goals = useSelector((state)=>state.user.userData.goals);
    const [logs, setLogs] = useState([]);
    const [showLog, setShowLog] = useState(null);

    //track which graph to show
    const [isMinutes, setIsMinutes] = useState(true);
    const [graphType, setGraphType] = useState('activity');
    const toggleChart = () => {
        setIsMinutes(!isMinutes);
      };

    const getLogs = () => {
        // Get all date keys and sort them in descending order
        const sortedKeys = Object.keys(activity).sort((a, b) => new Date(b) - new Date(a));

        // Take the last 7 entries
        const lastSevenKeys = sortedKeys.slice(0, 7);

        // Map the keys to their corresponding logs
        const lastSevenEntries = lastSevenKeys.map(key => ({
            date: key,
            logs: activity[key].logs || [] 
        }));

        setLogs(lastSevenEntries);
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
    useEffect(() => {
        getLogs();
    }, [activity]);
    const closeViewLog = () =>{
        setShowLog(null)
    }

     console.log(logs)



    const getGraphData = (goalName) =>{
        let sum = 0;
        let sums = [];

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
            {/* {logs.map((dailyActivity, index) => (
                <div key={index} className="daily-activity-section" >
                    <h3 className="subtle-subtitle">{dailyActivity.date}</h3>
                    <div className="logs-container">
                        {dailyActivity.logs.map((log, logIndex) => (
                            <div key={logIndex} className="log-body" onClick={()=>setShowLog(log)}>
                                <img className="small-icon" src={log.icon}></img>
                                <div className="log-info">
                                    <p>{log.name}</p>
                                    <div className="log-meta">
                                        <p>{log.data.value}</p>
                                        <p>{log.timestamp.split('T')[1].split('.')[0]}</p>
                                    </div>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                </div>
            ))} */}


            <ThisWeekActivity logs={logs}/>
        </div>
    );
};

export default Logs;
