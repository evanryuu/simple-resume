import React, { useRef, useState } from 'react'

import { Dropdown, Modal, message } from 'antd'
import { useTranslation } from 'react-i18next'

import { useResumeStore } from '@/store'
import { downloadJSON } from '@/utils'

import type { IResumeStorage } from '@/utils/initTemplateData'
import type { DropdownProps } from 'antd'
import type { ItemType } from 'antd/es/menu/hooks/useItems'

const SaveDropdown: React.FC<DropdownProps> = (props) => {
  const [showSaveTip, setShowSaveTip] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const { resetResumeSettings } = useResumeStore()

  const handleResetResumeDate = () => {
    resetResumeSettings()
    message.success(t('success'))
    setShowResetConfirm(false)
  }

  const { t } = useTranslation()
  const {
    resumeData,
    resumeStyle,
    setResumeData,
    setResumeStyle,
  } = useResumeStore()

  const fileInputEl = useRef<HTMLInputElement>(null)

  const handleSaveResume = () => {
    downloadJSON('resume-setting.json', {
      state: {
        resumeData,
        resumeStyle,
      },
    })
    setShowSaveTip(false)
  }

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

  const items: ItemType[] = [
    {
      key: '1',
      label: (
        <span
          role="presentation"
          className="mt-4 !rounded-none"
        >{t('saveResume')}
        </span>
      ),
      onClick: () => setShowSaveTip(true),
    },
    {
      key: '2',
      label: (
        <span
          role="presentation"
          className="mt-4 !rounded-none"
        >
          {t('importResume')}
          <input
            ref={fileInputEl}
            className="hidden"
            type="file"
            accept=".json"
            onChange={handleFileChange}
          />
        </span>
      ),
      onClick: () => fileInputEl.current?.click(),
    },
    {
      key: '3',
      label: (
        <span className="mt-4 !rounded-none" role="presentation">{t('resetResume')}</span>
      ),
      onClick: () => setShowResetConfirm(true)!,
    },
  ]

  return (
    <>
      <Modal
        okText={t('resetResume')}
        okType="danger"
        open={showResetConfirm}
        onOk={handleResetResumeDate}
        title={t('warning')}
        onCancel={() => setShowResetConfirm(false)}
      >
        {t('resetResumeTip')}
      </Modal>
      <Modal
        title={t('confirm')}
        open={showSaveTip}
        onCancel={() => setShowSaveTip(false)}
        onOk={handleSaveResume}
      >
        <div className="pr-4">
          {t('saveResumeTip')}
        </div>
      </Modal>
      <Dropdown {...props} menu={{ items }}>
        <span className="cursor-pointer">{t('save')}</span>
      </Dropdown>
    </>
  )
}

export default SaveDropdown
