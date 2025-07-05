import { useEffect, useState } from 'react';
import styles from './Rest.module.css';
import { IconLibrary } from '../../../../IconLibrary';


interface RestProps {
    rest: number;
    nextSet: () =>void;
    setId: string;
}
const Rest: React.FC<RestProps> = ({rest, nextSet}) => {
    const [seconds, setSeconds] = useState(0);
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        
        if (isStarted) {
            interval = setInterval(() => {
                setSeconds(prev => prev + 1);
            }, 1000);
        }else if(!isStarted && interval !== null) {
            clearInterval(interval);
        }

        return () => {
            if(interval !== null) clearInterval(interval);
        };
    }, [isStarted]);

    useEffect(()=>{
        if(seconds >= rest){
            nextSet();
            setIsStarted(false);
            setSeconds(0);
        }
    },[seconds]);
    return ( 
        <div className={styles.rest}>
            <div className={styles.timerBackground} style={{width: `${Math.min((seconds / rest) * 100, 100)}%`}} />
            <button className={styles.timerButton} onClick={()=>nextSet()}>
                <img src={IconLibrary.Next} alt='skip rest'></img>
            </button>
            <div className={styles.currentProgress}>{seconds} / {rest}s</div>
            <button className={styles.timerButton} onClick={()=>setIsStarted(prev=>!prev)}>
                <img src={isStarted ? IconLibrary.Pause : IconLibrary.Start} alt='pause/start rest'></img>
            </button>
        </div>
     );
}
 
export default Rest;