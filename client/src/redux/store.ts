import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './userApi';
import selectedUserReducer from './selectedUserSlice';
import { activityLogApi } from './activityLogApi';
import { exportUserApi } from './exportUserApi';
import { RootState } from '@reduxjs/toolkit/query';

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: {
      [userApi.reducerPath]: userApi.reducer,
      selectedUser: selectedUserReducer,
      [activityLogApi.reducerPath]: activityLogApi.reducer,
      [exportUserApi.reducerPath]: exportUserApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(userApi.middleware)
        .concat(activityLogApi.middleware) // concat new api here or won't work
        .concat(exportUserApi.middleware),
    preloadedState,
  });
};

const store = setupStore();

export default store;
