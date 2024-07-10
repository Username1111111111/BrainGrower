import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './userApi';
import selectedUserReducer from './selectedUserSlice';

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    selectedUser: selectedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export default store;