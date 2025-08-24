import { IconLibrary } from '../../../IconLibrary';
import styles from './Stopwatch.module.css';


const Stopwatch = ({close}) => {
    return ( 
        <div className={`${styles.stopwatch} slideUpBottom`}>
            <div className={styles.header}>
                <h4>Stopwatch</h4>
                <button onClick={close}><img className='small-icon' src={IconLibrary.Close} alt='' /></button>
            </div>
            <div className={styles.time}>
                <h4>02:36</h4>
                <h2>12:00</h2>
            </div>
            <div className={styles.laps}>
                <div className={styles.lap}>
                    <h4>Lap 1</h4>
                    <b>00:36</b>
                </div>
                <div className={styles.lap}>
                    <h4>Lap 2</h4>
                    <b>01:30</b>
                </div>
            </div>
            <div className={styles.buttons}>
                <button><img src={IconLibrary.Restart} alt='' /></button>
                <button><img src={IconLibrary.Lap} alt='' /></button>
                <button><img src={IconLibrary.Start} alt='' /></button>
            </div>
        </div>
     );
}
 
export default Stopwatch;