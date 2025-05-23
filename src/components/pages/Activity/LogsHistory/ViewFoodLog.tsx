import { deleteItem } from '../../../../db';
import { getDateFromTimestamp, getHourFromTimestamp } from '../../../../helpers';
import { IconLibrary } from '../../../../IconLibrary';
import styles from './LogsHistory.module.css';
import React from 'react';

interface Log{
    _id: string,
    timestamp: string,
    type: string,
    name: string,
    icon: string,
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
interface ViewFoodLogProps {
    logData: Log;
    closeLog: ()=>void;
}
const ViewFoodLog: React.FC<ViewFoodLogProps> = ({logData, closeLog}) => {
    const handleDelete = async () =>{
        await deleteItem('logs', logData._id);
        closeLog();
    }
    return ( 
        <div className={styles['view-food-log']}>
            <div className={styles.top}>
                <div className={styles['log-name']}>
                    <img src={IconLibrary.Food} className='small-icon' alt=''/>
                    <h3>{logData.data.name}</h3>
                </div>
                <button className='clear-button' onClick={closeLog}><img className='small-icon' src={IconLibrary.Close} alt='close log' /></button>
            </div>
            <p className={styles.timestamp}>{logData.data.qty} {logData.data.unit} on {getDateFromTimestamp(logData.timestamp)} at {getHourFromTimestamp(logData.timestamp)}</p>
            <div className={styles['log-details']}>
                <div className={styles.infoBlock}>
                    <label>Calories</label>
                    <p className={styles.infoBlockValue}>{logData.data.calories ? `${logData.data.calories} kcal` : 'Unset'}</p>
                </div>
                <div className={styles.infoBlock}>
                    <label>Protein</label>
                    <p className={styles.infoBlockValue}>{logData.data.protein ? `${logData.data.protein} g` : "Unset"}</p>
                </div>
                <div className={styles.infoBlock}>
                    <label>Carbs</label>
                    <p className={styles.infoBlockValue}>{logData.data.carbs ? `${logData.data.carbs} g` : "Unset"}</p>
                </div>
            </div>
            <div className={styles['log-details']}>
                <div className={styles.infoBlock}>
                    <label>Fats</label>
                    <p className={styles.infoBlockValue}>{logData.data.fats ? `${logData.data.fats} g` : 'Unset'}</p>
                </div>
                <div className={styles.infoBlock}>
                    <label>Sugar</label>
                    <p className={styles.infoBlockValue}>{logData.data.sugar ? `${logData.data.sugar} g` : "Unset"}</p>
                </div>
                <div className={styles.infoBlock}>
                    <label>Sodium</label>
                    <p className={styles.infoBlockValue}>{logData.data.sodium ? `${logData.data.sodium} mg` : "Unset"}</p>
                </div>
            </div>
            <div className={styles.description}>
                <label>Description</label>
                <p className={styles.infoBlockValue}>{logData.data.note || "No notes"}</p>
            </div>
            <button onClick={handleDelete} className={styles.deleteLogButton}>Delete log</button>
        </div>
     );
}
 
export default ViewFoodLog;