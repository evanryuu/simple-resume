import React from 'react'

import { Icon } from '@iconify/react'
import classNames from 'classnames'

import type { TextProps } from '@/types'

const Text: React.FC<TextProps> = (props) => {
  const {
    value, style, icon, iconColor, classes,
  } = props

  const cname = classNames('text-left', classes)

  return (
    <div className={cname}>
      {icon
        ? <Icon icon={icon} color={iconColor} />
        : null}
      <span
        style={style}
      >
        {value}
      </span>
    </div>
  )
}

export default Text
