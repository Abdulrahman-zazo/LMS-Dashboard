import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Stage } from "@/types";
import { decryptToken } from "@/Cookies/CryptoServices/crypto";
import {
  ADD_STAGE,
  DELETE_STAGE,
  GET_ALL_STAGE,
  UPDTAE_STAGE,
} from "@/api/api";

export const StagesApi = createApi({
  reducerPath: "StagesApi",
  tagTypes: ["Stages"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getAllStages: builder.query({
      query: (token: string) => ({
        url: GET_ALL_STAGE,
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
          // DON'T set content-type manually here! Let the browser handle it.
        },
      }),
      providesTags: ["Stages"],
    }),
    addStage: builder.mutation({
      query: ({ Stage, token }: { Stage: Partial<Stage>; token: string }) => {
        const formData = new FormData();

        if (Stage.name) formData.append("name", Stage.name);

        return {
          url: ADD_STAGE,
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${decryptToken(token)}`,
            // DON'T set content-type manually here! Let the browser handle it.
          },
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Stages", id: result.id }] : ["Stages"],
    }),
    updateStage: builder.mutation({
      query: ({ Stage, token }: { Stage: Partial<Stage>; token: string }) => {
        const formData = new FormData();
        if (Stage.name) formData.append("image", Stage.name);
        if (Stage.id) formData.append("id", String(Stage.id));

        return {
          url: UPDTAE_STAGE,
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${decryptToken(token)}`,
            // DON'T set content-type manually here! Let the browser handle it.
          },
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Stages", id: result.id }] : ["Stages"],
    }),
    deleteStage: builder.mutation({
      query: ({ stage_id, token }: { stage_id?: number; token: string }) => ({
        url: DELETE_STAGE,
        method: "POST",
        body: {
          stage_id,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Stages", id: result.id }] : ["Stages"],
    }),
  }),
});

export const {
  useGetAllStagesQuery,
  useAddStageMutation,
  useDeleteStageMutation,
  useUpdateStageMutation,
} = StagesApi;
