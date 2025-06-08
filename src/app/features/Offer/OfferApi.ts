import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GET_ALL_OFFERS } from "../../../api/api";

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
  }),
});

export const { useGetAllOfferQuery } = OfferApi;
