import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Ar from "./locales/Ar.json";
import En from "./locales/En.json";
import { cookieService } from "./Cookies/CookiesServices";

const savedLang = cookieService.get("i18nextLng") || "ar";

if (!cookieService.get("i18nextLng")) {
  cookieService.set("i18nextLng", savedLang);
}

i18n.use(initReactI18next).init({
  resources: {
    en: En,
    ar: Ar,
  },
  lng: savedLang,
  fallbackLng: "ar",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
