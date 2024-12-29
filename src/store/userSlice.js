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
      "id": "e53e6689-7281-4935-bb8c-3e90e6d859c6",
      "createdAt": "2024-12-29T18:32:29.131Z",
      "sourceId": null,
      "updatedAt": null,
      "source": "user-library",
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
      "exercises": [
        { "id": "3246-59b9-4kkfe47-affgh3b-hjggkdfgk", "order": 1 }
      ]
    },
    {
      "id": "f53e6689-7281-4935-bb8c-3e90e6d859c7",
      "createdAt": "2024-12-29T18:33:29.131Z",
      "sourceId": null,
      "updatedAt": null,
      "source": "user-library",
      "isFavorite": false,
      "isCompleted": false,
      "category": {
        "id": "12jkmb-ased21-alc21",
        "source": "user",
        "name": "Stretching",
        "color": "orange"
      },
      "targetGroup": [
        { "id": "54sd-64fff-gf32", "source": "system", "name": "Arms" },
        { "id": "547ujj-12kkk-251gh", "source": "user", "name": "Arms" }
      ],
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
      "exercises": [
        { "id": "3246-59b9-4kkfe47-affgh3b-hjggkdfgk", "order": 1 }
      ]
    },
    {
      "id": "g53e6689-7281-4935-bb8c-3e90e6d859c8",
      "createdAt": "2024-12-29T18:34:29.131Z",
      "sourceId": null,
      "updatedAt": null,
      "source": "user-library",
      "isFavorite": false,
      "isCompleted": false,
      "category": {
        "id": "12jkmb-ased21-alc21",
        "source": "user",
        "name": "Stretching",
        "color": "purple"
      },
      "targetGroup": [
        { "id": "54sd-64fff-gf32", "source": "system", "name": "Legs" },
        { "id": "547ujj-12kkk-251gh", "source": "user", "name": "Legs" }
      ],
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
      "exercises": [
        { "id": "3246-59b9-4kkfe47-affgh3b-hjggkdfgk", "order": 1 }
      ]
    },
    {
      "id": "h53e6689-7281-4935-bb8c-3e90e6d859c9",
      "createdAt": "2024-12-29T18:35:29.131Z",
      "sourceId": null,
      "updatedAt": null,
      "source": "user-library",
      "isFavorite": false,
      "isCompleted": false,
      "category": {
        "id": "12jkmb-ased21-alc21",
        "source": "user",
        "name": "Stretching",
        "color": "green"
      },
      "targetGroup": [
        { "id": "54sd-64fff-gf32", "source": "system", "name": "Core" },
        { "id": "547ujj-12kkk-251gh", "source": "user", "name": "Core" }
      ],
      "author": "Stefan",
      "name": "Torso Twists",
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
      "exercises": [
        { "id": "3246-59b9-4kkfe47-affgh3b-hjggkdfgk", "order": 1 }
      ]
    },
    {
      "id": "i53e6689-7281-4935-bb8c-3e90e6d859ca",
      "createdAt": "2024-12-29T18:36:29.131Z",
      "sourceId": null,
      "updatedAt": null,
      "source": "user-library",
      "isFavorite": false,
      "isCompleted": false,
      "category": {
        "id": "12jkmb-ased21-alc21",
        "source": "user",
        "name": "Stretching",
        "color": "pink"
      },
      "targetGroup": [
        { "id": "54sd-64fff-gf32", "source": "system", "name": "Core" },
        { "id": "547ujj-12kkk-251gh", "source": "user", "name": "Core" }
      ],
      "author": "Stefan",
      "name": "Standing Side Reach",
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
      "exercises": [
        { "id": "3246-59b9-4kkfe47-affgh3b-hjggkdfgk", "order": 1 }
      ]
    },
    {
      "id": "j53e6689-7281-4935-bb8c-3e90e6d859cb",
      "createdAt": "2024-12-29T18:37:29.131Z",
      "sourceId": null,
      "updatedAt": null,
      "source": "user-library",
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
      "name": "Rope Jumping",
      "description": "A classic cardio exercise that improves cardiovascular endurance, coordination, and agility.",
      "tags": [
        { "id": "as7j-ksdf6-01saik1", "source": "user", "name": "Cardio", "color": "red" },
        { "id": "as3vgb0-a8f-4md907", "source": "user", "name": "Jumping", "color": "orange" }
      ],
      "reference": null,
      "difficulty": "Intermediate",
      "equipment": ["Jump Rope"],
      "duration": 10,
      "visibility": "private",
      "notes": "Focus on maintaining a steady rhythm and try to keep your feet light as you jump.",
      "imageUrl": "",
      "exercises": [
        { "id": "3246-59b9-4kkfe47-affgh3b-hjggkdfgk", "order": 1 }
      ]
    },
    {
      "id": "k53e6689-7281-4935-bb8c-3e90e6d859cc",
      "createdAt": "2024-12-29T18:38:29.131Z",
      "sourceId": null,
      "updatedAt": null,
      "source": "user-library",
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
      "name": "High Knees",
      "description": "A cardio exercise that targets the lower body while increasing heart rate and improving endurance.",
      "tags": [
        { "id": "as7j-ksdf6-01saik1", "source": "user", "name": "Cardio", "color": "red" },
        { "id": "as3vgb0-a8f-4md907", "source": "user", "name": "Legs", "color": "blue" }
      ],
      "reference": null,
      "difficulty": "Beginner",
      "equipment": [],
      "duration": 10,
      "visibility": "private",
      "notes": "Make sure to drive your knees up as high as possible and keep a quick pace.",
      "imageUrl": "",
      "exercises": [
        { "id": "3246-59b9-4kkfe47-affgh3b-hjggkdfgk", "order": 1 }
      ]
    },
    {
      "id": "l53e6689-7281-4935-bb8c-3e90e6d859cd",
      "createdAt": "2024-12-29T18:39:29.131Z",
      "sourceId": null,
      "updatedAt": null,
      "source": "user-library",
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
      "name": "Mountain Climbers",
      "description": "A full-body cardio exercise that engages the core, shoulders, and legs while improving cardiovascular endurance.",
      "tags": [
        { "id": "as7j-ksdf6-01saik1", "source": "user", "name": "Cardio", "color": "red" },
        { "id": "as3vgb0-a8f-4md907", "source": "user", "name": "Core", "color": "green" }
      ],
      "reference": null,
      "difficulty": "Intermediate",
      "equipment": [],
      "duration": 10,
      "visibility": "private",
      "notes": "Maintain a steady pace and keep your core tight throughout the exercise.",
      "imageUrl": "",
      "exercises": [
        { "id": "3246-59b9-4kkfe47-affgh3b-hjggkdfgk", "order": 1 }
      ]
    },
    {
      "id": "m53e6689-7281-4935-bb8c-3e90e6d859ce",
      "createdAt": "2024-12-29T18:40:29.131Z",
      "sourceId": null,
      "updatedAt": null,
      "source": "user-library",
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
      "name": "Burpees",
      "description": "A high-intensity cardio exercise that works the whole body and boosts cardiovascular endurance.",
      "tags": [
        { "id": "as7j-ksdf6-01saik1", "source": "user", "name": "Cardio", "color": "red" },
        { "id": "as3vgb0-a8f-4md907", "source": "user", "name": "Full Body", "color": "purple" }
      ],
      "reference": null,
      "difficulty": "Advanced",
      "equipment": [],
      "duration": 10,
      "visibility": "private",
      "notes": "Focus on smooth transitions between the squat, jump, and push-up phases.",
      "imageUrl": "",
      "exercises": [
        { "id": "3246-59b9-4kkfe47-affgh3b-hjggkdfgk", "order": 1 }
      ]
    }
     
  ],
  workouts: [
    {
      "id": "a53e6689-7281-4935-bb8c-3e90e6d859cf",
      "createdAt": "2024-12-29T18:42:29.131Z",
      "sourceId": null,
      "updatedAt": null,
      "source": "user-library",
      "isFavorite": false,
      "isCompleted": false,
      "category": {
        "id": "12jkmb-ased21-alc21",
        "source": "user",
        "name": "Stretching",
        "color": "blue"
      },
      "targetGroup": [
        { "id": "54sd-64fff-gf32", "source": "system", "name": "Flexibility" },
        { "id": "547ujj-12kkk-251gh", "source": "user", "name": "Flexibility" }
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
        { "id": "j53e6689-7281-4935-bb8c-3e90e6d859cb", "order": 1 },
        { "id": "k53e6689-7281-4935-bb8c-3e90e6d859cc", "order": 2 },
        { "id": "l53e6689-7281-4935-bb8c-3e90e6d859cd", "order": 3 },
        { "id": "m53e6689-7281-4935-bb8c-3e90e6d859ce", "order": 4 },
        { "id": "n53e6689-7281-4935-bb8c-3e90e6d859cf", "order": 5 }
      ]
    },
    {
      "id": "b53e6689-7281-4935-bb8c-3e90e6d859d0",
      "createdAt": "2024-12-29T18:43:29.131Z",
      "sourceId": null,
      "updatedAt": null,
      "source": "user-library",
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
        { "id": "j53e6689-7281-4935-bb8c-3e90e6d859cb", "order": 1 },
        { "id": "k53e6689-7281-4935-bb8c-3e90e6d859cc", "order": 2 },
        { "id": "l53e6689-7281-4935-bb8c-3e90e6d859cd", "order": 3 },
        { "id": "m53e6689-7281-4935-bb8c-3e90e6d859ce", "order": 4 },
        { "id": "n53e6689-7281-4935-bb8c-3e90e6d859cf", "order": 5 }
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
