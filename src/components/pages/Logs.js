import { useSelector } from "react-redux";



const Logs = () => {

    const activity = useSelector((state)=>state.user.activity)
    return ( 
        <div className="logs page">
            <h1>Activity</h1>
            {activity?.map((log)=><>{log.name}{log.type}</>)}
        </div>
     );
}
 
export default Logs;