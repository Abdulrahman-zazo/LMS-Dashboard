import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ACCEPT_COMMINTS,
  ADD_COURSE,
  CHANGE_STATUS_COURSE,
  DELETE_COMMINTS,
  DELETE_COURSE,
  GET_ALL_ADMIN_COURSES,
  GET_COURSE_BY_ID,
  UPDATE_COURSE,
} from "../../../api/api";
import { decryptToken } from "@/Cookies/CryptoServices/crypto";
import type { Course } from "@/types";
export interface ICommentsdata {
  token: string;
  comment_id: number;
}

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
      query: ({ token, course_id }: { course_id: number; token: string }) => ({
        url: GET_COURSE_BY_ID,
        method: "POST",
        body: { course_id },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      providesTags: ["Courses"],
    }),
    addcourse: builder.mutation({
      query: ({
        course,
        token,
      }: {
        course: Partial<Course>;
        token: string;
      }) => {
        const formData = new FormData();
        if (course.imageFile) formData.append("image", course.imageFile);
        if (course.name) formData.append("name", course.name);
        if (course.description)
          formData.append("description", course.description);
        if (course.contents) formData.append("contents", course.contents);
        if (course.type) formData.append("type", course.type);
        if (course.material) formData.append("material", course.material);
        if (course.cost) formData.append("cost", course.cost);
        if (course.hours) formData.append("hours", course.hours);
        if (course.requirements)
          formData.append("requirements", course.requirements);
        if (course.summary) formData.append("summary", course.summary);

        return {
          url: ADD_COURSE,
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${decryptToken(token)}`,
            // DON'T set content-type manually here! Let the browser handle it.
          },
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Courses", id: result.id }] : ["Courses"],
    }),
    deleteCourse: builder.mutation({
      query: ({ course_id, token }: { course_id?: number; token: string }) => ({
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
      query: ({
        course,
        token,
      }: {
        course: Partial<Course>;
        token: string;
      }) => {
        const formData = new FormData();
        if (course.imageFile) formData.append("image", course.imageFile);
        if (course.id) formData.append("course_id", String(course.id));
        if (course.name) formData.append("name", course.name);
        if (course.description)
          formData.append("description", course.description);
        if (course.contents) formData.append("contents", course.contents);
        if (course.type) formData.append("type", course.type);
        if (course.material) formData.append("material", course.material);
        if (course.hours) formData.append("hours", course.hours);
        if (course.requirements)
          formData.append("requirements", course.requirements);
        if (course.summary) formData.append("summary", course.summary);
        return {
          url: UPDATE_COURSE,
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${decryptToken(token)}`,
          },
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Courses", id: result.id }] : ["Courses"],
    }),
    acceptComments: builder.mutation({
      query: ({ comment_id, token }: ICommentsdata) => ({
        url: ACCEPT_COMMINTS,
        method: "POST",
        body: { comment_id },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Courses", id: result.id }] : ["Courses"],
    }),
    deleteComments: builder.mutation({
      query: ({ comment_id, token }: ICommentsdata) => ({
        url: DELETE_COMMINTS,
        method: "POST",
        body: { comment_id },
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
  useAcceptCommentsMutation,
  useDeleteCommentsMutation,
} = CoursesApi;
