import i18n, { InitOptions } from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Fluent from 'i18next-fluent'
import FluentBackend from 'i18next-fluent-backend'
import ftlTranslationsPathPt from '../assets/locales/pt-br/translations.ftl'
import ftlTranslationsPathJp from '../assets/locales/jp/translations.ftl'

const translations = {
  pt: ftlTranslationsPathPt,
  jp: ftlTranslationsPathJp,
}

const defaultLanguage = translations.pt

const backend: InitOptions['backend'] = {
  loadPath: ([lng]: [string]) => (
    lng in translations
      ? translations[lng as keyof typeof translations]
      : defaultLanguage
  ),
}

i18n
  .use(LanguageDetector)
  .use(Fluent)
  .use(FluentBackend)
  .use(initReactI18next)
  .init({
    backend,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
