import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../constants/api';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/data',
    }),
    registerPost: builder.mutation({
      query: (postData) => ({
        url: '/register',
        method: 'POST',
        body: postData,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useRegisterPostMutation } = apiSlice;
