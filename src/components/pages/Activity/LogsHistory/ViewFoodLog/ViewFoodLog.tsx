import { deleteItem } from '../../../../../db';
import { getDateFromTimestamp, getHourFromTimestamp } from '../../../../../helpers';
import { IconLibrary } from '../../../../../IconLibrary';
import { FoodLog } from '../../../../common/interfaces';
import styles from './ViewFoodLog.module.css';
import React from 'react';


interface ViewFoodLogProps {
    logData: FoodLog;
    closeLog: ()=>void;
}
const ViewFoodLog: React.FC<ViewFoodLogProps> = ({logData, closeLog}) => {
    const handleDelete = async () =>{
        await deleteItem('logs', logData._id);
        closeLog();
    }
    return ( 
        <div className={styles['view-food-log']}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <img src={IconLibrary.Food} alt=''/>
                    <h3>{logData.name}</h3>
                    <button className='clear-button' onClick={closeLog}><img className='small-icon' src={IconLibrary.Close} alt='close log' /></button>
                </div>
                <p className={styles.timestamp}>{logData.qty} {logData.unit.shortLabel} on {getDateFromTimestamp(logData.timestamp)} at {getHourFromTimestamp(logData.timestamp)}</p>
                <div className={styles['log-details']}>
                    <div className={styles.infoBlock}>
                        <label>Calories</label>
                        <p className={styles.infoBlockValue}>{logData.calories ? `${logData.calories} kcal` : 'Unset'}</p>
                    </div>
                    <div className={styles.infoBlock}>
                        <label>Protein</label>
                        <p className={styles.infoBlockValue}>{logData.protein ? `${logData.protein} g` : "Unset"}</p>
                    </div>
                    <div className={styles.infoBlock}>
                        <label>Carbs</label>
                        <p className={styles.infoBlockValue}>{logData.carbs ? `${logData.carbs} g` : "Unset"}</p>
                    </div>
                </div>
                <div className={styles['log-details']}>
                    <div className={styles.infoBlock}>
                        <label>Fats</label>
                        <p className={styles.infoBlockValue}>{logData.fats ? `${logData.fats} g` : 'Unset'}</p>
                    </div>
                    <div className={styles.infoBlock}>
                        <label>Sugar</label>
                        <p className={styles.infoBlockValue}>{logData.sugar ? `${logData.sugar} g` : "Unset"}</p>
                    </div>
                    <div className={styles.infoBlock}>
                        <label>Sodium</label>
                        <p className={styles.infoBlockValue}>{logData.sodium ? `${logData.sodium} mg` : "Unset"}</p>
                    </div>
                </div>
                <div className={styles.description}>
                    <label>Description</label>
                    <p className={styles.infoBlockValue}>{logData.notes || "No notes"}</p>
                </div>
                <button onClick={handleDelete} className={styles.deleteLogButton}>Delete log</button>
            </div>
        </div>
     );
}
 
export default ViewFoodLog;