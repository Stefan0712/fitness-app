import { Link } from "react-router-dom";
import { getDateForHeader } from "../../helpers";
import { useSelector, useDispatch } from "react-redux";
import './stylings/profile.css';
import { reset } from '../../store/userSlice';
import { IconLibrary } from "../../IconLibrary";
import ContextualMenu from './common/ContextualMenu';
import { useState } from "react";







const Profile = () => {

    const userData = useSelector((state)=>state.user.userData);
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    

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

            <Link to={'/edit-profile'} className="edit-profile-btn">Edit Profile</Link>
            
            {showMenu ? (<ContextualMenu closeMenu={()=>setShowMenu(false)} buttons={[<button className='orange-button large-button' onClick={()=>dispatch(reset())}>Reset Store</button>]} />) : ''}
        </div>
     );
}
 
export default Profile;