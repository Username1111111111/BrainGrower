import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../types/User";
const baseUrl = import.meta.env.VITE_SERVER_DOMAIN;

export const userApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    fetchUsers: builder.query<User[], void>({
      query: () => 'user/',
    }),
    addUser: builder.mutation<User, Partial<User>>({
      query: (user) => ({
        url: 'user/',
        method: 'POST',
        body: user,
      }),
    }),
    updateUser: builder.mutation<User, Partial<User> & Pick<User, 'id'>>({
      query: ({ id, ...user }) => ({
        url: `user/${id}`,
        method: 'PUT',
        body: user,
      }),
    }),
  }),
})

export const { useFetchUsersQuery, useLazyFetchUsersQuery, useAddUserMutation, useUpdateUserMutation } = userApi;