/* eslint-disable camelcase */
import React from 'react'

import { ConfigProvider } from 'antd'
import en_US from 'antd/locale/en_GB'
import zh_CN from 'antd/locale/zh_CN'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'

import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import i18n from './i18n'
import { useAppStore } from './store'

import type { LangType } from './store'

import './styles/index.css'
import 'uno.css'

const map: { [k in LangType]: any } = {
  en_US,
  zh_CN,
}
const Root = () => {
  const { lang } = useAppStore()

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <ConfigProvider locale={map[lang]}>
            <App />
          </ConfigProvider>
        </I18nextProvider>
      </ErrorBoundary>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Root />)
