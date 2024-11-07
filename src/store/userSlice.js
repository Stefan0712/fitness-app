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
    username: 'Stefanuwu',
    age: 25,
    gender: 'Male',
    height: 180,
    weight: 80,
    bio: 'I swear I am real',
  },
  activity: {'2024-11-05': {
        logs: [
          {
            timestamp: '2024-11-05T16:18:05.204Z',
            type: 'goal',
            name: 'Calories',
            data: {
              value: 412
            },
            icon: '/icons/calories.svg'
          },
          {
            timestamp: '2024-11-05T17:30:33.750Z',
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
            timestamp: '2024-11-05T17:31:41.399Z',
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
            timestamp: '2024-11-05T18:35:17.896Z',
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
      '2024-11-06': {
        logs: [
          {
            timestamp: '2024-11-06T00:57:13.500Z',
            name: 'Food Log',
            type: 'food',
            data: {
              name: 'Test food',
              qty: '123',
              unit: 'g',
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
            timestamp: '2024-11-06T01:00:23.859Z',
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
            timestamp: '2024-11-06T17:56:56.434Z',
            name: 'Calories',
            data: {
              value: 500
            },
            icon: '/icons/calories.svg',
            type: 'goal'
          },
          {
            timestamp: '2024-11-06T18:01:33.174Z',
            name: 'Steps',
            data: {
              value: 1200
            },
            icon: '/icons/steps.svg',
            type: 'goal'
          },
          {
            timestamp: '2024-11-06T18:06:55.047Z',
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
    '2024-10-31': {
        logs: [
          {
            timestamp: '2024-10-31T12:28:16.530Z',
            name: 'Calories',
            type: 'goal',
            data: {
              value: 300
            },
            icon: '/icons/calories.svg'
          },
          {
            timestamp: '2024-10-31T12:28:22.862Z',
            name: 'Calories', 
            type: 'goal',  
            data: {
              value: 500
            },
           icon: '/icons/calories.svg'
          },
          {
            timestamp: '2024-10-31T12:28:27.669Z',
            name: 'Steps',
            type: 'goal',
            data: {
              value: 400
            },
            icon: '/icons/steps.svg'
          }
        ]
      },
      '2024-10-30': {
        logs: [
          {
            timestamp: '2024-10-30T12:28:16.530Z',
            name: 'Calories',
            type: 'goal',
            data: {
              value: 300
            },
            icon: '/icons/calories.svg'
          },
          {
            timestamp: '2024-10-30T12:28:22.862Z',
            name: 'Steps',
            type: 'goal',
            data: {
              value: 500
            },
            icon: '/icons/steps.svg'
          },
          {
            timestamp: '2024-10-30T12:28:27.669Z',
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
    darkMode: false,
    language: 'en',
    unitSystem: 'metric',
  },
  exercises: [
    {
      id: '21407df4-6e45-4276-babf-aaaddc1415fc',
      type: 'cardio',
      author: '',
      name: 'Biceps Curls',
      description: 'Not Set',
      reference: 'None',
      targetGroup: 'arms',
      difficulty: 'begginer',
      sets: '3',
      duration: '5',
      visibility: 'private',
      fields: [
        {
          id: '5e360142-15af-436b-a697-71ff05290f75',
          name: 'Reps',
          unit: 'reps',
          target: '12',
          type: '',
          value: ''
        },
        {
          id: 'ae892a8d-cd3c-410a-b338-be20871cf9b3',
          name: 'Weight',
          unit: 'kg',
          target: '10',
          type: '',
          value: ''
        }
      ],
      createdAt: '2024-10-30T18:30:43.057Z'
    },
    {
      id: '3aa0e1a6-59b9-4e47-af3b-1863255a5ae5',
      type: 'Not set', 
      name: 'TRX Face Pulls', 
      visibility: 'private', 
      author: '', 
      description: 'Not set', 
      reference: 'Not set', 
      targetGroup: 'Not set', 
      difficulty: 'Not set' ,
      sets: 3, 
      fields: [{name: 'Reps', unit: 'reps', target: 12, value: ''}],
    },
    {
      id: '3aa0e1a6-59b9-4e47-af3b-1866125ae5',
      type: 'Not set', 
      name: 'TRX Ys', 
      visibility: 'private', 
      author: '', 
      description: 'Not set', 
      reference: 'Not set', 
      targetGroup: 'Not set', 
      difficulty: 'Not set' ,
      sets: 3, 
      fields: [{name: 'Reps', unit: 'reps', target: 12, value: ''}],
    },
    {
      id: '3aa618a6-59b9-4e47-af3b-1866125ae5',
      type: 'Not set', 
      name: 'Test Exercise', 
      visibility: 'private', 
      author: '', 
      description: 'Not set', 
      reference: 'Not set', 
      targetGroup: 'Not set', 
      difficulty: 'Not set' ,
      sets: 3, 
      fields: [{name: 'Reps', unit: 'reps', target: 12, value: ''}, {name: 'Distance', unit: 'km', target: 6, value: ''}, {name: 'Time', unit: 'minutes', target: 30, value: ''}],
    },
  ],
  workouts: [{
    id: '12e66889-7281-4935-bb8c-3e90e6d859c2',
    type: 'created',
    author: '',
    name: 'TRX Back Workout',
    description: 'A quick back workout you can do at home with just a TRX',
    reference: 'Not Required',
    targetGroup: 'upper-body',
    difficulty: 'intermediate',
    exercises: ['3aa0e1a6-59b9-4e47-af3b-1863255a5ae5', '3aa0e1a6-59b9-4e47-af3b-1866125ae5','3aa618a6-59b9-4e47-af3b-1866125ae5' ],
    createdAt: '2024-10-30T18:29:29.131Z',
    duration: '15'
  }],
  
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

    reset: () => initialState,
  },
});

export const {
  reset,
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
