import axios from "axios";
import {userData} from './components/common/interfaces.ts';
import objectId from 'bson-objectid';
import { saveUserData } from "./db.js";

// Logout function returns a boolean status
export const logoutUser = async () => {
  let frontendCleared = false;
  let backendCleared = false;

  // Clear localStorage
  try {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    frontendCleared = true;
  } catch (e) {
    console.error("Failed to clear local storage", e);
  }

  // Invalidate session/cookie
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/logout`, null, {
      withCredentials: true,
    });
    backendCleared = true;
  } catch (err) {
    console.error("Backend logout failed", err);
  }

  // Return success status
  return {local: frontendCleared, api: backendCleared};
};
export const isLoggedIn = () => {
  const userId = localStorage.getItem("userId");
  return Boolean(userId);
};
export const getUser = () =>{
  const savedUser = localStorage.getItem('user');
  return savedUser ? JSON.parse(savedUser) : null;
}
interface UserDataProps {
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
export const createLocalUser = async (props: UserDataProps) =>{
  try{
    const now = new Date();
    const userData: userData = {
      firstRun: 'true',
      name: props.name ?? '',
      username: props.username,
      _id: props._id ?? objectId().toHexString(),
      type: 'local',
      isLinked: false,
      linkedTo: '',
      updatedAt: now,
      lastSync: '',
      role: 'user',
      email: props.email ?? '',
      createdAt: now,
      friends: [],
      followers: [],
      following: [],
      comments: [],
      posts: [],
      likes: [],
      savedPosts: [],
      age: props.age ?? 0,
      gender: props.gender ?? '',
      height: props.height ?? 0,
      weight: props.weight ?? 0,
      bio: props.bio ?? '',
      isPrivate: false,
      isPremium: false,
      profileSettings: {
        showMyWorkouts: 'private',
        showProfile: 'private',
        showMyExercises: 'private',
        showMyActivity: 'private',
        showMyDetails: 'private',
        showMyPlans: 'private',
        showMyPosts: 'private',
      },
      badges: [],
    }
    await saveUserData(userData);
    return true
  }catch(e){
    console.error(e);
    return false;
  }
}