import { getHourFromTimestamp } from '../../../helpers';
import styles from './Dashboard.module.css'; 
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startOfWeek, addDays } from 'date-fns';
import { IconLibrary } from '../../../IconLibrary';
import { Link } from 'react-router-dom';
import ActivityComponent from './ActivityComponent';
import NutritionComponent from './NutritionComponent';
import MessageModal from '../../common/MessageModal/MessageModal.tsx';
import AppHeader from '../../common/AppHeader/AppHeader.tsx';
import { getAllItems } from '../../../db.js';
import SmallGoal from './Modules/SmallGoal/SmallGoal.tsx';



const Dashboard = () => {


    const [userGoals, setUserGoals] = useState([]);

    const getUserGoals = async () =>{
        const response = await getAllItems('goals');
        console.log(response)
        if(response){
            setUserGoals([...response]);
        }
    }
    useEffect(()=>{getUserGoals()},[])
    const dashboardComponents = useSelector((state)=>state.user.dashboardSections);


    const [currentWeek, setCurrentWeek] = useState([])
    

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 800);
    const [message, setMessage] = useState(null);

    const snapshots = JSON.parse(localStorage.getItem("snapshots")) || {};
    const [exerciseSnapshots, setExerciseSnapshots] = useState(snapshots?.exercises?.filter(item=>item.type==='exercise'));
    const [workoutSnapshots, setWorkoutSnapshot] = useState(snapshots?.workouts?.filter(item=>item.type==='workout'))


    const handleDeleteSnapshot = (type, snapshotId) =>{
        console.log("Deleted snapshot: ",type, snapshotId);
        const exSnapshots = type === "exercise" ? exerciseSnapshots.filter(item=>item.snapshotId!==snapshotId) : exerciseSnapshots;
        const workSnapshots = type === "workout" ? workoutSnapshots.filter(item=>item.snapshotId!==snapshotId) : workoutSnapshots;
        setExerciseSnapshots(exSnapshots);
        setWorkoutSnapshot(workSnapshots);
        localStorage.setItem('snapshots', JSON.stringify({exercises: exSnapshots, workouts: workSnapshots})); 
        
    }

    const getCurrentWeek = () => {
        const today = new Date();
        return Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(today, { weekStartsOn: 1 }), i));
    };

    useEffect(()=>{setCurrentWeek(getCurrentWeek())},[])
    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 800);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return ( 
        <div className={`${styles.dashboard} page`}>
            {message ? <MessageModal closeModal={()=>setMessage(null)} type={message.type} message={message.message} bottom={85} /> : null}
            <AppHeader title={'Dashboard'} button={<Link to={'/edit-dashboard'} type='button' className='clear-button'><img className='small-icon' src={IconLibrary.Edit} alt=''/></Link>}/>
            <div className={styles['dashboard-content']}>
                <div className={styles['dashboard-warning']}>
                    <h3>Please open Developer Tools and enable Device Emulation for a mobile phone. This app doesn't have a desktop layout yet since it's made only for mobile phones.</h3>
                </div>
            {exerciseSnapshots && exerciseSnapshots.length > 0 ? <div className={styles.snapshots}>
                <h4>Unfinished activity</h4>
                {exerciseSnapshots.map((item,index)=>(
                <div className={styles.snapshot} key={'snapshot-'+index}>
                    <Link to={`/exercise/${item.snapshotId}/restore`}><h4>{item.name}</h4></Link>
                    <p>{item.progress}%</p>
                    <p>{getHourFromTimestamp(item.timestamp)}</p>
                    <img className='small-icon' onClick={()=>handleDeleteSnapshot('exercise', item.snapshotId)} src={IconLibrary.Close} alt='' />
                </div>
            ))}</div> : null }
            {workoutSnapshots && workoutSnapshots.length > 0 ? <div className={styles.snapshots}>
                <h4>Unfinished activity</h4>
                {workoutSnapshots.map((item,index)=>(
                <div className={styles.snapshot} key={'snapshot-'+index}>
                    <Link to={`/workout/${item.snapshotId}/restore`}><h4>{item.name}</h4></Link>
                    <p>{item.progress}%</p>
                    <p>{getHourFromTimestamp(item.timestamp)}</p>
                    <img className='small-icon' onClick={()=>handleDeleteSnapshot('workout', item.snapshotId)} src={IconLibrary.Close} alt='' />
                </div>
            ))}</div> : null }
            {userGoals && userGoals.length > 0 ? userGoals.map((goal, index)=><SmallGoal key={"dashboard-goal-"+index} goal={goal} />) : null}
            {dashboardComponents && dashboardComponents.length > 0 ? ( dashboardComponents.map((item, index) => {
                    return item.type === 'section' && item.identifier === 'activity' ? <ActivityComponent key={'activity-' + index} isSmallScreen={isSmallScreen}/>
                    : item.type === 'section' && item.identifier === 'nutrition' ? <NutritionComponent key={'nutrition-' + index} isSmallScreen={isSmallScreen}/> : null})) 
                    : null }
            </div>
        </div>
     );
}
 
export default Dashboard;