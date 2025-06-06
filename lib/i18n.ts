import en from "@/locales/en.json";
import fa from "@/locales/fa.json";

export const translations = {
  en,
  fa,
};

export type Locale = keyof typeof translations;

export const getTranslation = (locale: Locale = "en") => {
  return translations[locale];
};
