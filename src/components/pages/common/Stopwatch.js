import { useState } from "react";
import './stylings/stopwatch.css'
import closeIcon from '../../../assets/close.svg';
import minimizeIcon from '../../../assets/minimise.svg';
import maximizeIcon from '../../../assets/maximise.svg';
import playIcon from '../../../assets/start.svg';
import resetIcon from '../../../assets/restart.svg';
import lapIcon from '../../../assets/lap.svg';
import pauseIcon from '../../../assets/pause.svg';









const Stopwatch = (closeLogWindow) => {

    const [laps, setLaps] = useState(['00:03:00','00:03:15','00:05:00']);
    const [isStarted, setIsStarted] = useState(false);


    const handleStart = () =>{
        setIsStarted(true);
    }
    const handlePause = () =>{
        setIsStarted(false);
    }
    const handleAddLap = () =>{
        setLaps((laps)=>[...laps, '00:09:00']);
    }
    const handleReset = () =>{
        setLaps([]);
    }
    return ( 
        <div className="stopwatch">
            <div className="top-bar">
                <button onClick={closeLogWindow}><img src={minimizeIcon} alt=""></img></button>
                <h1>Stopwatch</h1>
                <button onClick={closeLogWindow}><img src={closeIcon} alt=""></img></button>
            </div>
            <div className="stopwatch-time">
                00:00:01
            </div>
            <h3>Laps</h3>
            <div className="laps-container">
                {laps.length > 0 ? laps.map((lap, index)=>(<div className="lap"><p>Lap {index+1}.</p><p>{lap}</p></div>)) : ''}
            </div>
            <div className="stopwatch-buttons">
                <button onClick={handleReset}><img src={resetIcon} alt=""></img></button>
                <button onClick={handleAddLap}><img src={lapIcon} alt=""></img></button>


                {isStarted ? (<button onClick={handlePause}><img src={pauseIcon} alt=""></img></button>) : (<button onClick={handleStart}><img src={playIcon} alt=""></img></button>)}
                
                
                
            </div>
        </div>
     );
}
 
export default Stopwatch;