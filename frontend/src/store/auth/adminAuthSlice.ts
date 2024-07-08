import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  admin: localStorage.getItem('adminToken'),
};

const adminTokenSlice = createSlice({
  name: 'adminToken',
  initialState,
  reducers: {
    setAdminToken: (state, action: PayloadAction<string>) => {
      state.admin = action.payload;
      localStorage.setItem('adminToken', action.payload);
    },
    clearAdminToken: (state) => {
      state.admin = null;
      localStorage.removeItem('adminToken');
    },
  },
});

export const { setAdminToken, clearAdminToken } = adminTokenSlice.actions;

export default adminTokenSlice.reducer;
