import homeIcon from '../../../assets/home.svg';
import libraryIcon from '../../../assets/list.svg';
import plusIcon from '../../../assets/plus.svg';
import logsIcon from '../../../assets/clipboard.svg';
import profileIcon from '../../../assets/profile.svg';
import { Link } from 'react-router-dom';


const Navigation = () => {
    return ( 
        <nav>
            <Link to='/dashboard' className='nav-button'>
                <img src={homeIcon} alt=''></img>
                <p>Home</p>
            </Link>
            <Link to='/library'  className='nav-button'>
                <img src={libraryIcon} alt=''></img>
                <p>Library</p>
            </Link>
            <div className='nav-button center-nav-button'>
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