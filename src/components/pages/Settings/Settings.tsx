import styles from './Settings.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { reset, resetProfile, updatePreferences } from '../../../store/userSlice.ts';
import React from 'react';
import { getDateForHeader } from '../../../helpers.js';
import { RootState } from '../../../store/index.ts';


const Settings = () => {

    const dispatch = useDispatch();
    const preferences = useSelector((state: RootState)=>state.user.preferences)

    const handleStoreReset = () =>{
        dispatch(reset());
    }
    const handleResetProfile = () =>{
        dispatch(resetProfile());
    }
    const enableLightTheme = () =>{
        dispatch(updatePreferences({...preferences, theme: 'light'}))
    }
    const enableDarkTheme = () =>{
        dispatch(updatePreferences({...preferences, theme: 'dark'}))
    }
    return ( 
        <div className={styles.settings}>
            <div className={'header'}>
                <div className={'date'}>{getDateForHeader()}</div>
                <h2>Settings</h2>
            </div>
            <div className={styles['settings-container']}>
                <button key={'reset-button1'} className={styles['setting']} onClick={handleStoreReset}>Reset Store</button>
                <button key={'reset-button2'} className={styles['setting']} onClick={handleResetProfile}>Reset Profile</button>
                <button className={styles['setting']} onClick={enableLightTheme}>Light Theme</button>
                <button className={styles['setting']} onClick={enableDarkTheme}>Dark Theme</button>
            </div>
        </div>
    );
}
 
export default Settings;