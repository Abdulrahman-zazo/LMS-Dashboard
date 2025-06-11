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
      query: (token: string) => ({
        url: GET_ALL_OFFERS,
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
          // DON'T set content-type manually here! Let the browser handle it.
        },
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
        if (Offers.description)
          formData.append("description", Offers.description);
        if (Offers.name) formData.append("name", Offers.name);
        if (Offers.cost) formData.append("cost", Offers.cost);
        if (Offers.course_id && Array.isArray(Offers.course_id)) {
          Offers.course_id.forEach((id, index) => {
            formData.append(`course_id[${index}]`, String(id));
          });
        }
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
        if (Offers.description)
          formData.append("description", Offers.description);
        if (Offers.name) formData.append("name", Offers.name);
        if (Offers.cost) formData.append("cost", Offers.cost);
        if (Offers.id) formData.append("offer_id", String(Offers.id));
        if (Offers.course_id && Array.isArray(Offers.course_id)) {
          Offers.course_id.forEach((id, index) => {
            formData.append(`course_id[${index}]`, String(id));
          });
        }
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
    deleteOffer: builder.mutation({
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
  useDeleteOfferMutation,
  useUpdateOfferMutation,
} = OfferApi;
