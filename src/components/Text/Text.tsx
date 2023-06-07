import React from 'react'

import { Icon } from '@iconify/react'
import classNames from 'classnames'
import ReactMarkdown from 'react-markdown'

import type { TextProps } from '@/types'

const Text: React.FC<TextProps> = (props) => {
  const {
    value, style, icon, iconColor, classes, md, iconSize,
  } = props

  const cname = classNames('text-left', classes)
  const iconClass = classNames('mr-1 flex-shrink-0', {
    [`text-${iconSize}`]: iconSize,
  })

  return (
    <div className={cname}>
      {
        md
          ? (
            <div className="text-xs">
              {icon ? <Icon className={iconClass} icon={icon} color={iconColor} /> : null}
              <ReactMarkdown>{value as string}</ReactMarkdown>
            </div>
          )
          : (
            <div className="flex items-center">
              {icon ? <Icon className={iconClass} icon={icon} color={iconColor} /> : null}
              <span style={style}>{value}</span>
            </div>
          )

      }

    </div>
  )
}

export default Text
