import styles from './LogsStats.module.css';
import { BarChart, Bar, XAxis, LabelList, ResponsiveContainer } from 'recharts';
import { useSelector } from "react-redux";
import { useState } from "react";






const LogsStats = () => {

    const [weekData, setWeekData] = useState(null);
    const [graphType, setGraphType] = useState('Steps');
    const goals = useSelector((state)=>state.user.goals);
    const [graphData, setGraphData] = useState(null);



    const calculateGoalProgress = (weekData, type = graphType) => {
        const goalProgressByDay = weekData?.map((day) => {
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
    



    const changeGraphType = (type) =>{
        setGraphData(calculateGoalProgress(weekData, type))
        setGraphType(type);
    }
    /*

        Show the completion rate of each goal this week. Do an average per day,  total per week, completion rate as percentage and numbers
        entries, days when target was met, etc.
        

    */
    return ( 
        <div className={styles['logs-stats']}>
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
        </div>
     );
}
 
export default LogsStats;