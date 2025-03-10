import styles from './Goal.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {getCurrentDay, getDateFromTimestamp, getHourFromTimestamp } from '../../../helpers';
import { IconLibrary } from '../../../IconLibrary';
import useCurrentWeekLogs from './useCurrentWeekLogs';
import { updateDashboardLayout } from '../../../store/userSlice';




const Goal = ({data,showMessage}) => {

    const logs = useSelector((state)=>state.user?.activity[getCurrentDay()]?.logs?.filter(item=>item.id === data.id));
    const currentWeeksLogs = useCurrentWeekLogs();
    const dispatch = useDispatch();
    const dashboardSections = useSelector((state)=>state.user.dashboardSections);
    const [currentWeek, setCurrentWeek] = useState([]);

    const [isHistoryExpanded, setIsHistoryExpanded] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 800);




    useEffect(()=>{
        const weeksData = currentWeeksLogs?.map(item=>({logs: item.logs,date: item.date, dayName: item.shortDayName, completion: getCompletionRates(item.logs)}));
        setCurrentWeek(weeksData);
    },[]);
    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 800);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getCompletionRates = (logs) =>{
        

        if(logs && logs.length > 0){
            return Math.round(logs.filter(item=>item.id===data.id).reduce((sum, obj)=> sum + parseInt(obj.data.value || 0, 10), 0)/data.target*100);
        }else{
            return 0;
        }
    }
    const hideGoal = () =>{
        dispatch(updateDashboardLayout(dashboardSections.filter(item=>item.identifier != data.id)));
        showMessage({message: `${data.name} was hidden`, type: 'success'});
    }
    return ( 
        <div className={`${styles.goal} ${isHistoryExpanded ? styles['expand-goal'] : ''}`} onClick={()=>setIsHistoryExpanded(isHistoryExpanded=>!isHistoryExpanded)}>
            {showMenu ? (
                <div className={styles.menu}>
                    <button type='button' className='clear-button' onClick={hideGoal}>Hide</button>
                    <button type='button' className='clear-button' onClick={()=>setShowMenu(false)}>Cancel</button>
                </div>
            ):null}
            <div className={styles.header}>
                <img className={styles.icon} src={data.icon.icon}></img>
                <h3>{data.name}</h3>
                <p>{logs?.reduce((sum, obj)=>sum + parseInt(obj.data.value,10),0) || 0}/{data.target}</p>
                <button className='clear-button' onClick={()=>setShowMenu(true)}><img src={IconLibrary.Hide} className='small-icon' alt='' /></button>
            </div>
            <div className={styles.days}>
                {currentWeek?.map((item, index)=>{
                    return (
                        <div className={`${styles.day} ${getCurrentDay() === item.date ? styles.selected : ''}`} key={index}>
                            <div className={styles['day-circle']} key={index} style={{'--completion': item.completion * 3.6}}>
                                <img className={styles.checkmark} src={IconLibrary.Checkmark} alt=''></img>
                            </div>
                            <p>{item.dayName}</p>
                        </div>
                    )
                })}
            </div>
            <div className={`${styles.history} ${isHistoryExpanded ? styles['expand-history'] : ''}`}>
                <div className={styles['history-container']}>
                    {logs && logs?.length > 0 ? logs.map((item,index)=>(
                         <div className={styles.log} key={index}>
                            <p>{item.data.value} {data.unit} at {getHourFromTimestamp(item.timestamp)} on {getDateFromTimestamp(item.timestamp)}</p>
                            <p>{Math.round((item.data.value/data.target)*100)}%</p>
                         </div>
                    )) : <p>No logs found</p>}
                </div>
            </div>
        </div>
     );
}
 
export default Goal;