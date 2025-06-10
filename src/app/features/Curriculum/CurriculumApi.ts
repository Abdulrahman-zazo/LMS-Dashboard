import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ADD_CURRICULUMS,
  DELETE_CURRICULUMS,
  GET_ALL_CURRICULUMS,
  UPDTAE_CURRICULUMS,
} from "../../../api/api";
import type { Curriculum } from "@/types";
import { decryptToken } from "@/Cookies/CryptoServices/crypto";

export const CurriculumsApi = createApi({
  reducerPath: "CurriculumsApi",
  tagTypes: ["Curriculums"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getAllCurriculums: builder.query({
      query: (token: string) => ({
        url: GET_ALL_CURRICULUMS,
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
          // DON'T set content-type manually here! Let the browser handle it.
        },
      }),
      providesTags: ["Curriculums"],
    }),
    addCurriculum: builder.mutation({
      query: ({
        Curriculum,
        token,
      }: {
        Curriculum: Partial<Curriculum>;
        token: string;
      }) => {
        const formData = new FormData();
        if (Curriculum.imageFile)
          formData.append("image", Curriculum.imageFile);
        if (Curriculum.name) formData.append("name", Curriculum.name);
        return {
          url: ADD_CURRICULUMS,
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${decryptToken(token)}`,
            // DON'T set content-type manually here! Let the browser handle it.
          },
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Curriculums", id: result.id }] : ["Curriculums"],
    }),
    updateCurriculum: builder.mutation({
      query: ({
        Curriculum,
        token,
      }: {
        Curriculum: Partial<Curriculum>;
        token: string;
      }) => {
        const formData = new FormData();
        if (Curriculum.imageFile)
          formData.append("image", Curriculum.imageFile);
        if (Curriculum.name) formData.append("name", Curriculum.name);
        return {
          url: UPDTAE_CURRICULUMS,
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${decryptToken(token)}`,
            // DON'T set content-type manually here! Let the browser handle it.
          },
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Curriculums", id: result.id }] : ["Curriculums"],
    }),
    deleteCurriculum: builder.mutation({
      query: ({
        curriculum_id,
        token,
      }: {
        curriculum_id?: number;
        token: string;
      }) => ({
        url: DELETE_CURRICULUMS,
        method: "POST",
        body: {
          curriculum_id,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Curriculums", id: result.id }] : ["Curriculums"],
    }),
  }),
});

export const {
  useGetAllCurriculumsQuery,
  useAddCurriculumMutation,
  useUpdateCurriculumMutation,
  useDeleteCurriculumMutation,
} = CurriculumsApi;
