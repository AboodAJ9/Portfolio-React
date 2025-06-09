import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import de from "./locales/de.json";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

i18next.use(initReactI18next).init({
    resources: {
        en: { translation: en},
        de: { translation: de}, 
        ar: { translation: ar}
    }, 
    lng: "de", //standard
    fallbackLng: "de", 
    interpolation: {escapeValue: false}

}); 

export default i18next; 
