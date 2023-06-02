import React from 'react'

import { Icon } from '@iconify/react'
import classNames from 'classnames'
import ReactMarkdown from 'react-markdown'

import type { TextProps } from '@/types'

const Text: React.FC<TextProps> = (props) => {
  const {
    value, style, icon, iconColor, classes, md,
  } = props

  const cname = classNames('text-left', classes)

  return (
    <div className={cname}>
      {
        md
          ? (
            <div className="text-xs">
              <ReactMarkdown>{value as string}</ReactMarkdown>
            </div>
          )
          : (
            <>
              {icon ? <Icon className="mr-1" icon={icon} color={iconColor} /> : null}
              <span style={style}>{value}</span>
            </>
          )

      }

    </div>
  )
}

export default Text
