import { createSlice } from '@reduxjs/toolkit';
import { convertTimestampToDate, getCurrentDay } from '../helpers';
import { v4 as uuidv4 } from 'uuid';
import { defaultCategories } from '../constants/defaultCategories';
import {defaultTags} from '../constants/defaultTags';
import {defaultFields} from '../constants/defaultFields';
import { mockExercises } from '../constants/mockExercises';
import { mockWorkouts } from '../constants/mockWorkouts';
import { exercises, workouts } from '../database';
import { IconLibrary } from '../IconLibrary';

const initialState = {
  userId: uuidv4(),
  userData: {
    goals: [
      { 
        id: 'bc8d7239-4396-4cc9-b052-6105e3728a15',
        name: 'Calories',
        unit: 'kcal',
        target: 1400,
        icon: {name: 'Calories', icon: IconLibrary.Calories}
      },
      {
        id: '3d629850-384e-4adf-95f8-6c8209c3fe1f',
        name: 'Steps',
        unit: 'steps',
        target: 6000,
        icon: {name: 'Steps', icon: IconLibrary.Steps}
      },
      {
        id: '3d629850-384e-4adf-95f8-6c82032ds9c3fe1f',
        name: 'Sleep',
        unit: 'hours',
        target: 8,
        icon: {name: 'Sleep', icon: IconLibrary.Sleep}
      },
      {
        id: '3d68j32850-384e-4adf-95f8-6c8209c3fe1f',
        name: 'Water',
        unit: 'ml',
        target: 250,
        icon: {name: 'Water', icon: IconLibrary.Water}
      }
    ],
    name: 'Stefan',
    username: 'Stefan06',
    age: 25,
    gender: 'Male',
    height: 180,
    weight: 80,
    bio: 'I swear I am real',
  },
  activity: {'2025-01-13': {
    logs: [
      {
        timestamp: '2025-01-013T16:18:05.204Z',
        id: 'bc8d7239-4396-4cc9-b052-6105e3728a15',
        type: 'goal',
        name: 'Calories',
        data: {
          value: 412
        },
        icon: '/icons/calories.svg'
      },
      {
        timestamp: '2025-01-013T17:30:33.750Z',
        type: 'food',
        name: 'Food Log',
        data: {
          name: 'Fried Rice',
          qty: '500',
          unit: 'g',
          protein: '12',
          carbs: '',
          fats: '65',
          sugar: '23',
          calories: '566',
          sodium: '',
          time: '23:34',
          type: 'dinner',
          note: 'Random values lol'
        },
        icon: '/icons/food.svg'
      },
      {
        timestamp: '2025-01-013T17:31:41.399Z',
        name: 'Food Log',
        type: 'food',
        data: {
          name: 'Test',
          qty: '123',
          unit: 'g',
          protein: '',
          carbs: '',
          fats: '',
          sugar: '',
          calories: '',
          sodium: '',
          time: '',
          type: 'unset',
          note: ''
        },
        icon: '/icons/food.svg'
      },
      {
        timestamp: '2025-01-010T13:35:17.896Z',
        name: 'Exercise',
        type: 'activity',
        data: {
          name: 'Push Ups',
          time: '23:37',
          targetGroup: 'chest',
          duration: '15',
          fields: [
            {
              name: 'Reps',
              unit: 'reps',
              value: '12'
            },
            {
              name: 'Sets',
              unit: 'sets',
              value: '3'
            }
          ]
        },
        icon: '/icons/exercise.svg'
      }
    ],
    goals: [
      {
        name: 'Calories',
        id: 'bc8d7239-4396-4cc9-b052-6105e3728a15',
        unit: 'kcal',
        target: '1400',
        icon: '/icons/calories.svg'
      },
      {
        name: 'Steps',
        id: '3d629850-384e-4adf-95f8-6c8209c3fe1f',
        unit: 'steps',
        target: '6000',
        icon: '/icons/steps.svg'
      }
    ]
  },
  '2025-01-09': {
    logs: [
      {
        timestamp: '2025-01-09T00:57:13.500Z',
        name: 'Food Log',
        type: 'food',
        data: {
          name: 'Test food',
          qty: '123',
          unit: 'g',
          calories: '250',
          protein: '',
          carbs: '',
          fats: '',
          sugar: '',
          calories: '',
          sodium: '',
          time: '06:57',
          type: 'dinner',
          note: ''
        },
        icon: '/icons/food.svg'
      },
      {
        timestamp: '2025-01-09T01:00:23.859Z',
        name: 'Food Log',
        type: 'food',
        data: {
          name: 'Hopefully correct food',
          qty: '500',
          unit: 'g',
          protein: '',
          carbs: '',
          fats: '',
          sugar: '',
          calories: '',
          sodium: '',
          time: '04:01',
          type: 'snack',
          note: ''
        },
        icon: '/icons/food.svg',
        type: 'food'
      },
      {
        timestamp: '2025-01-09T17:56:56.434Z',
        name: 'Calories',
        data: {
          value: 500
        },
        icon: '/icons/calories.svg',
        type: 'goal'
      },
      {
        timestamp: '2025-01-09T18:01:33.174Z',
        name: 'Steps',
        data: {
          value: 1200
        },
        icon: '/icons/steps.svg',
        type: 'goal'
      },
      {
        timestamp: '2025-01-09T18:06:55.047Z',
        name: 'Exercise',
        type: 'activity',
        data: {
          name: 'Push-ups',
          time: '10:00',
          targetGroup: 'chest',
          duration: '10',
          fields: [
            {
              name: 'Sets',
              unit: 'sets',
              value: '3'
            },
            {
              name: 'Reps',
              unit: 'reps',
              value: '12'
            }
          ]
        },
        icon: '/icons/exercise.svg',
      }
    ],
    goals: [
      {
        name: 'Calories',
        unit: 'kcal',
        target: '1400',
        icon: '/icons/calories.svg'
      },
      {
        name: 'Steps',
        unit: 'steps',
        target: '6000',
        icon: '/icons/steps.svg'
      }
    ]
  },
'2025-01-08': {
    logs: [
      {
        timestamp: '2025-01-08T12:28:16.530Z',
        name: 'Calories',
        type: 'goal',
        data: {
          value: 300
        },
        icon: '/icons/calories.svg'
      },
      {
        timestamp: '2025-01-08T12:28:22.862Z',
        name: 'Calories', 
        type: 'goal',  
        data: {
          value: 500
        },
       icon: '/icons/calories.svg'
      },
      {
        timestamp: '2025-01-08T12:28:27.669Z',
        name: 'Steps',
        type: 'goal',
        data: {
          value: 400
        },
        icon: '/icons/steps.svg'
      }
    ]
  },
  '2025-01-07': {
    logs: [
      {
        timestamp: '2025-01-07T12:28:16.530Z',
        name: 'Calories',
        type: 'goal',
        data: {
          value: 300
        },
        icon: '/icons/calories.svg'
      },
      {
        timestamp: '2025-01-07T12:28:22.862Z',
        name: 'Steps',
        type: 'goal',
        data: {
          value: 500
        },
        icon: '/icons/steps.svg'
      },
      {
        timestamp: '2025-01-07T12:28:27.669Z',
        name: 'Steps',
        type: 'goal',
        data: {
          value: 400
        },
        icon: '/icons/steps.svg'
      }
    ]
  }
},

  preferences: {
    darkMode: true,
    language: 'en',
    unitSystem: 'metric',
  },
  tags: [...defaultTags],
  fields: [...defaultFields],
  categories: [...defaultCategories],
  exercises: [...mockExercises],
  workouts: [...mockWorkouts],
  defaultWorkouts: workouts,
  defaultExercises: exercises,
  message: null,
  dashboardSections: [
    {type: 'goal', identifier: 'bc8d7239-4396-4cc9-b052-6105e3728a15'},
    {type: 'goal', identifier: '3d629850-384e-4adf-95f8-6c8209c3fe1f'},
    {type: 'section', identifier: 'activity'},
    {type: 'section', identifier: 'nutrition'}
  ]
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => ({ ...state, ...action.payload }),

    addExercise: (state, action) => {
      state.exercises.push({...action.payload, source: 'library'});
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
      state.exercises.push({ ...action.payload, type: 'saved' });
    },

    addLog: (state, action) => {
      const timestamp = new Date().toISOString();
      const date = getCurrentDay();
       
      if (!state.activity[date]) {
        state.activity[date] = { logs: [], goals: state.userData.goals };
      }
      
      state.activity[date].logs.push({
        timestamp,
        ...action.payload
      });
    },

    removeLog: (state, action) => {
      const timestamp = action.payload.timestamp;
      const date = convertTimestampToDate(timestamp);
      if (state.activity[date]) {
        state.activity[date].logs = state.activity[date].logs.filter(
          (item) => item.timestamp !== timestamp
        );
      }
    },

    updateExercise: (state, action) => {
      const index = state.exercises.findIndex(ex => ex.id === action.payload.id);
      if (index !== -1) {
        state.exercises[index] = action.payload;
      }
    },

    addWorkout: (state, action) => {
      state.workouts.push(action.payload);
    },

    addExerciseToWorkout: (state, action) => {
      const { workoutId, exerciseId, source } = action.payload;
      const workout = state.workouts.find(workout => workout.id === workoutId);

      if (workout && !workout.exercises.includes(exerciseId)) {
        workout.exercises.push({source, id:exerciseId});
      }
    },

    updateWorkout: (state, action) => {
      const index = state.workouts.findIndex(workout => workout.id === action.payload.id);
      if (index !== -1) {
        state.workouts[index] = { ...state.workouts[index], ...action.payload };
      }
    },

    deleteWorkout: (state, action) => {
      state.workouts = state.workouts.filter(workout => workout.id !== action.payload);
    },

    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    saveExerciseToLibrary: (state, action) =>{
      const localCopy = {
        ...action.payload, 
        sourceId: action.payload.id,
        id: uuidv4(),
        source: 'database',
        savedAt: new Date().toISOString(),

      };
      state.exercises = [...state.exercises, localCopy];
    },
    saveWorkoutToLibrary: (state, action) =>{
      const localCopy = {
        ...action.payload, 
        sourceId: action.payload.id,
        id: uuidv4(),
        typed: 'saved'
      };
      
      state.workouts = [...state.workouts, localCopy];
    },
    addCustomField: (state, action) =>{
      const customField = {
        ...action.payload,
        id: uuidv4(),
        value: null, 
        isCompleted: false, 
        type: action.payload.type || 'number',
        source: 'user'
      };
      state.fields = [...state.fields, customField]
    },
    deleteCustomField: (state, action) => {
       state.fields = state.fields.filter(field => field.id !== action.payload);
    },  
    updateCustomField: (state, action) =>{
       const index = state.fields.findIndex(field => field.id === action.payload.id);
       if (index !== -1) {
         state.fields[index] = action.payload;
       }
       
    },
    addTag: (state, action) => {
      const data = action.payload
      const newItem = {
        id: data.id || uuidv4(),
        source: 'user'
      };
      if (!state.tags.find(tag => tag.id === action.payload.id)) {
         state.tags.push(newItem); // Prevent duplicates
      }
   },
   removeTag: (state, action) => {
      state.tags = state.tags.filter(tag => tag.id !== action.payload);
   },  
   updateTag: (state, action) =>{
      const index = state.tags.findIndex(tag => tag.id === action.payload.id);
      if (index !== -1) {
        state.tags[index] = action.payload;
      }
      
   },
    addEquipment: (state, action) => {
      const data = action.payload
      const newItem = {
        id: data.id || uuidv4(),
        source: 'user'
      };
      if (!state.equipment.some(item => item.id === action.payload.id)) {// Prevent duplicates
         state.equipment.push(newItem); 
      }
   },
   removeEquipment: (state, action) => {
      state.equipment = state.equipment.filter(item => item.id !== action.payload);
   },
   updateEquipment : (state, action) =>{
      const index = state.equipment.findIndex(eq => eq.id === action.payload.id);
      if (index !== -1) {
        state.equipment[index] = action.payload;
      }
   },
   addGoal: (state, action) => {
     const data = action.payload
     const newItem = {
       id: data.id || uuidv4(),
       source: 'user',
       ...data
     };
     if (!state.userData.goals.some(item => item.id === action.payload.id)) {// Prevent duplicates
        state.userData.goals.push(newItem); 
     }
  },
  removeGoal: (state, action) => {
     state.userData.goals = state.userData.goals.filter(item => item.id !== action.payload);
  },
  uupdateGoal : (state, action) =>{
     const index = state.userData.goals.findIndex(eq => eq.id === action.payload.id);
     if (index !== -1) {
       state.userData.goals[index] = action.payload;
     }
  },
  enableStopwatch: (state) =>{
    state.userData.isStopwatchOn = true;
  },
  disableStopwatch: (state) =>{
    state.userData.isStopwatchOn = false;
  },
  updateDashboardLayout: (state, action) =>{
    state.dashboardSections = action.payload;
  },
    reset: () => initialState,
  },
});

export const {
  reset,
  saveExerciseToLibrary,
  saveWorkoutToLibrary,
  setUserData,
  addExercise,
  updateUserData,
  deleteExercise,
  savePublicExercise,
  updateExercise,
  addWorkout,
  addExerciseToWorkout,
  updateWorkout,
  deleteWorkout,
  addLog,
  removeLog,
  updatePreferences,
  addCustomField,
  updateCustomField,
  deleteCustomField,
  addTag,
  removeTag,
  updateTag,
  addEquipment,
  removeEquipment,
  updateEquipment,
  addGoal,
  updateGoal,
  removeGoal,
  updateDashboardLayout
} = userSlice.actions;

export default userSlice.reducer;
