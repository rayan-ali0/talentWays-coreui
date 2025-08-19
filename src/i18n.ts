import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./resources/locales/en/translation.json";
import translationFR from "./resources/locales/fr/translation.json";
import translationAR from "./resources/locales/ar/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
  ar: {
    translation: translationAR,
  },
};

const storedLanguage = localStorage.getItem("i18nextLng") ?? "en";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en", // use en if detected lng is not available
    interpolation: {
      escapeValue: false,
    },
    lng: storedLanguage, // Explicitly set the language from localStorage
    debug: false,
    detection: {
      order: ["localStorage", "cookie", "navigator"], // Language detection order
      lookupLocalStorage: "i18nextLng",
      caches: ["localStorage", "cookie"], // Cache user language in localStorage and cookies
    },
  });

export default i18n;
