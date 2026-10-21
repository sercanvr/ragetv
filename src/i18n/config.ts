import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import tr from './locales/tr.json';
import de from './locales/de.json';

const savedLang = typeof window !== 'undefined' ? localStorage.getItem('ragetv_locale') : null;

// Default strictly to 'en' unless user explicitly changed it in localStorage
const initialLang = savedLang || 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    tr: { translation: tr },
    de: { translation: de },
  },
  lng: initialLang || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
