import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseCompanyUrl } from "../../constants/api";
import { HttpMethod } from "../../schema/httpMethods";

export const companyApiSlice = createApi({
  reducerPath: "companyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseCompanyUrl,
    credentials:"include",
  }),
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: () => "/get-approvals",
      keepUnusedDataFor:300,
    }),
    getServices: builder.query({
      query: (id:string) => `/get-services/${id}`,
      keepUnusedDataFor:300,
    }),
    getEveryServices: builder.query({
      query: () => "/get-all-services",
      keepUnusedDataFor:300,
    }),
    getCompanyById: builder.query({
      query: (id: string) => `/get-company/${id}`,
    }),
    updateCompany: builder.mutation({
      query: ({ id, isBlocked, isApproved }) => {
        const body: any = {};
        if (isBlocked !== undefined) body.isBlocked = isBlocked;
        if (isApproved !== undefined) body.isApproved = isApproved;
        return {
          url: `/company-status/${id}`,
          method: HttpMethod.PATCH,
          body,
        };
      },
    }),
    updateServiceStatus: builder.mutation({
      query: ({ id, isBlocked }) => ({
        url: `/services-status/${id}`,
        method: HttpMethod.PATCH,
        body: { isBlocked },
      }),
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
    addService: builder.mutation({
      query: (postData) => ({
        url: "/add-service",
        method: HttpMethod.POST,
        body: postData,
      }),
    }),
    deleteServicePost: builder.mutation({
      query: (id: string) => ({
        url: `/delete-service/${id}`,
        method: HttpMethod.DELETE,
      }),
    }),

  }),
});

export const {
  useRegisterPostMutation,
  useLoginPostMutation,
  useGetCompaniesQuery,
  useUpdateCompanyMutation,
  useGetCompanyByIdQuery,
  useAddServiceMutation,
  useGetServicesQuery,
  useUpdateServiceStatusMutation,
  useDeleteServicePostMutation,
  useGetEveryServicesQuery
} = companyApiSlice;
