import { createSlice } from '@reduxjs/toolkit';
import { getCurrentDay } from '../helpers';
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
  activity: {
    '2024-10-31': {
        logs: [
          {
            timestamp: '2024-10-31T12:28:16.530Z',
            name: 'Calories',
            data: {
              value: 300
            },
            icon: '/icons/calories.svg'
          },
          {
            timestamp: '2024-10-31T12:28:22.862Z',
            name: 'Calories',   
            data: {
              value: 500
            },
           icon: '/icons/calories.svg'
          },
          {
            timestamp: '2024-10-31T12:28:27.669Z',
            name: 'Steps',
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
            data: {
              value: 300
            },
            icon: '/icons/calories.svg'
          },
          {
            timestamp: '2024-10-30T12:28:22.862Z',
            name: 'Steps',
            data: {
              value: 500
            },
            icon: '/icons/steps.svg'
          },
          {
            timestamp: '2024-10-30T12:28:27.669Z',
            name: 'Steps',
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
    }
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
    exercises: [
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
        fields: [{name: 'Reps', unit: 'reps', target: 12, value: ''}, {name: 'Distance', unit: 'distance', target: 0, value: ''}, {name: 'Time', unit: 'time', target: 0, value: ''}],
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
        fields: [{name: 'Reps', unit: 'reps', target: 12, value: ''}, {name: 'Distance', unit: 'distance', target: 0, value: ''}, {name: 'Time', unit: 'time', target: 0, value: ''}],
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
    createdAt: '2024-10-30T18:29:29.131Z',
    duration: '15'
  }],
  
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
    addExerciseToWorkout: (state, action) => {
      const { workoutId, exerciseId } = action.payload;
      const workoutIndex = state.workouts.findIndex(workout => workout.id === workoutId);
  
      if (workoutIndex !== -1) {
          const isExercisePresent = state.workouts[workoutIndex].exercises.some(ex => ex.id === exerciseId);
          
          if (!isExercisePresent) {
              const exerciseToAdd = state.exercises.find(exercise => exercise.id === exerciseId);
              
              if (exerciseToAdd) {
                  state.workouts[workoutIndex].exercises.push(exerciseToAdd);
                  console.log('Exercise added:', state.workouts[workoutIndex].exercises)
              }
          }
      }
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
  addExerciseToWorkout
} = userSlice.actions;

export default userSlice.reducer;
