import { useSelector } from "react-redux";
import { getCurrentDay } from "../../../../helpers";
import LogItem from "../LogItem";
import styles from './History.module.css';



interface Icon {
    icon: string;
    name: string;
}
interface Data {
    name: string;
    description?: string;
    time: string;
    value: number;
}
interface GoalArrayObject {
    id: string;
    name: string;
    target?: number;
    unit: string;
    icon: Icon
}

interface LogArrayObject {
    icon: Icon;
    data: Data;
    id: string;
    name: string;
    timestamp: string;
    type: string;
}

interface ActivityArray {
    logs: LogArrayObject[];
    goals: GoalArrayObject[];
}

const History = () => {


    const currentDate: string = getCurrentDay();

    const activity = useSelector((state: { user: { activity: { [date: string]: ActivityArray } } }) => state.user.activity[currentDate]);
    const foodLogs = activity?.logs.filter((item)=>item.type==='food');

        
    return ( 
        <div className={`${styles["logs-history"]}`}>
            {foodLogs?.length > 0 ? foodLogs.map((log, index)=>(
                <LogItem data={log.data} key={'history-item-'+index} />
            )) : 'No food logs'}
        </div>
     );
}
 
export default History;