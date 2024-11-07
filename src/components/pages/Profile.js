import { Link } from "react-router-dom";
import { getDateForHeader } from "../../helpers";
import { useSelector } from "react-redux";
import './stylings/profile.css';
import { reset } from '../../store/userSlice';
import { useDispatch } from "react-redux";






const Profile = () => {

    const userData = useSelector((state)=>state.user.userData);
    const dispatch = useDispatch();

    return ( 
        <div className="profile-page page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Profile</h2>
            </div>
            <div className="profile-info">
                <h1 className="full-width">{userData.name ? userData.name : 'Not Set'}</h1>
                <p className="full-width mb-25 bio">{userData.bio ? userData.bio : 'Bio not set'}</p>
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


                <h2 className="full-width">Goals</h2>
                {userData.goals?.map((goal, index)=>(
                    <div className="goal-body" key={'goal'+index}>
                        <div className="goal-info">
                            <h4>{goal.name}</h4>    
                            <h3>{goal.target}</h3>
                        </div>
                        <img className="small-icon" src={goal.icon}></img>
                    </div>
                ))}
                

               
                


               
            </div>

            <Link to={'/edit-profile'} className="orange-button large-button edit-profile-btn">Edit Profile</Link>
            <button className='orange-button large-button' onClick={()=>dispatch(reset())}>Reset Store</button>

        </div>
     );
}
 
export default Profile;