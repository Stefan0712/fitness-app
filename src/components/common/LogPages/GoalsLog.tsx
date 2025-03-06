import { useState } from "react";
import styles from './GoalsLog.module.css';
import { IconLibrary } from "../../../IconLibrary";
import { useSelector } from "react-redux";
import Log from './Log/Log.tsx';
import History from './History/History.tsx';
import Edit from './Edit/Edit.tsx';



interface LogFormProps {
    id: string;
    closeLogWindow: () => void;
}



const LogForm: React.FC<LogFormProps> = ({id, closeLogWindow}) => {

    
    const [currentScreen, setCurrentScreen] = useState<string>('log');
    const goalData = useSelector<GoalData | undefined>((state)=>state.user.userData.goals.find((element)=>element.id === id));

    return ( 
        <div className={styles['log-form']}>
            <div className={styles["top-bar"]}>
                <h1>{goalData?.name}</h1>
                <button onClick={closeLogWindow}><img src={IconLibrary.Close} alt=""></img></button>
            </div>
            
            <div className={styles['toggle-buttons-container']}>
                <button className={`${styles['toggle-button']} ${currentScreen === 'log' ? styles['selected-button'] : ''}`} onClick={()=>setCurrentScreen('log')}>Log</button>
                <button className={`${styles['toggle-button']} ${currentScreen === 'history' ? styles['selected-button'] : ''}`} onClick={()=>setCurrentScreen('history')}>History</button>
                <button className={`${styles['toggle-button']} ${currentScreen === 'edit' ? styles['selected-button'] : ''}`} onClick={()=>setCurrentScreen('edit')}>Edit</button>
            </div>
            <div className={styles.content}>
                {currentScreen === 'log' ? <Log id={goalData.id} /> : currentScreen === 'history' ? <History id={goalData.id} /> : currentScreen === 'edit' ? <Edit goalId={goalData.id} closeEdit={()=>setCurrentScreen('log')} /> : <Log />}
            </div>

            
        </div>
     );
}
 
export default LogForm;