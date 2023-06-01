import React from 'react'

import { Icon } from '@iconify/react'

import type { TextProps } from '@/types'

const Text: React.FC<TextProps> = (props) => {
  const {
    value, style, icon, iconColor,
  } = props

  return (
    <div className="flex items-center justify-between">
      <span
        style={style}
      >
        {icon
          ? <Icon icon={icon} color={iconColor} />
          : null}
        {value}
      </span>
    </div>
  )
}

export default Text
