import styles from './History.module.css';
import GoalLogBody from "../GoalLogBody";
import { getCurrentDay } from "../../../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { IconLibrary } from '../../../../IconLibrary';
import { removeLog } from '../../../../store/userSlice.ts';
import MessageModal from '../../MessageModal/MessageModal.tsx';

interface Icon {
    name: string;
    icon: string;
}
interface Data{
    value: number;
    time: string;
    description?: string;
    name: string;
}
interface GoalObject {
    timestamp?: string;
    type: string;
    id: string;
    name: string;
    icon: Icon;
    data: Data;
}
interface GoalData {
    id: string;
    name: string;
    unit: string;
    target?: number;
    icon: Icon;
}
interface SelectedLogObject {
    id: string;
    timestamp: string;
}
interface MessageObject{
    message: string;
    type: string;
}
const History = ({id}) => {
    const allLogs = useSelector<GoalObject[]>((state)=>state.user.activity[getCurrentDay()]?.logs);
    const dispatch = useDispatch();
    const goalLogs: GoalObject[] = allLogs?.filter((item) => item.id === id) ?? [];

    const goalData = useSelector<GoalData | undefined>((state)=>state.user.goals.find((element)=>element.id === id));
    const [currentValue, setCurrentValue] = useState();
    const [selectedLog, setSelectedLog] = useState<SelectedLogObject | unknown>(null);

    const [message, setMessage] = useState<MessageObject | null>(null);

    useEffect(() => {
        
        if (goalLogs && goalLogs.length > 0) {
            const totalValue: number = goalLogs.reduce((sum, log) => sum + Number(log.data.value), 0);
            setCurrentValue(totalValue);
        } else {
            setCurrentValue(0);
        }
    }, [goalLogs]);
    
    const getCurrentTime = (input: Date | string = new Date()): string => {
        // Ensure input is a Date object
        const date = typeof input === "string" ? new Date(input) : input;
    
        // Extract hours and minutes
        const hours = String(date.getHours()).padStart(2, '0'); // Ensure 2-digit hours
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Ensure 2-digit minutes
    
        // Return the time in HH:MM format
        return `${hours}:${minutes}`;
    };
    const handleDeleteLog = () =>{
        if(selectedLog){
            dispatch(removeLog(selectedLog.timestamp));
            setSelectedLog(null);
            setMessage({type: 'success', message: "Log deleted"});
        }
    }
    const handleSelectLog = (id, timestamp) =>{
        setSelectedLog(id, timestamp);
    }
    return ( 
        <div className={styles.history}>
            {message ? <MessageModal closeModal={()=>setMessage(null)} type={message.type} message={message.message} /> : null}
            <div className={styles.header}>
                <div className={styles.progress}>
                    <p>{currentValue} / {goalData.target} {goalData.unit}</p>
                    <div className={styles['progress-background']}>
                        <div className={styles['progress-bar']} style={{ width: `${(currentValue / goalData.target) * 100}%` }}></div>
                    </div>
                </div>
                <div className={styles.deleteButtonContainer}>
                    {selectedLog ? (
                        <button onClick={handleDeleteLog}><img src={IconLibrary.Delete} alt='' /></button>
                    ) : null}
                </div>
            </div>
            <div className={styles.container}>
                {goalLogs && goalLogs.length > 0 ? goalLogs.map((log, index)=>(
                    <GoalLogBody key={'history-log-'+index} log={log} getCurrentTime={getCurrentTime} unit={goalData.unit} selectedLog={selectedLog} selectLog={handleSelectLog} percentage={(log.data.value / goalData.target) * 100}/>
                )): goalLogs.length === 0 ? <p className={styles["no-items-msg"]}>No goals found.</p> : !goalLogs ? <p className={styles["no-items-msg"]}>Loading goals...</p> : null}
            </div>
            
        </div>
     );
}
 
export default History;