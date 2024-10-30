import { createSlice } from '@reduxjs/toolkit';
import { getCurrentDay } from '../helpers';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  userId: uuidv4(),
  userData: {
    goals: [
      // {name: 'calories', targetValue: 0, unit: 'kcal', icon: 'calories.svg' },
      // {name: 'water', targetValue: 0, unit: 'ml', icon: 'water.svg' },
      // {name: 'steps', targetValue: 0, unit: 'steps', icon: 'steps.svg' },
    ],
    name: 'Stefan',
    username: 'Stefanuwu',
    age: 25,
    gender: 'Male',
    height: 180,
    weight: 80,
    bio: 'I swear I am real',
  },
  activity: {},
  preferences: {
    darkMode: false,
    language: 'en',
    unitSystem: 'metric',
  },
  exercises: [],
  workouts: [],
  
};
// const initialState = {
//   userId: null,
//   userData: {
//     goals: [
//       {name: 'calories', targetValue: 0, unit: 'kcal', icon: 'calories.svg' },
//       {name: 'water', targetValue: 0, unit: 'ml', icon: 'water.svg' },
//       {name: 'steps', targetValue: 0, unit: 'steps', icon: 'steps.svg' },
//     ],
//     name: '',
//     username: '',
//     age: null,
//     gender: '',
//     height: null,
//     weight: null,
//     bio: '',
//   },
//   activity: {},
//   preferences: {
//     darkMode: false,
//     language: 'en',
//     unitSystem: 'metric',
//   },
//   exercises: [],
//   workouts: [],
  
// };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => ({ ...state, ...action.payload }),

    addExercise: (state, action) => {
      state.exercises.push(action.payload);
    },

    updateUserData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
    },

    deleteExercise: (state, action) => {
      state.exercises = state.exercises.filter(
        (exercise) => exercise.id !== action.payload
      );
    },

    savePublicExercise: (state, action) => {
      state.exercises.push({...action.payload, type: 'saved'});
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


    editExercise: (state, action) => {
      const index = state.exercises.findIndex(
        (exercise) => exercise.id === action.payload.id
      );
      if (index !== -1) {
        state.exercises[index] = action.payload;
      }
    },

    addWorkout: (state, action) => {
      state.workouts.push(action.payload);
    },

    editWorkout: (state, action) => {
      const { id, updatedWorkout } = action.payload;
      const index = state.workouts.findIndex(workout => workout.id === id);
      if (index !== -1) {
        state.workouts[index] = {
          ...state.workouts[index],
          ...updatedWorkout,
        };
      }
    },

    deleteWorkout: (state, action) => {
      const workoutId = action.payload;
      state.workouts = state.workouts.filter(workout => workout.id !== workoutId);
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
  addExercise,
  updateGoals,
  updateUserData,
  deleteExercise,
  editExercise,
  addWorkout,
  editWorkout,
  deleteWorkout,
  addLog,
  updatePreferences,
} = userSlice.actions;

export default userSlice.reducer;
