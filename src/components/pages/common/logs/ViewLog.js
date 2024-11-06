import { formatDate, getCurrentDay } from "../../../../helpers";
import { useDispatch } from "react-redux";
import {removeLog} from '../../../../store/userSlice'

const ViewLog = ({log, closeViewLog}) => {



    const dispatch = useDispatch();




    const handleDelete = () =>{
        dispatch(removeLog(log.timestamp));
        closeViewLog();
    }


    return ( 
        <div className="view-log">
            <div className="view-log-header">
                <h2 className="full-width">{log.name}</h2>
                <img src="/icons/close.svg" className="small-icon" onClick={()=>closeViewLog()} />
            </div>
            {console.log(log)}
            
            <p className="full-width">Logged on {formatDate(log.timestamp)}</p>
            
            {log.type === 'food' ? (
                <div className="food-log-info">
                    <p className="full-width">{log.data.name}</p>
                    <div className="info-block">
                        <p>Qty</p>
                        <p>{log.data.qty || 'Not Set'}</p>
                    </div>
                    <div className="info-block">
                        <p>Unit</p>
                        <p>{log.data.unit || 'Not Set'}</p>
                    </div>
                    <div className="info-block">
                        <p>Type</p>
                        <p>{log.data.type || 'Not Set'}</p>
                    </div>
                    <div className="info-block">
                        <p>Time</p>
                        <p>{log.data.time || 'Not Set'}</p>
                    </div>
                    <div className="info-block">
                        <p>Calories</p>
                        <p>{log.data.calories || 'Not Set'}</p>
                    </div>
                    <div className="info-block">
                        <p>Protein</p>
                        <p>{log.data.protein || 'Not Set'}</p>
                    </div>
                    <div className="info-block">
                        <p>Sugar</p>
                        <p>{log.data.sugar || 'Not Set'}</p>
                    </div>
                    <div className="info-block">
                        <p>Sodium</p>
                        <p>{log.data.sodium || 'Not Set'}</p>
                    </div>
                    <div className="info-block full-width">
                        <p>Notes</p>
                        <p>{log.data.notes || 'Not Set'}</p>
                    </div>
                </div>
            ): ''}
            {log.type === 'goal' ? (
                <div className="goal-log-info">
                    <div className="info-block full-width">
                        <p>Value</p>
                        <p>{log.data.value || 'Not Set'}</p>
                    </div>
                </div>
            ) : ''}



            <button onClick={handleDelete} className="delete-log-button orange-button large-button">Delete Log</button>
        </div>
     );
}
 
export default ViewLog;