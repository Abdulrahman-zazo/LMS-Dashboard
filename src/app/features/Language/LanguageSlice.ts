import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import i18n from "../../../i18";
import { cookieService } from "../../../Cookies/CookiesServices";

interface LanguageState {
  lang: string;
}
const initialLang = cookieService.get("i18nextLng") || "ar";

const initialState: LanguageState = {
  lang: initialLang,
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLangAction: (state, action: PayloadAction<string>) => {
      const newLang = action.payload;
      i18n.changeLanguage(newLang);
      cookieService.set("i18nextLng", newLang);
      state.lang = newLang;
    },
  },
});

export const { changeLangAction } = languageSlice.actions;
export default languageSlice.reducer;
