import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseAdminUrl } from "../../constants/api";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: baseAdminUrl }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/data",
    }),
    registerPost: builder.mutation({
      query: (postData) => ({
        url: "/login",
        method: "POST",
        body: postData,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useRegisterPostMutation } = apiSlice;
