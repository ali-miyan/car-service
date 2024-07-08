import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUserUrl } from "../../constants/api";

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUserUrl }),
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
    verifyOtp: builder.mutation({
      query: (postData) => ({
        url: "/verify-otp",
        method: "POST",
        body: postData,
      }),
    }),
    loginUser: builder.mutation({
      query: (postData) => ({
        url: "/login",
        method: "POST",
        body: postData,
      }),
    }),
    googleRegister: builder.mutation({
      query: (postData) => ({
        url: "/google-register",
        method: "POST",
        body: postData,
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useRegisterPostMutation,
  useVerifyOtpMutation,
  useLoginUserMutation,
  useGoogleRegisterMutation
} = userApiSlice;
