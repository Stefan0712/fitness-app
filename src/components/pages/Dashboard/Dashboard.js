import styles from './Dashboard.module.css'; 
import { useEffect, useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import ActivityComponent from './ActivityComponent';
import NutritionComponent from './NutritionComponent';
import AppHeader from '../../common/AppHeader/AppHeader.tsx';
import { getAllItems } from '../../../db.js';
import SmallGoal from './Modules/SmallGoal/SmallGoal.tsx';
import { useUI } from '../../../context/UIContext.jsx';
import { useNavigate } from 'react-router-dom';



const Dashboard = () => {
    const snapshots = JSON.parse(localStorage.getItem("snapshots")) || {};
    const {showConfirmationModal} = useUI();
    const navigate = useNavigate();
    
    const [userGoals, setUserGoals] = useState([]);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 800);
    
    const getUserGoals = async () =>{
        const response = await getAllItems('goals');
        if(response){
            setUserGoals([...response]);
        }
    }
    useEffect(()=>{getUserGoals()},[])

    const handleDeleteSnapshot = (type) =>{
        console.log("Deleted snapshot: ",type);
        if(type === 'exercise'){
            localStorage.setItem('snapshots', JSON.stringify({exercise: null, workout: snapshots.workout})); 
        }else if(type === 'workout'){
            localStorage.setItem('snapshots', JSON.stringify({exercise: snapshots.exercise, workout: null}));
        }
        
    }
    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 800);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(()=>{
        if(snapshots){
            if(snapshots.exercise){
                showConfirmationModal({title:"Uninished progress found", message: "There is an unfinished exercise. Do you want to continue it?", onConfirm: ()=> navigate(`/exercise/${snapshots.exercise.snapshotId}/restore`), onCancel: ()=> handleDeleteSnapshot('exercise')})
            }else if(snapshots.workout){
                showConfirmationModal({title:"Uninished progress found", message: "There is an unfinished workout. Do you want to continue it?", onConfirm: ()=> navigate(`/workout/${snapshots.workout.snapshotId}/restore`), onCancel: ()=> handleDeleteSnapshot('workout')})
            }
        }
    },[])

    return ( 
        <div className={`${styles.dashboard} page`}>
            <AppHeader title={'Dashboard'} button={<button className={styles.editButton} onClick={()=>navigate('/edit-dashboard')}><img className='small-icon' src={IconLibrary.Edit} alt='edit dashboard' /></button>} />
            <div className={styles['dashboard-content']}>
                <div className={styles['dashboard-warning']}>
                    <h3>Please open Developer Tools and enable Device Emulation for a mobile phone. This app doesn't have a desktop layout yet since it's made only for mobile phones.</h3>
                </div>
            <div className={styles.goalsContainer}>
                {userGoals && userGoals.length > 0 ? userGoals.filter(item=>item.pinToDashboard).map((goal, index)=><SmallGoal key={"dashboard-goal-"+index} goal={goal} />) : null}
            </div>
            <ActivityComponent key={'activity'} isSmallScreen={isSmallScreen}/>
            <NutritionComponent key={'nutrition'} isSmallScreen={isSmallScreen}/>   
            </div>
        </div>
     );
}
 
export default Dashboard;