import { createSlice } from '@reduxjs/toolkit';
import { convertTimestampToDate, getCurrentDay } from '../helpers';
import { v4 as uuidv4 } from 'uuid';
import { defaultCategories } from '../constants/defaultCategories';
import { defaultTargetGroups } from '../constants/defaultTargetGroups';
import {defaultTags} from '../constants/defaultTags';
import { mockExercises } from '../constants/mockExercises';
import { mockWorkouts } from '../constants/mockWorkouts';
import { defaultFields } from '../constants/defaultFields';
import { defaultEquipment } from '../constants/defaultEquipment';
import { exercises, workouts } from '../database';

const initialState = {
  userId: uuidv4(),
  userData: {
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
    ],
    name: 'Stefan',
    username: 'Stefan06',
    age: 25,
    gender: 'Male',
    height: 180,
    weight: 80,
    bio: 'I swear I am real',
  },
  activity: {'2025-01-010': {
    logs: [
      {
        timestamp: '2025-01-010T16:18:05.204Z',
        type: 'goal',
        name: 'Calories',
        data: {
          value: 412
        },
        icon: '/icons/calories.svg'
      },
      {
        timestamp: '2025-01-010T17:30:33.750Z',
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
        timestamp: '2025-01-010T17:31:41.399Z',
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
        timestamp: '2025-01-010T18:35:17.896Z',
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
  fields: [],
  categories: [...defaultCategories],
  targetGroups: [...defaultTargetGroups],
  exercises: [...mockExercises],
  workouts: [...mockWorkouts],
  defaultWorkouts: workouts,
  defaultExercises: exercises,
  message: null
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
      const log = action.payload;
      const date = getCurrentDay();
       

      if (!state.activity[date]) {
        state.activity[date] = { logs: [], goals: state.userData.goals };
      }
      
      state.activity[date].logs.push({
        timestamp,
        name: log.name,
        data: log.data,
        icon: log.icon,
        type: log.type
      });
    },

    removeLog: (state, action) => {
      const timestamp = action.payload;
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
    addTag: (state, action) => {
      console.log(action.payload);
      if (!state.tags.find(tag => tag.id === action.payload.id)) {
         state.tags.push(action.payload); // Prevent duplicates
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
      console.log(action.payload);
      if (!state.equipment.find(item => item.id === action.payload.id)) {
         state.equipment.push(action.payload); // Prevent duplicates
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
  addTag,
  removeTag,
  updateTag,
  addEquipment,
  removeEquipment,
  updateEquipment
} = userSlice.actions;

export default userSlice.reducer;
