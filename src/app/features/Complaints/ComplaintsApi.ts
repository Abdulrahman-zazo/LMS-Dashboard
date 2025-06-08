import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { decryptToken } from "../../../Cookies/CryptoServices/crypto";
import { DELETE_COMPLAINT } from "../../../api/api";

export interface IComplaintsdata {
  text: string;
  phone: string;
  email: string;
  name: string;
  token: string;
}
export const ComplaintsApi = createApi({
  reducerPath: "ComplaintsApi",
  tagTypes: ["Complaints"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    addComplaints: builder.mutation({
      query: ({ text, name, phone, email, token }: IComplaintsdata) => ({
        url: DELETE_COMPLAINT,
        method: "POST",
        body: { text, name, phone, email },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: ["Complaints"],
    }),
  }),
});

export const { useAddComplaintsMutation } = ComplaintsApi;
