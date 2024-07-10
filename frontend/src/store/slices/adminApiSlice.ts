import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseAdminUrl } from "../../constants/api";
import { RootState } from "../store";

export const adminApiSlice = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseAdminUrl,
    credentials:'include',
    prepareHeaders: (headers,{ getState }) => {
      
      const state = getState() as RootState;
      const token = state.adminAuth.admin;
      if (token) {
        headers.set("Authorization",`Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getService: builder.query({
      query: () => "/get-service",
    }),
    registerPost: builder.mutation({
      query: (postData) => ({
        url: "/login",
        method: "POST",
        body: postData,
      }),
    }),
    addServicePost: builder.mutation({
      query: (postData) => ({
        url: "/add-service",
        method: "POST",
        body: postData,
      }),
    }),
    deleteServicePost: builder.mutation({
      query: (id:string) => ({
        url: `/delete-service/${id}`,
        method: "DELETE",
      }),
    }),
    updateServiceStatus: builder.mutation({
      query: ({ id, isBlocked }) => ({
        url: `/services-status/${id}`,
        method: 'PUT',
        body:{isBlocked} ,
      }),
    }),
  }),
});

export const {
  useGetServiceQuery,
  useRegisterPostMutation,
  useAddServicePostMutation,
  useDeleteServicePostMutation,
  useUpdateServiceStatusMutation

} = adminApiSlice;
