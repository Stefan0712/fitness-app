import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  exercises: [],
  workouts: []
};

const publicDataSlice = createSlice({
  name: 'publicData',
  initialState,
  reducers: {
    setPublicExercises: (state, action) => {
      state.exercises = action.payload;
    },
    setPublicWorkouts: (state, action) => {
      state.workouts = action.payload;
    },
    addPublicExercise: (state, action) => {
      state.exercises.push(action.payload);
    },
    addPublicWorkout: (state, action) => {
      state.workouts.push(action.payload);
    }
  }
});

export const { setPublicExercises, setPublicWorkouts, addPublicExercise, addPublicWorkout } = publicDataSlice.actions;
export default publicDataSlice.reducer;
