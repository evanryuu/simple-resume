/* eslint-disable camelcase */
import React, { useEffect } from 'react'

import { ConfigProvider } from 'antd'
import en_US from 'antd/locale/en_GB'
import zh_CN from 'antd/locale/zh_CN'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'

import App from './App'
import i18n from './i18n'
import { useAppStore, useResumeStore } from './store'

import type { LangType, IResumeInfoSetting } from './store'

import './styles/index.css'
import 'uno.css'

export interface IAppContext {
  previewEl: React.RefObject<any>
}

const Root = () => {
  const { lang } = useAppStore()
  const { resumeData, resumeStyle } = useResumeStore()

  const map: { [k in LangType]: any } = {
    en_US,
    zh_CN,
  }

  useEffect(() => {
    document.title = `${(resumeData.find((r) => r.type === 'info') as IResumeInfoSetting).data.name}'s Resume`
  }, [(resumeData.find((r) => r.type === 'info') as IResumeInfoSetting).data.name])

  useEffect(() => {
    // 当颜色发生变化时，生成新的样式标签
    const styleTag = document.createElement('style')
    styleTag.id = 'code-style'
    styleTag.innerHTML = `
    code { 
      color: #ffffff;
      background-color: ${resumeStyle.themeColor.value}; 
    }
    .editable {
      border-color: ${resumeStyle.themeColor.value};
    }
    `

    // 移除之前的样式标签
    const prevStyleTag = document.getElementById('code-style')
    if (prevStyleTag) {
      prevStyleTag.remove()
    }

    // 添加新的样式标签
    document.head.appendChild(styleTag)

    return () => {
      // 组件卸载时移除样式标签
      styleTag.remove()
    }
  }, [resumeStyle.themeColor.value])

  return (
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <ConfigProvider locale={map[lang]}>
          <App />
        </ConfigProvider>
      </I18nextProvider>

    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Root />)
