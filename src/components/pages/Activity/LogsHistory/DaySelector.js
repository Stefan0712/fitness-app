import styles from './LogsHistory.module.css';

const DaySelector = ({weekData, selectDay, selectedDay}) => {

    return ( 
        <div className={styles['day-selector']}>
            {weekData && weekData.length > 0 ? (
                <div className={styles["day-selector-container"]}>
                    {weekData.map((item, index)=>(
                        <div className={`${styles['day-body']} ${selectedDay === item.date ? styles['selected-day'] : ''}`} key={'day-'+index+1} onClick={()=>selectDay(item.date)}>
                            {console.log(item)}
                            <p className={styles['day-name']}>{item.short}</p>
                            <p className={styles['day-number']}>{item.day}</p>
                        </div>
                    ))}
                </div>
            ) : <p>Failed to initialize Day Selector</p>}
        </div>
     );
}
 
export default DaySelector;