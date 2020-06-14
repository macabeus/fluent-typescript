import React from 'react'
import { useTranslation } from 'react-i18next'

const Hello = () => {
  const { t } = useTranslation()

  return (
    <>
      <p>{t('hello', { firstName: 'Macabeus', lastName: 'Aquino' })}</p>
      <p>{t('bye')}</p>
    </>
  )
}

export default Hello
