import { getDateForHeader } from "../../helpers";
import { useNavigate } from "react-router-dom";
import { updateUserData } from "../../store/userSlice";
import { useState } from "react";
import './stylings/editProfile.css';
import { useDispatch } from "react-redux";



const EditProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [name, setName] = useState("")
    const [bio, setBio] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [steps, setSteps] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [calories, setCalories] = useState("");
    const [water, setWater] = useState("");


    const handleSaveProfile = (e) =>{
        e.preventDefault();
        const profileData = {username, name, bio, age, gender, height, weight, goals: {steps, calories, water}};
        dispatch(updateUserData(profileData))
        navigate('/profile')
    }


    return ( 
        <div className="edit-profile-page page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Edit Profile</h2>
            </div>
            <form className="edit-profile-form">
                <h3 className="subtitle full-width">Personal Information</h3>
                <div className="personal-information-container inputs-container">
                    <fieldset>
                        <label>Name</label>
                        <input 
                            type="text"
                            name="name"
                            id="name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            ></input>
                    </fieldset>
                    <fieldset>
                        <label>Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            id="username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </fieldset>
                    <fieldset>
                        <label>Bio</label>
                        <input
                            type="text"
                            name="bio"
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </fieldset>
                </div>
                <h3 className="subtitle full-width">Health Information</h3>
                <div className="health-information-container inputs-container">
                    <fieldset>
                        <label>Age</label>
                        <input
                            type="number"
                            name="age"
                            id="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </fieldset>
                    <fieldset>
                        <label>Gender</label>
                        <input
                            type="text"
                            name="gender"
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        />
                    </fieldset>
                    <fieldset>
                        <label>Height (cm)</label>
                        <input
                            type="number"
                            name="height"
                            id="height"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </fieldset>
                    <fieldset>
                        <label>Weight (kg)</label>
                        <input
                            type="number"
                            name="weight"
                            id="weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </fieldset>
                </div>
                <h3 className="full-width subtitle">Goals</h3> 
                <div className="goals-container inputs-container">
                    <fieldset>
                        <label>Calories</label>
                        <input
                            type="number"
                            name="calories"
                            id="calories"
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                        />
                    </fieldset>
                    <fieldset>
                        <label>Water Intake (L)</label>
                        <input
                            type="number"
                            name="water"
                            id="water"
                            value={water}
                            onChange={(e) => setWater(e.target.value)}
                        />
                    </fieldset>
                    <fieldset>
                        <label>Steps</label>
                        <input
                            type="number"
                            name="steps"
                            id="steps"
                            value={steps}
                            onChange={(e) => setSteps(e.target.value)}
                        />
                    </fieldset>
                </div>
                <button className="orange-button full-width save-button" onClick={handleSaveProfile}>Save</button>
            </form>
        </div>
     );
}
 
export default EditProfile;