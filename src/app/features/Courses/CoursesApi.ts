import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ADD_COURSE,
  CHANGE_STATUS_COURSE,
  DELETE_COURSE,
  GET_ALL_ADMIN_COURSES,
  GET_COURSE_BY_ID,
  UPDATE_COURSE,
} from "../../../api/api";
import { decryptToken } from "@/Cookies/CryptoServices/crypto";
import type { Course } from "@/types";

export const CoursesApi = createApi({
  reducerPath: "CoursesApi",
  tagTypes: ["Courses"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: (token: string) => ({
        url: GET_ALL_ADMIN_COURSES,
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      providesTags: ["Courses"],
    }),
    getCourseById: builder.query({
      query: (course_id: number) => ({
        url: GET_COURSE_BY_ID,
        method: "POST",
        body: { course_id },
      }),
      providesTags: ["Courses"],
    }),
    addcourse: builder.mutation({
      query: ({ course, token }: { course: Course; token: string }) => ({
        url: ADD_COURSE,
        method: "POST",
        body: course,
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Courses", id: result.id }] : ["Courses"],
    }),
    deleteCourse: builder.mutation({
      query: ({ course_id, token }: { course_id: number; token: string }) => ({
        url: DELETE_COURSE,
        method: "POST",
        body: {
          course_id,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Courses", id: result.id }] : ["Courses"],
    }),
    activeCourse: builder.mutation({
      query: ({ course_id, token }: { course_id: number; token: string }) => ({
        url: CHANGE_STATUS_COURSE,
        method: "POST",
        body: {
          course_id,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Courses", id: result.id }] : ["Courses"],
    }),
    updateCourse: builder.mutation({
      query: ({ course, token }: { course: Course; token: string }) => ({
        url: UPDATE_COURSE,
        method: "POST",
        body: course,

        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Courses", id: result.id }] : ["Courses"],
    }),
  }),
});

export const {
  useGetCourseByIdQuery,
  useGetAllCoursesQuery,
  useActiveCourseMutation,
  useAddcourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} = CoursesApi;
