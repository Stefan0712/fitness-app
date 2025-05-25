import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  preferences: {
    theme: 'dark',
    language: 'en',
    unitSystem: 'metric',
  },
  showLocalAccountPrompt: true,
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
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    updateDashboardLayout: (state, action) =>{
      state.dashboardSections = action.payload;
    },
    reset: () => initialState,
  }
  
});

export const {
  reset,
  updatePreferences,
  updateDashboardLayout,
} = userSlice.actions;

export default userSlice.reducer;
