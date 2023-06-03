import React from 'react'

import { useTranslation } from 'react-i18next'

import { useAppStore } from '@/store'

const PreviewSwitcher: React.FC<{ className?: string }> = (props) => {
  const { className } = props
  const { setPreviewMode } = useAppStore()
  const { t } = useTranslation()

  return (

    <span
      role="presentation"
      className={className}
      onClick={() => setPreviewMode(true)}
    >
      {t('preview')}
    </span>
  )
}

export default PreviewSwitcher
