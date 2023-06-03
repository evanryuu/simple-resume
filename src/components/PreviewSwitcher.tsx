import React from 'react'

import { useAppStore } from '@/store'

const PreviewSwitcher: React.FC<{ className?: string }> = (props) => {
  const { className } = props
  const { setPreviewMode } = useAppStore()

  return (

    <span
      role="presentation"
      className={className}
      onClick={() => setPreviewMode(true)}
    >
      预览
    </span>
  )
}

export default PreviewSwitcher
