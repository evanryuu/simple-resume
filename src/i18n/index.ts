/* eslint-disable camelcase */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { useAppStore } from '@/store/app.js'

import en_US from './en_US.js'
import zh_CN from './zh_CN.js'

/** in case some day types might be needed */
export interface Translations {
  /** S preview button content */
  editContent: string
  editStyle: string
  exportConfig: string
  importConfig: string
  resetConfig: string
  exportPictruePDF: string
  exportPDF: string
  /** E preview button content */

  addBlock: string
  addItem: string
  name: string
  avatar: string
  desc: string
  title: string
  subtitle: string
  note: string
  description: string
  detail: string

  /** S resume style */
  themeColor: string
  avatarWidth: string
  avatarRounded: string
  infoItemsColumn: string
  lineBelowInfo: string
  pagePadding: string
  blockHeaderSize: string
  titleSize: string
  titleStyle: string
  subtitleSize: string
  subtitleColor: string
  subtitleBackgroundColor: string
  noteSize: string
  noteColor: string
  noteBackgroundColor: string
  /** E resume style */

  /**  */
  warning: string
  deleteBlockTip: string
  deleteItemTip: string
  confirm: string
  resetConfigTip: string

  /** choose template */
  chooseTemplate: string
  template: string
  normal: string
}

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
