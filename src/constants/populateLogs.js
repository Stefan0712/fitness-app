import ObjectID from "bson-objectid";
import { saveItem } from "../db";
import { units } from "./units";
import { IconLibrary } from "../IconLibrary";


const getCurrentTime = (input) => {
    const date = typeof input === "string" ? new Date(input) : input;
    const hours = String(date.getHours()).padStart(2, '0'); // Ensure 2-digit hours
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Ensure 2-digit minutes
    return `${hours}:${minutes}`;
};


export const addLog = async (goalId) =>{
    const today = new Date();
    const dateObject = new Date(today); // make a copy of today
    dateObject.setDate(today.getDate() - 2); // substract one day
    const logData = {
        type: 'goal', 
        goalId: goalId, // Ref of the logged goal
        _id: ObjectID().toHexString(),
        title: `Weight Log`, 
        icon: IconLibrary.Weight,
        timestamp: dateObject,
        data: {
            value: 60,
            time: getCurrentTime(dateObject),
            description: "This log was added via a script",
            name: "Test LOG",
            unit: units.find(item=>item.shortLabel === 'kg'),
            date: dateObject.toISOString().split('T')[0],
            type: 'number'
                        }
    }
    console.log(logData)
    await saveItem('logs', logData);
}
