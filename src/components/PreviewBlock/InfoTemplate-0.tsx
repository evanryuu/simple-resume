import React from 'react'

import classNames from 'classnames'

import { useResumeStyleStore } from '@/store/style'

import type { IResumeInfoData } from '@/store/resume'

import Text from '../Text/Text'

export type InfoTemplateProps = IResumeInfoData

const InfoTemplate0: React.FC<IResumeInfoData> = (props) => {
  const {
    title, name, avatar, items,
  } = props
  const { resumeStyle } = useResumeStyleStore()

  const titleClasses = classNames('block-title', {
    'is-banner': resumeStyle.titleStyle === 'banner',
  })

  return (
    <div className="flex items-center">
      {
        avatar
          ? (<img
            src={avatar}
            alt="Avatar"
            width={resumeStyle.avatarWidth}
            style={{ borderRadius: resumeStyle.avatarRounded ? '50%' : 0 }}
          />
          )
          : null
      }
      <div className="info-container">
        <div className="info-name">{name}</div>
        <div className="info-desc-container grid grid-cols-1">
          {
            items.length && items.map((item, i) => (
              <Text className="flex items-center" key={i} {...item} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default InfoTemplate0
