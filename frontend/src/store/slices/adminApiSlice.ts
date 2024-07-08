  import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseAdminUrl } from "../../constants/api";

export const adminApiSlice = createApi({
  reducerPath: "adminApi",
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

export const { useGetPostsQuery, useRegisterPostMutation } = adminApiSlice;
