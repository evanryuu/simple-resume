import React, { useRef } from 'react'

import { Dropdown, message } from 'antd'
import { useTranslation } from 'react-i18next'

import { useResumeStore } from '@/store'
import { downloadJSON } from '@/utils'

import ResetResume from './ResetResume'

import type { IResumeStorage } from '@/utils/initTemplateData'
import type { DropdownProps } from 'antd'

const ShareDropdown: React.FC<DropdownProps> = (props) => {
  const { t } = useTranslation()
  const {
    resumeData,
    resumeStyle, setResumeData, setResumeStyle,
  } = useResumeStore()

  const fileInputEl = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          const fileContent = e.target.result as string
          const jsonData = JSON.parse(fileContent) as IResumeStorage
          setResumeData(jsonData.state.resumeData)
          setResumeStyle(jsonData.state.resumeStyle)
          message.success(t('success'))
        }
      }
      reader.readAsText(file)
    }
  }

  const items = [
    {
      key: '1',
      label: (
        <span
          role="presentation"
          className="mt-4 !rounded-none"
          onClick={() => downloadJSON('resume-setting.json', {
            state: {
              resumeData,
              resumeStyle,
            },
          })}
        >{t('exportTemplate')}
        </span>
      ),
    },
    {
      key: '2',
      label: (
        <span
          role="presentation"
          className="mt-4 !rounded-none"
          onClick={() => fileInputEl.current?.click()}
        >
          {t('importTemplate')}
          <input
            ref={fileInputEl}
            className="hidden"
            type="file"
            accept=".json"
            onChange={handleFileChange}
          />
        </span>
      ),
    },
    {
      key: '3',
      label: (<ResetResume />),
    },
  ]

  return (
    <Dropdown {...props} menu={{ items }}>
      <span className="cursor-pointer">{t('share')}</span>
    </Dropdown>
  )
}

export default ShareDropdown
