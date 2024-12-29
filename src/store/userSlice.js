import { createSlice } from '@reduxjs/toolkit';
import { convertTimestampToDate, getCurrentDay } from '../helpers';
import { v4 as uuidv4 } from 'uuid';

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
  activity: {
  },
  preferences: {
    darkMode: true,
    language: 'en',
    unitSystem: 'metric',
  },
  exercises: [
    {
      id: '21407df4-6e45-4276-babf-aaaddc1415fc',
      createdAt: '2024-10-30T18:30:43.057Z',
      sourceID: '',
      updatedAt: null,
      source: 'user-library',
      isFavorite: false,
      isCompleted: false,
      category: {id: '12jkmb-ased21-alc21', name: 'Strength', color: 'red'},
      author: 'Stefan',
      name: 'Biceps Curls',
      description: 'Not set',
      tags: [{id: '12jkmb-12yhl-34ks7', source: 'user', name: 'Arms', color: 'blue'}, {id: 'as3vgb0-a8f-4md907', source: 'system', name: 'Biceps', color: 'red'}, {id: 'as7j-ksdf6-01saik1', source: 'system', name: 'Upper Body', color: 'green'}],
      reference: '',
      targetGroup: 'Arms',
      difficulty: 'Beginner',
      equipment: [{id: '12jkmb-325jj-643hdf', source: 'user', name: "Dubbell", qty: 2, attributes: [{ "type": "weight", "value": 10, "unit": "kg" }, { "type": "length", "value": 1.2, "unit": "m" }]}],
      sets: 3,
      duration: 5,
      visibility: 'private',
      notes: '',
      instructions: ['Hold a dumbbell with your hand fully extended','While keeping the elboy near your body, raise the dumbbell without moving the whole arm','Hold it for two seconds and then slowly lower it back to the starting point'],
      imageUrl: '',
      fields: [
        {
          id: '5e360142-15af-436b-a697-71ff05290f75',
          name: 'Reps',
          description: 'Number of repetitions per set',
          unit: 'reps',
          target: '12',
          type: 'number',
          source: 'system',
          value: null,
          isCompleted: false,
          validation: { "min": 0, "max": 9999 },
          order: 1
        }   
      ],
      
    },
  ],
  workouts: [
    {
      id: '12e66889-7281-4935-bb8c-3e90e6d859c2',
      createdAt: '2024-10-30T18:29:29.131Z',
      sourceId: null,
      updatedAt: null,
      source: 'user-library',
      isFavorite: false,
      isCompleted: false,
      category: {id: '12jkmb-ased21-alc21', source: 'user', name: 'Strength', color: 'red'},
      targetGroup: [{ id: "54sd-64fff-gf32", source: 'system', name: "Arms" },{ id: "547ujj-12kkk-251gh", source: 'user', name: "Arms" }],
      author: 'Stefan',
      name: 'Upper Body Workout',
      description: 'Not set',
      tags: [{id: '12jkmb-12yhl-34ks7', source: 'user', name: 'Arms', color: 'blue'}, {id: 'as3vgb0-a8f-4md907', source: 'user', name: 'Biceps', color: 'red'}, {id: 'as7j-ksdf6-01saik1', source: 'user', name: 'Upper Body', color: 'green'}],
      reference: null,
      difficulty: 'Beginner',
      equipment: [{id: '12jkmb-325jj-643hdf', source: 'user', name: "Dumbbell", qty: 2, attributes: [{ "type": "weight", "value": 10, "unit": "kg" }, { "type": "length", "value": 1.2, "unit": "m" }]}],
      duration: 5,
      visibility: 'private',
      notes: '',
      imageUrl: '',
      difficulty: 'Beginner',
      exercises: [
        { id: '3246-59b9-4kkfe47-affgh3b-hjggkdfgk', order: 1},
        { id: '3aa1a6-59b9-4e47-afasd3b-1866125ae5', order: 2 },
        { id: '3aa618a6-59b9-4e47-af3b-18661f25ae5', order: 3 }],
  }
],
  
  message: null
};

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
      const { workoutId, exerciseId } = action.payload;
      const workout = state.workouts.find(workout => workout.id === workoutId);

      if (workout && !workout.exercises.includes(exerciseId)) {
        workout.exercises.push(exerciseId);
      }
    },

    updateWorkout: (state, action) => {
      const index = state.workouts.findIndex(workout => workout.id === action.payload);
      if (index !== -1) {
        state.workouts[index] = { ...state.workouts[index], ...action.payload };
      }
    }
    ,

    deleteWorkout: (state, action) => {
      state.workouts = state.workouts.filter(workout => workout.id !== action.payload);
    },

    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    saveExerciseToLibrary: (state, action) =>{
      const localCopy = {
        ...action.payload, 
        dbId: action.payload.id,
        id: uuidv4(),
        typed: 'saved'
      };
      state.exercises = [...state.exercises, localCopy];
    },
    saveWorkoutToLibrary: (state, action) =>{
      const localCopy = {
        ...action.payload, 
        dbId: action.payload.id,
        id: uuidv4(),
        typed: 'saved'
      };
      
      state.workouts = [...state.workouts, localCopy];
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
  updatePreferences
} = userSlice.actions;

export default userSlice.reducer;
