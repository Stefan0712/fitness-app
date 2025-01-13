import styles from './FoodLogInfo.module.css'
import { makeFirstUpperCase } from '../../../helpers';
import { IconLibrary } from '../../../IconLibrary';



const FoodLogInfo = ({data, close}) => {

    const excludedKeys = ["name", "unit", "qty", "type", "note", "time"]; //keys to exclude
    //render everything else from the data as info blocks
    const filteredEntries = Object.entries(data)
        .filter(([key]) => !excludedKeys.includes(key)) // Filter out unwanted keys
        .map(([key, value]) => ({ key, value })); // Map the remaining entries to an object



    return ( 
        <div className={styles['food-log-info']}>
            <div className={styles.name}>
                <h2>{data.name}</h2>
                <button className='clear-button' onClick={close}>
                    <img src={IconLibrary.Close} className='small-icon' alt='close food log info'></img>
                </button>
            </div>
                <div className={styles.meta}>
                    <div className={styles['meta-item']}>
                        <img src={IconLibrary.Time}></img>
                        <p>{data.time}</p>
                    </div>
                    <div className={styles['meta-item']}>
                        <img src={IconLibrary.Meal}></img>
                        <p>{makeFirstUpperCase(data.type)}</p>
                    </div>
                    <div className={styles['meta-item']}>
                        <img src={IconLibrary.Quantity}></img>
                        <p>{data.qty} {makeFirstUpperCase(data.unit)}</p>
                    </div>
                    <div className={`${styles['meta-item']} ${styles['meta-notes']}`}>
                        <img src={IconLibrary.Note}></img>
                        <p>{data.note}</p>
                    </div>
                </div>
                <div className={styles.macros}>
                    {filteredEntries.map((item, index)=>(
                        <div className={styles.macro} key={index}>
                            <p>{makeFirstUpperCase(item.key)}</p>
                            <p>{item.value}</p>
                        </div>
                    ))}
                </div>
                
            </div>
     );
}
 
export default FoodLogInfo;