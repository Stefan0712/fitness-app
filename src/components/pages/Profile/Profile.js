import { Link } from "react-router-dom";
import { getDateForHeader } from "../../../helpers";
import { useSelector, useDispatch } from "react-redux";
import './profile.css';
import { reset } from '../../../store/userSlice';
import { IconLibrary } from "../../../IconLibrary";
import { useState } from "react";




//TODO: Create the side menu for settings


const Profile = () => {

    const userData = useSelector((state)=>state.user.userData);
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    
    const handleStoreReset = () =>{
        dispatch(reset());
        setShowMenu(false);
    }

    return ( 
        <div className="profile-page page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Profile</h2>
                <button onClick={()=>setShowMenu(true)} className="settings-button">
                    <img src={IconLibrary.Settings} ></img>
                </button>
            </div>
            <img className="profile-image" src={IconLibrary.Profile}></img>
            <h2 className="profile-name">{userData.name ? userData.name : 'Not Set'}</h2>
            <div className="profile-info">
                
                <div className="user-info">
                    <div className="profile-info-block">
                        <h4>Age</h4>    
                        <h3>{userData.age ? userData.age : 'Not Set'}</h3>
                    </div>
                    <div className="profile-info-block">
                        <h4>Gender</h4>    
                        <h3>{userData.gender ? userData.gender : 'Not Set'}</h3>
                    </div>
                    <div className="profile-info-block">
                        <h4>Height</h4>    
                        <h3>{userData.height ? userData.height : 'Not Set'}</h3>
                        
                    </div>
                    <div className="profile-info-block">
                        <h4>Weight</h4>    
                        <h3>{userData.weight ? userData.weight : 'Not Set'}</h3>
                    </div>
                </div>
                <p className="profile-bio">{userData.bio ? userData.bio : 'Bio not set'}</p>

                
                

               
                


               
            </div>

            <div className="settings-side-menu">
                <h2>Settings</h2>
                <div className="buttons-container">
                    <Link to={'/fields'}>Fields </Link>
                </div>
                <button key={'reset-button'} className='orange-button large-button' onClick={handleStoreReset}>Reset Store</button>
            </div>
        </div>
     );
}
 
export default Profile;