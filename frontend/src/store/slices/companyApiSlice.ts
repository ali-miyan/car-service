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
    getCompanies: builder.query({
      query: () => "/get-approvals",
    }),
    getCompanyById: builder.query({
      query: (id: string) => `/get-company/${id}`,
    }),
    updateCompany: builder.mutation({
      query: ({ id, isBlocked, isApproved }) => {
        const body: any = {};
        if (isBlocked !== undefined) body.isBlocked = isBlocked;
        if (isApproved !== undefined) body.isApproved = isApproved;

        console.log(body);
        

        return {
          url: `/company-status/${id}`,
          method: HttpMethod.PATCH,
          body,
        };
      },
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
  useRegisterPostMutation,
  useLoginPostMutation,
  useGetCompaniesQuery,
  useUpdateCompanyMutation,
  useGetCompanyByIdQuery,
} = companyApiSlice;
