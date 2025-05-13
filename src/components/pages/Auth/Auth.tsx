import React, {useState} from "react";
import styles from './Auth.module.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Logo from '../../../assets/logo.png';
import { updateProfileOnLogin } from "../../../store/userSlice.ts";
import { useDispatch } from "react-redux";


const Auth = () =>{

    const navigate = useNavigate();
    const dispatch = useDispatch();
    


    const [currentScreen, setCurrentScreen] = useState<string>('starting')

    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);


    const showMessage = (message, type) =>{
        setErrors(prev=>[...prev, message]);
    }

    const login = () =>{
        if(!username || username.length === 0){
            setErrors(prev=>[...prev,'Username cannot be empty']);

        }
        if(!password || password.length === 0){
            setErrors(prev=>[...prev,'Password cannot be empty']);
        }
        if(password && password.length>0 && username && username.length > 0){
            handleLogin();
        }

    }
    const handleLogin = async () =>{
        try{
            const loginData = {username, password};
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, loginData,{ withCredentials: true })
            const user = response.data.user;
            if (user?.id && user?.username && user?.role) {
                localStorage.setItem("userId", user.id);
                localStorage.setItem("username", user.username);
                localStorage.setItem("role", user.role);
                localStorage.setItem("token", response.data.token)
                
                // Double-check if they were saved correctly
                const savedId = localStorage.getItem("userId");
                const savedUsername = localStorage.getItem("username");
                const savedRole = localStorage.getItem("role");
              
                if (savedId && savedUsername && savedRole) {
                    showMessage('Logged in successfuly','success');
                    dispatch(updateProfileOnLogin(response.data.profileData));
                    console.log(response.data.profileData)
                    navigate("/profile");
                } else {
                    showMessage('Something went wrong!','error');
                }
              } else {
                showMessage('Something went wrong!','error');
              }
        } catch (error){
            console.log("Error logging in: ",error);
            if (axios.isAxiosError(error)) {
                if (error.response?.data?.error === "Invalid username or password.") {
                  showMessage("Incorrect username or password", "error");
                } else {
                  showMessage("Something went wrong!", "error");
                }
            } else {
                showMessage("Unexpected error occurred!", "error");
            }
            
        }

    }
    const handleRegister = () =>{
        console.log('register');
    }


    return (
        <div className={styles.authPage}>
            <div className={styles.top}>
                <img className={styles.logo} src={Logo} alt="logo"></img>
                <h2>EasyFit</h2>
            </div>
            {currentScreen === 'login' ? 
                <form className={`${styles['auth-form']} ${`styles.login`}`}>
                    <h2>Login</h2>
                    <fieldset>
                        <label>Username</label>
                        <input type="string" name="username" id="username" onChange={(e)=>setUsername(e.target.value)} value={username} required></input>
                    </fieldset>
                    <fieldset>
                        <label>Password</label>
                        <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} value={password} required></input>
                    </fieldset>
                    <button type="button" className={styles.accentButton} onClick={login}>Login</button>
                    <button type="button" className={styles.darkButton} onClick={()=>setCurrentScreen('starting')}>Back</button>

                </form> 
                : currentScreen === 'register' ? <form className={`${styles['auth-form']} ${`styles.register`}`}>
                <h2>Register</h2>
                <fieldset>
                    <label>Username</label>
                    <input type="string" name="username" id="username" onChange={(e)=>setUsername(e.target.value)} value={username} required></input>
                </fieldset>
                <fieldset>
                    <label>Email</label>
                    <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)} value={email} required></input>
                </fieldset>
                <fieldset>
                    <label>Password</label>
                    <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} value={password} required></input>
                </fieldset>
                <div className={styles.registerButtons}>
                    <button type="button" className={styles.darkButton} onClick={()=>setCurrentScreen('starting')}>Back</button>
                    <button type="button" className={styles.accentButton} onClick={handleRegister}>Register</button>
                </div>
        
            </form> : <div className={styles.starting}>
                
                
                <div className={styles.startingScreenButtons}>
                    <button className={styles.darkButton} onClick={()=>setCurrentScreen('login')}>Login</button>
                    <button className={styles.accentButton} onClick={()=>setCurrentScreen('register')}>Register</button>
                </div>
                <p>Or continue with an <Link to={'/get-started'}>offline account</Link></p>
            </div>}
            
        </div>
    )
}



export default Auth;