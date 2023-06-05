import React, { useState } from 'react'

import { Modal, message } from 'antd'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import { useResumeStore } from '@/store'

import type { BaseComponentProps } from '@/types'

const ResetResume: React.FC<BaseComponentProps> = (props) => {
  const { className } = props

  const [showConfirm, setShowConfirm] = useState(false)

  const { t } = useTranslation()
  const { resetResumeSettings } = useResumeStore()

  const handleResetResumeDate = () => {
    resetResumeSettings()
    message.success(t('success'))
    setShowConfirm(false)
  }

  const cname = classNames(className)

  return (
    <>
      <Modal
        open={showConfirm}
        onOk={handleResetResumeDate}
        title="Confirm"
        onCancel={() => setShowConfirm(false)}
      >
        {t('resetConfigTip')}
      </Modal>
      <span className={cname} role="presentation" onClick={() => setShowConfirm(true)}>{t('resetTemplate')}</span>
    </>
  )
}

export default ResetResume
