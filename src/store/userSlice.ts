import { createSlice } from '@reduxjs/toolkit';
import { convertTimestampToDate, getCurrentDay } from '../helpers';
import { v4 as uuidv4 } from 'uuid';
import {defaultTags} from '../constants/defaultTags';
import { IconLibrary } from '../IconLibrary';
import { Activity, InitialStateObject } from '../components/common/interfaces';

const initialState: InitialStateObject = {
  userId: uuidv4(),
  userData: {
    firstRun: 'true',
    name: '',
    username: '',
    id: "",
    email: '',
    createdAt: '',
    friends: [],
    followers: [],
    following: [],
    comments: [],
    posts: [],
    likes: [],
    savedPosts: [],
    age: 0,
    gender: '',
    height: 0,
    weight: 0,
    bio: '',
    isPrivate: false,
    isPremium: true,
    profileSettings: {
      showEmail: "false",
      showPosts: "false",
      showDetails: "false",
      showProfile: "false"
    },
    badges: []
  },
  goals: [
    { 
      id: 'bc8d7239-4396-4cc9-b052-6105e3728a15',
      name: 'Calories',
      unit: 'kcal',
      target: 1400,
      icon: IconLibrary.Calories,
      color:'#EB5928'
    },
    {
      id: '3d629850-384e-4adf-95f8-6c8209c3fe1f',
      name: 'Steps',
      unit: 'steps',
      target: 6000,
      icon: IconLibrary.Steps,
      color: 'green'
    }
  ],
  defaultFields: [],
  macros: [
    { id: 'b1f5d9d8-3e17-4c9f-bf8a-9d6bfe1d2e38', name: "Calories", unit: "kcal", value: 0, target: 0, isEnabled: false },
    { id: 'c4729a56-87a9-4fb8-9408-1e5f4d9dbe12', name: "Protein", unit: "g", value: 0, target: 0, isEnabled: false },
    { id: 'fe829f3e-55c0-4dfb-b6f7-1e8d9fcbf8d1id', name: "Carbs", unit: "g", value: 0, target: 0, isEnabled: false },
    { id: 'a61c3792-2d6d-4c63-903c-5a728d5b3e4e', name: "Fats", unit: "g", value: 0, target: 0, isEnabled: false },
    { id: 'd3f6f1bb-865f-46b2-9c79-719d6a3e5410', name: "Sugar", unit: "g", value: 0, target: 0, isEnabled: false },
    { id: 'f9b7c5e4-1af8-42f5-b6a8-d71cb8edcf1c', name: "Sodium", unit: "mg", value: 0, target: 0, isEnabled: false },
  ],
  activity: [],
  
  preferences: {
    theme: 'dark',
    language: 'en',
    unitSystem: 'metric',
  },
  tags: [...defaultTags],
  equipment: [
    {
      "id": "jump-rope-id",
      "name": "Jump Rope",
      "attributes": []
    },
    {
      "id": "dumbbell-5kg-id",
      "name": "Dumbbell",
      "attributes": [
        {
          "name": "Weight",
          "unit": "kg",
          "value": 5
        }
      ]
    },
    {
      "id": "dumbbell-10kg-id",
      "name": "Dumbbell",
      "attributes": [
        {
          "name": "Weight",
          "unit": "kg",
          "value": 10
        }
      ]
    },
    {
      "id": "dumbbell-15kg-id",
      "name": "Dumbbell",
      "attributes": [
        {
          "name": "Weight",
          "unit": "kg",
          "value": 15
        }
      ]
    },
    {
      "id": "trx-id",
      "name": "TRX",
      "attributes": []
    },
    {
      "id": "pull-up-bar-id",
      "name": "Pull-up Bar",
      "attributes": []
    },
    {
      "id": "hand-gripper-id",
      "name": "Hand Gripper",
      "attributes": []
    }
  ],
  exercises: [],
  workouts: [],
  message: null,
  dashboardSections: [
    {type: 'goal', order: 1, identifier: 'bc8d7239-4396-4cc9-b052-6105e3728a15'},
    {type: 'goal', order: 2, identifier: '3d629850-384e-4adf-95f8-6c8209c3fe1f'},
    {type: 'section', order: 3, identifier: 'activity'},
    {type: 'section', order: 4, identifier: 'nutrition'}
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
      const newData = action.payload;
      const newUserData = {
        ...state.userData,
        ...newData,
        id: uuidv4(),
        firstRun: false,
        createdAt: getCurrentDay(),
        
      }
      state.userData = newUserData;
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
       
      if(!state.activity.find(entry=>entry.date === date)){
        const newEntry: Activity = {
          date,
          goals: [...state.goals],
          logs:[{timestamp, ...action.payload}]
        }
        state.activity.push(newEntry)
      }else{
        const index = state.activity.findIndex(item=>item.date===date);
        state.activity[index].logs.push({timestamp, ...action.payload})
      }
      
    },
    removeLog: (state, action) => {
      const timestamp = action.payload;
      const date = convertTimestampToDate(timestamp);
      if (state.activity.find(entry=>entry.date===date)) {
        const index = state.activity.findIndex(item=>item.date===date);
        state.activity[index].logs = state.activity[index].logs.filter(item=>item.timestamp!==action.payload)
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
      const newItem = {
        id: uuidv4(),
        ...action.payload
      };
      state.equipment.push(newItem); 
      
   },
   removeEquipment: (state, action) => {
      state.equipment = state.equipment.filter(item => item.id !== action.payload);
   },
   updateEquipment : (state, action) =>{
      const index = state.equipment.findIndex(eq => eq.id === action.payload.id);
      console.log(action.payload)
      if (index !== -1) {
        state.equipment[index] = action.payload;
      }
   },
   addGoal: (state, action) => {
     const newItem = {
       id: action.payload.id || uuidv4(),
       ...action.payload
     };
     if (!state.goals.some(item => item.id === action.payload.id)) {// Prevent duplicates
        state.goals.push(newItem); 
     }
     //add the new goal to the copy of goals if it exists
     const activityEntry = state.activity.find(entry=>entry.date===getCurrentDay());
     if(activityEntry){
      const index = state.activity.findIndex(entry=>entry===activityEntry);
      state.activity[index].goals.push(newItem)
      console.log("Goal updated:",state.activity[index])
     }
     
  },
  removeGoal: (state, action) => {
     state.goals = state.goals.filter(item => item.id !== action.payload);
     //remove the goal from the copy of goals if it exists
     const activityEntry = state.activity.find(entry=>entry.date===getCurrentDay());
     if(activityEntry){
      const index = state.activity.findIndex(entry=>entry===activityEntry);
      state.activity[index].goals = state.activity[index].goals.filter(item=>item.id!==action.payload);
      state.activity[index].logs = state.activity[index].logs.filter(item=>item.id!==action.payload);
      console.log("Goal updated:",state.activity[index])
     }
     
  },
  updateGoal : (state, action) =>{
     const index = state.goals.findIndex(eq => eq.id === action.payload.id);
     if (index !== -1) {
       state.goals[index] = action.payload;
       console.log('Goal was updated with: ',action.payload)
     }
     //update the goal from the copy of goals if it exists
     const activityIndex = state.activity.findIndex(entry=>entry.date===getCurrentDay());
     if(activityIndex >= 0 ){
        const goalIndex = state.activity[activityIndex].goals.findIndex(goal=>goal.id === action.payload.id);
      if(goalIndex >= 0){
        state.activity[activityIndex].goals[goalIndex] = action.payload;
      }
      console.log("Goal updated:",state.activity[activityIndex])
     }
  },
  createDefaultField: (state, action) =>{
    if(state.defaultFields){
      state.defaultFields.push(action.payload);
    }else{
      state.defaultFields = [action.payload]
    }
  },
  updateDefaultField: (state, action) =>{
    const index = state.defaultFields.findIndex(item=>item.id === action.payload.id);
    if(index >= 0 ){
      state.defaultFields[index] = action.payload;
    }
  },
  deleteDefaultField: (state, action) =>{
    console.log(action.payload)
    const index = state.defaultFields.findIndex(item=>item.id === action.payload.id);
    console.log(index)
    if(index >= 0 ){
      state.defaultFields = state.defaultFields.filter(item=>item.id!==action.payload.id);
    }
  },
  updateDashboardLayout: (state, action) =>{
    state.dashboardSections = action.payload;
  },
    reset: () => initialState,
    resetProfile: (state) =>{
      state.userData = initialState.userData;
    },
  },
  
});

export const {
  reset,
  createDefaultField,
  updateDefaultField,
  deleteDefaultField,
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
  addTag,
  removeTag,
  updateTag,
  addEquipment,
  removeEquipment,
  updateEquipment,
  addGoal,
  updateGoal,
  removeGoal,
  updateDashboardLayout,
  resetProfile,
} = userSlice.actions;

export default userSlice.reducer;
