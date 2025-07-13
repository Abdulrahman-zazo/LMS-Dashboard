import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { decryptToken } from "@/Cookies/CryptoServices/crypto";
import { GET_ALL_CONTACTS, UPDATE_CONTACTS } from "@/api/api";
import type { Contact } from "@/types";

export const ContactsApi = createApi({
  reducerPath: "ContactsApi",
  tagTypes: ["Contacts"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getAllContacts: builder.query({
      query: (token: string) => ({
        url: GET_ALL_CONTACTS,
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      providesTags: ["Contacts"],
    }),

    updateContacts: builder.mutation({
      query: ({
        Contacts,
        token,
      }: {
        Contacts: Partial<Contact>;
        token: string;
      }) => {
        const formData = new FormData();
        if (Contacts.facebook_url)
          formData.append("facebook_url", String(Contacts.facebook_url));
        if (Contacts.instagram_url)
          formData.append("instagram_url", String(Contacts.instagram_url));
        if (Contacts.telegram_url)
          formData.append("telegram_url", String(Contacts.telegram_url));
        if (Contacts.whatsapp_num)
          formData.append("whatsapp_num", String(Contacts.whatsapp_num));
        if (Contacts.youtube_url)
          formData.append("youtube_url", String(Contacts.youtube_url));

        return {
          url: UPDATE_CONTACTS,
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${decryptToken(token)}`,
          },
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Contacts", id: result.id }] : ["Contacts"],
    }),
  }),
});

export const { useGetAllContactsQuery, useUpdateContactsMutation } =
  ContactsApi;
