import { deleteItem } from '../../../../../db';
import { getDateFromTimestamp, getHourFromTimestamp } from '../../../../../helpers';
import { IconLibrary } from '../../../../../IconLibrary';
import styles from './ActivityLog.module.css';

const ActivityLog = ({logData, closeLog}) => {

    const handleDelete = async () =>{
        await deleteItem('logs', logData._id);
        closeLog();
    }

    return ( 
        <div className={styles.activityLog}>
            <div className={styles.top}>
                <div className={styles['log-name']}>
                    <img src={logData.icon} className='small-icon' alt=''/>
                    <h3>{logData.name}</h3>
                </div>
                <button className='clear-button' style={{marginLeft: 'auto'}} onClick={closeLog}><img className='small-icon' src={IconLibrary.Close} alt='close log' /></button>
            </div>
            <div className={styles.logContent}>
                <p className={styles.timestamp}>On {getDateFromTimestamp(logData.timestamp)} at {getHourFromTimestamp(logData.timestamp)} for {logData.duration} minutes</p>
                <div className={styles.tags}>
                    <div className={styles.sectionIconContainer} key={'tag-icon'}><img src={IconLibrary.Tags} className={styles.sectionIcon} alt=''/></div>
                    <div className={styles.tagsContainer}>
                        {logData?.tags?.length > 0 ? logData.tags.map((item, index)=>(
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
                <div className={styles.targetMuscles}>
                    <div className={styles.sectionIconContainer} key={'muscle-icon'}><img src={IconLibrary.Muscle} className={styles.sectionIcon} alt=''/></div>
                    <div className={styles.musclesContainer}>
                        {logData && logData.targetMuscles && logData.targetMuscles.length > 0 ? logData.targetMuscles.map((item, index)=>(
                            <div className={styles.muscle} key={'group-log-'+index}>
                                <p>{item.name}</p>
                            </div>
                        )): <div className={styles.muscle} key={'group-log-none'}><p>None</p></div>}
                    </div>
                </div>
                <div className={styles.equipments}>
                    <div className={styles.sectionIconContainer} key={'muscle-icon'}><img src={IconLibrary.Equipment} className={styles.sectionIcon} alt=''/></div>
                    <div className={styles.equipmentContainer}>
                        {logData && logData.equipment && logData.equipment.length > 0 ? logData.equipment.map((item, index)=>(
                            <div className={styles.equipmentBody} key={'equipment-log-'+index}>
                                <p>{item.name}</p>
                            </div>
                        )): <div className={styles.equipmentBody} key={'group-log-none'}><p>None</p></div>}
                    </div>
                </div>
                <h3>Values</h3>
                <div className={styles.values}>
                    {logData?.fields && logData?.fields.length > 0 ? logData.fields.map((field, index)=>(
                        <div className={styles.value} key={'Value-'+index}>
                            <p>{field.name}</p>
                            <p>{field.value} {field.unit.shortLabel}</p>
                        </div>
                    )) : <p>No values</p>}

                </div>
            </div>
            <button onClick={handleDelete} className={styles.deleteLogButton}>Delete log</button>
        </div>
     );
}
 
export default ActivityLog;