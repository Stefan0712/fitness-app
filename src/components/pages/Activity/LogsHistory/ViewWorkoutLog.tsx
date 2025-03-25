import { getDateFromTimestamp, getHourFromTimestamp } from '../../../../helpers';
import { IconLibrary } from '../../../../IconLibrary';
import styles from './LogsHistory.module.css';
import React from 'react';



interface Set{
    fields: Field[];
    isCompleted: boolean;
    isSkipped: boolean;
    order: number;
}
interface Field {
    name: string,
    unit: string,
    value: number,
    target?: number,
    description?: string,
    isCompleted: boolean
}
interface Tag {
    id: string;
    name: string;
    color: string;
    author: string;
}
interface WorkoutExercise {
    exerciseId: string,
    isCompleted: boolean,
    name: string,
    difficulty: string,
    description: string,
    sets: Set[],
    fields: Field[],
    tags: Tag[];
}
interface WorkoutLog{
    id: string,
    timestamp: string,
    type: string,
    name: string,
    icon: string,
    data:{
        duration: string,
        finishedAt: string,
        workoutId: string,
        isCompleted: boolean,
        targetGroup: string[],
        name: string,
        difficulty: string,
        description: string,
        exercises: WorkoutExercise[]
    }
}
interface ViewWorkoutLogProps {
    logData: WorkoutLog;
    closeLog: ()=>void;
}
const ViewWorkoutLog = ({logData, closeLog}) => {
    return ( 
        <div className={styles['view-workout-log']}>
            <div className={styles.top}>
                <h3>View Log</h3>
                <button className='clear-button' onClick={closeLog}><img className='small-icon' src={IconLibrary.Close} alt='close log' /></button>
            </div>
            <div className={styles['log-container']}>
                <div className={styles.meta}>
                    <div className={styles['log-name']}>
                        <img src={logData.icon} className='small-icon' alt=''/>
                        <h3>{logData.name}</h3>
                    </div>
                    <p className={styles['log-timestmap']}>{getDateFromTimestamp(logData.timestamp)} at {getHourFromTimestamp(logData.timestamp)}</p>
                </div>
                <div className={styles['log-content']}>
                    
                </div>
            </div>
        </div>
     );
}
 
export default ViewWorkoutLog;