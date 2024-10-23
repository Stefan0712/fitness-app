import { createSlice } from '@reduxjs/toolkit';
import { getCurrentDay } from '../helpers';


const initialState = {
  userId: null,
  firstTime: true,
  
  userData: {
    dailyGoals: [
      {name: 'calories', targetValue: 0, unit:'kcal', icon: 'calories.svg'},
      {name: 'water', targetValue: 0, unit:'L', icon: 'water.svg'},
      {name: 'steps', targetValue: 0, unit: 'steps', icon: 'steps.svg'}
    ],
    name: '',
    username: '',
    age: null,
    gender: '',
    height: null,
    weight: null,
    bio:'',
  },
  activity: [],
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
    updateUserData: (state, action) => {
      // Update userData with the new values from the payload
      state.userData = { ...state.userData, ...action.payload };
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
    updateDailyGoals: (state, action) => {
      const { goal } = action.payload;
      const date = getCurrentDay();
      // If no entry exists for the date, create one
      if (!state.activity[date]) {
        state.activity[date] = {
          date,
          logs: [goal],
          dailyGoals: state.userData.dailyGoals.map(item => ({
            ...item,
            currentValue: item.name === goal.name ? goal.value : 0
          }))
        };
      } else {
        // Update the existing entry for today
        const existingGoals = state.activity[date].dailyGoals;
    
        // Find the specific goal in today's activity and update it
        const goalIndex = existingGoals.findIndex(g => g.name === goal.name);
        if (goalIndex !== -1) {
          existingGoals[goalIndex].currentValue = goal.value;
        } else {
          existingGoals.push({ ...goal, currentValue: goal.value });
        }
    
        // Also add to the logs
        state.activity[date].logs.push(goal);
      }
    }
    ,    
    addLog: (state, action) => {
      const { date, log } = action.payload; // `log` will contain type, value, timestamp, etc.
    
      const existingDayIndex = state.activity.findIndex(item => item.date === date);
      const timestamp = new Date().toISOString(); // For log timestamp
    
      if (existingDayIndex !== -1) {
        // Append the log to today's logs
        state.activity[existingDayIndex].logs.push({
          ...log,
          timestamp,
        });
      } else {
        // Create a new day entry with the log
        state.activity.push({
          date,
          logs: [{
            ...log,
            timestamp,
          }],
          dailyGoals: [], // No daily goals if only logging other activities
        });
      }
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
    addCreatedWorkout: (state, action) => {
      // Assuming the payload includes the workout's ID, no need to generate one
      state.createdWorkouts.push(action.payload); // Add the new workout to the list
    },

    // Reducer for editing an existing workout
    editWorkout: (state, action) => {
      const { id, updatedWorkout } = action.payload; // Payload should include workout id and updated details
      const index = state.createdWorkouts.findIndex(workout => workout.id === id);
      if (index !== -1) {
        state.createdWorkouts[index] = {
          ...state.createdWorkouts[index],
          ...updatedWorkout, // Merge the existing workout with the updated details
        };
      }
    },

    // Reducer for deleting a workout
    deleteWorkout: (state, action) => {
      const workoutId = action.payload; // Payload is the ID of the workout to delete
      state.createdWorkouts = state.createdWorkouts.filter(workout => workout.id !== workoutId);
    },
    addSavedExercise: (state, action) => {
      state.savedExercises.push(action.payload);
    },
    addLog: (state, action) => {
      state.logs.push(action.payload);
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    reset(state) {
      return initialState;
    }
  }
});

export const { reset, setUserData, addCreatedExercise, updateDailyGoals, updateUserData, deleteCreatedExercise, editCreatedExercise, removeSavedExercice, addSavedExercise, addCreatedWorkout, addLog, updatePreferences } = userSlice.actions;
export default userSlice.reducer;
