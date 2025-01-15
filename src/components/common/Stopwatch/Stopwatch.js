import { useState, useEffect } from "react";
import { formatTime } from "../../../helpers";
import './stopwatch.css';
import { IconLibrary } from "../../../IconLibrary";

const Stopwatch = ({ closeMenu }) => {
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
                            <button onClick={handleMaximize}><img src={IconLibrary.Maximize} alt="" /></button>
                        ) : (
                            <button onClick={handleMinimize}><img src={IconLibrary.Minimize} alt="" /></button>
                        )}
                        <h1>Stopwatch</h1>
                        <button onClick={() => setIsHidden(true)} className="small-icon"><img src={IconLibrary.Minus} alt="" /></button>
                        <button onClick={closeMenu}><img src={IconLibrary.Close} alt="" /></button>
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
                        <button onClick={handleReset}><img src={IconLibrary.Restart} alt="" /></button>
                        <button onClick={handleAddLap}><img src={IconLibrary.Lap} alt="" /></button>
                        {isStarted ? (
                            <button onClick={handlePause}><img src={IconLibrary.Pause} alt="" /></button>
                        ) : (
                            <button onClick={handleStart}><img src={IconLibrary.Play} alt="" /></button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Stopwatch;
