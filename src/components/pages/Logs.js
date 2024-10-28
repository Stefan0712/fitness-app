import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Logs = () => {
    const activity = useSelector((state) => state.user.activity);
    const [logs, setLogs] = useState([]);

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
        console.log(lastSevenEntries);
    };

    useEffect(() => {
        getLogs();
    }, [activity]);

    return (
        <div className="logs page">
            <h1>Activity</h1>
            {logs.map((dailyActivity, index) => (
                <div key={index} className="daily-activity-section">
                    <h2>{dailyActivity.date}</h2>
                    <div className="logs-container">
                        {dailyActivity.logs.map((log, logIndex) => (
                            <div key={logIndex} className="log-body">
                                <p>{log.type}</p>
                                <p>{log.name}</p>
                                <p>{log.data.value} at {log.timestamp.split('T')[1].split('.')[0]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Logs;
