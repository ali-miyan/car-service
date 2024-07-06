import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/userApiSlice';
import auth  from './auth/authSlice';

const rootReducer = combineReducers({
  auth: auth,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;


