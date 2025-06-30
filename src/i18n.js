import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import de from "./locales/de.json";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

i18n
    .use(LanguageDetector) //sprache authomatische erkennen
    .use(initReactI18next)
    .init({

        resources: {
            en: { translation: en },
            de: { translation: de },
            ar: { translation: ar }
        },
        fallbackLng: "de",
        detection: {
            order: ["querystring", "localStorage", "navigator", "htmlTag"],
            lookupLocalStorage: "lang",
            caches: ["localStorage"],
        },
        lowerCaseLng: true,
        load: "languageOnly",
        interpolation: { escapeValue: false }
    }).then(() => {
        const normalized = i18n.language?.split("-")[0]; //save only language (de not de-DE)
        if (i18n.language !== normalized) {
            i18n.changeLanguage(normalized);
        }

    });

export default i18n; 
