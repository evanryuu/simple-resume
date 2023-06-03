/* eslint-disable camelcase */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { useAppStore } from '@/store/app.js'

import en_US from './en_US.js'
import zh_CN from './zh_CN.js'

export const langs = {
  en_US,
  zh_CN,
}

const i18nInstance = i18n.createInstance().use(initReactI18next)

i18nInstance.use(initReactI18next).init({
  resources: langs,
  lng: useAppStore.getState().lang,
  interpolation: {
    escapeValue: false,
  },
})

// Subscribe to the Zustand store and update i18n resources when the store data changes
useAppStore.subscribe(
  (data) => {
    i18nInstance.changeLanguage(data.lang)
  },
)

export default i18nInstance
