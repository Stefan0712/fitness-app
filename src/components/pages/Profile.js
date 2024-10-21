import { Link } from "react-router-dom";
import { getDateForHeader } from "../../helpers";
import { useSelector } from "react-redux";
import './stylings/editProfile.css';






const Profile = () => {

    const userData = useSelector((state)=>state.user.userData);

    return ( 
        <div className="profile page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Profile</h2>
            </div>
            <div className="profile-info">
                <div className="container">
                    <h3>Personal Information</h3>
                    <div className="info">
                        <h4>Name:</h4>
                        <p>{userData.name}</p>
                    </div>
                    <div className="info">
                        <h4>Username:</h4>
                        <p>{userData.username}</p>
                    </div>
                    <div className="info">
                        <h4>Age:</h4>
                        <p>{userData.age}</p>
                    </div>
                    <div className="info">
                        <h4>Gender:</h4>
                        <p>{userData.gender}</p>
                    </div>
                </div>

                <div className="container">
                    <h3>Physical Stats</h3>
                    <div className="info">
                        <h4>Height:</h4>
                        <p>{userData.height} cm</p>
                    </div>
                    <div className="info">
                        <h4>Weight:</h4>
                        <p>{userData.weight} kg</p>
                    </div>
                </div>

                <div className="goals-container">
                    <h3>Bio</h3>
                    <div className="info">
                        <h4>About Me:</h4>
                        <p>{userData.bio}</p>
                    </div>
                </div>
        </div>

            <Link to={'/edit-profile'} className="orange-button large-button">Edit Profile</Link>
        </div>
     );
}
 
export default Profile;