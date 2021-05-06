import React from 'react'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import cookies from 'js-cookie'
import { it } from './Assets/Translations/it'
import { en } from './Assets/Translations/en'
export { useTranslation } from 'react-i18next'

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'it'],
    fallbackLng: 'en',
    resources: {
      en : en,
      it : it
    },
    debug: false,
    detection: {
      order: ['path', 'cookie', 'htmlTag'],
      caches: ['cookie'],
    },
    react: { useSuspense: false },
  })
 
  export const languages = [
    {
      code: 'en',
      name: 'English',
      country_code: 'gb',
    },
    {
      code: 'it',
      name: 'Italia',
      country_code: 'it',
    },
  ]

 export const useCurrentLanguage = () => {
    const [getLanguageCode, setLanguageCode] = React.useState(cookies.get('i18next'))
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setLanguageCode(event.target.value as string);
        i18next.changeLanguage(event.target.value as string)
    }
   
    return {getCurrentLanguageCode: getLanguageCode, setCurrentLanguageCode: handleChange}
}
  