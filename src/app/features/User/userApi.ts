import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { decryptToken } from "../../../Cookies/CryptoServices/crypto";
import {
  CHANGE_IMAGE,
  CHANGE_PASSWORD,
  LOGIN,
  NEW_PASSWORD,
  REGISTER,
  REGISTERBYGOOGLE,
  SEND_CODE,
  USER_INFO,
  USERVERIFYEMAIL,
} from "../../../api/api";

export interface Iuserdata {
  email: string;
  password: string;
}

interface IRegisterData {
  name: string;
  phone?: string;
  email: string;
  password?: string;
  sub?: string;
  image?: string;
}

interface IUserVerifyEmail {
  code: string;
  email: string;
  password: string;
  newpassword?: string;
}
interface INewPassword {
  email: string;
  password: string;
  newpassword?: string;
  token: string;
}

export const userApi = createApi({
  reducerPath: "auth",
  tagTypes: ["auth"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getuserInformation: builder.query({
      query: (token: string) => ({
        url: USER_INFO,
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
        },
      }),
      providesTags: ["auth"],
    }),
    login: builder.mutation({
      query: ({ email, password }: Iuserdata) => ({
        url: LOGIN,
        method: "POST",
        body: { email, password },
      }),
      invalidatesTags: ["auth"],
    }),
    register: builder.mutation({
      query: ({ email, password, name, phone }: IRegisterData) => ({
        url: REGISTER,
        method: "POST",
        body: { email, password, name, phone },
      }),
      invalidatesTags: ["auth"],
    }),
    registerByGoogle: builder.mutation({
      query: ({ email, name, phone, image, sub }: IRegisterData) => ({
        url: REGISTERBYGOOGLE,
        method: "POST",
        body: { email, name, phone, image, sub },
      }),
      invalidatesTags: ["auth"],
    }),
    VerifyEmail: builder.mutation({
      query: ({ email, password, code }: IUserVerifyEmail) => ({
        url: USERVERIFYEMAIL,
        method: "POST",
        body: { email, code, password },
      }),
      invalidatesTags: ["auth"],
    }),
    forgetPassword: builder.mutation({
      query: (email: string) => ({
        url: SEND_CODE,
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["auth"],
    }),
    changePassword: builder.mutation({
      query: ({ email, password, code }: IUserVerifyEmail) => ({
        url: NEW_PASSWORD,
        method: "POST",
        body: { email, password, code },
      }),
      invalidatesTags: ["auth"],
    }),
    changeMypassword: builder.mutation({
      query: ({ email, password, newpassword, token }: INewPassword) => ({
        url: CHANGE_PASSWORD,
        method: "POST",
        body: { email, password, newpassword },
        headers: {
          Authorization: `Bearer ${decryptToken(token)}`,
          // ملاحظة: لا تضف Content-Type يدوياً
        },
      }),
      invalidatesTags: ["auth"],
    }),
    ChangeImage: builder.mutation({
      query: ({ image, token }) => {
        const formData = new FormData();
        formData.append("image", image); // اسم الحقل يجب أن يتطابق مع الـ backend

        return {
          url: CHANGE_IMAGE,
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${decryptToken(token)}`,
            // ملاحظة: لا تضف Content-Type يدوياً
          },
        };
      },
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetuserInformationQuery,
  useChangeImageMutation,
  useChangeMypasswordMutation, // change old password
  useChangePasswordMutation, // forget password
  useForgetPasswordMutation, // send code
  useRegisterByGoogleMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
} = userApi;
