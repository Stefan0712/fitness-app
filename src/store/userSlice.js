import { createSlice } from '@reduxjs/toolkit';


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
      const { date, goals } = action.payload;

      // Check if an entry already exists for today
      const existingDayIndex = state.activity.logs.findIndex(log => log.date === date);

      if (existingDayIndex !== -1) {
        // Update the existing entry
        state.activity.logs[existingDayIndex].goals = { ...state.activity.logs[existingDayIndex].goals, ...goals };
      } else {
        // Create a new entry for today
        state.activity.logs.push({
          date: date,
          goals: goals,
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
