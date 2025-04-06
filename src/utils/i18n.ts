import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en/translation.json";
import fa from "@/locales/fa/translation.json";

i18n
 .use(LanguageDetector)
 .use(initReactI18next)
 .init({
  fallbackLng: "en",
  supportedLngs: ["en", "fa"],
  interpolation: {
   escapeValue: false,
  },
  resources: {
   en: { translation: en },
   fa: { translation: fa },
  },
 });

export default i18n;
