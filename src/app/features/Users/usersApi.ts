import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { decryptToken } from "@/Cookies/CryptoServices/crypto";
import { DELETE_USER, GET_ALL_USERS, MAKE_ADMIN } from "@/api/api";

export const usersApi = createApi({
  reducerPath: "UsersApi",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (token: string) => ({
        url: GET_ALL_USERS,
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      providesTags: ["Users"],
    }),

    deleteUser: builder.mutation({
      query: ({ user_id, token }: { user_id?: number; token: string }) => ({
        url: DELETE_USER,
        method: "POST",
        body: {
          id: user_id,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Users", id: result.id }] : ["Users"],
    }),

    MakeAdmin: builder.mutation({
      query: ({ user_id, token }: { user_id?: number; token: string }) => ({
        url: MAKE_ADMIN,
        method: "POST",
        body: {
          id: user_id,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Users", id: result.id }] : ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useMakeAdminMutation,
} = usersApi;
