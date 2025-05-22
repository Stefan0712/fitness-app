import { useState } from "react";
import styles from './GoalsLog.module.css';
import Log from './Log/Log.tsx';
import History from './History/History.tsx';
import Edit from './Edit/Edit.tsx';
import { Goal } from "../interfaces.ts";
import { getItemById } from "../../../db.js";



interface LogFormProps {
    data: Goal;
    closeLogWindow: () => void;
}



const LogForm: React.FC<LogFormProps> = ({data}) => {

    
    const [currentScreen, setCurrentScreen] = useState<string>('log');
    const [goalData, setGoalData] = useState(data);

    // Used to refresh goal data
    const getGoalData = async () =>{
        const newData = await getItemById('goals', goalData._id);
        setGoalData(newData);
    }

    if(goalData){

        return ( 
            <div className={`${styles['log-form']}`}>
                <div className={styles["top-bar"]}>
                    <img src={goalData.icon} style={{width:'20px',height:'20px'}} alt=""/>
                    <h1>{goalData?.name }</h1>
                </div>
                <div className={styles['toggle-buttons-container']}>
                    <button className={`${styles['toggle-button']} ${currentScreen === 'log' ? styles['selected-button'] : ''}`} onClick={()=>setCurrentScreen('log')}>Log</button>
                    <button className={`${styles['toggle-button']} ${currentScreen === 'history' ? styles['selected-button'] : ''}`} onClick={()=>setCurrentScreen('history')}>History</button>
                    <button className={`${styles['toggle-button']} ${currentScreen === 'edit' ? styles['selected-button'] : ''}`} onClick={()=>setCurrentScreen('edit')}>Edit</button>
                </div>
                <div className={styles.content}>
                    {currentScreen === 'log' ? <Log setCurrentScreen={setCurrentScreen} goalData={goalData} /> : currentScreen === 'history' ? <History goalData={goalData} /> : currentScreen === 'edit' ? <Edit refreshLogData={getGoalData} goalData={goalData} closeEdit={()=>setCurrentScreen('log')} /> : <Log setCurrentScreen={setCurrentScreen} goalData={goalData} />}
                </div>
            </div>
         );
    }
}
 
export default LogForm;