import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseCompanyUrl } from "../../constants/api";

export const companyApiSlice = createApi({
  reducerPath: "companyApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseCompanyUrl }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/data",
    }),
    registerPost: builder.mutation({
      query: (postData) => ({
        url: "/register",
        method: "POST",
        body: postData,
      }),
    }),
    loginPost: builder.mutation({
      query: (postData) => ({
        url: "/login",
        method: "POST",
        body: postData,
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useRegisterPostMutation,
  useLoginPostMutation,
} = companyApiSlice;
