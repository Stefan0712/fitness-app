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
  tags: [
    { "id": "as7j-ksdf6-01saik1", "source": "system", "name": "Hip Flexors", "color": "blue" },
    { "id": "as7j-ksdf6-02saik2", "source": "system", "name": "No Equipment", "color": "green" },
    { "id": "as7j-ksdf6-03saik3", "source": "system", "name": "Stretching", "color": "yellow" },
    { "id": "as7j-ksdf6-04saik4", "source": "system", "name": "Quick", "color": "orange" },
    { "id": "as7j-ksdf6-05saik5", "source": "system", "name": "Strength", "color": "red" },
    { "id": "as7j-ksdf6-06saik6", "source": "system", "name": "Core", "color": "purple" },
    { "id": "as7j-ksdf6-07saik7", "source": "system", "name": "Full Body", "color": "blue" },
    { "id": "as7j-ksdf6-08saik8", "source": "system", "name": "Flexibility", "color": "cyan" },
    { "id": "as7j-ksdf6-09saik9", "source": "system", "name": "Endurance", "color": "green" },
    { "id": "as7j-ksdf6-10saik10", "source": "system", "name": "Balance", "color": "pink" },
    { "id": "as7j-ksdf6-11saik11", "source": "system", "name": "Lower Body", "color": "brown" },
    { "id": "as7j-ksdf6-12saik12", "source": "system", "name": "Upper Body", "color": "gray" },
    { "id": "as7j-ksdf6-13saik13", "source": "system", "name": "Cardio", "color": "red" },
    { "id": "as7j-ksdf6-14saik14", "source": "system", "name": "Beginner", "color": "lime" },
    { "id": "as7j-ksdf6-15saik15", "source": "system", "name": "Intermediate", "color": "teal" },
    { "id": "as7j-ksdf6-16saik16", "source": "system", "name": "Advanced", "color": "black" },
    { "id": "as7j-ksdf6-17saik17", "source": "system", "name": "HIIT", "color": "orange" },
    { "id": "as7j-ksdf6-18saik18", "source": "system", "name": "Strength Training", "color": "blue" },
    { "id": "as7j-ksdf6-19saik19", "source": "system", "name": "Pilates", "color": "pink" },
    { "id": "as7j-ksdf6-20saik20", "source": "system", "name": "Yoga", "color": "purple" },
    { "id": "as7j-ksdf6-21saik21", "source": "system", "name": "Rehabilitation", "color": "green" },
    { "id": "as7j-ksdf6-22saik22", "source": "system", "name": "Mobility", "color": "cyan" },
    { "id": "as7j-ksdf6-23saik23", "source": "system", "name": "Recovery", "color": "yellow" },
    { "id": "as7j-ksdf6-24saik24", "source": "system", "name": "Stretch", "color": "orange" },
    { "id": "as7j-ksdf6-25saik25", "source": "system", "name": "Low Impact", "color": "#D1E8E2" }
  ],
  categories: [
    { "id": "12jkmb-ased21-alc21", "source": "user", "name": "Stretching", "color": "yellow" },
    { "id": "12jkmb-ased21-alc22", "source": "user", "name": "Strength", "color": "blue" },
    { "id": "12jkmb-ased21-alc23", "source": "user", "name": "Cardio", "color": "red" },
    { "id": "12jkmb-ased21-alc24", "source": "user", "name": "Flexibility", "color": "green" },
    { "id": "12jkmb-ased21-alc25", "source": "user", "name": "Mobility", "color": "purple" },
    { "id": "12jkmb-ased21-alc26", "source": "user", "name": "Endurance", "color": "orange" },
    { "id": "12jkmb-ased21-alc27", "source": "user", "name": "Balance", "color": "pink" },
    { "id": "12jkmb-ased21-alc28", "source": "user", "name": "Rehabilitation", "color": "brown" },
    { "id": "12jkmb-ased21-alc29", "source": "user", "name": "Weight Loss", "color": "lightblue" },
    { "id": "12jkmb-ased21-alc30", "source": "user", "name": "Muscle Gain", "color": "lightgreen" },
    { "id": "12jkmb-ased21-alc31", "source": "user", "name": "Core", "color": "yellowgreen" },
    { "id": "12jkmb-ased21-alc32", "source": "user", "name": "Full Body", "color": "redorange" },
    { "id": "12jkmb-ased21-alc33", "source": "user", "name": "Lower Body", "color": "skyblue" },
    { "id": "12jkmb-ased21-alc34", "source": "user", "name": "Upper Body", "color": "violet" },
    { "id": "12jkmb-ased21-alc35", "source": "user", "name": "Glutes", "color": "lightyellow" },
    { "id": "12jkmb-ased21-alc36", "source": "user", "name": "Quads", "color": "lightpink" },
    { "id": "12jkmb-ased21-alc37", "source": "user", "name": "Hamstrings", "color": "peach" },
    { "id": "12jkmb-ased21-alc38", "source": "user", "name": "Calves", "color": "lavender" },
    { "id": "12jkmb-ased21-alc39", "source": "user", "name": "Shoulders", "color": "darkblue" },
    { "id": "12jkmb-ased21-alc40", "source": "user", "name": "Back", "color": "darkgreen" },
    { "id": "12jkmb-ased21-alc41", "source": "user", "name": "Chest", "color": "coral" },
    { "id": "12jkmb-ased21-alc42", "source": "user", "name": "Arms", "color": "lightpurple" },
    { "id": "12jkmb-ased21-alc43", "source": "user", "name": "Abs", "color": "peachpuff" },
    { "id": "12jkmb-ased21-alc44", "source": "user", "name": "Neck", "color": "mint" },
    { "id": "12jkmb-ased21-alc45", "source": "user", "name": "Posture", "color": "teal" },
    { "id": "12jkmb-ased21-alc46", "source": "user", "name": "Joint Health", "color": "turquoise" }
  ],
  targetGroups: [
    { "id": "54sd-64fff-gf32", "source": "system", "name": "Hip Flexors" },
    { "id": "54sd-64fff-gf33", "source": "system", "name": "Core" },
    { "id": "54sd-64fff-gf34", "source": "system", "name": "Upper Body" },
    { "id": "54sd-64fff-gf35", "source": "system", "name": "Lower Body" },
    { "id": "54sd-64fff-gf36", "source": "system", "name": "Glutes" },
    { "id": "54sd-64fff-gf37", "source": "system", "name": "Quads" },
    { "id": "54sd-64fff-gf38", "source": "system", "name": "Hamstrings" },
    { "id": "54sd-64fff-gf39", "source": "system", "name": "Calves" },
    { "id": "54sd-64fff-gf40", "source": "system", "name": "Shoulders" },
    { "id": "54sd-64fff-gf41", "source": "system", "name": "Back" },
    { "id": "54sd-64fff-gf42", "source": "system", "name": "Chest" },
    { "id": "54sd-64fff-gf43", "source": "system", "name": "Arms" },
    { "id": "54sd-64fff-gf44", "source": "system", "name": "Abs" },
    { "id": "54sd-64fff-gf45", "source": "system", "name": "Neck" },
    { "id": "54sd-64fff-gf46", "source": "system", "name": "Full Body" },
    { "id": "54sd-64fff-gf47", "source": "system", "name": "Cardio" },
    { "id": "54sd-64fff-gf48", "source": "system", "name": "Strength" },
    { "id": "54sd-64fff-gf49", "source": "system", "name": "Flexibility" },
    { "id": "54sd-64fff-gf50", "source": "system", "name": "Mobility" },
    { "id": "54sd-64fff-gf51", "source": "system", "name": "Balance" },
    { "id": "54sd-64fff-gf52", "source": "system", "name": "Endurance" },
    { "id": "54sd-64fff-gf53", "source": "system", "name": "Rehabilitation" },
    { "id": "54sd-64fff-gf54", "source": "system", "name": "Posture" },
    { "id": "54sd-64fff-gf55", "source": "system", "name": "Weight Loss" },
    { "id": "54sd-64fff-gf56", "source": "system", "name": "Muscle Gain" },
    { "id": "54sd-64fff-gf57", "source": "system", "name": "Joint Health" }
  ],
  exercises: [
    {
      "id": "f53e6689-7281-4935-bb8c-3e90e6d859c7",
      "createdAt": "2024-12-29T18:33:29.131Z",
      "sourceId": null,
      "updatedAt": null,
      "source": "user",
      "isFavorite": false,
      "isCompleted": false,
      "category": {
        "id": "12jkmb-ased21-alc21",
        "source": "user",
        "name": "Stretching",
        "color": "orange"
      },
      "targetGroup": ['Arms'],
      "author": "Stefan",
      "name": "Arm Circles",
      "description": "A dynamic stretch to warm up the shoulders and arms, improving flexibility and blood flow.",
      "tags": [
        { "id": "as7j-ksdf6-01saik1", "source": "user", "name": "Arms", "color": "blue" },
        { "id": "as3vgb0-a8f-4md907", "source": "user", "name": "Stretch", "color": "green" }
      ],
      "reference": null,
      "difficulty": "Beginner",
      "equipment": [],
      "duration": 3,
      "visibility": "private",
      "notes": "Start with small circles and gradually increase the size.",
      "imageUrl": "",
      "sets" : 1,
      "fields": [
        {
          "id": "field4",
          "name": "Duration",
          "description": "Duration of arm circles in seconds",
          "unit": "rotations",
          "target": "10",
          "type": "number",
          "source": "system",
          "value": null,
          "isCompleted": false,
          "validation": { "min": 0, "max": 9999 },
          "order": 1
        }
      ]
    },
    {
      "id": "g53e6689-7281-4935-bb8c-3e90e6d859c8",
      "createdAt": "2024-12-29T18:34:29.131Z",
      "sourceId": null,
      "updatedAt": null,
      "source": "user",
      "isFavorite": false,
      "isCompleted": false,
      "targetGroup": ['Legs'],
      "category": {
        "id": "12jkmb-ased21-alc21",
        "source": "user",
        "name": "Stretching",
        "color": "purple"
      },
      "author": "Stefan",
      "name": "Leg Swings",
      "description": "A dynamic stretch for the legs to improve hip flexibility and range of motion.",
      "tags": [
        { "id": "as7j-ksdf6-01saik1", "source": "user", "name": "Legs", "color": "blue" },
        { "id": "as3vgb0-a8f-4md907", "source": "user", "name": "Stretch", "color": "green" }
      ],
      "reference": null,
      "difficulty": "Beginner",
      "equipment": [],
      "duration": 5,
      "visibility": "private",
      "notes": "Swing the leg forward and backward while keeping your core engaged.",
      "imageUrl": "",
      "sets" : 3,
      "fields": [
        {
          "id": "field4",
          "name": "Duration",
          "description": "Duration of leg swings in seconds",
          "unit": "seconds",
          "target": "5",
          "type": "number",
          "source": "system",
          "value": null,
          "isCompleted": false,
          "validation": { "min": 0, "max": 9999 },
          "order": 1
        }
      ]
    },
    {
      "id": "h53e6689-7281-4935-bb8c-3e90e6d859c9",
      "createdAt": "2024-12-29T18:35:29.131Z",
      "sourceId": null,
      "updatedAt": null,
      "source": "user",
      "isFavorite": false,
      "isCompleted": false,
      "category": {
        "id": "12jkmb-ased21-alc21",
        "source": "user",
        "name": "Stretching",
        "color": "green"
      },
      "author": "Stefan",
      "name": "Torso Twists",
      "targetGroup": ['Core'],
      "description": "A dynamic stretch to loosen the spine and engage the core muscles.",
      "tags": [
        { "id": "as7j-ksdf6-01saik1", "source": "user", "name": "Core", "color": "blue" },
        { "id": "as3vgb0-a8f-4md907", "source": "user", "name": "Stretch", "color": "green" }
      ],
      "reference": null,
      "difficulty": "Beginner",
      "equipment": [],
      "duration": 4,
      "visibility": "private",
      "notes": "Keep your hips facing forward and rotate only your torso.",
      "imageUrl": "",
      "sets" : 3,
      "fields": [
        {
          "id": "field4",
          "name": "Duration",
          "description": "Duration of torso twists in seconds",
          "unit": "seconds",
          "target": "4",
          "type": "number",
          "source": "system",
          "value": null,
          "isCompleted": false,
          "validation": { "min": 0, "max": 9999 },
          "order": 1
        }
      ]
    },
    {
      "id": "i53e6689-7281-4935-bb8c-3e90e6d859ca",
      "createdAt": "2024-12-29T18:36:29.131Z",
      "sourceId": null,
      "updatedAt": null,
      "source": "user",
      "isFavorite": false,
      "isCompleted": false,
      "category": {
        "id": "12jkmb-ased21-alc21",
        "source": "user",
        "name": "Stretching",
        "color": "pink"
      },
      "author": "Stefan",
      "name": "Standing Side Reach",
      "targetGroup": [],
      "description": "A stretch that targets the obliques and helps improve posture.",
      "tags": [
        { "id": "as7j-ksdf6-01saik1", "source": "user", "name": "Core", "color": "blue" },
        { "id": "as3vgb0-a8f-4md907", "source": "user", "name": "Stretch", "color": "green" }
      ],
      "reference": null,
      "difficulty": "Beginner",
      "equipment": [],
      "duration": 4,
      "visibility": "private",
      "notes": "Make sure to reach over your head and not just to the side.",
      "imageUrl": "",
      "sets" : 3,
      "fields": [
        {
          "id": "field4",
          "name": "Duration",
          "description": "Duration of standing side reach in seconds",
          "unit": "seconds",
          "target": "4",
          "type": "number",
          "source": "system",
          "value": null,
          "isCompleted": false,
          "validation": { "min": 0, "max": 9999 },
          "order": 1
        }
      ]
    },
    {
      "id": "j53e6689-7281-4935-bb8c-3e90e6d859cb",
      "createdAt": "2024-12-29T18:37:29.131Z",
      "sourceId": null,
      "updatedAt": null,
      "source": "user",
      "isFavorite": false,
      "isCompleted": false,
      "category": {
        "id": "12jkmb-ased21-alc21",
        "source": "user",
        "name": "Cardio",
        "color": "red"
      },
      "author": "Stefan",
      "name": "Rope Jumping",
      "targetGroup": ['Lower Body'],
      "description": "A classic cardio exercise that improves cardiovascular endurance, coordination, and agility.",
      "tags": [
        { "id": "as7j-ksdf6-01saik1", "source": "user", "name": "Cardio", "color": "red" },
        { "id": "as3vgb0-a8f-4md907", "source": "user", "name": "Jumping", "color": "blue" }
      ],
      "reference": null,
      "difficulty": "Intermediate",
      "equipment": ["Jump Rope"],
      "duration": 10,
      "visibility": "private",
      "notes": "Focus on your rhythm and breathing.",
      "imageUrl": "",
      "sets" : 3,
      "fields": [
        {
          "id": "field4",
          "name": "Duration",
          "description": "Duration of rope jumping in seconds",
          "unit": "seconds",
          "target": "10",
          "type": "number",
          "source": "system",
          "value": null,
          "isCompleted": false,
          "validation": { "min": 0, "max": 9999 },
          "order": 1
        }
      ]
    },
    {
      "id": "e53e6689-7281-4935-bb8c-3e90e6d859c6",
      "createdAt": "2024-12-29T18:32:29.131Z",
      "sourceId": null,
      "updatedAt": null,
      "source": "user",
      "isFavorite": false,
      "isCompleted": false,
      "category": {
        "id": "12jkmb-ased21-alc21",
        "source": "user",
        "name": "Stretching",
        "color": "yellow"
      },
      "targetGroup": [
        { "id": "54sd-64fff-gf32", "source": "system", "name": "Hip Flexors" },
        { "id": "547ujj-12kkk-251gh", "source": "user", "name": "Hip Flexors" }
      ],
      "author": "Stefan",
      "name": "Dynamic Hip Flexor Stretch",
      "targetGroup": ['Hip Flexor'],
      "description": "A dynamic stretch focusing on opening the hips and improving flexibility in the hip flexors.",
      "tags": [
        { "id": "as7j-ksdf6-01saik1", "source": "user", "name": "Hip Flexors", "color": "blue" },
        { "id": "as3vgb0-a8f-4md907", "source": "user", "name": "Stretch", "color": "green" }
      ],
      "reference": null,
      "difficulty": "Beginner",
      "equipment": [],
      "duration": 5,
      "visibility": "private",
      "notes": "Keep your posture straight and avoid arching your back.",
      "imageUrl": "",
      "sets": 3
    }
    
  ],
  workouts: [
      {
      "id": "a53e6689-7281-4935-bb8c-3e90e6d859cf",
      "createdAt": "2024-12-29T18:42:29.131Z",
      "sourceId": null,
      "updatedAt": null,
      "source": "user",
      "isFavorite": false,
      "isCompleted": false,
      "category": {
        "id": "12jkmb-ased21-alc21",
        "source": "user",
        "name": "Stretching",
        "color": "blue"
      },
      "targetGroup": [
        { "id": "54sd-64fff-gf32", "source": "system", "name": "Full Body" },
      ],
      "author": "Stefan",
      "name": "Morning Stretches Routine",
      "description": "A series of active stretches to warm up your body and improve flexibility and posture for the day ahead.",
      "tags": [
        { "id": "as7j-ksdf6-01saik1", "source": "user", "name": "Stretching", "color": "blue" },
        { "id": "as3vgb0-a8f-4md907", "source": "user", "name": "Flexibility", "color": "green" }
      ],
      "reference": null,
      "difficulty": "Beginner",
      "equipment": [],
      "duration": 15,
      "visibility": "private",
      "notes": "Perform each stretch slowly and focus on breathing deeply during each movement.",
      "imageUrl": "",
      "exercises": [
        "f53e6689-7281-4935-bb8c-3e90e6d859c7",
        "g53e6689-7281-4935-bb8c-3e90e6d859c8", 
        "h53e6689-7281-4935-bb8c-3e90e6d859c9", 
        "i53e6689-7281-4935-bb8c-3e90e6d859ca",
        "j53e6689-7281-4935-bb8c-3e90e6d859cb", 
      ]
    },
    {
      "id": "b53e6689-7281-4935-bb8c-3e90e6d859d0",
      "createdAt": "2024-12-29T18:43:29.131Z",
      "sourceId": null,
      "updatedAt": null,
      "source": "user",
      "isFavorite": false,
      "isCompleted": false,
      "category": {
        "id": "12jkmb-ased21-alc21",
        "source": "user",
        "name": "Cardio",
        "color": "red"
      },
      "targetGroup": [
        { "id": "54sd-64fff-gf32", "source": "system", "name": "Cardiovascular" },
        { "id": "547ujj-12kkk-251gh", "source": "user", "name": "Cardiovascular" }
      ],
      "author": "Stefan",
      "name": "Daily Cardio",
      "description": "A high-intensity cardio routine designed to boost cardiovascular endurance and burn fat.",
      "tags": [
        { "id": "as7j-ksdf6-01saik1", "source": "user", "name": "Cardio", "color": "red" },
        { "id": "as3vgb0-a8f-4md907", "source": "user", "name": "Endurance", "color": "purple" }
      ],
      "reference": null,
      "difficulty": "Intermediate",
      "equipment": ["Jump Rope"],
      "duration": 30,
      "visibility": "private",
      "notes": "Perform each exercise with high intensity and minimal rest in between to keep your heart rate elevated.",
      "imageUrl": "",
      "exercises": [
        "j53e6689-7281-4935-bb8c-3e90e6d859cb",
        "e53e6689-7281-4935-bb8c-3e90e6d859c6",
        "g53e6689-7281-4935-bb8c-3e90e6d859c8",
      ]
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
        sourceId: action.payload.id,
        id: uuidv4(),
        typed: 'saved'
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
