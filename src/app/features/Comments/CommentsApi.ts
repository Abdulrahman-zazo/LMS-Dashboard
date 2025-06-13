import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ACCEPT_COMMINTS, DELETE_COMMINTS } from "../../../api/api";
import { decryptToken } from "../../../Cookies/CryptoServices/crypto";

export interface ICommentsdata {
  token: string;
  comment_id: number;
}

export const CommentsApi = createApi({
  reducerPath: "CommentsApi",
  tagTypes: ["Comments"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    acceptComments: builder.mutation({
      query: ({ comment_id, token }: ICommentsdata) => ({
        url: ACCEPT_COMMINTS,
        method: "POST",
        body: { comment_id },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: ["Comments"],
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
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const { useDeleteCommentsMutation, useAcceptCommentsMutation } =
  CommentsApi;
