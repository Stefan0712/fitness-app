import { useEffect, useState } from "react";
import { IconLibrary } from "../../../IconLibrary";
import AppHeader from "../../common/AppHeader/AppHeader.tsx";
import styles from './ViewGoal.module.css';
import { useParams } from "react-router-dom";
import { getAllItems, getItemById } from "../../../db";
import { getCurrentDay, getHourFromTimestamp, getLastThreeDays, makeDateNice, makeFirstUpperCase } from "../../../helpers";
import Loading from "../../common/Loading";
import { Goal } from "../../common/interfaces.ts";
import EditGoal from "./EditGoal.tsx";


const ViewGoal = () => {

    const {id} = useParams();
    const [goalData, setGoalData] = useState<Goal | null>(null);
    const [goalLogs, setGoalLogs] = useState<Goal[]>([]);
    const [editGoal, setEditGoal] = useState(null);
    const [pastCompletion, setPastCompletion] = useState([]);

    // Get data about the goal
    const getGoalData = async () =>{
        try{
            const response = await getItemById('goals', id);
            setGoalData(response);
            getGoalLogs(response._id);
        }catch(error){
            console.error(error);
        }
    }

    useEffect(()=>{getGoalData()},[]);


    // Get logs registered in the current day for this specific goal
    const getGoalLogs = async (goalId) =>{
        try{
            const response = await getAllItems('logs', {goalId, date: getCurrentDay()});
            setGoalLogs(response);
        }catch(error){
            console.error(error)
        }
    }

    const getPastLogs = async () => {
        const lastThreeDays = getLastThreeDays();
        try {
           const promises = lastThreeDays.map(async (date) => {
                const logs = await getAllItems('logs', { type: 'goal', date, goalId: id });
                return { date, logs: Array.isArray(logs) ? logs : [] };
            });
            const results = await Promise.all(promises);
            console.log(results)
            setPastCompletion(results);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {getPastLogs()},[id]);
    if(!goalData){
        return(<Loading title={'View Goal'}/>)
    }else{
        return ( 
        <div className={styles.viewGoalPage}>
            <AppHeader title={goalData.name} button={<button onClick={()=>setEditGoal(goalData)} className={styles.editGoalButton}><img className='small-icon' src={IconLibrary.Edit} alt='' /></button>} />
            {editGoal ? <EditGoal close={()=>setEditGoal(null)} goalData={editGoal} /> : null}
            <div className={styles.goalPreview}>
                <div className={styles["goal-color"]} style={{backgroundColor: goalData.color}} />
                <img src={goalData.icon} className={'small-icon'}></img>
                <p className={styles.name}>{goalData.name}</p>
                <p style={{color: goalData.color}} className={styles.target}>
                    {goalLogs && goalLogs.length > 0 ? (
                        goalData.type === 'target' ? (
                            <>
                                {goalLogs.reduce((sum, item) => sum + item.data.value, 0)}/{goalData.target || 0} {goalData.unit}
                            </>
                        ) : goalData.type === 'number' ? (
                            <>
                                {goalLogs[0]?.data?.value ?? 0} {goalData.unit}
                            </>
                        ) : goalData.type === 'yes-no' ? (
                            <>
                                {makeFirstUpperCase(goalLogs[0]?.data?.value ?? 'No')}
                            </>
                        ) : 0
                    ) : (
                        'No data'
)}
                </p>
            </div>
            <h3>Last 3 days</h3>
            <div className={styles.pastCompletion}>
                {pastCompletion && pastCompletion.length > 0 ? 
                    pastCompletion.map((day, index)=>(
                        goalData.type === 'target' ? <TargetDay key={day.date} day={day} index={index} goalData={goalData}/> :
                        goalData.type === 'number' ? <NumberDay key={day.date} day={day} index={index} pastCompletion={pastCompletion} /> :
                        goalData.type === 'yes-no' ? <BooleanDay key={day.date} day={day} index={index} /> : null
                        
                )): null}
            </div>
            <h3>Today's logs</h3>
            <div className={styles.history}>
                {goalLogs && goalLogs.length > 0 ? goalLogs.map((log, index)=>(
                    <div className={styles['log-body']} key={'log-' + index}>
                        <img className={"small-icon"} src={IconLibrary.Goals} alt='' />
                        <p className={styles['log-name']}>{log.name || goalData.name}</p>
                        <p className={styles['log-value']}>{`${log.data.value} ${log.data.unit || ''}`}</p>
                        <p className={styles['log-time']}>{getHourFromTimestamp(log.timestamp)}</p>
                    </div>
                )) : <p>No logs today</p>}
            </div>
        </div>
     );
    }
    
}
 
export default ViewGoal;


const TargetDay = ({day, index, goalData}) =>{
    return (
        <div key={'Past-logs-'+index} className={styles.pastDay}>
            <h4>{makeDateNice(day.date)}</h4>
            <p>{day.logs && day.logs.length > 0 ? day.logs.reduce((sum, item)=>sum + item.data.value, 0): 0}/{goalData.target}</p>
            <p>{Math.floor((day.logs && day.logs.length > 0 ? day.logs.reduce((sum, item) => sum + item.data.value, 0) : 0) / goalData.target * 100)}%</p>
        </div>
    )
}
const NumberDay = ({ day, index, pastCompletion }) => {
    const todayValue = day?.logs?.[0]?.data?.value ?? 0;

    // Get the previous day's value (next index since days are in order [today, -1, -2])
    const prevDay = pastCompletion[index + 1];
    const prevValue = prevDay?.logs?.[0]?.data?.value ?? null;

    let diffText = 'N/A';
    if (prevValue !== null && prevValue !== 0) {
        const diff = todayValue - prevValue;
        const percent = Math.floor(Math.abs(diff / prevValue) * 100);
        diffText = diff > 0 ? `+${percent}%` : diff < 0 ? `-${percent}%` : '0%';
    }

    return (
        <div key={day.date} className={styles.pastDay}>
            <h4>{makeDateNice(day.date)}</h4>
            <p>{todayValue}</p>
            <p>{diffText}</p>
        </div>
    );
};

const BooleanDay = ({day, index}) =>{
    return (
        <div key={day.date} className={styles.pastDay} style={{gridTemplateColumns: '1fr 50px'}}>
            <h4>{makeDateNice(day.date)}</h4>
            <p>{makeFirstUpperCase(day?.logs[0]?.data?.value) || 'Missed'}</p>
        </div>
    )
}