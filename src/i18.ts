import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Ar from "./locales/Ar.json";
import En from "./locales/En.json";

// تهيئة i18n
i18n.use(initReactI18next).init({
  resources: {
    en: En,
    ar: Ar,
  },
  lng: "ar", // اللغة الافتراضية
  fallbackLng: "ar",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
