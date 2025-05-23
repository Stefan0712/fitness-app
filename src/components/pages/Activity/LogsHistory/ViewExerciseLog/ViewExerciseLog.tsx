import { deleteItem } from '../../../../../db.js';
import { getDateFromTimestamp, getHourFromTimestamp } from '../../../../../helpers.js';
import { IconLibrary } from '../../../../../IconLibrary.js';
import { BaseLog } from '../../../../common/interfaces.ts';
import styles from './ViewExerciseLog.module.css';
import React, { useEffect } from 'react';

interface ViewExerciseLogProps {
    logData: BaseLog;
    closeLog: ()=>void;
}
const ViewExerciseLog: React.FC<ViewExerciseLogProps> = ({logData, closeLog}) => {

    useEffect(()=>console.log(logData),[]);

    const handleDelete = async () =>{
        await deleteItem('logs', logData._id);
        closeLog();
    }
    return ( 
        <div className={styles['view-exercise-log']}>
            <div className={styles.top}>
                <div className={styles['log-name']}>
                    <img src={logData.icon} className='small-icon' alt=''/>
                    <h3>{logData.data.name}</h3>
                </div>
                <button className='clear-button' style={{marginLeft: 'auto'}} onClick={closeLog}><img className='small-icon' src={IconLibrary.Close} alt='close log' /></button>
            </div>
            <p className={styles.timestamp}>{getDateFromTimestamp(logData.timestamp)} at {getHourFromTimestamp(logData.timestamp)} for {logData.data.duration}</p>
            <div className={styles.tags}>
                <div className={styles['tag-body']} key={'tag-icon'}><img src={IconLibrary.Tags} className={styles.sectionIcon} alt=''/></div>
                {logData?.data.tags?.length > 0 ? logData.data.tags.map((item, index)=>(
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
            <div className={styles.targetMuscles}>
                <div className={styles.muscle} key={'muscle-icon'}><img src={IconLibrary.Muscle} className={styles.sectionIcon} alt=''/></div>
                {logData.data && logData.data.targetMuscles && logData.data.targetMuscles.length > 0 ? logData.data.targetMuscles.map((item, index)=>(
                    <div className={styles.muscle} key={'group-log-'+index}>
                        <p>{item.name}</p>
                    </div>
                )): <div className={styles.muscle} key={'group-log-none'}><p>None</p></div>}
            </div>
            <h3>Sets</h3>
            <div className={styles.sets}>
                {logData && logData.data.sets && logData.data.sets.length > 0 ? logData.data.sets.map((set, index)=>(
                    <div className={styles.set} key={'Set-'+index}>
                        <p className={styles.setNo}>{index+1}</p>
                        <div className={styles.setFields}>
                            {set.fields && set.fields.length > 0 ? set.fields.map((field, index)=><div key={'Field-'+index+set.order} className={styles.field}>{field.value}/{field.target} {field.unit}</div>) : null}
                        </div>
                        {set.isCompleted ? <img style={{width: '20px', height: '20px'}} src={IconLibrary.Checkmark} alt='' /> : null}
                    </div>
                )) : <p>No sets</p>}

            </div>
            <button onClick={handleDelete} className={styles.deleteLogButton}>Delete log</button>
        </div>
     );
}
 
export default ViewExerciseLog;