import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

export const exportUserApi = createApi({
  reducerPath: 'exportUserApi',
  baseQuery,
  endpoints: (builder) => ({
    exportUserData: builder.mutation<{ blob: Blob }, { userId: number; format: string }>({
      query: ({ userId, format }) => ({
        url: `user/${userId}/export?format=${format}`,
        responseHandler: async (response) => {
          const blob = await response.blob();
          return { blob };
        },
      }),
    }),
  }),
});

export const { useExportUserDataMutation } = exportUserApi;
