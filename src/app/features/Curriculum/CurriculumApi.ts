import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GET_ALL_CURRICULUMS } from "../../../api/api";

export const CurriculumsApi = createApi({
  reducerPath: "CurriculumsApi",
  tagTypes: ["Curriculums"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getAllCurriculums: builder.query({
      query: () => ({
        url: GET_ALL_CURRICULUMS,
      }),
      providesTags: ["Curriculums"],
    }),
  }),
});

export const { useGetAllCurriculumsQuery } = CurriculumsApi;
