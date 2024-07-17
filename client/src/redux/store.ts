import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './userApi';
import selectedUserReducer from './selectedUserSlice';
import { activityLogApi } from './activityLogApi';

export const setupStore = () => {
  return configureStore({
    reducer: {
      [userApi.reducerPath]: userApi.reducer,
      selectedUser: selectedUserReducer,
      [activityLogApi.reducerPath]: activityLogApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware).concat(activityLogApi.middleware), // concat new api here or won't work
  });
};

const store = setupStore();

export default store;
