import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userApiSlice } from './slices/userApiSlice';
import { companyApiSlice } from './slices/companyApiSlice';
import { adminApiSlice } from './slices/adminApiSlice';

const rootReducer = combineReducers({
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


