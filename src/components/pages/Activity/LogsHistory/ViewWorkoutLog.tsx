import { useSelector } from 'react-redux';
import { getDateFromTimestamp, getHourFromTimestamp } from '../../../../helpers';
import { IconLibrary } from '../../../../IconLibrary';
import styles from './LogsHistory.module.css';
import React, { useEffect, useState } from 'react';
import { RootState } from '../../../../store/index.ts';
import { getItemById } from '../../../../db.js';
import { Workout } from '../../../common/interfaces.ts';



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
const ViewWorkoutLog: React.FC<ViewWorkoutLogProps> = ({logData, closeLog}) => {
    const [workout, setWorkout] = useState<Workout | null>(null);

    const getWorkoutData = async () =>{
        try{
            const response = await getItemById('workouts',logData.data.workoutId);
            setWorkout(response);
            console.log(response)
        }catch(error){
            console.error(error)
        }
    };
    useEffect(()=>{getWorkoutData()},[]);

    if(!workout){
        return(<p>Loading...</p>)
    }else{
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
                            <p className={styles['log-timestamp']}>{getDateFromTimestamp(logData.timestamp)} at {getHourFromTimestamp(logData.timestamp)} for {logData.data.duration}</p>
                        </div>
                            <div className={styles['workout-details']}>
                                <div className={styles.infoBlockTags}>
                                    <label>Tags</label>
                                    <div className={styles.tags}>
                                        {workout && workout.tags && workout.tags.length > 0 ? workout.tags.map((item, index)=>(
                                            <div className={styles['tag-body']} key={'tag-log-'+index}>
                                                <div className={styles['tag-color']} style={{backgroundColor: item.color}}></div>
                                                <p>{item.name}</p>
                                            </div>
                                        )): <p>No tags</p>}
                                    </div>
                                </div>
                                <div className={styles.infoBlockGroups}>
                                    <label>Target Muscles</label>
                                    <div className={styles.groups}>
                                        {workout && workout.targetMuscles && workout.targetMuscles.length > 0 ? workout.targetMuscles.map((item, index)=>(
                                            <div className={styles['group']} key={'group-log-'+index}>
                                                <p>{item.name}</p>
                                            </div>
                                        )): <p>No target muscles</p>}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.exercises}>
                                {logData.data.exercises?.map((item,index)=>(
                                    <div className={styles['exercise']} key={'exercise-log-'+index}>
                                        <h4>{item.name}</h4>
                                        <p>{item.sets.filter(item=>item.isCompleted).length}/{item.sets.length} sets</p>
                                        <div className={styles['finished-ex-icon']}>
                                            {item.sets.every(item=>item.isCompleted) ? <img className='small-icon' src={IconLibrary.Checkmark} alt='' /> : null}
                                        </div>
                                    </div>
                                ))}
                            </div>
                    </div>
                </div>
            );
    }
    
}
 
export default ViewWorkoutLog;