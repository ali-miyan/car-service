import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseCompanyUrl } from "../../constants/api";
import { HttpMethod } from "../../schema/httpMethods";

export const companyApiSlice = createApi({
  reducerPath: "companyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseCompanyUrl,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/data",
    }),
    registerPost: builder.mutation({
      query: (postData) => ({
        url: "/register",
        method: HttpMethod.POST,
        body: postData,
      }),
    }),
    loginPost: builder.mutation({
      query: (postData) => ({
        url: "/login",
        method: HttpMethod.POST,
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
