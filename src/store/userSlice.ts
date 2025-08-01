import { createSlice } from '@reduxjs/toolkit';
import { Unit } from '../components/common/interfaces';
import { units } from '../constants/units';

const initialState = {
  preferences: {
    theme: 'dark',
    language: 'en',
    unitSystem: 'metric',
  },
  showLocalAccountPrompt: true,
  customFields: [{_id: 'reps-custom-field', name: 'Repetitions', value: 0, target: '15', unit: units[units.findIndex(item=>item.shortLabel==='reps')]}],
  dashboardSections: [
    {type: 'goal', order: 1, identifier: 'bc8d7239-4396-4cc9-b052-6105e3728a15'},
    {type: 'goal', order: 2, identifier: '3d629850-384e-4adf-95f8-6c8209c3fe1f'},
    {type: 'section', order: 3, identifier: 'activity'},
    {type: 'section', order: 4, identifier: 'nutrition'}
  ]
};

interface customFieldProps {
  operation: string;
  data: {
    name: string;
    _id: string;
    description?: string;
    value: number;
    targetValue: number;
    unit: Unit;
  }
}
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
    updateCustomFields: ( state, action: { payload: customFieldProps }
      ) => {
        const { operation, data } = action.payload;

        if (operation === 'add') {
          state.customFields.push(data);
        } else if (operation === 'remove') {
          state.customFields = state.customFields.filter(field => field._id !== data._id);
        }
      },
        reset: () => initialState,
      }
      
  });

export const {
  reset,
  updatePreferences,
  updateDashboardLayout,
  updateCustomFields
} = userSlice.actions;

export default userSlice.reducer;
