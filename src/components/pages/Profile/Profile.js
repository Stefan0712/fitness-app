import { useSelector } from "react-redux";
import './profile.css';
import { IconLibrary } from "../../../IconLibrary";
import AppHeader from '../../common/AppHeader/AppHeader.tsx';
import { Link } from "react-router-dom";






const Profile = () => {

    const userData = useSelector((state)=>state.user.userData);
   



 

    return ( 
        <div className="profile-page page">
            <AppHeader title="Profile" button={<Link style={{textDecoration: 'none'}} to={'/edit-profile'}><img className="small-icon" src={IconLibrary.Edit} alt="edit profile" /></Link>} />
            
            <img className="profile-image" src={IconLibrary.ProfilePlaceholder}></img>
            <h2 className="profile-name">{userData.name || userData.username || 'Name not set'}</h2>
            <p className="profile-bio">{userData.bio ? userData.bio : 'Bio not set'}</p>
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
                

                
                

               
                


               
            </div>

            
        </div>
     );
}
 
export default Profile;