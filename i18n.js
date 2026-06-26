import es from './src/locales/es-MX.json'
import en from './src/locales/en-US.json'
import { createI18n } from 'vue-i18n';

const messages = {
  en: en,
  es: es,
};

const i18n = createI18n({
  locale: 'en', // Idioma por defecto
  fallbackLocale: 'en', // Idioma de reserva
  messages, // Traducciones
});

export default i18n;
