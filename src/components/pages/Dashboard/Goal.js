import styles from './Goal.module.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { convertFullDate, getCurrentDay } from '../../../helpers';
import { startOfWeek, addDays, format } from 'date-fns';
import { IconLibrary } from '../../../IconLibrary';




const Goal = ({data}) => {

    const logs = useSelector((state)=>state.user?.activity[getCurrentDay()]?.logs?.filter(item=>item.id === data.id));
    const [currentWeek, setCurrentWeek] = useState([]);




    const getCurrentWeek = () => {
        const today = new Date();
        return Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(today, { weekStartsOn: 1 }), i));
    };
    useEffect(()=>{setCurrentWeek(getCurrentWeek())},[]);


    return ( 
        <div className={styles.goal}>
            <div className={styles.header}>
                <img className={styles.icon} src={data.icon.icon}></img>
                <h3>{data.name}</h3>
                <p>{logs?.reduce((sum, obj)=>sum + parseInt(obj.data.value,10),0) || 0}/{data.target}</p>
            </div>
            <div className={styles.days}>
                {currentWeek?.map((date, index)=>{
                    return (<div className={`${styles.day} ${getCurrentDay() === convertFullDate(date) ? styles.selected : ''}`} key={index}>
                            <div className={styles['day-circle']} key={index} style={{'--completion': 70 * 3.6}}>
                                <img className={styles.checkmark} src={IconLibrary.Checkmark} alt=''></img>
                            </div>
                            <p>{format(date, 'E')[0]+format(date, 'E')[1]+format(date, 'E')[2]}</p>
                        </div>)
                })}
            </div>
        </div>
     );
}
 
export default Goal;