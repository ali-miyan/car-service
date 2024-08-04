import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseOrderUrl } from "../../constants/api";
import { HttpMethod } from "../../schema/httpMethods";
import { get } from "http";

export const orderApiSlice = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseOrderUrl,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (id:string) => `/get-bookings/${id}`,
    }),
    getSingleOrder: builder.query({
      query: (id:string) => `/get-single-order/${id}`,
    }),
    makeOrder: builder.mutation({
      query: (formData) => ({
        url: `/booking`,
        method: HttpMethod.POST,
        body:formData,
      }),
    }),
    updateOrder: builder.mutation({
      query: (formData) => ({
        url: `/update-booking`,
        method: HttpMethod.POST,
        body:formData,
      }),
    }),
  }),
});

export const {
  useMakeOrderMutation,
  useUpdateOrderMutation,
  useGetOrdersQuery,
  useGetSingleOrderQuery
} = orderApiSlice;
