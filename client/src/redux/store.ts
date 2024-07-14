import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './userApi';
import selectedUserReducer from './selectedUserSlice';

export const setupStore = () => {
  return configureStore({
    reducer: {
      [userApi.reducerPath]: userApi.reducer,
      selectedUser: selectedUserReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
  });
};

const store = setupStore();

export default store;
