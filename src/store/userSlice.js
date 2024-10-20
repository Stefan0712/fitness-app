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
    // Deleting a created exercise
    deleteCreatedExercise: (state, action) => {
      state.createdExercises = state.createdExercises.filter(
        (exercise) => exercise.id !== action.payload
      );
    },
    
    // Saving a public exercise
    savePublicExercise: (state, action) => {
      state.savedExercises.push(action.payload);
    },
    
    // Unsaving a public exercise
    removeSavedExercice: (state, action) => {
      state.savedExercises = state.savedExercises.filter(
        (exercise) => exercise.id !== action.payload
      );
    },
    
    // Editing an existing created exercise
    editCreatedExercise: (state, action) => {
      const index = state.createdExercises.findIndex(
        (exercise) => exercise.id === action.payload.id
      );
      if (index !== -1) {
        state.createdExercises[index] = action.payload;
      }
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

export const { setUserData, addCreatedExercise, deleteCreatedExercise, editCreatedExercise, removeSavedExercice, addSavedExercise, addLog, updatePreferences } = userSlice.actions;
export default userSlice.reducer;
