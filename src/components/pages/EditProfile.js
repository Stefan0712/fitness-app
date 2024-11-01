import { getDateForHeader } from "../../helpers";
import { useNavigate } from "react-router-dom";
import { updateUserData } from "../../store/userSlice";
import addIcon from '../../assets/plus.svg';
import { useState } from "react";
import './stylings/editProfile.css';
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import IconPicker from "./common/IconPicker";



const EditProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state)=>state.user.userData);

    const [username, setUsername] = useState(userData.username || "");
    const [name, setName] = useState(userData.name || "")
    const [bio, setBio] = useState(userData.bio || "");
    const [age, setAge] = useState(userData.age || "");
    const [gender, setGender] = useState(userData.gender || "");
    const [height, setHeight] = useState(userData.height || "");
    const [weight, setWeight] = useState(userData.weight || "");
    const [goalName, setGoalName] = useState('');
    const [goalUnit, setGoalUnit] = useState('');
    const [goalTarget, setGoalTarget] = useState('');
    const [goalIcon, setGoalIcon] = useState('') //TODO: add a default icon if none is selected
    const [goals, setGoals] = useState(userData.goals.length > 0 ? userData.goals : []);
   


    const handleSaveProfile = (e) =>{
        e.preventDefault();
        const profileData = {id: uuidv4(),username, name, bio, age, gender, height, weight, goals};
        dispatch(updateUserData(profileData));
        navigate('/profile');
    }

    const handleGoalUpdate = (e, name) =>{
        const updatedTarget = e.target.value;
        setGoals((prevGoals) =>
            prevGoals.map((goal) =>
                goal.name === name ? { ...goal, target: updatedTarget } : goal
            )
        );
        
    }
    const addNewGoal = (e) =>{
        e.preventDefault();
        setGoals((goals)=>[...goals, {name: goalName, unit: goalUnit, target: goalTarget, icon: goalIcon}]);
        setGoalName('');
        setGoalUnit('');
        setGoalTarget('');
        setGoalIcon('');
    }
    const handleIcon = (path) =>{
        setGoalIcon(path)
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
                <h3 className="full-width subtitle">Create a new goal</h3> 
                <div className="create-new-goal-container">
                    <IconPicker handleIcon={handleIcon}/>
                    <div className="goal-inputs">
                        <input type="text" className="goal-name full-width input" id="goalName" name="goalName" onChange={(e)=>setGoalName(e.target.value)} placeholder="Goal Name" value={goalName} minLength={1} maxLength={15}></input>
                        <input type="text" className="goal-unit half-width input" id="goalUnit" name="goalUnit" onChange={(e)=>setGoalUnit(e.target.value)} placeholder="Goal Unit" value={goalUnit} minLength={1} maxLength={15}></input>
                        <input type="number" className="goal-target half-width input" id="goalTarget" name="goalTarget" onChange={(e)=>setGoalTarget(e.target.value)} placeholder="Goal Target" value={goalTarget}></input>
                    </div>
                    <button className="medium-square orange-button" onClick={addNewGoal}><img src={addIcon} className="small-icon orange-background"></img></button>
                </div>
                <h3 className="full-width subtitle">Goals</h3> 
                <div className="goals-container inputs-container">
                    {goals.length > 0 ? (
                        goals.map((item)=>(
                           
                        <fieldset key={item.name}>
                             {console.log(item)}
                            <label>{item.name} ({item.unit})</label>
                            <input
                                type="number"
                                name={item.name}
                                id={item.name}
                                value={item.target}
                                onChange={(e) => handleGoalUpdate(e, item.name)}
                            />
                        </fieldset>
                        ))
                    ) : (<p>'No goals created'</p>)}
                    
                    
                </div>
                <button className="orange-button full-width save-button" onClick={handleSaveProfile}>Save</button>
            </form>
        </div>
     );
}
 
export default EditProfile;