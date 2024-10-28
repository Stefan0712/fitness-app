import { createSlice } from '@reduxjs/toolkit';
import { getCurrentDay } from '../helpers';

const initialState = {
  userId: null,
  firstTime: true,
  userData: {
    dailyGoals: [
      {name: 'calories', targetValue: 0, unit: 'kcal', icon: 'calories.svg' },
      {name: 'water', targetValue: 0, unit: 'L', icon: 'water.svg' },
      {name: 'steps', targetValue: 0, unit: 'steps', icon: 'steps.svg' },
    ],
    name: '',
    username: '',
    age: null,
    gender: '',
    height: null,
    weight: null,
    bio: '',
  },
  activity: {},
  preferences: {
    darkMode: false,
    language: 'en',
    unitSystem: 'metric',
  },
  createdExercises: [],
  savedExercises: [],
  createdWorkouts: [],
  savedWorkouts: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => ({ ...state, ...action.payload }),

    addCreatedExercise: (state, action) => {
      state.createdExercises.push(action.payload);
    },

    updateUserData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
    },

    deleteCreatedExercise: (state, action) => {
      state.createdExercises = state.createdExercises.filter(
        (exercise) => exercise.id !== action.payload
      );
    },

    savePublicExercise: (state, action) => {
      state.savedExercises.push(action.payload);
    },

    addLog: (state, action) => {
      const timestamp = new Date().toISOString();
      const log = action.payload;
      const date = getCurrentDay();
      console.log(log);
      if(state.activity[date]){

        state.activity[date]['logs'].push({
          timestamp,
          type: log.type,
          name: log.name,
          data: log.data,
        })
      }else{
        state.activity[date] = {logs: [{
          timestamp,
          type: log.type,
          name: log.name,
          data: log.data,
        }]};
        
      }
   
      
    },

    removeSavedExercise: (state, action) => {
      state.savedExercises = state.savedExercises.filter(
        (exercise) => exercise.id !== action.payload
      );
    },

    editCreatedExercise: (state, action) => {
      const index = state.createdExercises.findIndex(
        (exercise) => exercise.id === action.payload.id
      );
      if (index !== -1) {
        state.createdExercises[index] = action.payload;
      }
    },

    addCreatedWorkout: (state, action) => {
      state.createdWorkouts.push(action.payload);
    },

    editWorkout: (state, action) => {
      const { id, updatedWorkout } = action.payload;
      const index = state.createdWorkouts.findIndex(workout => workout.id === id);
      if (index !== -1) {
        state.createdWorkouts[index] = {
          ...state.createdWorkouts[index],
          ...updatedWorkout,
        };
      }
    },

    deleteWorkout: (state, action) => {
      const workoutId = action.payload;
      state.createdWorkouts = state.createdWorkouts.filter(workout => workout.id !== workoutId);
    },

    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },

    reset: () => initialState,
  },
});

export const {
  reset,
  setUserData,
  addCreatedExercise,
  updateDailyGoals,
  updateUserData,
  deleteCreatedExercise,
  editCreatedExercise,
  removeSavedExercise,
  addSavedExercise,
  addCreatedWorkout,
  editWorkout,
  deleteWorkout,
  addLog,
  updatePreferences,
} = userSlice.actions;

export default userSlice.reducer;
