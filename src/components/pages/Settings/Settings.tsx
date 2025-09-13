import styles from './Settings.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { reset, updatePreferences } from '../../../store/userSlice.ts';
import React, { useEffect, useState } from 'react';
import { RootState } from '../../../store/index.ts';
import { clearStore, deleteItem, getAllItems } from '../../../db.js';
import { useUI } from '../../../context/UIContext.jsx';
import { addLog } from '../../../constants/populateLogs.js';
import AppHeader from '../../common/AppHeader/AppHeader.tsx';
import Toggle from '../../common/Toggle/Toggle.tsx';
import { IconLibrary } from '../../../IconLibrary.js';
import { Link } from 'react-router-dom';


const Settings = () => {


    const savedUser = localStorage.getItem('user');
    const loggedUser = savedUser ? JSON.parse(savedUser) : null ;
    const dispatch = useDispatch();
    const preferences = useSelector((state: RootState)=>state.user.preferences);
    const {showMessage, showConfirmationModal} = useUI();

    // Values
    const [goals, setGoals] = useState([]);

    const enableLightTheme = () =>{
        dispatch(updatePreferences({...preferences, theme: 'light'}));
        showMessage(`Enabled Light Theme`, "success");
    }
    const enableDarkTheme = () =>{
        dispatch(updatePreferences({...preferences, theme: 'dark'}));
        showMessage(`Enabled Dark Theme`, "success");
    }


    const resetStore = async (storeName) =>{
        try{
            await clearStore(storeName);
            showMessage(`The store with name ${storeName} was reset successfully`, "success");
        }catch(e){
            console.error(e)
            showMessage(`Failed to reset ${storeName}`, "error")
        }
    }
    

    const getGoals = async () =>{
        const response = await getAllItems('goals');
        if(response && response.length > 0){
            setGoals(response)
        }
    }
    useEffect(()=>{getGoals()},[]);

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
    return ( 
        <div className={styles.settings}>
            <AppHeader title='Settings'/>
            <div className={styles.settingsContainer}>
                <h4>Interface settings</h4>
                <div className={styles.section}>
                    <div className={styles.settingButton}>
                        <img className={styles.menuIcon} src={IconLibrary.Settings} alt='' />
                        <p>Dark Theme</p>
                        <Toggle isActive={preferences.theme === 'dark'} turnOn={enableDarkTheme} turnOff={enableLightTheme} />
                    </div>
                    <button className={styles.settingButton}><img className={styles.menuIcon} src={IconLibrary.Settings} alt='' /><p>Small Navbar</p></button>
                    <button className={styles.settingButton}><img className={styles.menuIcon} src={IconLibrary.Settings} alt='' /><p>Setting</p></button>
                </div>
                <h4>App settings</h4>
                <div className={styles.section}>
                    <button className={styles.settingButton}><img className={styles.menuIcon} src={IconLibrary.Settings} alt='' /><p>Backups</p><img className='small-icon' src={IconLibrary.Arrow} alt='' /></button>
                    <Link className={styles.settingButton} to={'/sync'}><img className={styles.menuIcon} src={IconLibrary.Sync} alt='' /><p>Sync</p><img className='small-icon' src={IconLibrary.Arrow} alt='' /></Link>
                    <Link className={styles.settingButton} to={'/import'}><img className={styles.menuIcon} src={IconLibrary.Import} alt='' /><p>Import</p><img className='small-icon' src={IconLibrary.Arrow} alt='' /></Link>
                    <Link className={styles.settingButton} to={'/export'}><img className={styles.menuIcon} src={IconLibrary.Export} alt='' /><p>Export</p><img className='small-icon' src={IconLibrary.Arrow} alt='' /></Link>
                </div>
                <h4>Dev settings</h4>
                <div className={styles.section}>
                    <button className={styles.settingButton} onClick={()=>showConfirmationModal({message: "This will reset your workouts and cannot be undone", onConfirm: ()=>resetStore('workouts')})}><div></div><p>Reset Workouts</p></button>
                    <button className={styles.settingButton} onClick={()=>showConfirmationModal({message: "This will reset your exercises and cannot be undone", onConfirm: ()=>resetStore('exercises')})}><div></div><p>Reset Exercises</p></button>
                    <button className={styles.settingButton} onClick={()=>showConfirmationModal({message: "This will reset your logs and cannot be undone", onConfirm: ()=>resetStore('logs')})}><div></div><p>Reset Logs</p></button>
                    <button key={'reset-button1'} className={styles.settingButton} onClick={()=>showConfirmationModal({message: "This will reset your store and cannot be undone", onConfirm: handleStoreReset})}><div></div><p>Reset Store</p></button>
                    <button key={'reset-button2'} className={styles.settingButton} onClick={()=>showConfirmationModal({message: "This will reset your profile and cannot be undone", onConfirm: handleResetProfile})}><div></div><p>Reset Profile</p></button>
                </div>
                <h4>Testing values</h4>
                <div className={styles.section}>
                    {goals && goals.length > 0 ? goals.map(goal=><button key={goal._id} className={styles.settingButton} onClick={()=>addLog(goal._id)}><div></div><p>Add one {goal.name} log</p></button>) : null}
                </div>
                <div className={styles.section}>
                    <Link className={styles.settingButton} to={'/about'}><img className={styles.menuIcon} src={IconLibrary.Help} alt='' />About</Link>
                    <button className={styles.logoutButton}>Logout</button>
                </div>
                <div className={styles.appVersion}>v0.1.6 - 06-09-2025 18:30</div>
            </div>
        </div>
    );
}
 
export default Settings;
    
