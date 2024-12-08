import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enCommon from './locales/en/common';
import enDashboard from './locales/en/dashboard';
import frCommon from './locales/fr/common';
import frDashboard from './locales/fr/dashboard';
import arCommon from './locales/ar/common';
import arDashboard from './locales/ar/dashboard';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr',
    resources: {
      en: {
        translation: {
          ...enCommon,
          dashboard: enDashboard
        }
      },
      ar: {
        translation: {
          ...arCommon,
          dashboard: arDashboard
        }
      },
      fr: {
        translation: {
          ...frCommon,
          dashboard: frDashboard
        }
      }
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;