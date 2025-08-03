import styles from './Settings.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { reset, updatePreferences } from '../../../store/userSlice.ts';
import React, { useEffect, useState } from 'react';
import { RootState } from '../../../store/index.ts';
import { clearStore, deleteItem, getAllItems } from '../../../db.js';
import { useUI } from '../../../context/UIContext.jsx';
import AppHeader from '../../common/AppHeader/AppHeader.tsx';
import { addLog } from '../../../constants/populateLogs.js';


const Settings = () => {
    // DEV STUFF HERE //

    const [goals, setGoals] = useState([]);

    const getGoals = async () =>{
        const response = await getAllItems('goals');
        if(response && response.length > 0){
            setGoals(response)
        }
    }
    useEffect(()=>{getGoals()},[])




    // IGNORE THIS PART


    const dispatch = useDispatch();
    const preferences = useSelector((state: RootState)=>state.user.preferences);
    const savedUser = localStorage.getItem('user');
    const loggedUser = savedUser ? JSON.parse(savedUser) : null ;
    const {showMessage, showConfirmationModal} = useUI();

    const handleStoreReset = () =>{
        dispatch(reset());
        
    }
    const handleResetProfile = async () =>{
        try{
            await deleteItem('userData', loggedUser._id);
            showMessage("Profile was reset successfully", "success");
        }catch(e){
            console.error(e)
            showMessage('Failed to reset profile', "error")
        }
    }
    const enableLightTheme = () =>{
        dispatch(updatePreferences({...preferences, theme: 'light'}))
    }
    const enableDarkTheme = () =>{
        dispatch(updatePreferences({...preferences, theme: 'dark'}))
    }
    const resetStore = async (storeName) =>{
        try{
            await clearStore(storeName);
            showMessage("Profile was reset successfully", "success");
        }catch(e){
            console.error(e)
            showMessage('Failed to reset profile', "error")
        }
    }
    return ( 
        <div className={styles.settings}>
            <AppHeader title={'Settings'} />
            <div className={styles['settings-container']}>
                
                {goals && goals.length > 0 ? goals.map(goal=><button key={goal._id} className={styles['setting']} onClick={()=>addLog(goal._id)}>Add one {goal.type} log</button>) : null}
                <button key={'reset-button1'} className={styles['setting']} onClick={()=>showConfirmationModal({message: "This will reset your store and cannot be undone", onConfirm: handleStoreReset})}>Reset Store</button>
                <button key={'reset-button2'} className={styles['setting']} onClick={()=>showConfirmationModal({message: "This will reset your profile and cannot be undone", onConfirm: handleResetProfile})}>Reset Profile</button>
                <button className={styles['setting']} onClick={enableLightTheme}>Light Theme</button>
                <button className={styles['setting']} onClick={enableDarkTheme}>Dark Theme</button>
                <button className={styles['setting']} onClick={()=>showConfirmationModal({message: "This will reset your workouts and cannot be undone", onConfirm: ()=>resetStore('workouts')})}>Reset Workouts</button>
                <button className={styles['setting']} onClick={()=>showConfirmationModal({message: "This will reset your exercises and cannot be undone", onConfirm: ()=>resetStore('exercises')})}>Reset Exercises</button>
                <button className={styles['setting']} onClick={()=>showConfirmationModal({message: "This will reset your logs and cannot be undone", onConfirm: ()=>resetStore('logs')})}>Reset Logs</button>
            </div>
        </div>
    );
}
 
export default Settings;