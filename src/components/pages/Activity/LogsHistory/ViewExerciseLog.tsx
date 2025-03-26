import { useSelector } from 'react-redux';
import { getDateFromTimestamp, getHourFromTimestamp } from '../../../../helpers';
import { IconLibrary } from '../../../../IconLibrary';
import styles from './LogsHistory.module.css';
import React, { useEffect } from 'react';
import { RootState } from '../../../../store/index.ts';



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
    target: number,
    description?: string,
    isCompleted: boolean
}
interface Tag {
    id: string;
    name: string;
    color: string;
    author: string;
}
interface TargetGroup {
    id: string;
    name: string;
    author: string;
}
  
interface Equipment {
    id: string;
    name: string;
    attributes?: EquipmentAttributes[];
}
interface EquipmentAttributes {
    name: string;
    value: number;
    unit: string;
}
interface Exercise {
    id: string;
    sourceId: string;
    createdAt: string; 
    updatedAt: string | null;
    author: string;
    isFavorite: boolean;
    isCompleted: boolean;
    name: string;
    description: string;
    reference: string;
    difficulty: string;
    duration: number;
    durationUnit: string;
    rest: number;
    restUnit: string;
    visibility: string;
    fields: Field[];
    notes: string;
    sets: Set[];
    equipment: Equipment[];
    muscleGroups: TargetGroup[];
    tags: Tag[];
}
interface ExerciseLog{
    id: string,
    timestamp: string,
    type: string,
    name: string,
    icon: string,
    data: Exercise
}
interface ViewExerciseLogProps {
    logData: ExerciseLog;
    closeLog: ()=>void;
}
const ViewExerciseLog: React.FC<ViewExerciseLogProps> = ({logData, closeLog}) => {

    useEffect(()=>console.log(logData),[]);
    return ( 
        <div className={styles['view-exercise-log']}>
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
                    <p className={styles['log-timestamp']}>{getDateFromTimestamp(logData.timestamp)} at {getHourFromTimestamp(logData.timestamp)} for {logData.data.duration} minutes</p>
                </div>
                    <div className={styles['workout-details']}>
                        <div className={styles.infoBlockTags}>
                            <label>Tags</label>
                            <div className={styles.tags}>
                                {logData.data && logData.data.tags && logData.data.tags.length > 0 ? logData.data.tags.map((item, index)=>(
                                    <div className={styles['tag-body']} key={'tag-log-'+index}>
                                        <div className={styles['tag-color']} style={{backgroundColor: item.color}}></div>
                                        <p>{item.name}</p>
                                    </div>
                                )): <div className={styles['tag-body']} key={'tag-log-none'}>
                                        <div className={styles['tag-color']}></div>
                                        <p>None</p>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={styles.infoBlockGroups}>
                            <label>Target Muscles</label>
                            <div className={styles.groups}>
                                {logData.data && logData.data.muscleGroups && logData.data.muscleGroups.length > 0 ? logData.data.muscleGroups.map((item, index)=>(
                                    <div className={styles['group']} key={'group-log-'+index}>
                                        <p>{item.name}</p>
                                    </div>
                                )): <div className={styles['group']} key={'group-log-none'}><p>None</p></div>}
                            </div>
                        </div>
                    </div>
                    <h3>Sets</h3>
                    <div className={styles.exercises}>
                        {logData.data.sets &&  Array.isArray(logData.data.sets) && logData.data.sets.length > 0 ? logData.data.sets?.map((item,index)=>(
                            <div className={styles['exercise']} key={'field-log-'+index}>
                                <h4>Set {index+1}</h4>
                                <div className={styles['fields-container']}>
                                    {item.fields && item.fields.length > 0 ? item.fields.map((field,index)=>(
                                        <p className={styles['field-body']} key={'field-'+index}>{field.value} {field.unit}</p>
                                    )): null}
                                </div>
                                <div className={styles['finished-ex-icon']}>
                                    {item.isCompleted ? <img className='small-icon' src={IconLibrary.Checkmark} alt='' /> : null}
                                </div>
                            </div>
                        )) : null}
                        {logData.data.sets && (typeof logData.data.sets ===  "number" || typeof logData.data.sets === 'string') && logData.data.sets > 0 ? [...Array(Number(logData.data.sets) || 0)].map((_, index) =>(
                            <div className={styles['set']} key={'field-log-'+index}>
                                <h4>Set {index+1}</h4>
                                <div className={styles['fields-container']}>
                                    {logData.data.fields && logData.data.fields.length > 0 ? logData.data.fields.map((field,index)=>(
                                        <p className={styles['field-body']} key={'field-'+index}>{field.value} {field.unit}</p>
                                    )): null}
                                </div>
                                <div className={styles['finished-ex-icon']}>
                                    {logData.data.fields.every(field=>field.value >= field.target) ? <img className='small-icon' src={IconLibrary.Checkmark} alt='' /> : null}
                                </div>
                            </div>
                        )) : null}

                    </div>
            </div>
        </div>
     );
}
 
export default ViewExerciseLog;