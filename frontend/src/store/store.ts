import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userApiSlice } from './slices/userApiSlice';
import { companyApiSlice } from './slices/companyApiSlice';
import { adminApiSlice } from './slices/adminApiSlice';
import userAuth  from './auth/userAuthSlice';
import companyAuth  from './auth/companyAuthSlice';
import adminAuth  from './auth/adminAuthSlice';

const rootReducer = combineReducers({
  userAuth: userAuth,
  adminAuth: adminAuth,
  companyAuth: companyAuth,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
  [companyApiSlice.reducerPath]: companyApiSlice.reducer,
  [adminApiSlice.reducerPath]: adminApiSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApiSlice.middleware,
      companyApiSlice.middleware,
      adminApiSlice.middleware
    ),
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;


