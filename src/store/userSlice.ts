import { createSlice } from '@reduxjs/toolkit';
import { getCurrentDay } from '../helpers';
import { v4 as uuidv4 } from 'uuid';
import { InitialStateObject } from '../components/common/interfaces';

const initialState: InitialStateObject = {
  userData: {
    firstRun: 'true',
    name: '',
    username: '',
    _id: "",
    email: '',
    createdAt: '',
    friends: [],
    followers: [],
    following: [],
    comments: [],
    posts: [],
    likes: [],
    savedPosts: [],
    age: 0,
    gender: '',
    height: 0,
    weight: 0,
    bio: '',
    isPrivate: false,
    isPremium: true,
    profileSettings: {
      showMyWorkouts: 'private',
      showProfile: 'private',
      showMyExercises: 'private',
      showMyActivity: 'private',
      showMyDetails: 'private',
      showMyPlans: 'private',
      showMyPosts: 'private'
    },
    badges: []
  },  
  preferences: {
    theme: 'dark',
    language: 'en',
    unitSystem: 'metric',
  },
  dashboardSections: [
    {type: 'goal', order: 1, identifier: 'bc8d7239-4396-4cc9-b052-6105e3728a15'},
    {type: 'goal', order: 2, identifier: '3d629850-384e-4adf-95f8-6c8209c3fe1f'},
    {type: 'section', order: 3, identifier: 'activity'},
    {type: 'section', order: 4, identifier: 'nutrition'}
  ]
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => ({ ...state, ...action.payload }),
    updateUserData: (state, action) => {
      const newData = action.payload;
      const newUserData = {
        ...state.userData,
        ...newData,
        _id: uuidv4(),
        firstRun: false,
        createdAt: getCurrentDay(),
        
      }
      state.userData = newUserData;
    },

  
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
  updateDashboardLayout: (state, action) =>{
    state.dashboardSections = action.payload;
  },
    reset: () => initialState,
    resetProfile: (state) =>{
      state.userData = initialState.userData;
    },
    updateProfileOnLogin: (state, action) =>{
      state.userData = {
        ...state.userData,
        ...action.payload,
        profileSettings: {
          ...state.userData.profileSettings,
          ...(action.payload.profileSettings || {})
        }
      }
    }
  }
  
});

export const {
  reset,
  setUserData,
  updateUserData,
  updatePreferences,
  updateDashboardLayout,
  resetProfile,
  updateProfileOnLogin
} = userSlice.actions;

export default userSlice.reducer;
