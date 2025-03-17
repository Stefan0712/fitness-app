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

interface Workout {
  id: string;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: WorkoutCategory;
  targetGroup: TargetGroup[];
  duration: number; // in minutes
  equipment: Equipment[];
  exercises: Exercise[];
  createdAt: string; 
  updatedAt?: string; 
  author: string;
  imageUrl?: string; 
  isFavorite: boolean;
  isCompleted: boolean;
  tags?: Tag[];
  reference?: string; 
}

interface WorkoutCategory {
  id: string;
  name: string;
  color: string;
}

interface TargetGroup {
  id: string;
  name: string;
}

interface Equipment {
  id: string;
  name: string;
  qty: number;
  attributes?: EquipmentAttributes[];
}

interface EquipmentAttributes {
  type: 'weight' | 'length'; 
  value: number;
  unit: 'kg' | 'm';
}

interface WorkoutExercise {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: number;
  rest: number; 
  imageUrl?: string; 
}

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface Goal {
  id: string,
  name: string,
  unit: string,
  target: number,
  icon: {
    name: string,
    url: string
  }
}
interface BaseLog{
  id: string,
  timestamp: string,
  type: string,
  name: string,
  icon: {
    name: string,
    url: string
  },
}
interface GoalLog extends BaseLog{
  data: {
    value: number
  }
}
interface Field {
  name: string,
  unit: string,
  value: number,
  target?: number,
  description?: string,
  isCompleted: boolean
}
interface ExerciseLog extends BaseLog{
  data: {
    name: string,
    time: string,
    targetGroups: string[],
    duration: number,
    fields: Field[]
  }
}
interface FoodLog extends BaseLog{
  data: {
    name: string,
    qty: number,
    unit: string,
    protein: number,
    carbs: number,
    fats: number,
    sugar: number,
    calories: number,
    sodium: number,
    time: string,
    type: string,
    note?: string

  }
}
interface WorkoutLog extends BaseLog{
  data:{
    workoutId: string,
    isCompleted: boolean,
    targetGroup: string[],
    name: string,
    duration: string,
    finishedAt: string,
    difficulty: string,
    
  }
}

interface InitialStateObject {
  userId: string,
  userData: {
    name?: string,
    username?: string,
    id: string,
    email?: string,
    createdAt: string,
    friends: string[],
    followers: string[],
    following: string[],
    comments: string[],
    posts: string[],
    likes: string[],
    savedPosts: string[],
    age?: number,
    gender?: string,
    height?: number,
    weight?: number,
    bio?: string,
    isPrivate: boolean,
    isPremium: true,
    badged: string[],
  },
  goals: Goal[],
}
const initialState = {
  userId: uuidv4(),
  userData: {
    name: 'Stefan',
    username: 'Stefan06',
    id: "98123-asd2-12ok5-bvn2112-1v3123",
    email: 'fake.mail@gmail.com',
    createdAt: '2025-03-17',
    friends: [],
    followers: [],
    following: [],
    comments: [],
    posts: [],
    likes: [],
    savedPosts: [],
    age: 25,
    gender: 'Male',
    height: 180,
    weight: 80,
    bio: 'I swear I am real',
    isPrivate: false,
    isPremium: true,
    badges: []
  },
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
  activity: [
    {
      "date": "2025-01-13",
      "logs": [
        {
          "timestamp": "2025-01-13T16:18:05.204Z",
          "id": "bc8d7239-4396-4cc9-b052-6105e3728a15",
          "type": "goal",
          "name": "Calories",
          "data": { "value": 412 },
          "icon": "/icons/calories.svg"
        },
        {
          "timestamp": "2025-01-13T17:30:33.750Z",
          "type": "food",
          "name": "Food Log",
          "data": {
            "name": "Fried Rice",
            "qty": "500",
            "unit": "g",
            "protein": "12",
            "carbs": "",
            "fats": "65",
            "sugar": "23",
            "calories": "566",
            "sodium": "",
            "time": "23:34",
            "type": "dinner",
            "note": "Random values lol"
          },
          "icon": "/icons/food.svg"
        },
        {
          "timestamp": "2025-01-13T17:31:41.399Z",
          "name": "Food Log",
          "type": "food",
          "data": {
            "name": "Test",
            "qty": "123",
            "unit": "g",
            "protein": "",
            "carbs": "",
            "fats": "",
            "sugar": "",
            "calories": "",
            "sodium": "",
            "time": "",
            "type": "unset",
            "note": ""
          },
          "icon": "/icons/food.svg"
        },
        {
          "timestamp": "2025-01-10T13:35:17.896Z",
          "name": "Exercise",
          "type": "activity",
          "data": {
            "name": "Push Ups",
            "time": "23:37",
            "targetGroup": "chest",
            "duration": "15",
            "fields": [
              { "name": "Reps", "unit": "reps", "value": "12" },
              { "name": "Sets", "unit": "sets", "value": "3" }
            ]
          },
          "icon": "/icons/exercise.svg"
        }
      ],
      "goals": [
        {
          "name": "Calories",
          "id": "bc8d7239-4396-4cc9-b052-6105e3728a15",
          "unit": "kcal",
          "target": "1400",
          "icon": "/icons/calories.svg"
        },
        {
          "name": "Steps",
          "id": "3d629850-384e-4adf-95f8-6c8209c3fe1f",
          "unit": "steps",
          "target": "6000",
          "icon": "/icons/steps.svg"
        }
      ]
    },
    {
      "date": "2025-01-09",
      "logs": [
        {
          "timestamp": "2025-01-09T00:57:13.500Z",
          "name": "Food Log",
          "type": "food",
          "data": {
            "name": "Test food",
            "qty": "123",
            "unit": "g",
            "calories": "250",
            "protein": "",
            "carbs": "",
            "fats": "",
            "sugar": "",
            "sodium": "",
            "time": "06:57",
            "type": "dinner",
            "note": ""
          },
          "icon": "/icons/food.svg"
        },
        {
          "timestamp": "2025-01-09T01:00:23.859Z",
          "name": "Food Log",
          "type": "food",
          "data": {
            "name": "Hopefully correct food",
            "qty": "500",
            "unit": "g",
            "protein": "",
            "carbs": "",
            "fats": "",
            "sugar": "",
            "calories": "",
            "sodium": "",
            "time": "04:01",
            "type": "snack",
            "note": ""
          },
          "icon": "/icons/food.svg"
        },
        {
          "timestamp": "2025-01-09T17:56:56.434Z",
          "name": "Calories",
          "type": "goal",
          "data": { "value": 500 },
          "icon": "/icons/calories.svg"
        },
        {
          "timestamp": "2025-01-09T18:01:33.174Z",
          "name": "Steps",
          "type": "goal",
          "data": { "value": 1200 },
          "icon": "/icons/steps.svg"
        }
      ],
      "goals": [
        {
          "name": "Calories",
          "unit": "kcal",
          "target": "1400",
          "icon": "/icons/calories.svg"
        },
        {
          "name": "Steps",
          "unit": "steps",
          "target": "6000",
          "icon": "/icons/steps.svg"
        }
      ]
    }
  ],
  
  preferences: {
    darkMode: true,
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
  ]
  ,
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
  updateGoal : (state, action) =>{
     const index = state.userData.goals.findIndex(eq => eq.id === action.payload.id);
     if (index !== -1) {
       state.userData.goals[index] = action.payload;
       console.log('Goal was updated with: ',action.payload)
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
