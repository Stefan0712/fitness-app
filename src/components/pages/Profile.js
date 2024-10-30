import { Link } from "react-router-dom";
import { getDateForHeader } from "../../helpers";
import { useSelector } from "react-redux";
import './stylings/profile.css';






const Profile = () => {

    const userData = useSelector((state)=>state.user.userData);
    {console.log(userData)}

    return ( 
        <div className="profile-page page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Profile</h2>
            </div>
            <div className="profile-info">
                <h4 className="full-width">Name</h4>    
                <h3 className="full-width">{userData.name ? userData.name : 'Not Set'}</h3>
                <h4 className="full-width">Bio</h4>    
                <p className="full-width mb-25">{userData.bio ? userData.bio : 'Bio not set'}</p>
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


                <h2 className="full-width">Daily Goals</h2>
                {userData.goals?.map((goal)=>(
                    <div className="profile-info-block">
                        <img className="small-icon" src={goal.icon}></img>
                        <h4>{goal.name}</h4>    
                        <h3>{goal.target}</h3>
                    </div>
                ))}
                

               
                


               
            </div>

            <Link to={'/edit-profile'} className="orange-button large-button edit-profile-btn">Edit Profile</Link>
        </div>
     );
}
 
export default Profile;