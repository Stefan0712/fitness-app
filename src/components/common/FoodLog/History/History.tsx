import { useSelector } from "react-redux";
import { getCurrentDay } from "../../../../helpers";
import LogItem from "../LogItem";
import styles from './History.module.css';
import {RootState} from '../../../../store/index.ts';
import React from "react";


interface BaseLog{
    id: string,
    timestamp: string,
    type: string,
    name: string,
    icon: string,
}
interface FoodLog extends BaseLog{
    data: {
        name: string,
        qty: number,
        unit: string,
        protein: number,
        carbs: number,
        fats: number,
        sugar: number,
        calories: number,
        sodium: number,
        time: string,
        type: string,
        note?: string
    }
}
interface Goal {
    id: string,
    name: string,
    unit: string,
    target: number,
    icon: string,
    color: string
}
interface Activity {
    date: string;
    logs: FoodLog[];
    goals: Goal[]
}
const History = () => {


    const currentDate: string = getCurrentDay();

    const activity = useSelector((state: RootState) => state.user.activity);
    const currentDayIndex = activity.findIndex(item=>item.date === currentDate);
    const activityEntry: Activity = activity[currentDayIndex];
    const foodLogs: FoodLog[] = activityEntry?.logs?.filter((item)=>item.type==='food');

        
    return ( 
        <div className={`${styles["logs-history"]}`}>
            {foodLogs?.length > 0 ? foodLogs.map((log, index)=>(
                <LogItem data={log.data} key={'history-item-'+index} />
            )) : 'No food logs'}
        </div>
     );
}
 
export default History;