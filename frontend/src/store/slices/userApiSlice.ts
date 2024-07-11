import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUserUrl } from "../../constants/api";
import { HttpMethod } from "../../schema/httpMethods";

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
  baseUrl: baseUserUrl,
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
    resendOtp: builder.mutation({
      query: (postData) => ({
        url: "/resend-otp",
        method: HttpMethod.POST,
        body: postData,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (postData) => ({
        url: "/verify-otp",
        method: HttpMethod.POST,
        body: postData,
      }),
    }),
    loginUser: builder.mutation({
      query: (postData) => ({
        url: "/login",
        method: HttpMethod.POST,
        body: postData,
      }),
    }),
    googleRegister: builder.mutation({
      query: (postData) => ({
        url: "/google-register",
        method: HttpMethod.POST,
        body: postData,
      }),
    }),
    resetRequest: builder.mutation({
      query: (postData) => ({
        url: "/reset-request",
        method: HttpMethod.POST,
        body: postData,
      }),
    }),
    resetPassword: builder.mutation({
      query: (postData) => ({
        url: "/change-password",
        method: HttpMethod.PATCH,
        body: postData,
      }),
    })
  })
});

export const {
  useGetPostsQuery,
  useRegisterPostMutation,
  useVerifyOtpMutation,
  useLoginUserMutation,
  useGoogleRegisterMutation,
  useResendOtpMutation,
  useResetRequestMutation,
  useResetPasswordMutation
} = userApiSlice;
