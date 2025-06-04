import { getDateForHeader, getHourFromTimestamp } from '../../../helpers';
import styles from './Dashboard.module.css'; 
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startOfWeek, addDays } from 'date-fns';
import { IconLibrary } from '../../../IconLibrary';
import Goal from './Goal';
import { updateDashboardLayout } from '../../../store/userSlice.ts';
import { Link } from 'react-router-dom';
import ActivityComponent from './ActivityComponent';
import NutritionComponent from './NutritionComponent';
import MessageModal from '../../common/MessageModal/MessageModal.tsx';
import AppHeader from '../../common/AppHeader/AppHeader.tsx';



const Dashboard = () => {

    const dispatch = useDispatch();

    const [userGoals, setUserGoals] = useState([]);
    const dashboardComponents = useSelector((state)=>state.user.dashboardSections);


    const [currentWeek, setCurrentWeek] = useState([])
    const [menu, setMenu] = useState(null);
    

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

    const hideSection = (sectionName) =>{
        setMessage({message: 'Module hidden', type: 'success'});
        dispatch(updateDashboardLayout(dashboardComponents.filter(s=>s.identifier !== sectionName)));
        setMenu(null);
    }

    

    
    const handleShowMessage = (message) =>{
        setMessage(message);
        console.log("Message function was triggered", message)
    }
    
   
    return ( 
        <div className={`${styles.dashboard} page`}>
            {message ? <MessageModal closeModal={()=>setMessage(null)} type={message.type} message={message.message} bottom={85} /> : null}
            <AppHeader title={'Dashboard'} button={<Link to={'/edit-dashboard'} type='button' className='clear-button'><img className='small-icon' src={IconLibrary.Edit} alt=''/></Link>}/>
            
            {menu ? (
                <div className={styles.menu}>
                    <h3>{menu?.title}</h3>
                    <button type='button' onClick={()=>hideSection(menu.sectionName)}>Hide Section</button>
                    <button type='button' onClick={()=>setMenu(null)}>Cancel</button>
                </div>  
            ) : null}


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
            ))}
                </div> : null }
            {workoutSnapshots && workoutSnapshots.length > 0 ? <div className={styles.snapshots}>
                <h4>Unfinished activity</h4>
                {workoutSnapshots.map((item,index)=>(
                <div className={styles.snapshot} key={'snapshot-'+index}>
                    <Link to={`/workout/${item.snapshotId}/restore`}><h4>{item.name}</h4></Link>
                    <p>{item.progress}%</p>
                    <p>{getHourFromTimestamp(item.timestamp)}</p>
                    <img className='small-icon' onClick={()=>handleDeleteSnapshot('workout', item.snapshotId)} src={IconLibrary.Close} alt='' />
                </div>
            ))}
                </div> : null }
        {dashboardComponents && dashboardComponents.length > 0 ? (
            dashboardComponents.map((item, index) => {
            // For better performance, create a goal map outside the rendering loop if it's needed multiple times
            const goal = userGoals.find(goal => goal.id === item.identifier);

            if (item.type === 'goal' && goal) {
                return <Goal key={'goal-' + index} data={goal} showMessage={handleShowMessage} />;
            }

            if (item.type === 'section') {
                if (item.identifier === 'activity') {
                return <ActivityComponent key={'activity-' + index} isSmallScreen={isSmallScreen} showMessage={handleShowMessage} />;
                }

                if (item.identifier === 'nutrition') {
                return <NutritionComponent key={'nutrition-' + index} isSmallScreen={isSmallScreen} showMessage={handleShowMessage} />;
                }
            }

            return null; // If none of the conditions match, render nothing.
            })
        ) : null}
        </div>

            

        </div>
     );
}
 
export default Dashboard;