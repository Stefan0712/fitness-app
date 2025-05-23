import { getDateForHeader } from "../../../helpers.js";
import { useNavigate } from "react-router-dom";
import { updateUserData } from "../../../store/userSlice.ts";
import { useState } from "react";
import styles from './Profile.module.css';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/index.ts";
import React from "react";
import AppHeader from "../../common/AppHeader/AppHeader.tsx";


interface Badges {
    id: string,
    name: string,
    value: number
}

interface userData {
    name?: string,
    username?: string,
    id: string,
    email?: string,
    createdAt: string,
    friends: string[],
    followers: string[],
    following: string[],
    comments: string[],
    posts: string[],
    likes: string[],
    savedPosts: string[],
    age?: number,
    gender?: string,
    height?: number,
    weight?: number,
    bio?: string,
    isPrivate: boolean,
    isPremium: true,
    profileSettings: {
      showEmail: string,
      showPosts: string,
      showDetails: string,
      showProfile: string
    },
    badges: Badges[]
}
const EditProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state: RootState)=>state.user.userData);

    const [username, setUsername] = useState<string>(userData?.username || "");
    const [name, setName] = useState<string>(userData?.name || "")
    const [bio, setBio] = useState<string>(userData?.bio || "");
    const [age, setAge] = useState<string>(typeof userData?.age === 'number' ? userData?.age.toString() : userData?.age || "");
    const [gender, setGender] = useState<string>(userData?.gender || "");
    const [height, setHeight] = useState<string>(typeof userData?.height === 'number' ? userData?.height.toString() : userData?.height || "");
    const [weight, setWeight] = useState<string>( typeof userData?.weight === 'number' ? userData?.weight.toString() : userData?.weight || "");
    const [showEmail, setShowEmail] = useState<string>(userData?.profileSettings.showEmail ?? "false")
    const [showPosts, setShowPosts] = useState<string>(userData?.profileSettings.showPosts ?? "false")
    const [showDetails, setShowDetails] = useState<string>(userData?.profileSettings.showDetails ?? "false")
    const [showProfile, setShowProfile] = useState<string>(userData?.profileSettings.showProfile ?? "false")
    const [email, setEmail] = useState<string>(userData?.email ?? '')


    const handleSaveProfile = (e) =>{
        e.preventDefault();
        const profileData: userData = {
            ...userData,
            username, 
            name, 
            bio, 
            age: typeof age === 'string' ? parseInt(age) : age,
            gender, 
            height: typeof height === 'string' ? parseInt(height) : height, 
            weight: typeof weight === 'string' ? parseInt(weight) : weight
        };
        dispatch(updateUserData(profileData));
        navigate('/profile');
    }

    return ( 
        <div className={styles['edit-profile']}>
            <AppHeader title={'Edit profile'} button={<button className={styles['save-button']} onClick={handleSaveProfile}>Save</button>} />
            <form className={styles["edit-profile-form"]}>
                    <fieldset className={styles.half}>
                        <label>Name</label>
                        <input type="text" name="name"  id="name"  value={name} onChange={(e) => setName(e.target.value)} ></input>
                    </fieldset>
                    <fieldset className={styles.half}>
                        <label>Username</label>
                        <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)}
                        />
                    </fieldset>
                    <fieldset>
                        <label>Bio</label>
                        <input type="text" name="bio" id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
                    </fieldset>
                    <fieldset>
                        <label>Email</label>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </fieldset>
                    <fieldset className={styles.half}>
                        <label>Age</label>
                        <input type="number" name="age" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
                    </fieldset>
                    <fieldset className={styles.half}>
                        <label>Gender</label>
                        <input type="text" name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
                    </fieldset>
                    <fieldset className={styles.half}>
                        <label>Height (cm)</label>
                        <input type="number" name="height" id="height" value={height} onChange={(e) => setHeight(e.target.value)} />
                    </fieldset>
                    <fieldset className={styles.half}>
                        <label>Weight (kg)</label>
                        <input type="number" name="weight" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
                    </fieldset>
                    <div className={styles['profile-settings']}>
                        <fieldset>
                            <label>Details</label>
                            <select name="showEmail" id="showEmail" value={showEmail} onChange={(e) => setShowEmail(e.target.value)}>
                                <option value={"false"} selected>Hide</option>
                                <option value={"true"}>Show</option>
                            </select>
                        </fieldset>
                        <fieldset>
                            <label>Posts</label>
                            <select name="showPosts" id="showPosts" value={showPosts} onChange={(e) => setShowPosts(e.target.value)}>
                                <option value={"false"} selected>Hide</option>
                                <option value={"true"}>Show</option>
                            </select>
                        </fieldset>
                        <fieldset>
                            <label>Activity</label>
                            <select name="showDetails" id="showDetails" value={showDetails} onChange={(e) => setShowDetails(e.target.value )}>
                                <option value={"false"} selected>Hide</option>
                                <option value={"true"}>Show</option>
                            </select>
                        </fieldset>
                        <fieldset>
                            <label>Profile</label>
                            <select name="showProfile" id="showProfile" value={showProfile} onChange={(e) => setShowProfile(e.target.value)}>
                                <option value={"false"} selected>Private</option>
                                <option value={"true"}>Public</option>
                            </select>
                        </fieldset>
                    </div>
                    <div className={styles['profile-settings']}>
                        <fieldset>
                            <label>Workouts</label>
                            <select name="showEmail" id="showEmail" value={showEmail} onChange={(e) => setShowEmail(e.target.value)}>
                                <option value={"false"} selected>Hide</option>
                                <option value={"true"}>Show</option>
                            </select>
                        </fieldset>
                        <fieldset>
                            <label>Exercises</label>
                            <select name="showPosts" id="showPosts" value={showPosts} onChange={(e) => setShowPosts(e.target.value)}>
                                <option value={"false"} selected>Hide</option>
                                <option value={"true"}>Show</option>
                            </select>
                        </fieldset>
                        <fieldset>
                            <label>Plans</label>
                            <select name="showDetails" id="showDetails" value={showDetails} onChange={(e) => setShowDetails(e.target.value )}>
                                <option value={"false"} selected>Hide</option>
                                <option value={"true"}>Show</option>
                            </select>
                        </fieldset>

                    </div>
            </form>
        </div>
     );
}
 
export default EditProfile;