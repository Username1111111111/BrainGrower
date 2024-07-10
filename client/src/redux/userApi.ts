import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../types/User";

const baseUrl = import.meta.env.VITE_SERVER_DOMAIN;

export const userApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    fetchUser: builder.query<User, number>({
      query: (id) => `user/${id}`,
    }),
    fetchUsers: builder.query<User[], void>({
      query: () => 'user/',
    }),
    fetchUserByEmail: builder.query<User, string>({
      query: (email) => `user/email/${email}`,
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
    loginUser: builder.mutation<User, Partial<User>>({
      query: (user) => ({
        url: 'auth/login/',
        method: 'POST',
        body: user,
      }),
    }),
    signupUser: builder.mutation<User, Partial<User>>({
      query: (user) => ({
        url: 'auth/signup/',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const { 
  useFetchUsersQuery, 
  useFetchUserQuery, 
  useLazyFetchUserQuery,
  useFetchUserByEmailQuery, 
  useLazyFetchUserByEmailQuery, 
  useAddUserMutation, 
  useUpdateUserMutation,
  useLoginUserMutation,
  useSignupUserMutation 
} = userApi;