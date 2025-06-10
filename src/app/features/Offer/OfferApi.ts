import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Offers } from "@/types";
import { decryptToken } from "@/Cookies/CryptoServices/crypto";
import {
  ADD_OFFERS,
  DELETE_OFFERS,
  GET_ALL_OFFERS,
  UPDATE_OFFERS,
} from "@/api/api";

export const OfferApi = createApi({
  reducerPath: "OfferApi",
  tagTypes: ["Offer"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getAllOffer: builder.query({
      query: () => ({
        url: GET_ALL_OFFERS,
      }),
      providesTags: ["Offer"],
    }),
    addOffer: builder.mutation({
      query: ({
        Offers,
        token,
      }: {
        Offers: Partial<Offers>;
        token: string;
      }) => {
        const formData = new FormData();
        if (Offers.description) formData.append("image", Offers.description);
        if (Offers.name) formData.append("name", Offers.name);
        return {
          url: ADD_OFFERS,
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${decryptToken(token)}`,
            // DON'T set content-type manually here! Let the browser handle it.
          },
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Offer", id: result.id }] : ["Offer"],
    }),
    updateOffer: builder.mutation({
      query: ({
        Offers,
        token,
      }: {
        Offers: Partial<Offers>;
        token: string;
      }) => {
        const formData = new FormData();
        if (Offers.description) formData.append("image", Offers.description);
        if (Offers.name) formData.append("name", Offers.name);
        return {
          url: UPDATE_OFFERS,
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${decryptToken(token)}`,
            // DON'T set content-type manually here! Let the browser handle it.
          },
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Offer", id: result.id }] : ["Offer"],
    }),
    deleteCourse: builder.mutation({
      query: ({ offer_id, token }: { offer_id?: number; token: string }) => ({
        url: DELETE_OFFERS,
        method: "POST",
        body: {
          offer_id,
        },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Offer", id: result.id }] : ["Offer"],
    }),
  }),
});

export const {
  useGetAllOfferQuery,
  useAddOfferMutation,
  useDeleteCourseMutation,
  useUpdateOfferMutation,
} = OfferApi;
