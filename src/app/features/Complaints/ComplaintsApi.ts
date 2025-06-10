import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { decryptToken } from "../../../Cookies/CryptoServices/crypto";
import { ALL_COMPLAINT, DELETE_COMPLAINT } from "../../../api/api";

export const ComplaintsApi = createApi({
  reducerPath: "ComplaintsApi",
  tagTypes: ["Complaints"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getAllComplaints: builder.query({
      query: (token: string) => ({
        url: ALL_COMPLAINT,
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      providesTags: ["Complaints"],
    }),
    deleteComplaints: builder.mutation({
      query: ({
        complaint_id,
        token,
      }: {
        complaint_id: number;
        token: string;
      }) => ({
        url: DELETE_COMPLAINT,
        method: "POST",
        body: { complaint_id },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: ["Complaints"],
    }),
  }),
});

export const { useDeleteComplaintsMutation, useGetAllComplaintsQuery } =
  ComplaintsApi;
