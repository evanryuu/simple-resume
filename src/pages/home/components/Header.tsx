import React from 'react'

import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'

import DarkModeSwitcher from '@/components/DarkModeSwitcher'
import LanguageSelect from '@/components/LanguageSelect'
import PreviewSwitcher from '@/components/PreviewSwitcher'
import { useAppStore, useResumeStore } from '@/store'

import EditDropdown from './Dropdown/EditDropdown'
import ExportDropdown from './Dropdown/ExportDropdown'
import OptDropdown from './Dropdown/ShareDropdown'

const Header: React.FC = () => {
  const { t } = useTranslation()
  const { previewMode, setPreviewMode } = useAppStore()
  const { resumeStyle } = useResumeStore()

  return (
    <div>
      {
        previewMode
          ? (
            <div
              className="preview-toggler fixed right-4 top-4 cursor-pointer opacity-0"
              role="presentation"
              onClick={() => setPreviewMode(false)}
            >
              <Icon icon="zondicons:close-outline" width={40} />
            </div>
          )
          : (
            <div
              className="fixed top-0 left-0 right-0 z-30 flex justify-between p-2 mb-8 text-xs h-4 py-3 bg-white"
              style={{
                boxShadow: `0 0 2px ${resumeStyle.themeColor.value}`,
              }}
            >
              <div />
              <span className="absolute left-1/2 translate-x--1/2 text-md">{t('headerTip')}</span>
              <div className="flex items-center">
                <EditDropdown />
                <OptDropdown className="ml-4" />
                <ExportDropdown className="ml-4" />
                <PreviewSwitcher className="ml-4 cursor-pointer flex items-center px-1 border-solid border-1" />
                <DarkModeSwitcher className="text-lg ml-4 flex items-center cursor-pointer hover:fill-true-gray-700" />
                <LanguageSelect placement="bottomRight" className="text-lg flex items-center ml-4" />
              </div>
            </div>
          )
      }
    </div>
  )
}

export default Header
