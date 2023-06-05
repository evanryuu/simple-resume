import React from 'react'

import { useTranslation } from 'react-i18next'

import MyGithub from '@/components/MyGithub'
import { useAppStore, useResumeStore } from '@/store'

const Footer: React.FC = () => {
  const { previewMode } = useAppStore()
  const { resumeStyle } = useResumeStore()
  const { t } = useTranslation()
  return (
    <div>
      {
        !previewMode
          ? (
            <div
              className="fixed p-2 pr-4 bottom-0 w-full h-4 text-white text-sm flex z-30  items-center"
              style={{
                backgroundColor: resumeStyle.themeColor.value,
              }}
            >
              <span className="absolute left-1/2 translate-x--1/2 text-xs">{t('footerTip')}</span>
              <MyGithub type="tag" className="ml-auto text-white mr-4 hover:text-white text-md" />
            </div>
          )
          : null
      }
    </div>
  )
}

export default Footer
