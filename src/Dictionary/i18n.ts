import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import fa from './fa.json'
import en from './en.json'

const LANGUAGE_STORAGE_KEY = 'nova-language'

const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY)
const initialLanguage = savedLanguage === 'en' ? 'en' : 'fa'

const updateDocumentLanguage = (language: string) => {
  const currentLanguage = language.startsWith('en') ? 'en' : 'fa'

  document.documentElement.lang = currentLanguage
  document.documentElement.dir = currentLanguage === 'fa' ? 'rtl' : 'ltr'

  localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage)
}

updateDocumentLanguage(initialLanguage)

i18n.use(initReactI18next).init({
  resources: {
    fa: {
      translation: fa,
    },
    en: {
      translation: en,
    },
  },
  lng: initialLanguage,
  fallbackLng: 'fa',
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', updateDocumentLanguage)

export default i18n
