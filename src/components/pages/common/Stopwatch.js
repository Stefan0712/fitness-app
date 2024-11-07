import { useState, useEffect } from "react";
import { formatTime } from "../../../helpers";
import './stylings/stopwatch.css';
import closeIcon from '../../../assets/close.svg';
import minimizeIcon from '../../../assets/minimise.svg';
import maximizeIcon from '../../../assets/maximise.svg';
import playIcon from '../../../assets/start.svg';
import resetIcon from '../../../assets/restart.svg';
import lapIcon from '../../../assets/lap.svg';
import pauseIcon from '../../../assets/pause.svg';

const Stopwatch = ({ closeLogWindow }) => {
    const [laps, setLaps] = useState([]);
    const [isStarted, setIsStarted] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let timer;
        if (isStarted) {
            timer = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isStarted]);

    const handleStart = () => setIsStarted(true);
    const handlePause = () => setIsStarted(false);
    const handleAddLap = () => setLaps((laps) => [...laps, formatTime(seconds)]);
    const handleReset = () => {
        setLaps([]);
        setSeconds(0);
        setIsStarted(false);
    };
    const handleMinimize = () => setIsMinimized(true);
    const handleMaximize = () => setIsMinimized(false);

    return (
        <div className={`stopwatch ${isMinimized ? 'minimized-stopwatch' : ''} ${isHidden ? 'hide-stopwatch' : ''}`}>
            {isHidden ? (
                <div className="hidden-stopwatch-timer" onClick={()=>setIsHidden(false)}>
                    {formatTime(seconds)}
                </div>
            ) : (
                <>
                    <div className="top-bar">
                        {isMinimized ? (
                            <button onClick={handleMaximize}><img src={maximizeIcon} alt="" /></button>
                        ) : (
                            <button onClick={handleMinimize}><img src={minimizeIcon} alt="" /></button>
                        )}
                        <h1>Stopwatch</h1>
                        <button onClick={() => setIsHidden(true)} className="small-icon"><img src="/icons/minus.svg" alt="" /></button>
                        <button onClick={closeLogWindow}><img src={closeIcon} alt="" /></button>
                    </div>
                    <div className="stopwatch-time">
                        {formatTime(seconds)}
                    </div>
                    <h3>Laps</h3>
                    <div className="laps-container">
                        {laps.length > 0 ? laps.map((lap, index) => (
                            <div className="lap" key={index}>
                                <p>Lap {index + 1}.</p>
                                <p>{lap}</p>
                            </div>
                        )) : null}
                    </div>
                    <div className="stopwatch-buttons">
                        <button onClick={handleReset}><img src={resetIcon} alt="" /></button>
                        <button onClick={handleAddLap}><img src={lapIcon} alt="" /></button>
                        {isStarted ? (
                            <button onClick={handlePause}><img src={pauseIcon} alt="" /></button>
                        ) : (
                            <button onClick={handleStart}><img src={playIcon} alt="" /></button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Stopwatch;
