import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  user: localStorage.getItem('userToken'),
};

const tokenSlice = createSlice({
  name: 'userToken',
  initialState,
  reducers: {
    setUserToken: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
      localStorage.setItem('userToken', action.payload);
    },
    clearUserToken: (state) => {
      state.user = null;
      localStorage.removeItem('userToken');
    },
  },
});

export const { setUserToken, clearUserToken } = tokenSlice.actions;

export default tokenSlice.reducer;
