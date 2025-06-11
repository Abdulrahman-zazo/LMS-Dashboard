import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Subject } from "@/types";
import { decryptToken } from "@/Cookies/CryptoServices/crypto";
import {
  ADD_SUBJECT,
  DELETE_SUBJECT,
  GET_ALL_SUBJECT,
  UPDTAE_SUBJECT,
} from "@/api/api";

export const SubjectsApi = createApi({
  reducerPath: "SubjectsApi",
  tagTypes: ["Subjects"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getAllSubjects: builder.query({
      query: () => ({
        url: GET_ALL_SUBJECT,
      }),
      providesTags: ["Subjects"],
    }),
    addSubject: builder.mutation({
      query: ({
        Subject,
        token,
      }: {
        Subject: Partial<Subject>;
        token: string;
      }) => {
        const formData = new FormData();
        if (Subject.imageFile) formData.append("image", Subject.imageFile);
        if (Subject.name) formData.append("name", Subject.name);
        if (Subject.stage_id)
          formData.append("stage_id", String(Subject.stage_id));
        if (Subject.curricula_id)
          formData.append("curricula_id", String(Subject.curricula_id));

        return {
          url: ADD_SUBJECT,
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${decryptToken(token)}`,
            // DON'T set content-type manually here! Let the browser handle it.
          },
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Subjects", id: result.id }] : ["Subjects"],
    }),
    updateSubject: builder.mutation({
      query: ({
        Subject,
        token,
      }: {
        Subject: Partial<Subject>;
        token: string;
      }) => {
        const formData = new FormData();
        if (Subject.imageFile) formData.append("image", Subject.imageFile);
        if (Subject.name) formData.append("name", Subject.name);
        if (Subject.stage_id)
          formData.append("stage_id", String(Subject.stage_id));
        if (Subject.curricula_id)
          formData.append("curricula_id", String(Subject.curricula_id));

        return {
          url: UPDTAE_SUBJECT,
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${decryptToken(token)}`,
            // DON'T set content-type manually here! Let the browser handle it.
          },
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Subjects", id: result.id }] : ["Subjects"],
    }),
    deleteSubject: builder.mutation({
      query: ({
        subject_id,
        token,
      }: {
        subject_id?: number;
        token: string;
      }) => ({
        url: DELETE_SUBJECT,
        method: "POST",
        body: {
          subject_id,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Subjects", id: result.id }] : ["Subjects"],
    }),
  }),
});

export const {
  useGetAllSubjectsQuery,
  useAddSubjectMutation,
  useDeleteSubjectMutation,
  useUpdateSubjectMutation,
} = SubjectsApi;
