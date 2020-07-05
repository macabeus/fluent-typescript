import React, { Children, useEffect, useState, ReactNode } from 'react'
import { negotiateLanguages } from '@fluent/langneg'
import { FluentBundle, FluentResource } from '@fluent/bundle'
import { ReactLocalization, LocalizationProvider } from '@fluent/react'
import ftlTranslationsPathPt from '../assets/locales/pt-br/translations.ftl'
import ftlTranslationsPathJp from '../assets/locales/jp/translations.ftl'

const translations = {
  pt: ftlTranslationsPathPt,
  jp: ftlTranslationsPathJp,
}

type AvailableLocaleCodes = keyof typeof translations

const availableLocales: { [key in AvailableLocaleCodes]: string } = {
  pt: 'Portuguese',
  jp: 'Japanese',
}

const defaultLanguage: AvailableLocaleCodes = 'pt'

const fetchMessages = async (locale: AvailableLocaleCodes) => {
  const response = await fetch(translations[locale])
  const messages = await response.text()
  return [locale, messages] as [AvailableLocaleCodes, string]
}

function* lazilyParsedBundles(fetchedMessages: Array<[string, string]>) {
  for (const [locale, messages] of fetchedMessages) {
    const resource = new FluentResource(messages)
    const bundle = new FluentBundle(locale)
    bundle.addResource(resource)
    yield bundle
  }
}

type AppLocalizationProviderProps = {
  children: ReactNode
}

function AppLocalizationProvider(props: AppLocalizationProviderProps) {
  const [currentLocales, setCurrentLocales] = useState([defaultLanguage])
  const [l10n, setL10n] = useState<ReactLocalization | null>(null)

  async function changeLocales(userLocales: Array<string>) {
    const currentLocales = negotiateLanguages(
      userLocales,
      Object.keys(availableLocales),
      { defaultLocale: defaultLanguage }
    ) as AvailableLocaleCodes[]
    setCurrentLocales(currentLocales)

    const fetchedMessages = await Promise.all(
      currentLocales.map(fetchMessages)
    )

    const bundles = lazilyParsedBundles(fetchedMessages)
    setL10n(new ReactLocalization(bundles))
  }

  useEffect(() => {
    changeLocales(navigator.languages as Array<string>)
  }, [])

  if (l10n === null) {
    return <div>Loading…</div>
  }

  return (
    <>
      <LocalizationProvider l10n={l10n}>
        {Children.only(props.children)}
      </LocalizationProvider>

      <hr />

      <select
        onChange={event => changeLocales([event.target.value])}
        value={currentLocales[0]}>
        {Object.entries(availableLocales).map(
          ([code, name]) => <option key={code} value={code}>{name}</option>
        )}
      </select>
    </>
  )
}

export default AppLocalizationProvider
