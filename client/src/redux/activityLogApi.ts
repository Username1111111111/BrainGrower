import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ActivityLog } from '../types/ActivityLog';

const baseUrl = import.meta.env.VITE_SERVER_DOMAIN;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const activityLogApi = createApi({
  reducerPath: 'activityLogApi',
  baseQuery,
  endpoints: (builder) => ({
    fetchActivityLogs: builder.query<ActivityLog[], number>({
      query: (userId) => `user/${userId}/activity`,
    }),
  }),
});

export const { useFetchActivityLogsQuery } = activityLogApi;
