import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ADD_CURRICULUMS,
  DELETE_CURRICULUMS,
  GET_ALL_CURRICULUMS,
  GET_CURRICULUM_BY_ID,
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
    getCurriculumsById: builder.query({
      query: (curriculum_id: number) => ({
        url: GET_CURRICULUM_BY_ID,
        method: "POST",
        body: {
          curriculum_id,
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
        if (Curriculum.stage_id && Array.isArray(Curriculum.stage_id)) {
          Curriculum.stage_id.forEach((id, index) => {
            formData.append(`stage_id[${index}]`, String(id));
          });
        }
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
        if (Curriculum.id)
          formData.append("curriculum_id", String(Curriculum.id));

        if (Curriculum.stage_id && Array.isArray(Curriculum.stage_id)) {
          Curriculum.stage_id.forEach((id, index) => {
            formData.append(`stage_id[${index}]`, String(id));
          });
        }
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
  useGetCurriculumsByIdQuery,
  useAddCurriculumMutation,
  useUpdateCurriculumMutation,
  useDeleteCurriculumMutation,
} = CurriculumsApi;
