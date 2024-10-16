import homeIcon from '../../../assets/home.svg';
import libraryIcon from '../../../assets/list.svg';
import plusIcon from '../../../assets/plus.svg';
import logsIcon from '../../../assets/clipboard.svg';
import profileIcon from '../../../assets/profile.svg';
import { Link } from 'react-router-dom';
import QuickMenu from './QuickMenu';
import { useState } from 'react';
import LogForm from './LogForm';


const Navigation = () => {

    const [showQuickmenu, setShowQuickmenu] = useState(false)
    const [logWindow, setLogWindow] = useState(null)


    const toggleQuickmenu = () =>{
        setShowQuickmenu((showQuickmenu)=>setShowQuickmenu(!showQuickmenu))
    }
    const closeQuickmenu = () => {
        setShowQuickmenu(false)
    }
    const showLog = (buttonData) =>{
        closeQuickmenu();
        setLogWindow(<LogForm data={buttonData} closeLogWindow={hideLog}/>)
    }
    const hideLog = () =>{
        setLogWindow(null);
    }
    return ( 
        <nav>
            {logWindow}
            {showQuickmenu ? (<QuickMenu closeQuickmenu={closeQuickmenu} showLog={showLog} />) : ''}
            <Link to='/dashboard' className='nav-button'>
                <img src={homeIcon} alt=''></img>
                <p>Home</p>
            </Link>
            <Link to='/library'  className='nav-button'>
                <img src={libraryIcon} alt=''></img>
                <p>Library</p>
            </Link>
            <div className='nav-button center-nav-button' onClick={toggleQuickmenu}>
                <button className='background'>
                    <img src={plusIcon} alt=''></img>
                </button>
            </div>
            <Link to='/logs'  className='nav-button'>
                <img src={logsIcon} alt=''></img>
                <p>Logs</p>
            </Link>
            <Link to='/profile'  className='nav-button'>
                <img src={profileIcon} alt=''></img>
                <p>Profile</p>
            </Link>
            
        </nav>
     );
}
 
export default Navigation;