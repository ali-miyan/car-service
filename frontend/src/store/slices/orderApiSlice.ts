import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseOrderUrl } from "../../constants/api";
import { HttpMethod } from "../../schema/httpMethods";

export const orderApiSlice = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseOrderUrl,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/get-users",
    }),
    getUserById: builder.query({
      query: (id:string) => `/get-user/${id}`,
    }),
    makeOrder: builder.mutation({
      query: (formData) => ({
        url: `/booking`,
        method: HttpMethod.POST,
        body:formData,
      }),
    }),
  }),
});

export const {

  useGetUsersQuery,
  useGetUserByIdQuery,
  useMakeOrderMutation
} = orderApiSlice;
