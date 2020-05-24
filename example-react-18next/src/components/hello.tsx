import React from 'react'
import { useTranslation, Trans } from 'react-i18next'
const TransTyped = Trans as typeof TypeTransTyped

const Hello = () => {
  const { t } = useTranslation()

  return (
    <>
      <p>{t('hello', { firstName: 'Macabeus', lastName: 'Aquino' })}</p>
      <p>{t('bye')}</p>

      <TransTyped i18nKey='trans-example' t={t}>
        Hello <strong>{{name: 'Macabeus'}}</strong>, how are you?
      </TransTyped>
    </>
  )
}

export default Hello
