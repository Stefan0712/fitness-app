import styles from './FoodLogInfo.module.css'
import { makeFirstUpperCase } from '../../../helpers';
import { IconLibrary } from '../../../IconLibrary';
import {muscles} from '../../../constants/defaultMuscles';



const ExerciseLogView = ({data, close}) => {

    const findMuscleName = (value) =>{
        return muscles.find(item =>item.value === value).name;
    }

    return ( 
        <div className={styles['log-info']}>
            <div className={styles.name}>
                <h2>{data.name}</h2>
                <button className='clear-button' onClick={close}>
                    <img src={IconLibrary.Close} className='small-icon' alt='close exercise log info'></img>
                </button>
            </div>
                <div className={styles.meta}>
                    <div className={styles['meta-item']}>
                        <img src={IconLibrary.Time}></img>
                        <p>{data.time}</p>
                    </div>
                    <div className={styles['meta-item']}>
                        <img src={IconLibrary.Meal}></img>
                        <p>{findMuscleName(data.targetGroup)}</p>
                    </div>
                    <div className={styles['meta-item']}>
                        <img src={IconLibrary.Time}></img>
                        <p> {data.duration}</p>
                    </div>
                    <div className={`${styles['meta-item']} ${styles['meta-notes']}`}>
                        <img src={IconLibrary.Note}></img>
                        <p>{data.note}</p>
                    </div>
                </div>
                <div className={styles.fields}>
                    {filteredEntries.map((item, index)=>(
                        <div className={styles.field} key={index}>
                            <p>{makeFirstUpperCase(item.key)}</p>
                            <p>{item.value}</p>
                        </div>
                    ))}
                </div>
                
            </div>
     );
}
 
export default ExerciseLogView;