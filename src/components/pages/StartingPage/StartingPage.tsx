import { getDateForHeader } from "../../../helpers";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from './StartingPage.module.css';
import React from "react";
import { createLocalUser } from "../../../auth.ts";
import { useUI } from "../../../context/UIContext.jsx";
import objectId from 'bson-objectid';



interface UserData {
    _id: string,
    name?: string,
    username: string,
    email?: string,
    age?: number,
    gender?: string,
    height?: number,
    weight?: number,
    bio?: string,
}

const StartingPage = () => {
     
    const {showMessage} = useUI();
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [name, setName] = useState<string>("")
    const [bio, setBio] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [height, setHeight] = useState<string>("");
    const [weight, setWeight] = useState<string>("");



    const handleSaveProfile = async () =>{
        if(username && username.length > 0){
            const profileData: UserData = {
                _id: objectId().toHexString(),
                username, 
                name, 
                bio, 
                gender, 
                email, 
                age: parseInt(age), 
                height: parseInt(height), 
                weight: parseInt(weight)
            };
            const response = await createLocalUser(profileData);
            if(response){
                showMessage('Local user created successfully', 'success');
                localStorage.setItem('user',JSON.stringify({_id: profileData._id, username, type: 'local'}));
            }else{
                showMessage('There was a problem creating a local user', 'error')
            }
            navigate('/profile')
        }
    }


    return ( 
        <div className="page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Get Started</h2>
            </div>
            <form className={styles['get-started-form']}>
                <h3 className={styles.category}>Personal Information</h3>
                    <fieldset>
                        <label>Name</label>
                        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                    </fieldset>
                    <fieldset>
                        <label>Username*</label>
                        <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} minLength={0} maxLength={18}/>
                    </fieldset>
                    <fieldset>
                        <label>Email</label>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </fieldset>
                    <fieldset>
                        <label>Bio</label>
                        <input type="text" name="bio" id="bio" value={bio} onChange={(e) => setBio(e.target.value)} maxLength={200}/>
                    </fieldset>
                <h3 className={styles.category}>Health Information</h3>
                <div className={styles['health-information']}>
                    <fieldset>
                        <label>Age</label>
                        <input type="number" name="age" id="age" value={age} onChange={(e) => setAge(e.target.value)}  min={0} max={250}/>
                    </fieldset>
                    <fieldset>
                        <label>Gender</label>
                        <input type="text" name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
                    </fieldset>
                    <fieldset>
                        <label>Height (cm)</label>
                        <input type="number" name="height" id="height" value={height} onChange={(e) => setHeight(e.target.value)} min={0} max={500}/>
                    </fieldset>
                    <fieldset>
                        <label>Weight (kg)</label>
                        <input type="number" name="weight" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} min={0} max={1000}/>
                    </fieldset>
                </div>
                <button type="button" className={styles.submit} onClick={handleSaveProfile}>Save</button>
            </form>
        </div>
     );
}
 
export default StartingPage;