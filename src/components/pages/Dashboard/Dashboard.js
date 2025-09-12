// The Dashboard is also the default and home page of the app. It shows a quick overview of user's progress for the current day


//TODO: Bring back the day selector so the user can see progress from past days
//TODO: Add Planned activity section

import styles from './Dashboard.module.css'; 
import { useEffect, useState } from 'react';
import ActivityComponent from './ActivityComponent';
import NutritionComponent from './NutritionComponent';
import AppHeader from '../../common/AppHeader/AppHeader.tsx';
import { getAllItems } from '../../../db.js';
import SmallGoal from './Modules/SmallGoal/SmallGoal.tsx';
import { useUI } from '../../../context/UIContext.jsx';
import { useNavigate } from 'react-router-dom';
import LargeGoal from './Modules/LargeGoal/LargeGoal.tsx';
import { IconLibrary } from '../../../IconLibrary.js';



const Dashboard = () => {
    const snapshots = JSON.parse(localStorage.getItem("snapshots")) || {};
    const {showConfirmationModal} = useUI();
    const navigate = useNavigate();
    
    const [userGoals, setUserGoals] = useState([]);
    
    const getUserGoals = async () =>{
        const response = await getAllItems('goals');
        console.log(response)
        if(response){
            setUserGoals([...response]);
        }
    }
    useEffect(()=>{getUserGoals()},[]);

    // Will delete the snapshot if the user won't restore it when prompted.
    const handleDeleteSnapshot = (type) =>{
        if(type === 'exercise'){
            localStorage.setItem('snapshots', JSON.stringify({exercise: null, workout: snapshots.workout})); 
        }else if(type === 'workout'){
            localStorage.setItem('snapshots', JSON.stringify({exercise: snapshots.exercise, workout: null}));
        }  
    }
    // Handles prompts for restoring snapshots
    useEffect(()=>{
        if(snapshots){
            if(snapshots.exercise){
                showConfirmationModal({title:"Uninished progress found", message: "There is an unfinished exercise. Do you want to continue it?", onConfirm: ()=> navigate(`/exercise/${snapshots.exercise.snapshotId}/restore`), onCancel: ()=> handleDeleteSnapshot('exercise')})
            }else if(snapshots.workout){
                showConfirmationModal({title:"Uninished progress found", message: "There is an unfinished workout. Do you want to continue it?", onConfirm: ()=> navigate(`/workout/${snapshots.workout.snapshotId}/restore`), onCancel: ()=> handleDeleteSnapshot('workout')})
            }
        }
    },[])
    // The warning shown at the top of the page will be removed after I will create a desktop version
    return ( 
        <div className={styles.dashboard}>
            <AppHeader title={'Dashboard'} button={<img onClick={()=>navigate('/edit-dashboard')} className="small-icon" src={IconLibrary.Edit} alt='' />}/>
            <div className={styles['dashboard-content']}>
                <div className={styles['dashboard-warning']}>
                    <h3>Please open Developer Tools and enable Device Emulation for a mobile phone. This app doesn't have a desktop layout yet since it's made only for mobile phones.</h3>
                </div>
            <div className={styles.goalsContainer}>
                {userGoals && userGoals.length > 0 ? userGoals.sort((a, b) => a.order - b.order).map((goal, index)=> goal.pinToDashboard === 'large' ? <LargeGoal key={"dashboard-goal-"+index} goal={goal} /> : goal.pinToDashboard === "small" ? <SmallGoal key={"dashboard-goal-"+index} goal={goal} /> : null) : null}
            </div>
            <ActivityComponent key={'activity'}/>
            <NutritionComponent key={'nutrition'}/>   
            </div>
        </div>
    );
}
 
export default Dashboard;