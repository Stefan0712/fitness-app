import { useEffect, useRef, useState } from "react";
import { IconLibrary } from "../../../../IconLibrary.js";

const Rest = ({duration=45}) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    const start = () => {
        if (isRunning) return;
        setIsRunning(true);

        intervalRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    setIsRunning(false);
                    return duration;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const stop = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
    };

    useEffect(() => {
        return () => clearInterval(intervalRef.current); // cleanup
    }, []);



    const restBody ={
        height: '40px',
        width: '100%',
        backgroundColor: 'var(--modal-bg)',
        borderRadius: '10px',
        display: 'grid',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    }
    const startButton ={
        width: '40px',
        height: '40px',
        backgroundColor: 'transparent',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        right: '5px',
        position: 'absolute'
    }

    return ( 
        <div style={restBody}>
            <div style={{width: `${(duration - timeLeft)/duration * 100}%`, height: '100%', backgroundColor: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.1s'}}>
            </div>
            <p style={{width: '100%', height: '40px', display:'flex', alignItems: 'center', justifyContent:'center', position:'absolute', left: '0', top:'0'}}>{timeLeft} s</p>
            <button style={startButton} onClick={()=> isRunning ? stop() : start()}>
                <img src={isRunning ? IconLibrary.Stop : IconLibrary.Start} alt="" style={{width: '15px', height: '15px'}}/>
            </button>
        </div>
     );
}
 
export default Rest;