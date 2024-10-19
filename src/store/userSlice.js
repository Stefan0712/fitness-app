import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  name: '',
  username: '',
  age: null,
  gender: '',
  height: null,
  weight: null,
  dailyGoals: {
    calories: 0,
    water: 0,
    steps: 0,
    customGoals: []
  },
  logs: [],
  activity: {
    date: null,
    logs: [],
    goals: [],
    exercises: [],
    workouts: []
  },
  preferences: {
    darkMode: false,
    language: 'en',
    unitSystem: 'metric'
  },
  createdExercises: [],
  savedExercises: [],
  createdWorkouts: [],
  savedWorkouts: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
    addCreatedExercise: (state, action) => {
      state.createdExercises.push(action.payload);
    },
    addSavedExercise: (state, action) => {
      state.savedExercises.push(action.payload);
    },
    addLog: (state, action) => {
      state.logs.push(action.payload);
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    }
  }
});

export const { setUserData, addCreatedExercise, addSavedExercise, addLog, updatePreferences } = userSlice.actions;
export default userSlice.reducer;
