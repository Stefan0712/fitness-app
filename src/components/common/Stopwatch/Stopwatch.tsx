import { useEffect, useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import styles from './Stopwatch.module.css';


const Stopwatch = ({close}) => {

    const [isRunning, setIsRunning] = useState(false);
    const [elapsed, setElapsed] = useState(0); // total elapsed seconds
    const [lastStart, setLastStart] = useState<number | null>(null); 
    const [laps, setLaps] = useState<{ started: number; finished: number }[]>([]);
    const [lapStart, setLapStart] = useState<number | null>(null);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
            if (lastStart !== null) {
                // elapsed = (now - lastStart) + elapsedBeforePause
                const now = Date.now();
                setElapsed(Math.floor((now - lastStart) / 1000));
            }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, lastStart]);

    const start = () => {
        // save the "offset" so resume works correctly
        setLastStart(Date.now() - elapsed * 1000);
        setIsRunning(true);

        if (!lapStart) {
            setLapStart(elapsed);
        }
    };

    const pause = () => {
        setIsRunning(false);
    };

    const reset = () => {
        setIsRunning(false);
        setElapsed(0);
        setLastStart(null);
        setLapStart(null);
        setLaps([]);
    };

    const next = () => {
        if (lapStart !== null) {
            setLaps(prev => [...prev, { started: lapStart, finished: elapsed }]);
            console.log(lapStart, elapsed)
            setLapStart(elapsed); // reset lap start for the next one
            setIsRunning(false);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    return ( 
        <div className={`${styles.stopwatch} slideUpBottom`}>
            <div className={styles.header}>
                <h4>Stopwatch</h4>
                <button onClick={close}><img className='small-icon' src={IconLibrary.Close} alt='' /></button>
            </div>
            <div className={styles.time}>
                <div className={styles.progressCircle} style={{background: `conic-gradient(orange ${((elapsed % 60) / 60) * 360}deg, lightgray 0deg)`}}>
                <div className={styles.progressInner}>
                    <h1>{formatTime(elapsed)}</h1>
                    <h3> +{formatTime(elapsed - laps.reduce((sum, lap)=> sum + (lap.finished - lap.started), 0)) ?? "00:00"}</h3>
                </div>
            </div>
            </div>
            <div className={styles.laps}>
                {laps && laps.length > 0 ? laps.slice().reverse().map((lap, index) =>(
                    <div className={`${styles.lap} ${styles.currentLap}`} key={"Lap-"+index}>
                        <b>{formatTime(lap.finished - lap.started)}</b>
                        <p>{formatTime(lap.started)} - {formatTime(lap.finished)}</p>
                    </div>
                )) : null}
            </div>
            <div className={styles.buttons}>
                <button onClick={reset}><img src={IconLibrary.Restart} alt='' /></button>
                <button onClick={next}><img src={IconLibrary.Next} alt='' /></button>
                <button onClick={()=>isRunning ? pause() : start()}><img src={isRunning ? IconLibrary.Pause : IconLibrary.Start} alt='' /></button>
            </div>
        </div>
     );
}
 
export default Stopwatch;