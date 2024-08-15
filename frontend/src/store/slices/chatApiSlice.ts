import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseChatUrl } from "../../constants/api";
import { HttpMethod } from "../../schema/httpMethods";

export const chatApiSlice = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseChatUrl,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getService: builder.query({
      query: (id?) => (id ? `/get-service?companyId=${id}` : `/get-service`),
      keepUnusedDataFor: 300,
    }),
    sendMessage: builder.mutation({
      query: (postData) => ({
        url: "/send-message",
        method: HttpMethod.POST,
        body: postData,
      }),
    }),
  }),
});

export const {
  useGetServiceQuery,
  useSendMessageMutation,
} = chatApiSlice;
