import styles from './Settings.module.css';
import { useDispatch } from 'react-redux';
import { reset, resetProfile } from '../../../store/userSlice.ts';
import React from 'react';
import { getDateForHeader } from '../../../helpers.js';


const Settings = () => {

    const dispatch = useDispatch();

    const handleStoreReset = () =>{
        dispatch(reset());
    }
    const handleResetProfile = () =>{
        dispatch(resetProfile());
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
            </div>
        </div>
    );
}
 
export default Settings;