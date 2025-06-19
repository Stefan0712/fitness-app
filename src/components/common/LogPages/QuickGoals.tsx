import styles from './GoalsLog.module.css';
import Log from './Log/Log.tsx';
import { Goal } from "../interfaces.ts";



interface LogFormProps {
    data: Goal;
    closeLogWindow: () => void;
}



const LogForm: React.FC<LogFormProps> = ({goalData}) => {
    return ( 
        <div className={`${styles['log-form']}`}>
            <div className={styles["top-bar"]}>
                <img src={goalData.icon} style={{width:'20px',height:'20px'}} alt=""/>
                <h1>{goalData?.name }</h1>
            </div>
            <div className={styles.content}>
                <Log goalData={data} />
            </div>
        </div>
    );
    
}
 
export default LogForm;