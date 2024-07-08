import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  company: localStorage.getItem('companyToken'),
};

const tokenSlice = createSlice({
  name: 'companyToken',
  initialState,
  reducers: {
    setCompanyToken: (state, action: PayloadAction<string>) => {
      state.company = action.payload;
      localStorage.setItem('companyToken', action.payload);
    },
    clearCompanyToken: (state) => {
      state.company = null;
      localStorage.removeItem('companyToken');
    },
  },
});

export const { setCompanyToken, clearCompanyToken } = tokenSlice.actions;

export default tokenSlice.reducer;
